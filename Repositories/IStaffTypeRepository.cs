using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IStaffTypeRepository
    {
        List<StaffType> GetAllStaffTypes();
    }
}