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
        public DateTime Creation { get; set; }
        public DateTime LastChange { get; set; }
        public DateTime? LastAdministration { get; set; }

        public List<DayOfWeek> DaysOfWeekList
        {
            get
            {
                if (DaysOfWeek == null)
                    return new List<DayOfWeek>();

                return DaysOfWeek.Split(',').Select(d => (DayOfWeek)Convert.ToInt32(d)).ToList();
            }
        }
    }
}
