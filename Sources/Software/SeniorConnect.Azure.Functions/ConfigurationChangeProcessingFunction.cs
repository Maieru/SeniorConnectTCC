using System;
using Azure.Storage.Queues.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.Configuration;

namespace SeniorConnect.Azure.Functions
{
    public class ConfigurationChangeProcessingFunction
    {
        private readonly LogService _logger;
        private readonly IConfigurationChangeService _configurationChangeService;
        
        public ConfigurationChangeProcessingFunction(LogService logService, IConfigurationChangeService configurationChangeService, IMemoryCache cache)
        {
            _logger = logService;
            _configurationChangeService = configurationChangeService;
        }

        [Function(nameof(ConfigurationChangeProcessingFunction))]
        public async Task Run([QueueTrigger("configurationchangequeue")] QueueMessage message)
        {
            try
            {
                if (message == null || message.Body == null)
                {
                    await _logger.LogInformation("Queue triggered with empty message.");
                    return;
                }

                var content = message.Body.ToString();
                var configurationChangeRequest = JsonConvert.DeserializeObject<ConfigurationChangeRequest>(content);

                if (configurationChangeRequest == null)
                {
                    await _logger.LogInformation($"Failed to deserialize message. Message body: {content}");
                    return;
                }

                await _configurationChangeService.ProcessConfigurationChangeRequest(configurationChangeRequest);
            }
            catch (Exception ex)
            {
                await _logger.LogException(ex, message);
                throw;
            }
        }
    }
}
