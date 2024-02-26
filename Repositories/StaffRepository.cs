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
    public class StaffRepository : BaseRepository, IStaffRepository
    {
        public StaffRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Users
        public List<Staff> GetAllStaff()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT *
                                        FROM Staff";
                    List<Staff> users = new List<Staff>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Staff user = new Staff()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            lastName = reader.GetString(reader.GetOrdinal("LastName")),
                            credentials = reader.GetString(reader.GetOrdinal("credentials")),
                            title = reader.GetString(reader.GetOrdinal("title")),
                            userName = reader.GetString(reader.GetOrdinal("userName")),
                            userPassword = reader.GetString(reader.GetOrdinal("userPassword")),
                            staffTypeId = reader.GetInt32(reader.GetOrdinal("staffTypeId")),
                        };
                        users.Add(user);
                    }

                    reader.Close();

                    return users;
                }
            }
        }

       

        public Staff GetByUserName(string username)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.firstName, s.lastName, s.credentials, 
                               s.title, s.userName, s.userPassword, s.staffTypeId,
                               st.name AS StaffTypeName
                          FROM Staff s
                               LEFT JOIN StaffType st on s.StaffTypeId = st.Id
                         WHERE s.userName = @userName";

                    DbUtils.AddParameter(cmd, "@userName", username);

                    Staff staff = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        staff = new Staff()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            lastName = reader.GetString(reader.GetOrdinal("LastName")),
                            credentials = reader.GetString(reader.GetOrdinal("credentials")),
                            title = reader.GetString(reader.GetOrdinal("title")),
                            userName = reader.GetString(reader.GetOrdinal("userName")),
                            userPassword = reader.GetString(reader.GetOrdinal("userPassword")),
                            staffTypeId = reader.GetInt32(reader.GetOrdinal("staffTypeId")),
                            StaffType = new StaffType()
                            {
                                id = DbUtils.GetInt(reader, "StaffTypeId"),
                                name = DbUtils.GetString(reader, "StaffTypeName"),
                            }
                        };
                    }
                    reader.Close();
                    return staff;
                }
            }
        }
        /*
                  public Staff GetById(int id)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            SELECT s.Id, s.firstName, s.lastName, s.credentials, 
                                   s.title, s.userName, s.userPassword, s.staffTypeId,
                                   st.name AS StaffTypeName
                              FROM Staff s
                                   LEFT JOIN StaffType st on s.StaffTypeId = st.Id
                             WHERE s.Id = @id";


                        DbUtils.AddParameter(cmd, "@id", id);
                        Staff staff = null;

                        var reader = cmd.ExecuteReader();
                        if (reader.Read())
                        {
                            staff = new Staff()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                lastName = reader.GetString(reader.GetOrdinal("LastName")),
                                credentials = reader.GetString(reader.GetOrdinal("credentials")),
                                title = reader.GetString(reader.GetOrdinal("title")),
                                userName = reader.GetString(reader.GetOrdinal("userName")),
                                userPassword = reader.GetString(reader.GetOrdinal("userPassword")),
                                staffTypeId = reader.GetInt32(reader.GetOrdinal("staffTypeId")),
                                StaffType = new StaffType()
                                {
                                    id = DbUtils.GetInt(reader, "StaffTypeId"),
                                    name = DbUtils.GetString(reader, "StaffTypeName"),
                                }
                            };
                        }
                        reader.Close();

                        return staff;
                    }
                }
            }
             
            public void Add(UserProfile userProfile)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO UserProfile (FirstName, LastName, DisplayName, 
                                                                     Email, CreateDateTime, ImageLocation, UserTypeId)
                                            OUTPUT INSERTED.ID
                                            VALUES (@FirstName, @LastName, @DisplayName, 
                                                    @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
                        DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                        DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                        DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                        DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                        DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                        DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                        DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                        userProfile.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }

            */

    }
}