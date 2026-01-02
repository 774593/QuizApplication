using QuizServer.Models;

namespace QuizServer.Repository
{
    public class SubjectMasterRepository : GenericRepository<SubjectMaster>
    {
        public SubjectMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }
    }
}
