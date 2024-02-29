using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IDepartmentRepository
    {
        List<Department> GetAllDepartments();
    }
}