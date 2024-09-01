using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Telemetry
{
    public class IoTHubMessage
    {
        public DateTime EnqueuedTimeUtc { get; set; }
        public Systemproperties SystemProperties { get; set; }
        public string Body { get; set; }
    }

    public class Systemproperties
    {
        [JsonPropertyName("connectionDeviceId")]
        public string ConnectionDeviceId { get; set; }

        [JsonPropertyName("connectionAuthMethod")]
        public string ConnectionAuthMethod { get; set; }

        [JsonPropertyName("connectionDeviceGenerationId")]
        public string ConnectionDeviceGenerationId { get; set; }

        [JsonPropertyName("contentType")]
        public string ContentType { get; set; }

        [JsonPropertyName("contentEncoding")]
        public string ContentEncoding { get; set; }

        [JsonPropertyName("enqueuedTime")]
        public DateTime EnqueuedTime { get; set; }
    }
}
