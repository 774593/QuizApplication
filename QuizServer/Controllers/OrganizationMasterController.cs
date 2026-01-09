using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizServer.Models;
using QuizServer.Repository;

namespace QuizServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationMasterController : ControllerBase
    {
        private readonly OrganizationMasterRepository _orgRepo;

        public OrganizationMasterController(OrganizationMasterRepository orgRepo)
        {
            _orgRepo = orgRepo;
        }

        // GET: api/OrganizationMaster
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganizationMaster>>> GetAllOrganizations()
        {
            var list = await _orgRepo.getAllOrganizationsAsync();
            return Ok(list);
        }

        // GET: api/OrganizationMaster/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrganizationMaster>> GetOrganizationById(int id)
        {
            var org = await _orgRepo.getOrganizationByIdAsync(id);
            if (org == null) return NotFound();
            return Ok(org);
        }

        // GET: api/OrganizationMaster/ByRegNo/{regNo}
        [HttpGet("ByRegNo/{regNo}")]
        public async Task<ActionResult<OrganizationMaster>> GetByRegNo(string regNo)
        {
            if (string.IsNullOrWhiteSpace(regNo.ToString())) return BadRequest("RegNo is required.");
            var org = await _orgRepo.getOrganizationByRegNoAsync(regNo);
            if (org == null) return NotFound();
            return Ok(org);
        }
        // GET: api/OrganizationMaster/ByRegNo/{regNo}
        [HttpGet("ByRegNoPwd/{regNoPwd}")]
        public async Task<ActionResult<OrganizationMaster>> GetByRegNoPwd(string regNo,string pwd)
        {
            if (string.IsNullOrWhiteSpace(regNo.ToString())) return BadRequest("Username is required.");
            if (string.IsNullOrWhiteSpace(pwd.ToString())) return BadRequest("Password is required.");
            var org = await _orgRepo.getOrganizationByRegNoPwdAsync(regNo,pwd);
            if (org == null) return NotFound();
            return Ok(org);
        }
        // GET: api/OrganizationMaster/ByName/{name}
        [HttpGet("ByName/{name}")]
        public async Task<ActionResult<OrganizationMaster>> GetByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return BadRequest("Name is required.");
            var org = await _orgRepo.getOrganizationByNameAsync(name);
            if (org == null) return NotFound();
            return Ok(org);
        }

        // POST: api/OrganizationMaster
        [HttpPost]
        public async Task<ActionResult<OrganizationMaster>> CreateOrganization([FromBody] OrganizationMaster organization)
        {
            organization.OrganizationId = await _orgRepo.GetMaxOrganizationIdAsync() + 1 ;
            if (organization == null) return BadRequest("Organization data is invalid.");

            await _orgRepo.addOrganizationAsync(organization);

            // assumes OrganizationMaster has OrganizationId populated after save
            return CreatedAtAction(nameof(GetOrganizationById), new { id = organization.OrganizationId }, organization);
        }

       


        // PUT: api/OrganizationMaster/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOrganization(int id, [FromBody] OrganizationMaster organization)
        {
            if (organization == null) return BadRequest("Organization data is invalid.");

            var existing = await _orgRepo.getOrganizationByIdAsync(id);
            if (existing == null) return NotFound();

            // ensure identity matches route
            organization.RegNo = id.ToString();
            await _orgRepo.updateOrganizationAsync(organization);

            return NoContent();
        }

        // DELETE: api/OrganizationMaster/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOrganization(int id)
        {
            var existing = await _orgRepo.getOrganizationByIdAsync(id);
            if (existing == null) return NotFound();

            await _orgRepo.removeOrganizationAsync(id);
            return NoContent();
        }
    }
}
