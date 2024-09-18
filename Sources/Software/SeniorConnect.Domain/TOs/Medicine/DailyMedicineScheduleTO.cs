using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class DailyMedicineScheduleTO
    {
        public int MedicineId { get; set; }
        public string MedicineName { get; set; }
        public List<MedicineTimeTO> MedicineTimes { get; set; }
    }

    public class MedicineTimeTO
    {
        public int Hour { get; set; }
        public int Minute { get; set; }
    }
}
