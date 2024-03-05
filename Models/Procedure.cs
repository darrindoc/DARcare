using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DARcare.Models
{
    public class Procedure
    {
        public int Id { get; set; }

        public string name { get; set; } 
        public string code { get; set; }
    }
}