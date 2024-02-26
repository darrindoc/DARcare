using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IPatientRepository
    {
        List<Patient> GetAllPatients();
    }
}