using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Configuration
{
    public class ConfigurationMessage
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("medicationSchedule")]
        public List<MedicineConfigurationSchedule> MedicinesSchedule { get; set; }
    }
}
