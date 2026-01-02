using Microsoft.AspNetCore.Mvc;
using QuizServer.Repository;
using QuizServer.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

[Route("api/[controller]")] 
[ApiController]
public class CustomerMasterController : ControllerBase
{
   
    private readonly CustomerMasterRepository _customerRepo;
   

    public CustomerMasterController(CustomerMasterRepository customerRepo)
    {
        _customerRepo = customerRepo;
    }

   
    [HttpGet("AllCustomers")]
    public async Task<IActionResult> GetAllCustomers()
    {
        var customers = await _customerRepo.GetAllAsync();
        return Ok(customers);
    }

   
    [HttpPost("CreateCustomer")]
    public async Task<IActionResult> CreateCustomer([FromBody] CustomerMaster customer)
    {
        if (customer == null)
        {
            return BadRequest("Customer data is invalid.");
        }

        await _customerRepo.AddAsync(customer);
    
        return CreatedAtAction(nameof(GetAllCustomers), new { id = customer.CustomerId }, customer);
    }
}