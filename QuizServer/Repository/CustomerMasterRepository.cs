using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class CustomerMasterRepository : GenericRepository<CustomerMaster>
    {
        public CustomerMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }

        // Async: get all customers
        public async Task<IEnumerable<CustomerMaster>> getAllCustomersAsync()
        {
            return await _context.CustomerMasters.ToListAsync();
        }

        // Async: find by email
        public async Task<CustomerMaster?> getCustomerByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return null;
            return await _context.CustomerMasters.FirstOrDefaultAsync(c => c.Email == email);
        }

        // Async: find by mobile number
        public async Task<CustomerMaster?> getCustomerByMobileAsync(string mobileNo)
        {
            if (string.IsNullOrWhiteSpace(mobileNo)) return null;
            return await _context.CustomerMasters.FirstOrDefaultAsync(c => c.MobileNo == mobileNo);
        }

        // Async: search by name (first or last, partial match)
        public async Task<IEnumerable<CustomerMaster>> findCustomersByNameAsync(string namePart)
        {
            if (string.IsNullOrWhiteSpace(namePart)) return Array.Empty<CustomerMaster>();
            var term = namePart.Trim();
            return await _context.CustomerMasters
                .Where(c => (!string.IsNullOrEmpty(c.FirstName) && EF.Functions.Like(c.FirstName, $"%{term}%"))
                         || (!string.IsNullOrEmpty(c.LastName) && EF.Functions.Like(c.LastName, $"%{term}%")))
                .ToListAsync();
        }

        // Async: add customer and persist
        public async Task addCustomerAsync(CustomerMaster customer)
        {
            await _context.CustomerMasters.AddAsync(customer);
            await _context.SaveChangesAsync();
        }

        // Async: update customer and persist
        public async Task updateCustomerAsync(CustomerMaster customer)
        {
            _context.CustomerMasters.Update(customer);
            await _context.SaveChangesAsync();
        }

        // Async: remove by email (useful when no int PK exposed)
        public async Task removeCustomerByEmailAsync(string email)
        {
            var customer = await _context.CustomerMasters.FirstOrDefaultAsync(c => c.Email == email);
            if (customer != null)
            {
                _context.CustomerMasters.Remove(customer);
                await _context.SaveChangesAsync();
            }
        }

        // Synchronous compatibility helpers (use GenericRepository methods)

        public IEnumerable<CustomerMaster> getAllCustomers()
        {
            return GetAll();
        }

        public CustomerMaster getCustomerByEmail(string email)
        {
            return Search(c => c.Email == email);
        }

        public CustomerMaster getCustomerByMobile(string mobileNo)
        {
            return Search(c => c.MobileNo == mobileNo);
        }

        public IEnumerable<CustomerMaster> findCustomersByName(string namePart)
        {
            return Find(c => (!string.IsNullOrEmpty(c.FirstName) && c.FirstName.Contains(namePart))
                          || (!string.IsNullOrEmpty(c.LastName) && c.LastName.Contains(namePart)));
        }

        public void addCustomer(CustomerMaster customer)
        {
            Add(customer);
        }

        public void updateCustomer(CustomerMaster customer)
        {
            Edit(customer);
        }

        public void removeCustomer(CustomerMaster customer)
        {
            Remove(customer);
        }
    }
}
