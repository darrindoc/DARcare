using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IPatientRepository
    {
        List<Patient> GetAllPatients();
        Patient GetById(int id);
        List<Patient> GetEncounterHistory(int id);
    }
}