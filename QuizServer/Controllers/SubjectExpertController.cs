using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuizServer.Models;
using QuizServer.Repository;

namespace QuizServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectExpertController : ControllerBase
    {
        private readonly SubjectExpertRepository _subjectExpertRepo;

        public SubjectExpertController(SubjectExpertRepository subjectExpertRepo)
        {
            _subjectExpertRepo = subjectExpertRepo;
        }

        // GET: api/SubjectExpert
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubExpert>>> GetAllExperts()
        {
            var experts = await _subjectExpertRepo.getAllExpertsAsync();
            return Ok(experts);
        }

        // GET: api/SubjectExpert/{regNo}
        [HttpGet("{regNo}")]
        public async Task<ActionResult<SubExpert>> GetByRegNo(string regNo)
        {
            if (string.IsNullOrWhiteSpace(regNo)) return BadRequest("Registration number is required.");

            var expert = await _subjectExpertRepo.getExpertByRegNoAsync(regNo);
            if (expert == null) return NotFound();
            return Ok(expert);
        }

        // GET: api/SubjectExpert/ByEmail/{email}
        [HttpGet("ByEmail/{email}")]
        public async Task<ActionResult<SubExpert>> GetByEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return BadRequest("Email is required.");

            var expert = await _subjectExpertRepo.getExpertByEmailAsync(email);
            if (expert == null) return NotFound();
            return Ok(expert);
        }

        // GET: api/SubjectExpert/Search?expertise=term
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<SubExpert>>> SearchByExpertise([FromQuery] string expertise)
        {
            if (string.IsNullOrWhiteSpace(expertise)) return BadRequest("Expertise search term is required.");

            var results = await _subjectExpertRepo.getExpertsByExpertiseAsync(expertise);
            return Ok(results);
        }

        // POST: api/SubjectExpert
        [HttpPost]
        public async Task<ActionResult<SubExpert>> CreateExpert([FromBody] SubExpert expert)
        {
            if (expert == null) return BadRequest("Subject expert data is invalid.");
            if (string.IsNullOrWhiteSpace(expert.RegNo)) return BadRequest("RegNo is required.");

            await _subjectExpertRepo.addExpertAsync(expert);

            return CreatedAtAction(nameof(GetByRegNo), new { regNo = expert.RegNo }, expert);
        }

        // PUT: api/SubjectExpert/{regNo}
        [HttpPut("{regNo}")]
        public async Task<IActionResult> UpdateExpert(string regNo, [FromBody] SubExpert expert)
        {
            if (string.IsNullOrWhiteSpace(regNo)) return BadRequest("Registration number is required.");
            if (expert == null) return BadRequest("Subject expert data is invalid.");

            var existing = await _subjectExpertRepo.getExpertByRegNoAsync(regNo);
            if (existing == null) return NotFound();

            // Ensure identity stays consistent
            expert.RegNo = regNo;
            await _subjectExpertRepo.updateExpertAsync(expert);

            return NoContent();
        }

        // DELETE: api/SubjectExpert/{regNo}
        [HttpDelete("{regNo}")]
        public async Task<IActionResult> DeleteExpert(string regNo)
        {
            if (string.IsNullOrWhiteSpace(regNo)) return BadRequest("Registration number is required.");

            var existing = await _subjectExpertRepo.getExpertByRegNoAsync(regNo);
            if (existing == null) return NotFound();

            await _subjectExpertRepo.removeExpertAsync(regNo);
            return NoContent();
        }

        // POST: api/SubjectExpert/Authenticate
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthRequest req)
        {
            if (req == null || string.IsNullOrWhiteSpace(req.RegNoOrEmail) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest("Credentials are required.");

            var expert = await _subjectExpertRepo.authenticateAsync(req.RegNoOrEmail, req.Password);
            if (expert == null) return Unauthorized();

            return Ok(expert);
        }

        // Made public so the public Authenticate method can expose it as a parameter type
        public record AuthRequest(string RegNoOrEmail, string Password);
    }
}