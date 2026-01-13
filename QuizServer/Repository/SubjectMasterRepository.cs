using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class SubjectMasterRepository : GenericRepository<SubjectMaster>
    {
        public SubjectMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }
                // Async methods

        public async Task<IEnumerable<SubjectMaster>> getAllSubjectsAsync()
        {
            return await _context.SubjectMasters.ToListAsync();
        }

        public async Task<SubjectMaster?> getSubjectByIdAsync(int id)
        {
            return await _context.SubjectMasters.FirstOrDefaultAsync(s => s.SubId == id);
        }

        public async Task<SubjectMaster?> getSubjectByNameAsync(string name)
        {
            return await _context.SubjectMasters.FirstOrDefaultAsync(s => s.SubName == name);
        }

        public async Task addSubjectAsync(SubjectMaster subject)
        {
            await _context.SubjectMasters.AddAsync(subject);
            await _context.SaveChangesAsync();
        }

        public async Task updateSubjectAsync(SubjectMaster subject)
        {
            _context.SubjectMasters.Update(subject);
            await _context.SaveChangesAsync();
        }

        public async Task removeSubjectAsync(int id)
        {
            var subject = await _context.SubjectMasters.FindAsync(id);
            if (subject != null)
            {
                _context.SubjectMasters.Remove(subject);
                await _context.SaveChangesAsync();
            }
        }

        // Synchronous helpers (kept for compatibility with existing callers)

        public IEnumerable<SubjectMaster> getAllSubjects()
        {
            return GetAll();
        }

        public SubjectMaster getSubjectById(int id)
        {
            return GetById(id);
        }

        public SubjectMaster getSubjectByName(string name)
        {
            return Search(s => s.SubName == name);
        }

        public void addSubject(SubjectMaster subject)
        {
            Add(subject);
        }

        public void updateSubject(SubjectMaster subject)
        {
            Edit(subject);
        }

        public void removeSubject(SubjectMaster subject)
        {
            Remove(subject);
        }
    }
}
