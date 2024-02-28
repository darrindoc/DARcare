using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IEncounterRepository
    {
        List<Encounter> GetAllEncounters();
    }
}