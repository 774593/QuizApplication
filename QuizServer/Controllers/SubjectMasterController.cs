using Microsoft.AspNetCore.Mvc;
using QuizServer.Repository;
using QuizServer.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

[Route("api/[controller]")] 
[ApiController]
public class OrganizationController : ControllerBase
{
  
    private readonly OrganizationMasterRepository _orgRepo;
    private object Organization;

    public OrganizationController(OrganizationMasterRepository orgRepo)
    {
        _orgRepo = orgRepo;
    }

    [HttpGet("AllOrganizations")]
    public async Task<IActionResult> GetAllOrganizations()
    {
        var organizations = await _orgRepo.GetAllAsync();
        return Ok(organizations);
    }

एँ
    [HttpPost("CreateOrganization")]
    public async Task<IActionResult> CreateOrganization([FromBody] OrganizationMaster organization)
    {
        if (organization == null)
        {
            return BadRequest("Organization data is invalid.");
        }

        await _orgRepo.AddAsync(organization);
       
        return CreatedAtAction(nameof(GetAllOrganizations), new { id = Organization.OrganizationId }, organization);
    }
}