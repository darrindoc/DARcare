using DARcare.Models;

namespace DARcare.Repositories
{
    public interface ILocationRepository
    {
        List<Location> GetAllLocations();
    }
}