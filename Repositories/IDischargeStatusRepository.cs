using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IDischargeStatusRepository
    {
        List<DischargeStatus> GetAllDischargeStatuses();
    }
}