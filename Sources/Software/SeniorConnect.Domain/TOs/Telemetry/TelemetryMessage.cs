using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Telemetry
{
    public class TelemetryMessage
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("year")]
        public int Year { get; set; }

        [JsonPropertyName("month")]
        public int Month { get; set; }

        [JsonPropertyName("day")]
        public int Day { get; set; }

        [JsonPropertyName("hour")]
        public int Hour { get; set; }

        [JsonPropertyName("minute")]
        public int Minute { get; set; }

        [JsonPropertyName("second")]
        public int Second { get; set; }

        [JsonPropertyName("millis")]
        public int Millis { get; set; }

        [JsonPropertyName("sensorData")]
        public List<SensorData> SensorData { get; set; }

        public DateTime GetDateTime() => new DateTime(Year, Month, Day, Hour, Minute, Second, Millis);

        public DayOfWeek GetDayOfWeek() => GetDateTime().DayOfWeek;
    }

    public class SensorData
    {
        [JsonPropertyName("number")]
        public int Number { get; set; }

        [JsonPropertyName("state")]
        public bool State { get; set; }
    }
}
