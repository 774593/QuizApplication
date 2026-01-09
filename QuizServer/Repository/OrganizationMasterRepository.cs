using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class OrganizationMasterRepository : GenericRepository<OrganizationMaster>
    {
        public OrganizationMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }
        public async Task<int> GetMaxOrganizationIdAsync()
        {
            return await _context.OrganizationMasters
                                 .MaxAsync(o => (int?)o.OrganizationId) ?? 0;
        }
        // Async CRUD + queries

        public async Task<IEnumerable<OrganizationMaster>> getAllOrganizationsAsync()
        {
            return await _context.OrganizationMasters.OrderBy(o => o.OrganizationId).ToListAsync();
        }

        public async Task<OrganizationMaster?> getOrganizationByIdAsync(int id)
        {
            return await _context.OrganizationMasters.FirstOrDefaultAsync(o => o.OrganizationId == id);
        }

        public async Task<OrganizationMaster?> getOrganizationByRegNoAsync(string regNo)
        {
            if (string.IsNullOrWhiteSpace(regNo.ToString())) return null;
            return await _context.OrganizationMasters.FirstOrDefaultAsync(o => o.RegNo == regNo);
        }
        public async Task<OrganizationMaster?> getOrganizationByRegNoPwdAsync(string regNo,string pwd)
        {
            if (string.IsNullOrWhiteSpace(regNo.ToString())) return null;
            return await _context.OrganizationMasters.FirstOrDefaultAsync(o => o.RegNo == regNo && o.Pwd==pwd);
        }
        public async Task<OrganizationMaster?> getOrganizationByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name)) return null;
            return await _context.OrganizationMasters.FirstOrDefaultAsync(o => o.OrgName == name);
        }

        public async Task<IEnumerable<OrganizationMaster>> getOrganizationsByCityAsync(string city)
        {
            if (string.IsNullOrWhiteSpace(city)) return Array.Empty<OrganizationMaster>();
            return await _context.OrganizationMasters
                .Where(o => !string.IsNullOrEmpty(o.City) && o.City == city)
                .ToListAsync();
        }

        public async Task addOrganizationAsync(OrganizationMaster org)
        {
            await _context.OrganizationMasters.AddAsync(org);
            await _context.SaveChangesAsync();
        }

        public async Task updateOrganizationAsync(OrganizationMaster org)
        {
            _context.OrganizationMasters.Update(org);
            await _context.SaveChangesAsync();
        }

        public async Task removeOrganizationAsync(int id)
        {
            var org = await _context.OrganizationMasters.FindAsync(id);
            if (org != null)
            {
                _context.OrganizationMasters.Remove(org);
                await _context.SaveChangesAsync();
            }
        }

        // Synchronous compatibility helpers (use GenericRepository methods)

        public IEnumerable<OrganizationMaster> getAllOrganizations()
        {
            return GetAll();
        }

        public OrganizationMaster getOrganizationById(int id)
        {
            return GetById(id);
        }

        public OrganizationMaster getOrganizationByRegNo(string regNo)
        {
            return Search(o => o.RegNo == regNo);
        }

        public void addOrganization(OrganizationMaster org)
        {
            Add(org);
        }

        public void updateOrganization(OrganizationMaster org)
        {
            Edit(org);
        }

        public void removeOrganization(OrganizationMaster org)
        {
            Remove(org);
        }
    }
}
