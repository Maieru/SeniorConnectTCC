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

        public TelemetryService(IRepository<Telemetry> repository, DeviceService deviceService)
        {
            _repository = repository;
            _deviceService = deviceService;
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
                SensorDataJson = JsonConvert.SerializeObject(telemetryMessage.SensorData)
            };

            await _repository.AddAsync(telemetry);
        }
    }
}
