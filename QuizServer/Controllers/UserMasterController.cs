using Microsoft.AspNetCore.Mvc;
using QuizServer.Models;
using QuizServer.Repository;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class UserMasterController : ControllerBase
{

    private readonly UserMasterRepository _userRepo;


    public UserMasterController(UserMasterRepository userRepo)
    {
        _userRepo = userRepo;
    }


    [HttpGet("ALLUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        
        var users = await _userRepo.GetAllAsync();

        return Ok(users);

      
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserMaster user)
        {
            if (user == null)
            {
                return BadRequest("User data is invalid.");
            }

            await _userRepo.AddAsync(user);
            return CreatedAtAction(nameof(GetAllUsers), new { id = user.UserId }, user);
        }

        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserMaster user)
        {
            if (id != user.UserId)
            {
                return BadRequest("User ID mismatch.");
            }

            await _userRepo.UpdateAsync(user);
            return NoContent();
        }

        
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userRepo.DeleteAsync(id);
            return Ok($"User ID {id} deleted successfully.");
        }
    }
}
