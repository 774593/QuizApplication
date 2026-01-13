using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class EventRepository : GenericRepository<EventMaster>
    {
        public EventRepository(PerfectQuizAppDBContext context) : base(context)
        {

        }
        public async Task<IEnumerable<EventMaster>> getAllEventsAsync()
        {
            return await _context.EventMasters.ToListAsync();
        }

        public async Task<EventMaster?> getEventByIdAsync(int id)
        {
            return await _context.EventMasters.FirstOrDefaultAsync(s => s.EventId == id);
        }

        public async Task<EventMaster?> getEventByNameAsync(string name)
        {
            return await _context.EventMasters.FirstOrDefaultAsync(s => s.EventName == name);
        }

        public async Task addEventAsync(EventMaster subject)
        {
            await _context.EventMasters.AddAsync(subject);
            await _context.SaveChangesAsync();
        }

        public async Task updateEventAsync(EventMaster subject)
        {
            _context.EventMasters.Update(subject);
            await _context.SaveChangesAsync();
        }

        public async Task removeEventAsync(int id)
        {
            var subject = await _context.EventMasters.FindAsync(id);
            if (subject != null)
            {
                _context.EventMasters.Remove(subject);
                await _context.SaveChangesAsync();
            }
        }

        // Synchronous helpers (kept for compatibility with existing callers)

        public IEnumerable<EventMaster> getAllEvents()
        {
            return GetAll();
        }

        public EventMaster getEventById(int id)
        {
            return GetById(id);
        }

        public EventMaster getEventByName(string name)
        {
            return Search(s => s.EventName == name);
        }

        public void addEvent(EventMaster subject)
        {
            Add(subject);
        }

        public void updateEvent(EventMaster subject)
        {
            Edit(subject);
        }

        public void removeEvent(EventMaster subject)
        {
            Remove(subject);
        }
    }
}
