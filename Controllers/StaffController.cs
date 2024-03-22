using Microsoft.AspNetCore.Mvc;
using DARcare.Models;
using DARcare.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

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

        [HttpPost("department")]
        public IActionResult UpdateDepartment(int userId, int departmentId)
        {
            _staffRepository.UpdateDepartment(userId, departmentId);
            return Ok();
        }

        [HttpPost("add")]
        public IActionResult Post(Staff staff)
        {
            _staffRepository.Add(staff);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _staffRepository.Delete(id);
                return NoContent();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("SQL Exception occurred: " + ex.Message);
                return StatusCode(500, "An error occurred while deleting the post.");
            }
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Staff staff)
        {
            if (id != staff.Id)
            {
                return BadRequest();
            }

            _staffRepository.Update(staff);
            return NoContent();
        }


    }
}