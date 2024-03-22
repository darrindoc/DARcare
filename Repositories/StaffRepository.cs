using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using DARcare.Models;
using System.Xml.Linq;
using DARcare.Repositories;
using DARcare.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

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
                    cmd.CommandText = @"
                        SELECT s.Id, s.firstName, s.lastName, s.credentials, 
                        s.title, s.userName, s.userPassword, s.staffTypeId, s.departmentId,
                        st.name AS StaffTypeName, d.id, d.name AS departmentName
                        FROM Staff s
                        LEFT JOIN StaffType st on s.StaffTypeId = st.Id
                        LEFT JOIN Department d on s.departmentId = d.id
                        ORDER BY s.lastName";
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
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                            StaffType = new StaffType()
                            {
                                id = DbUtils.GetInt(reader, "StaffTypeId"),
                                name = DbUtils.GetString(reader, "StaffTypeName"),
                            },
                            departmentName = reader.GetString(reader.GetOrdinal("departmentName")),
                        };
                        users.Add(user);
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        //Get user by username
        public Staff GetByUserName(string username)
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
                        LEFT JOIN Department d on s.departmentId = d.id
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
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                            StaffType = new StaffType()
                            {
                                id = DbUtils.GetInt(reader, "StaffTypeId"),
                                name = DbUtils.GetString(reader, "StaffTypeName"),
                            },
                            departmentName = reader.GetString(reader.GetOrdinal("departmentName")),
                        };
                    }
                    reader.Close();
                    return staff;
                }
            }
        }

        //Change staff departmentId, which is used for filtering available patients in Active Patient Table
        public void UpdateDepartment(int userId, int departmentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Staff 
                                        SET departmentId = @DepartmentId 
                                        WHERE id = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@DepartmentId", departmentId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Add(Staff staff)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Staff (firstName, lastName, credentials, title, userName, userPassword, staffTypeId, departmentId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firstName, @lastName, @credentials, @title, @userName, @userPassword, @staffTypeId, 0)";
                    DbUtils.AddParameter(cmd, "@firstName", staff.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", staff.lastName);
                    DbUtils.AddParameter(cmd, "@credentials", staff.credentials);
                    DbUtils.AddParameter(cmd, "@title", staff.title);
                    DbUtils.AddParameter(cmd, "@userName", staff.userName);
                    DbUtils.AddParameter(cmd, "@userPassword", staff.userPassword);
                    DbUtils.AddParameter(cmd, "@staffTypeId", staff.staffTypeId);

            staff.Id = Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Staff
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Staff staff)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Staff
                           SET firstName = @firstName,
                               lastName = @lastName,
                               credentials = @credentials,
                               title = @title,
                               userName = @userName,
                               userPassword = @userPassword,
                               staffTypeId = @staffTypeId,
                               departmentId = @departmentId

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", staff.Id);
                    DbUtils.AddParameter(cmd, "@firstName", staff.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", staff.lastName);
                    DbUtils.AddParameter(cmd, "@credentials", staff.credentials);
                    DbUtils.AddParameter(cmd, "@title", staff.title);
                    DbUtils.AddParameter(cmd, "@userName", staff.userName);
                    DbUtils.AddParameter(cmd, "@userPassword", staff.userPassword);
                    DbUtils.AddParameter(cmd, "@staffTypeId", staff.staffTypeId);
                    DbUtils.AddParameter(cmd, "@departmentId", staff.departmentId);

                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
}
