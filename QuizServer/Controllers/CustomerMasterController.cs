using Microsoft.AspNetCore.Mvc;
using QuizServer.Repository;
using QuizServer.Models;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace QuizServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerMasterController : ControllerBase
    {
        private readonly CustomerMasterRepository _customerRepo;

        public CustomerMasterController(CustomerMasterRepository customerRepo)
        {
            _customerRepo = customerRepo;
        }

        // GET: api/CustomerMaster
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerMaster>>> GetAllCustomers()
        {
            var customers = await _customerRepo.getAllCustomersAsync();
            return Ok(customers);
        }

        // GET: api/CustomerMaster/ByEmail/{email}
        [HttpGet("ByEmail/{email}")]
        public async Task<ActionResult<CustomerMaster>> GetCustomerByEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return BadRequest("Email is required.");

            var customer = await _customerRepo.getCustomerByEmailAsync(email);
            if (customer == null) return NotFound();
            return Ok(customer);
        }

        // GET: api/CustomerMaster/ByMobile/{mobile}
        [HttpGet("ByMobile/{mobile}")]
        public async Task<ActionResult<CustomerMaster>> GetCustomerByMobile(string mobile)
        {
            if (string.IsNullOrWhiteSpace(mobile)) return BadRequest("Mobile number is required.");

            var customer = await _customerRepo.getCustomerByMobileAsync(mobile);
            if (customer == null) return NotFound();
            return Ok(customer);
        }

        // GET: api/CustomerMaster/Search?name=term
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<CustomerMaster>>> SearchCustomers([FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return BadRequest("Search term is required.");

            var results = await _customerRepo.findCustomersByNameAsync(name);
            return Ok(results);
        }

        // POST: api/CustomerMaster
        [HttpPost]
        public async Task<ActionResult<CustomerMaster>> CreateCustomer([FromBody] CustomerMaster customer)
        {
            if (customer == null) return BadRequest("Customer data is invalid.");

            await _customerRepo.addCustomerAsync(customer);

            // Use email as identifier for CreatedAtAction since no explicit numeric id is guaranteed in the model signature
            if (!string.IsNullOrWhiteSpace(customer.Email))
            {
                return CreatedAtAction(nameof(GetCustomerByEmail), new { email = customer.Email }, customer);
            }

            return Created(string.Empty, customer);
        }

        // PUT: api/CustomerMaster/{email}
        [HttpPut("{email}")]
        public async Task<IActionResult> UpdateCustomer(string email, [FromBody] CustomerMaster customer)
        {
            if (string.IsNullOrWhiteSpace(email)) return BadRequest("Email is required.");
            if (customer == null) return BadRequest("Customer data is invalid.");

            var existing = await _customerRepo.getCustomerByEmailAsync(email);
            if (existing == null) return NotFound();

            // copy updatable fields (simple approach: replace properties except identity fields)
            // If you prefer partial updates, change to apply only provided fields.
            customer.Email = existing.Email; // ensure identity remains consistent
            await _customerRepo.updateCustomerAsync(customer);

            return NoContent();
        }

        // DELETE: api/CustomerMaster/{email}
        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteCustomer(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return BadRequest("Email is required.");

            var existing = await _customerRepo.getCustomerByEmailAsync(email);
            if (existing == null) return NotFound();

            await _customerRepo.removeCustomerByEmailAsync(email);
            return NoContent();
        }
    }
}