using DARcare.Models;

namespace DARcare.Repositories
{
    public interface ITreatmentRepository
    {
        List<Treatment> GetAllTreatments();
        List<Treatment> GetTreatmentsByEncounter(int id);
        void Add(Treatment treatment);
    }
}