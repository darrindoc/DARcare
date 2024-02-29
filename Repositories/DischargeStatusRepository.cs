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
    public class DischargeStatusRepository : BaseRepository, IDischargeStatusRepository
    {
        public DischargeStatusRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Discharge Statuses
        public List<DischargeStatus> GetAllDischargeStatuses()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name
                                        FROM DischargeStatus";
                    List<DischargeStatus> dischargeStatuses = new List<DischargeStatus>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        DischargeStatus dischargeStatus = new DischargeStatus()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            name = reader.GetString(reader.GetOrdinal("name")),
                        };
                        dischargeStatuses.Add(dischargeStatus);
                    }

                    reader.Close();

                    return dischargeStatuses;
                }
            }
        }
    }
}
