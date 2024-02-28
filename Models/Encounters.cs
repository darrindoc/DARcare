using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DARcare.Models
{
    public class Encounter
    {
        public int Id { get; set; }
        public int patientId { get; set; }
        public DateTime admitTime { get; set; }
        public DateTime dischargeTime { get; set; }
        public int dischargeStatusId { get; set; }
        public int admitStatusId { get; set; }
        public int encounterStatusId { get; set; }
        public int departmentId { get; set; }
    }
}