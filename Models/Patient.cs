using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DARcare.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public DateTime dateOfBirth { get; set; }

        public string gender {  get; set; }    

        public Encounter? Encounter { get; set; }
    }
}