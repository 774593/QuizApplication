using QuizServer.Models;

namespace QuizServer.Repository
{
    public class OrganizationMasterRepository : GenericRepository<OrganizationMaster>
    {
        public OrganizationMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {
        }
    }
}
