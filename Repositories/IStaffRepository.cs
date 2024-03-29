﻿using Azure.Identity;
using DARcare.Models;

namespace DARcare.Repositories
{
    public interface IStaffRepository
    {
        List<Staff> GetAllStaff();
        Staff GetByUserName(string username);
        public void UpdateDepartment(int id, int departmentId);
        public void Add(Staff staff);
        public void Delete(int id);
        public void Update(Staff staff);
    }
}