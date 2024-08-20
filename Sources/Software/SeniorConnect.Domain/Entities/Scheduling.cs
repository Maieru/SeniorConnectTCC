using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Entities
{
    public class Scheduling
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public int MedicineId { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public string DaysOfWeek { get; set; }
    }
}
