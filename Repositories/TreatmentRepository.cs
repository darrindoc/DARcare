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
    public class TreatmentRepository : BaseRepository, ITreatmentRepository
    {
        public TreatmentRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all treatments
        public List<Treatment> GetAllTreatments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, encounterId, procedureId, staffId, procedureTime, notes
                        FROM Treatments";
                    List<Treatment> treatments = new List<Treatment>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {

                        Treatment user = new Treatment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            encounterId = reader.GetInt32(reader.GetOrdinal("encounterId")),
                            procedureId = reader.GetInt32(reader.GetOrdinal("procedureId")),
                            staffId = reader.GetInt32(reader.GetOrdinal("staffId")),
                            procedureTime = reader.GetDateTime(reader.GetOrdinal("procedureTime")),
                            notes = reader.GetString(reader.GetOrdinal("notes")),
                        };
                        treatments.Add(user);
                    }

                    reader.Close();

                    return treatments;
                }
            }
        }

        public List<Treatment> GetTreatmentsByEncounter(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT t.id, t.encounterId, t.procedureId, t.staffId, t.procedureTime, t.notes,
                       p.id as procedureId, p.name as procedureName, p.code,
                       s.id, s.firstName, s.lastName, s.title
                FROM Treatments t
                LEFT JOIN Procedures p ON t.procedureId = p.id
                LEFT JOIN Staff s ON t.staffId = s.id
                WHERE t.encounterId = @encounterId";

                    DbUtils.AddParameter(cmd, "@encounterId", id);

                    List<Treatment> treatments = new List<Treatment>();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Treatment treatment = new Treatment()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                encounterId = reader.GetInt32(reader.GetOrdinal("encounterId")),
                                procedureId = reader.GetInt32(reader.GetOrdinal("procedureId")),
                                staffId = reader.GetInt32(reader.GetOrdinal("staffId")),
                                procedureTime = reader.GetDateTime(reader.GetOrdinal("procedureTime")),
                                notes = reader.GetString(reader.GetOrdinal("notes")),
                                Procedure = new Procedure()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("procedureId")),
                                    name = reader.GetString(reader.GetOrdinal("procedureName")),
                                    code = reader.GetString(reader.GetOrdinal("code")),
                                },
                                Staff = new Staff()
                                {
                                    firstName = reader.GetString(reader.GetOrdinal("firstName")),
                                    lastName = reader.GetString(reader.GetOrdinal("lastName")),
                                    title = reader.GetString(reader.GetOrdinal("title")),
                                }
                            };
                            treatments.Add(treatment);
                        }
                    }
                    return treatments;
                }
            }
        }

    }
} 