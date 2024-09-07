using Newtonsoft.Json;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public ConfigurationChangeService(SubscriptionService subscriptionService, DeviceService deviceService, LogService logService,
            MedicineService medicineService, SchedulingService schedulingService, IIotHubMessageService ioTHubMessageService)
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

            await _iotHubMessageService.SendCloudToDeviceMessageAsync(device.DeviceName, messageString);
        }
    }
}
