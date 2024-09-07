using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Configuration
{
    public class ConfigurationChangeRequest
    {
        public int SubscriptionId { get; set; }
        public string DeviceName { get; set; }
    }
}
