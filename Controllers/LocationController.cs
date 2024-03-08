using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;
        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_locationRepository.GetAllLocations());
        }
    }
}
