using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class MissedSchedulingTO
    {
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int DayOfWeek { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
    }
}
