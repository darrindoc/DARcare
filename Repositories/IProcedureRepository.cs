using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IProcedureRepository
    {
        List<Procedure> GetAllProcedures();
    }
}