using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncounterController : ControllerBase
    {
        private readonly IEncounterRepository _encounterRepository;
        public EncounterController(IEncounterRepository encounterRepository)
        {
            _encounterRepository = encounterRepository;
        }

        //Get All Encounters
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_encounterRepository.GetAllEncounters());
        }


        //Get All Active Encounters
        [HttpGet("active")]
        public IActionResult GetAllActive()
        {
            return Ok(_encounterRepository.GetAllActiveEncounters());
        }

    }
}

/*
        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email },
                userProfile);
        }
        */