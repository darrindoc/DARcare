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
    public class PatientRepository : BaseRepository, IPatientRepository
    {
        public PatientRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Users
        public List<Patient> GetAllPatients()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, firstName, lastName, dateOfBirth, gender
                                        FROM Patient
                                        ORDER BY lastName";
                    List<Patient> users = new List<Patient>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Patient user = new Patient()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            lastName = reader.GetString(reader.GetOrdinal("LastName")),
                            dateOfBirth = reader.GetDateTime(reader.GetOrdinal("dateOfBirth")),
                            gender = reader.GetString(reader.GetOrdinal("gender")),
                        };
                        users.Add(user);
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        public Patient GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, firstName, lastName, dateOfBirth, gender
                                FROM Patient
                                WHERE id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    Patient patient = null;

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            patient = new Patient()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                firstName = reader.GetString(reader.GetOrdinal("firstName")),
                                lastName = reader.GetString(reader.GetOrdinal("lastName")),
                                dateOfBirth = reader.GetDateTime(reader.GetOrdinal("dateOfBirth")),
                                gender = reader.GetString(reader.GetOrdinal("gender")),
                            };
                        }
                    }

                    return patient;
                }
            }
        }

        //list of encounter information
        public List<Patient> GetEncounterHistory(int id)
        {
            List<Patient> patients = new List<Patient>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.firstName, p.lastName, p.dateOfBirth, p.gender,
                                e.Id as encounterId, e.patientId, e.admitTime, e.dischargeTime, e.dischargeStatusId, e.admitStatusId, e.encounterStatusId, e.departmentID, e.locationId
                                FROM Patient p
                                LEFT JOIN Encounters e on p.id = e.patientId
                                WHERE p.id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Patient patient = new Patient()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                firstName = reader.GetString(reader.GetOrdinal("firstName")),
                                lastName = reader.GetString(reader.GetOrdinal("lastName")),
                                dateOfBirth = reader.GetDateTime(reader.GetOrdinal("dateOfBirth")),
                                gender = reader.GetString(reader.GetOrdinal("gender")),
                                Encounter = reader.IsDBNull(reader.GetOrdinal("encounterId")) ? null : new Encounter()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("encounterId")),
                                    patientId = reader.GetInt32(reader.GetOrdinal("patientId")),
                                    admitTime = reader.IsDBNull(reader.GetOrdinal("admitTime")) ? (DateTime?)null : reader.GetDateTime(reader.GetOrdinal("admitTime")),
                                    dischargeTime = DbUtils.GetNullableDateTime(reader, "dischargeTime"),
                                    dischargeStatusId = reader.GetInt32(reader.GetOrdinal("dischargeStatusId")),
                                    admitStatusId = reader.GetInt32(reader.GetOrdinal("admitStatusId")),
                                    encounterStatusId = reader.GetInt32(reader.GetOrdinal("encounterStatusId")),
                                    departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                                }
                            };

                            patients.Add(patient);
                        }
                    }
                }
            }

            return patients;
        }


        /*
        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
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