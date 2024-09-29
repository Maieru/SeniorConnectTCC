using Newtonsoft.Json;
using SeniorConnect.Domain.TOs.Telemetry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Entities
{
    public class Telemetry
    {
        public int Id { get; set; }
        public int DeviceId { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
        public int Millis { get; set; }
        public string SensorDataJson { get; set; }
        public bool OpeningExpected { get; set; }
    }
}
