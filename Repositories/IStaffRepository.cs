using Azure.Identity;
using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IStaffRepository
    {
        List<Staff> GetAllStaff();
        Staff GetByUserName(string username);
    }
}