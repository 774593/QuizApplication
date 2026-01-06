using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizServer.Models;
using QuizServer.Repository;


namespace QuizServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly UserMasterRepository _userRepository;

        public UserController(UserMasterRepository userMasterRepository)
        {
            _userRepository = userMasterRepository;
        }

        // DTOs used by the controller (public because controller methods are public)
        public record LoginRequest(string UserName, string Password);
        public record CreateUserRequest(string UserName, string Password, string Deg, string? IsActive);
        public record UserResponse(string UserName, string Deg, DateTime? LogIn, DateTime? LogOut, string? IsActive, string? IsDeleted);

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllUsers()
        {
            var users = await _userRepository.getAllUsersAsync();
            var response = new List<UserResponse>();
            foreach (var u in users)
            {
                response.Add(new UserResponse(u.UserName, u.Deg, u.LogIn, u.LogOut, u.IsActive, u.IsDeleted));
            }
            return Ok(response);
        }

        // GET: api/User/{userName}
        [HttpGet("{userName}")]
        public async Task<ActionResult<UserResponse>> GetByUserName(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName)) return BadRequest("Username is required.");

            var user = await _userRepository.getUserByNameAsync(userName);
            if (user == null) return NotFound();

            return Ok(new UserResponse(user.UserName, user.Deg, user.LogIn, user.LogOut, user.IsActive, user.IsDeleted));
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserResponse>> CreateUser([FromBody] CreateUserRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.UserName) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest("Username and password are required.");

            // prevent duplicate username
            var existing = await _userRepository.getUserByNameAsync(req.UserName);
            if (existing != null) return Conflict("Username already exists.");

            var user = new UserMaster
            {
                UserName = req.UserName,
                Password = req.Password,
                Deg = req.Deg,
                IsActive = req.IsActive ?? "Y",
                IsDeleted = "N",
                LogIn = null,
                LogOut = null
            };

            await _userRepository.addUserAsync(user);

            var resp = new UserResponse(user.UserName, user.Deg, user.LogIn, user.LogOut, user.IsActive, user.IsDeleted);
            return CreatedAtAction(nameof(GetByUserName), new { userName = user.UserName }, resp);
        }

        // PUT: api/User/{userName}
        [HttpPut("{userName}")]
        public async Task<IActionResult> UpdateUser(string userName, [FromBody] CreateUserRequest req)
        {
            if (string.IsNullOrWhiteSpace(userName)) return BadRequest("Username is required.");
            if (req == null) return BadRequest("Request body is required.");

            var existing = await _userRepository.getUserByNameAsync(userName);
            if (existing == null) return NotFound();

            // update allowed fields (preserve identity)
            existing.Password = string.IsNullOrWhiteSpace(req.Password) ? existing.Password : req.Password;
            existing.Deg = req.Deg ?? existing.Deg;
            existing.IsActive = req.IsActive ?? existing.IsActive;

            await _userRepository.updateUserAsync(existing);
            return NoContent();
        }

        // DELETE: api/User/{userName}  -> soft delete (marks IsDeleted)
        [HttpDelete("{userName}")]
        public async Task<IActionResult> DeleteUser(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName)) return BadRequest("Username is required.");

            var existing = await _userRepository.getUserByNameAsync(userName);
            if (existing == null) return NotFound();

            // soft-delete pattern: mark deleted and deactivate
            existing.IsDeleted = "Y";
            existing.IsActive = "N";
            await _userRepository.updateUserAsync(existing);

            return NoContent();
        }

        /// <summary>
        /// Authenticate a member. Expects JSON: { "userName": "...", "password": "..." }
        /// Updates login timestamp on success.
        /// </summary>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> MemberLogin([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Username and password are required.");

            try
            {
                var user = await _userRepository.memberLoginAsync(request.UserName, request.Password);

                if (user == null) return Unauthorized("Invalid username or password.");

                // Optionally check activation flag:
                // if (!string.Equals(user.IsActive, "Y", StringComparison.OrdinalIgnoreCase)) ...

                // Update login timestamp (best-effort, don't fail login if update fails)
                try
                {
                    await _userRepository.updateLoginDetailsAsync(user.UserName, DateTime.UtcNow);
                }
                catch
                {
                    // log in real app
                }

                var response = new UserResponse(user.UserName, user.Deg, user.LogIn, user.LogOut, user.IsActive, user.IsDeleted);
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, "An error occurred while processing the login request.");
            }
        }

        /// <summary>
        /// Record logout time for a username. Expects JSON: { "userName": "...", "password": "..." } (password optional here)
        /// </summary>
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.UserName))
                return BadRequest("Username is required to logout.");

            try
            {
                await _userRepository.addLogoutDetailsAsync(request.UserName, DateTime.UtcNow);
                return Ok(new { message = "Logout recorded." });
            }
            catch
            {
                return StatusCode(500, "An error occurred while recording logout.");
            }
        }
    }
}