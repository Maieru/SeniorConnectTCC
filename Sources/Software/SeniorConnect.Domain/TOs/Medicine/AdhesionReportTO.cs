using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class AdhesionReportTO
    {
        public double TotalAdhesion { get; set; }
        public double TotalSchedulings { get; set; }
        public double MissedDosesPercentage { get; set; }
        public List<MedicineAdhesionTO> MedicinesAdhesion { get; set; }
    }
}
