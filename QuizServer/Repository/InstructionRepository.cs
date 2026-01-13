using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class InstructionRepository : GenericRepository<Instruction>
    {
        public InstructionRepository(PerfectQuizAppDBContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Instruction>> getAllInstructionsAsync()
        {
            return await _context.Instructions.ToListAsync();
        }

        public async Task<Instruction?> getInstructionByIdAsync(int id)
        {
            return await _context.Instructions.FirstOrDefaultAsync(s => s.InstructionId == id);
        }

        public async Task<Instruction?> getInstructionByNameAsync(string name)
        {
            return await _context.Instructions.FirstOrDefaultAsync(s => s.Instruction1 == name);
        }

        public async Task addInstructionAsync(Instruction subject)
        {
            await _context.Instructions.AddAsync(subject);
            await _context.SaveChangesAsync();
        }

        public async Task updateInstructionAsync(Instruction subject)
        {
            _context.Instructions.Update(subject);
            await _context.SaveChangesAsync();
        }

        public async Task removeInstructionAsync(int id)
        {
            var subject = await _context.Instructions.FindAsync(id);
            if (subject != null)
            {
                _context.Instructions.Remove(subject);
                await _context.SaveChangesAsync();
            }
        }

        // Synchronous helpers (kept for compatibility with existing callers)

        public IEnumerable<Instruction> getAllInstructions()
        {
            return GetAll();
        }

        public Instruction getInstructionById(int id)
        {
            return GetById(id);
        }

        public Instruction getInstructionByName(string name)
        {
            return Search(s => s.Instruction1 == name);
        }

        public void addInstruction(Instruction subject)
        {
            Add(subject);
        }

        public void updateInstruction(Instruction subject)
        {
            Edit(subject);
        }

        public void removeInstruction(Instruction subject)
        {
            Remove(subject);
        }
    }
}

