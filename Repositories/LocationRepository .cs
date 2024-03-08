using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using DARcare.Models;
using System.Xml.Linq;
using DARcare.Repositories;
using DARcare.Utils;

namespace DARcare.Repositories
{
    public class DepartmentRepository : BaseRepository, IDepartmentRepository
    {
        public DepartmentRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Departments
        public List<Department> GetAllDepartments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name
                                        FROM Department";
                    List<Department> departments = new List<Department>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Department department = new Department()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            name = reader.GetString(reader.GetOrdinal("name")),
                        };
                        departments.Add(department);
                    }

                    reader.Close();

                    return departments;
                }
            }
        }
    }
}
