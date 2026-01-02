using QuizServer.Models;

namespace QuizServer.Repository
{
    public class SubjectExpertRepository : GenericRepository<SubExpert>
    {
        public SubjectExpertRepository(PerfectQuizAppDBContext context) : base(context)
        {

        }
    }
}
