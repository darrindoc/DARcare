/*
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
    public class TreatmentRepository : BaseRepository
    {
        public TreatmentRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Users
        public List<Treatment> GetTreatmentsByEncounter()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.firstName, s.lastName, s.credentials, 
                        s.title, s.userName, s.userPassword, s.staffTypeId, s.departmentId,
                        st.name AS StaffTypeName, d.id, d.name AS departmentName
                        FROM Staff s
                        LEFT JOIN StaffType st on s.StaffTypeId = st.Id
                        LEFT JOIN Department d on s.departmentId = d.id";
                    List<Treatment> treatments = new List<Treatment>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        
                        Treatment user = new Treatment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            lastName = reader.GetString(reader.GetOrdinal("LastName")),
                            credentials = reader.GetString(reader.GetOrdinal("credentials")),
                            title = reader.GetString(reader.GetOrdinal("title")),
                            userName = reader.GetString(reader.GetOrdinal("userName")),
                            userPassword = reader.GetString(reader.GetOrdinal("userPassword")),
                            staffTypeId = reader.GetInt32(reader.GetOrdinal("staffTypeId")),
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                            StaffType = new StaffType()
                            {
                                id = DbUtils.GetInt(reader, "StaffTypeId"),
                                name = DbUtils.GetString(reader, "StaffTypeName"),
                            },
                            departmentName = reader.GetString(reader.GetOrdinal("departmentName")),
                        };
                        treatments.Add(user);
                    }

                    reader.Close();

                    return treatments;
                }
            }
        }
    }
} */