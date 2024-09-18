using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class DailyMedicineSchedulesTO
    {
        public DayOfWeek DayOfWeek { get; set; }
        public List<DailyMedicineScheduleTO> ScheduledMedicines { get;set; }
    }
}
