using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffTypeController : ControllerBase
    {
        private readonly IStaffTypeRepository _staffTypeRepository;
        public StaffTypeController(IStaffTypeRepository staffTypeRepository)
        {
            _staffTypeRepository = staffTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_staffTypeRepository.GetAllStaffTypes());
        }
    }
}
