using Newtonsoft.Json;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.Telemetry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class TelemetryService
    {
        private readonly IRepository<Telemetry> _repository;
        private readonly DeviceService _deviceService;
        private readonly MedicineService _medicineService;
        private readonly SchedulingService _schedulingService;
        private readonly AdministrationService _administrationService;

        public TelemetryService(IRepository<Telemetry> repository, DeviceService deviceService, MedicineService medicineService, SchedulingService schedulingService, AdministrationService administrationService)
        {
            _repository = repository;
            _deviceService = deviceService;
            _medicineService = medicineService;
            _schedulingService = schedulingService;
            _administrationService = administrationService;
        }

        public async Task SaveTelemetry(string connectionDeviceId, TelemetryMessage telemetryMessage)
        {
            var device = await _deviceService.GetDeviceByName(connectionDeviceId);

            if (device == null)
                throw new EntityNotFoundException($"Device with name {connectionDeviceId} not found");

            var telemetry = new Telemetry()
            {
                DeviceId = device.Id,
                Year = telemetryMessage.Year,
                Month = telemetryMessage.Month,
                Day = telemetryMessage.Day,
                Hour = telemetryMessage.Hour,
                Minute = telemetryMessage.Minute,
                Second = telemetryMessage.Second,
                Millis = telemetryMessage.Millis,
                SensorDataJson = JsonConvert.SerializeObject(telemetryMessage.SensorData),
                UndueOpening = await CheckOpeningExpected(device.Id, telemetryMessage, device)
            };

            await _repository.AddAsync(telemetry);
        }

        private async Task<bool> CheckOpeningExpected(int deviceId, TelemetryMessage telemetry, Device device)
        {
            var medicineAssociations = await _medicineService.GetMedicinesAssociatedToDevice(deviceId);
            var returnValue = true;

            if (telemetry.SensorData.All(d => !d.State))
                return returnValue; // No sensor is open

            foreach (var sensorData in telemetry.SensorData)
            {
                if (!sensorData.State)
                    continue;

                var medicineAssociated = medicineAssociations.FirstOrDefault(m => m.Position == sensorData.Number);

                if (medicineAssociated == null)
                    continue;

                var schedulings = await _schedulingService.GetSchedulingsFromMedicine(medicineAssociated.MedicineId);

                if (schedulings == null || !schedulings.Any())
                    continue;

                var scheduling = schedulings.FirstOrDefault(s => s.Hour == telemetry.Hour && s.Minute == telemetry.Minute &&
                                        s.DaysOfWeek.Split(',').Any(d => d == ((int)telemetry.GetDayOfWeek()).ToString()));

                if (scheduling != null)
                {
                    var medicine = await _medicineService.GetMedicineById(medicineAssociated.MedicineId);
                    await _administrationService.AddAdministration(medicine, scheduling, device);
                    returnValue = false;
                }
            }

            return returnValue;
        }
    }
}
