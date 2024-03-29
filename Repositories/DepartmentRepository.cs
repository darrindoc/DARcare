﻿using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using DARcare.Models;
using System.Xml.Linq;
using DARcare.Repositories;
using DARcare.Utils;

namespace DARcare.Repositories
{
    public class LocationRepository : BaseRepository, ILocationRepository
    {
        public LocationRepository(IConfiguration configuration) : base(configuration) { }


        //GetAll() Lists all Departments
        public List<Location> GetAllLocations()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name, departmentId, room
                                        FROM Location
                                        ORDER BY name";
                    List<Location> locations = new List<Location>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Location location = new Location()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            name = reader.GetString(reader.GetOrdinal("name")),
                            departmentId = reader.GetInt32(reader.GetOrdinal("departmentId")),
                            room = reader.GetInt32(reader.GetOrdinal("room")),
                        };
                        locations.Add(location);
                    }

                    reader.Close();

                    return locations;
                }
            }
        }
    }
}
