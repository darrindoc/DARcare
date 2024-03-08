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
    public class EncounterRepository : BaseRepository, IEncounterRepository
    {
        public EncounterRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Encounters
        public List<Encounter> GetAllEncounters()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, patientId, admitTime, dischargeTime, dischargeStatusId, admitStatusId, encounterStatusId, departmentId
                                        FROM Encounters";
                    List<Encounter> encounters = new List<Encounter>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Encounter encounter = new Encounter()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            patientId = reader.GetInt32(reader.GetOrdinal("patientId")),
                            admitTime = reader.GetDateTime(reader.GetOrdinal("admitTime")),
                            dischargeTime = DbUtils.GetNullableDateTime(reader, "dischargeTime"),
                            dischargeStatusId = reader.GetInt32(reader.GetOrdinal("dischargeStatusId")),
                            admitStatusId = reader.GetInt32(reader.GetOrdinal("admitStatusId")),
                            encounterStatusId = reader.GetInt32(reader.GetOrdinal("encounterStatusId")),
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                        };
                        encounters.Add(encounter);
                    }

                    reader.Close();

                    return encounters;
                }
            }
        }

        
        //GetAll() Lists all Active Encounters
        public List<Encounter> GetAllActiveEncounters()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        e.id, e.patientId, e.admitTime, e.dischargeTime, e.dischargeStatusId, e.admitStatusId, e.encounterStatusId, e.departmentId, e.locationId,
                                        p.firstName,p.lastName,p.dateOfBirth,p.gender,
                                        l.name, l.room
                                        FROM Encounters e
                                        JOIN Patient p ON e.patientId = p.id
                                        JOIN Location l on e.locationId = l.id
                                        WHERE e.dischargeTime IS NULL
                                        ORDER BY l.room;";
                    List<Encounter> encounters = new List<Encounter>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Encounter encounter = new Encounter()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            patientId = reader.GetInt32(reader.GetOrdinal("patientId")),
                            admitTime = reader.GetDateTime(reader.GetOrdinal("admitTime")),
                            dischargeTime = DbUtils.GetNullableDateTime(reader, "dischargeTime"),
                            dischargeStatusId = reader.GetInt32(reader.GetOrdinal("dischargeStatusId")),
                            admitStatusId = reader.GetInt32(reader.GetOrdinal("admitStatusId")),
                            encounterStatusId = reader.GetInt32(reader.GetOrdinal("encounterStatusId")),
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                            locationId = reader.GetInt32(reader.GetOrdinal("locationId")),
                            Patient = new Patient()
                            {
                                firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                lastName = reader.GetString(reader.GetOrdinal("LastName")),
                                dateOfBirth = reader.GetDateTime(reader.GetOrdinal("dateOfBirth")),
                                gender = reader.GetString(reader.GetOrdinal("gender")),
                            },
                            Location = new Location() 
                            {
                                name = reader.GetString(reader.GetOrdinal("name")),
                                room = reader.GetInt32(reader.GetOrdinal("room")),
                            }
                        };
                        encounters.Add(encounter);
                    }

                    reader.Close();

                    return encounters;
                }
            }
        }

        public Encounter GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT e.id, e.patientId, e.admitTime, e.dischargeTime, e.dischargeStatusId, e.admitStatusId, e.encounterStatusId, e.departmentId, e.locationId,
                                        p.id, p.firstName, p.lastName, p.dateOfBirth, p.gender,
                                        l.id, l.name, l.departmentId, l.room
                                        FROM Encounters e
                                        LEFT JOIN Patient p on e.patientId = p.id
                                        LEFT JOIN Location l on e.locationId = l.id
                                        WHERE e.Id = @id";


                    DbUtils.AddParameter(cmd, "@id", id);
                    Encounter encounter = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        encounter = new Encounter()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            patientId = reader.GetInt32(reader.GetOrdinal("patientId")),
                            admitTime = reader.GetDateTime(reader.GetOrdinal("admitTime")),
                            dischargeTime = DbUtils.GetNullableDateTime(reader, "dischargeTime"),
                            dischargeStatusId = reader.GetInt32(reader.GetOrdinal("dischargeStatusId")),
                            admitStatusId = reader.GetInt32(reader.GetOrdinal("admitStatusId")),
                            encounterStatusId = reader.GetInt32(reader.GetOrdinal("encounterStatusId")),
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                            locationId = reader.GetInt32(reader.GetOrdinal("locationId")),
                            Patient = new Patient()
                            {
                                firstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                lastName = reader.GetString(reader.GetOrdinal("LastName")),
                                dateOfBirth = reader.GetDateTime(reader.GetOrdinal("dateOfBirth")),
                                gender = reader.GetString(reader.GetOrdinal("gender"))
                            },
                            Location = new Location()
                            {
                                name = reader.GetString(reader.GetOrdinal("name")),
                                room = reader.GetInt32(reader.GetOrdinal("room")),
                            }
                        };
                    }
                    reader.Close();

                    return encounter;
                }
            }
        }

        public void Add(Encounter encounter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Encounters (patientId, admitTime, dischargeTime, dischargeStatusId, admitStatusId, encounterStatusId, departmentID, locationId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@patientId, @admitTime, @dischargeTime, @dischargeStatusId, @admitStatusId, @encounterStatusId, @departmentID, @locationId)";
                    DbUtils.AddParameter(cmd, "@patientId", encounter.patientId);
                    DbUtils.AddParameter(cmd, "@admitTime", encounter.admitTime);
                    DbUtils.AddParameter(cmd, "@dischargeTime", encounter.dischargeTime);
                    DbUtils.AddParameter(cmd, "@dischargeStatusId", encounter.dischargeStatusId);
                    DbUtils.AddParameter(cmd, "@admitStatusId", encounter.admitStatusId);
                    DbUtils.AddParameter(cmd, "@encounterStatusId", encounter.encounterStatusId);
                    DbUtils.AddParameter(cmd, "@departmentID", encounter.departmentId);
                    DbUtils.AddParameter(cmd, "@locationId", encounter.locationId);

                    encounter.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


    }
}

/*
        public UserProfile GetById(int id)
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
                         WHERE up.Id = @id";


                    DbUtils.AddParameter(cmd, "@id", id);
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