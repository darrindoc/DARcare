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
    public class StaffTypeRepository : BaseRepository, IStaffTypeRepository
    {
        public StaffTypeRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Staff Types
        public List<StaffType> GetAllStaffTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name
                                        FROM StaffType";
                    List<StaffType> staffTypes = new List<StaffType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        StaffType staffType = new StaffType()
                        {
                            id = reader.GetInt32(reader.GetOrdinal("Id")),
                            name = reader.GetString(reader.GetOrdinal("Name")),
                        };
                        staffTypes.Add(staffType);
                    }

                    reader.Close();

                    return staffTypes;
                }
            }
        }
    }
}
