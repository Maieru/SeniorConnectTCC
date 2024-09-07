using Newtonsoft.Json;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class ConfigurationChangeRegisterService : IConfigurationChangeRegisterService
    {
        private readonly IStorageService _storageService;

        public ConfigurationChangeRegisterService(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public async Task RegisterConfigurationChangeRequest(int subscriptionId, string deviceName)
        {
            var configurationChangeRequest = new ConfigurationChangeRequest
            {
                SubscriptionId = subscriptionId,
                DeviceName = deviceName
            };

            var configurationChangeRequestJson = JsonConvert.SerializeObject(configurationChangeRequest);

            await _storageService.CreateEntryInQueue(configurationChangeRequestJson);
        }
    }
}
