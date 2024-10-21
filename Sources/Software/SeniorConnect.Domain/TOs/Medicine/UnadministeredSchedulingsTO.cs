using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class UnadministeredSchedulingsTO
    {
        public int SchedulingId { get; set; }
        public int MedicineId { get; set; }
        public string MedicineName { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public string DaysOfWeek { get; set; }
    }
}
