using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class MedicineAdhesionTO
    {
        public int MedicineId { get; set; }
        public string MedicineName { get; set; }
        public double Adhesion { get; set; }
        public double TotalSchedulings { get; set; }
        public List<MissedSchedulingTO> MissedSchedulings { get; set; }
    }
}
