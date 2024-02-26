using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DARcare.Models
{
    public class Staff
    {
        public int Id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }
        public string? credentials { get; set; }
        public string title { get; set; }
        public string userName { get; set; }
        public string userPassword { get; set; }
        public int staffTypeId {  get; set; }
        public StaffType StaffType { get; set; }
    }
}