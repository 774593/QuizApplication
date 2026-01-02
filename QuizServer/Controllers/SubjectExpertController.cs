using Microsoft.AspNetCore.Mvc;
using QuizServer.Repository;
using QuizServer.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

[Route("api/[controller]")] 
[ApiController]
public class SubjectExpertController : ControllerBase
{
   
    private readonly SubjectExpertRepository _subjectExpertRepo;
   

    public SubjectExpertController(SubjectExpertRepository subjectExpertRepo)
    {
        _subjectExpertRepo = subjectExpertRepo;
    }

 
    [HttpGet("AllSubjectExperts")]
    public async Task<IActionResult> GetAllSubjectExperts()
    {
        var experts = await _subjectExpertRepo.GetAllAsync();
        return Ok(experts);
    }

    [HttpPost("CreateSubjectExpert")]
    public async Task<IActionResult> CreateSubjectExpert([FromBody] SubjectExpert expert)
    {
        if (expert == null)
        {
            return BadRequest("SubjectExpert data is invalid.");
        }

        await _subjectExpertRepo.AddAsync(expert);
    
        return CreatedAtAction(nameof(GetAllSubjectExperts), new { id = expert.SubjectExpertId }, expert);
    }
}