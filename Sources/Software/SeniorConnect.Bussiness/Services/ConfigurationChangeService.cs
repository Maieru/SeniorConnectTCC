using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class ConfigurationChangeService : IConfigurationChangeService
    {
        private readonly SubscriptionService _subscriptionService;
        private readonly DeviceService _deviceService;
        private readonly LogService _logService;
        private readonly MedicineService _medicineService;
        private readonly SchedulingService _schedulingService;
        private readonly IIotHubMessageService _iotHubMessageService;
        private readonly IMemoryCache _memoryCache;

        public ConfigurationChangeService(SubscriptionService subscriptionService, DeviceService deviceService, LogService logService,
            MedicineService medicineService, SchedulingService schedulingService, IIotHubMessageService ioTHubMessageService, IMemoryCache memoryCache)
        {
            _subscriptionService = subscriptionService;
            _deviceService = deviceService;
            _logService = logService;
            _medicineService = medicineService;
            _schedulingService = schedulingService;
            _iotHubMessageService = ioTHubMessageService;
        }

        public async Task ProcessConfigurationChangeRequest(ConfigurationChangeRequest configurationChangeRequest)
        {
            var subscription = await _subscriptionService.GetSubscriptionById(configurationChangeRequest.SubscriptionId);

            if (subscription == null)
            {
                await _logService.LogInformation($"Subscription with id {configurationChangeRequest.SubscriptionId} not found.");
                return;
            }

            var device = await _deviceService.GetDeviceByName(configurationChangeRequest.DeviceName);

            if (device == null)
            {
                await _logService.LogInformation($"Device with name {configurationChangeRequest.DeviceName} not found.");
                return;
            }

            if (device.SubscriptionId != subscription.Id)
            {
                await _logService.LogInformation($"Device {device.DeviceName} does not belong to subscription {subscription.Id}.");
                return;
            }

            var associatedMedicines = await _medicineService.GetMedicinesAssociatedToDevice(device.Id);

            if (associatedMedicines == null || associatedMedicines.Count == 0)
                return;

            var deviceConfiguration = new ConfigurationMessage()
            {
                Type = "configuration",
                MedicinesSchedule = new List<MedicineConfigurationSchedule>()
            };

            foreach (var medicine in associatedMedicines)
            {
                var schedules = await _schedulingService.GetSchedulingsFromMedicine(medicine.MedicineId);

                foreach (var schedule in schedules)
                {
                    var medicineConfiguration = new MedicineConfigurationSchedule()
                    {
                        CompartimentNumber = medicine.Position,
                        DaysOfWeek = schedule.DaysOfWeek.Split(",").Select(int.Parse).ToList(),
                        Hour = schedule.Hour,
                        Minute = schedule.Minute
                    };

                    deviceConfiguration.MedicinesSchedule.Add(medicineConfiguration);
                }
            }

            var messageString = JsonConvert.SerializeObject(deviceConfiguration);

            if (CheckIfDuplicatedMessage(messageString, device.DeviceName))
                return;

            await _logService.LogInformation($"Sending configuration message to device {device.DeviceName}. Configuration: {messageString}");
            await _iotHubMessageService.SendCloudToDeviceMessageAsync(device.DeviceName, messageString);
        }

        private bool CheckIfDuplicatedMessage(string configurationToBeChecked, string deviceName)
        {
            var configurationHash = ComputeHash(configurationToBeChecked);

            if (_memoryCache.TryGetValue<string>(deviceName, out var storedConfiguration))
                if (storedConfiguration == deviceName)
                    return true;

            _memoryCache.Set(deviceName, configurationHash, TimeSpan.FromMinutes(15));
            return false;
        }

        private string ComputeHash(string json)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(json);
                var hashBytes = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }
}
