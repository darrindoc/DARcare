using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DARcare.Models
{
    public class Location
    {
        public int Id { get; set; }

        public string name { get; set; }  
        public int departmentId { get; set; }
        public int room { get; set; }
    }
}