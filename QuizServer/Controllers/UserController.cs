using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizServer.Repository;
using Microsoft.AspNetCore.Http;


namespace QuizServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        readonly UserMasterRepository  _userRepository;

        public UserController(UserMasterRepository userMasterRepository)
        {
            _userRepository = userMasterRepository;
        }
        // DTO used for login request
        public record LoginRequest(string UserName, string Password);

        // DTO returned to clients (password omitted)
        public record UserResponse(string UserName, string Deg, DateTime? LogIn, DateTime? LogOut, string? IsActive, string? IsDeleted);

        /// <summary>
        /// Authenticate a member. Expects JSON: { "userName": "...", "password": "..." }
        /// </summary>
        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult MemberLogin([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required.");
            }

            try
            {
                var user = _userRepository.memberLogin(request.UserName, request.Password);

                if (user == null)
                {
                    // Credentials invalid
                    return Unauthorized("Invalid username or password.");
                }

                // Optionally check activation flag before allowing login:
                // if (!string.Equals(user.IsActive, "Y", StringComparison.OrdinalIgnoreCase)) { ... }

                // Update login timestamp
                try
                {
                    _userRepository.updateLoginDetails(user.UserName, DateTime.UtcNow);
                }
                catch
                {
                    // Don't fail the login if updating the login details fails;
                    // log the error in real app. For now continue.
                }

                var response = new UserResponse(
                    user.UserName,
                    user.Deg,
                    user.LogIn,
                    user.LogOut,
                    user.IsActive,
                    user.IsDeleted
                );

                return Ok(response);
            }
            catch (Exception ex)
            {
                // In production, log the exception and return a sanitized message.
                return StatusCode(500, "An error occurred while processing the login request.");
            }
        }

        /// <summary>
        /// Simple logout endpoint that records logout time for a username.
        /// Expects JSON: { "userName": "..." }
        /// </summary>
        [HttpPost("logout")]
        [Authorize] // require authentication in real app; adjust as needed
        public IActionResult Logout([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.UserName))
            {
                return BadRequest("Username is required to logout.");
            }

            try
            {
                _userRepository.addLogoutDetails(request.UserName, DateTime.UtcNow);
                return Ok(new { message = "Logout recorded." });
            }
            catch
            {
                return StatusCode(500, "An error occurred while recording logout.");
            }
        }


    }
}