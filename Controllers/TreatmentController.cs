using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;
using Microsoft.Extensions.Hosting;

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

        [HttpGet("{encounterId}")]
        public IActionResult GetTreatmentsByEncounter(int encounterId)
        {
            return Ok(_treatmentRepository.GetTreatmentsByEncounter(encounterId));
        }

        [HttpPost("add")]
        public IActionResult Post(Treatment treatment)
        {
            
            _treatmentRepository.Add(treatment);
            //return CreatedAtAction("Get", new { id = treatment.Id }, treatment);
            return Ok();
        }

    }
}