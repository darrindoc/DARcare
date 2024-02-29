using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DARcare.Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public int encounterId { get; set; }
        public int procedureId { get; set; }
        public int staffId { get; set; }
        public DateTime procedureTime { get; set; }
        public string notes { get; set; }
    }
}