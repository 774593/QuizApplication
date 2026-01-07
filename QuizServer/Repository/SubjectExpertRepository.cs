using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class SubjectExpertRepository : GenericRepository<SubExpert>
    {
        public SubjectExpertRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }

        // Async: get all experts
        public async Task<IEnumerable<SubExpert>> getAllExpertsAsync()
        {
            return await _context.SubExperts.ToListAsync();
        }

        // Async: find expert by registration number
        public async Task<SubExpert?> getExpertByRegNoAsync(string regNo)
        {
            return await _context.SubExperts.FirstOrDefaultAsync(e => e.RegNo == regNo);
        }

        // Async: find expert by email
        public async Task<SubExpert?> getExpertByEmailAsync(string email)
        {
            return await _context.SubExperts.FirstOrDefaultAsync(e => e.Email == email);
        }

        // Async: search experts by expertise (partial match)
        public async Task<IEnumerable<SubExpert>> getExpertsByExpertiseAsync(string expertise)
        {
            if (string.IsNullOrWhiteSpace(expertise))
                return Array.Empty<SubExpert>();

            return await _context.SubExperts
                .Where(e => !string.IsNullOrEmpty(e.SubExperties) &&
                            EF.Functions.Like(e.SubExperties, $"%{expertise}%"))
                .ToListAsync();
        }

        // Async: add expert and persist
        public async Task addExpertAsync(SubExpert expert)
        {
            await _context.SubExperts.AddAsync(expert);
            await _context.SaveChangesAsync();
        }

        // Async: update expert and persist
        public async Task updateExpertAsync(SubExpert expert)
        {
            _context.SubExperts.Update(expert);
            await _context.SaveChangesAsync();
        }

        // Async: remove by registration number
        public async Task removeExpertAsync(string regNo)
        {
            var expert = await _context.SubExperts.FirstOrDefaultAsync(e => e.RegNo == regNo);
            if (expert != null)
            {
                _context.SubExperts.Remove(expert);
                await _context.SaveChangesAsync();
            }
        }

        // Async: authenticate by regno or email + password
        public async Task<SubExpert?> authenticateAsync(string regNoOrEmail, string pwd)
        {
            return await _context.SubExperts.FirstOrDefaultAsync(e =>
                (e.RegNo == regNoOrEmail) && e.Pwd == pwd);
        }

        // --- Synchronous compatibility helpers (if existing callers expect them) ---

        public IEnumerable<SubExpert> getAllExperts()
        {
            return GetAll();
        }

        public SubExpert getExpertByRegNo(string regNo)
        {
            return Search(e => e.RegNo == regNo);
        }

        public SubExpert getExpertByEmail(string email)
        {
            return Search(e => e.Email == email);
        }

        public IEnumerable<SubExpert> getExpertsByExpertise(string expertise)
        {
            return Find(e => !string.IsNullOrEmpty(e.SubExperties) && e.SubExperties.Contains(expertise));
        }

        public void addExpert(SubExpert expert)
        {
            Add(expert);
        }

        public void updateExpert(SubExpert expert)
        {
            Edit(expert);
        }

        public void removeExpert(SubExpert expert)
        {
            Remove(expert);
        }
    }
}
