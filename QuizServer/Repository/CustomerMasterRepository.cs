using QuizServer.Models;

namespace QuizServer.Repository
{
    public class CustomerMasterRepository : GenericRepository<CustomerMaster>
    {
        public CustomerMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }
    }
}
