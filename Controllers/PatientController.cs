﻿using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;
        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_patientRepository.GetAllPatients());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_patientRepository.GetById(id));
        }

        [HttpGet("/api/Patient/History/{id}")]
        public IActionResult Get(int id)
        {
            var user = _patientRepository.GetEncounterHistory(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("add")]
        public IActionResult Post(Patient patient)
        {
            _patientRepository.Add(patient);
            return Ok();
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
    }


}