using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IEncounterRepository
    {
        List<Encounter> GetAllEncounters();
        List<Encounter> GetAllActiveEncounters();
        Encounter GetById(int id);
        void Add(Encounter encounter);
        void Discharge(Encounter encounter);
    }
}