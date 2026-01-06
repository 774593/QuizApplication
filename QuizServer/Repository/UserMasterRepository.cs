using Microsoft.EntityFrameworkCore;
using QuizServer.Models;

namespace QuizServer.Repository
{
    public class UserMasterRepository : GenericRepository<UserMaster>
    {
        public UserMasterRepository(PerfectQuizAppDBContext context) : base(context)
        {

        }

        // Async: get all users
        public async Task<IEnumerable<UserMaster>> getAllUsersAsync()
        {
            return await _context.UserMasters.ToListAsync();
        }

        // Async: update login time and persist
        public async Task updateLoginDetailsAsync(string uname, DateTime loginTime)
        {
            var user = await _context.UserMasters.FirstOrDefaultAsync(x => x.UserName == uname);
            if (user != null)
            {
                user.LogIn = loginTime;
                _context.UserMasters.Update(user);
                await _context.SaveChangesAsync();
            }
        }

        // Async: add logout time and persist
        public async Task addLogoutDetailsAsync(string uname, DateTime logoutTime)
        {
            var user = await _context.UserMasters.FirstOrDefaultAsync(x => x.UserName == uname);
            if (user != null)
            {
                user.LogOut = logoutTime;
                _context.UserMasters.Update(user);
                await _context.SaveChangesAsync();
            }
        }

        // Async: find user by username
        public async Task<UserMaster?> getUserByNameAsync(string uname)
        {
            return await _context.UserMasters.FirstOrDefaultAsync(x => x.UserName == uname);
        }

        // Async: add user and persist
        public async Task addUserAsync(UserMaster user)
        {
            await _context.UserMasters.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        // Async: update user and persist
        public async Task updateUserAsync(UserMaster user)
        {
            _context.UserMasters.Update(user);
            await _context.SaveChangesAsync();
        }

        // Async: login (username + password)
        public async Task<UserMaster?> memberLoginAsync(string uname, string pwd)
        {
            return await _context.UserMasters.FirstOrDefaultAsync(x => x.UserName == uname && x.Password == pwd);
        }

        // --- Keep existing synchronous helpers if you still need them ---
        public IEnumerable<UserMaster> getAllUsers()
        {
            return GetAll();
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
