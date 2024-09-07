using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Configuration
{
    public class MedicineConfigurationSchedule
    {
        [JsonProperty("number")]
        public int CompartimentNumber { get; set; }

        [JsonProperty("daysOfWeek")]
        public List<int> DaysOfWeek { get; set; }

        [JsonProperty("hour")]
        public int Hour { get; set; }

        [JsonProperty("minute")]
        public int Minute { get; set; }
    }
}
