using QuizServer.Models;

namespace QuizServer.Repository
{
    public class UserMasterRepository : GenericRepository<UserMaster>
    {
        public UserMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {

        }
        public void updateLoginDetails(string uname, DateTime loginTime)
        {
            var user = Search(x => x.UserName == uname);
            if (user != null)
            {
                user.LogIn = loginTime;
                Edit(user);
            }
        }
        public void addLogoutDetails(string uname, DateTime logoutTime)
        {
            var user = Search(x => x.UserName == uname);
            if (user != null)
            {
                user.LogOut = logoutTime;
                Edit(user);
            }
        }
        public UserMaster getUserByName(string uname)
        {
            return Search(x => x.UserName == uname);
        }   
        public void addUser(UserMaster user)
        {
            Add(user);
        }

        public void updateUser(UserMaster user)
        {
            Edit(user);
        }
        public UserMaster memberLogin(string uname, string pwd)
        {
            return Search(x => x.UserName == uname && x.Password == pwd);
        }

    }
}
