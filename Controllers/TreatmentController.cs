using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly ITreatmentRepository _treatmentRepository;
        public TreatmentController(ITreatmentRepository treatmentRepository)
        {
            _treatmentRepository = treatmentRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_treatmentRepository.GetAllTreatments());
        }

        [HttpGet("encounterId")]
        public IActionResult GetTreatmentsByEncounter(int id)
        {
            return Ok(_treatmentRepository.GetTreatmentsByEncounter(id));
        }
    }
}