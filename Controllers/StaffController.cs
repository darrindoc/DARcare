using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DARcare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffRepository _staffRepository;
        public StaffController(IStaffRepository staffRepository)
        {
            _staffRepository = staffRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_staffRepository.GetAllStaff());
        }

        
        [HttpGet("{userName}")]
        public IActionResult GetByUserByUsername(string userName)
        {
            var user = _staffRepository.GetByUserName(userName);

            if (userName == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        /*
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