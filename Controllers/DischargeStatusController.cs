using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DischargeStatusController : ControllerBase
    {
        private readonly IDischargeStatusRepository _dischargeStatusRepository;
        public DischargeStatusController(IDischargeStatusRepository dischargeStatusRepository)
        {
            _dischargeStatusRepository = dischargeStatusRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_dischargeStatusRepository.GetAllDischargeStatuses());
        }
    }
}
