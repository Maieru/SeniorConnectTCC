using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class DeviceService : IEntityServiceInterface<Device>
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IRepository<Device> _repository;
        private readonly SubscriptionService _subscriptionService;

        public int? CurrentSubscriptionId { get; set; }

        public DeviceService(IRepository<Device> deviceRepository, SubscriptionService subscriptionService)
        {
            _repository = deviceRepository;
            _subscriptionService = subscriptionService;
        }

        public async Task<List<Device>> GetDevicesFromSubscription(int subscriptionId)
        {
            if (!ValidateAccessToSubscription(subscriptionId))
                throw new CannotAccessSubscriptionException(subscriptionId);

            var devices = await _repository.GetAllAsync(d => d.SubscriptionId == subscriptionId);
            return devices;
        }

        public async Task<Device> GetDeviceById(int deviceId)
        {
            var device = await _repository.GetByIdAsync(deviceId);

            if (device != null && !ValidateAccessToSubscription(device.SubscriptionId))
                throw new CannotAccessSubscriptionException(device.SubscriptionId);

            return device;
        }

        public async Task AddDevice(Device device)
        {
            if (device == null)
                throw new ArgumentNullException(nameof(device));

            if (!ValidateAccessToSubscription(device.SubscriptionId))
                throw new CannotAccessSubscriptionException(device.SubscriptionId);

            if (await _subscriptionService.GetSubscriptionById(device.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {device.SubscriptionId} not found");

            device.ModificationDate = DateTime.UtcNow;
            await _repository.AddAsync(device);
        }

        public async Task UpdateDevice(Device device)
        {
            if (device == null)
                throw new ArgumentNullException(nameof(device));

            if (!ValidateAccessToSubscription(device.SubscriptionId))
                throw new CannotAccessSubscriptionException(device.SubscriptionId);

            if (await _subscriptionService.GetSubscriptionById(device.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {device.SubscriptionId} not found");

            var originalDevice = await GetDeviceById(device.Id);

            if (originalDevice == null)
                throw new EntityNotFoundException($"Device with id {device.Id} not found");

            if (originalDevice.SubscriptionId != device.SubscriptionId)
                throw new InvalidSubscriptionException("SubscriptionId cannot be changed");

            originalDevice.DeviceName = device.DeviceName;
            originalDevice.ModificationDate = DateTime.UtcNow;

            await _repository.UpdateAsync(originalDevice);
        }

        public async Task DeleteDevice(int deviceId)
        {
            var device = await GetDeviceById(deviceId);

            if (device == null)
                throw new EntityNotFoundException($"Device with id {deviceId} not found");

            if (!ValidateAccessToSubscription(device.SubscriptionId))
                throw new CannotAccessSubscriptionException(device.SubscriptionId);

            await _repository.DeleteByIdAsync(deviceId);
        }

        private bool ValidateAccessToSubscription(int subscriptionId)
        {
            if (!CurrentSubscriptionId.HasValue)
                return true;

            return CurrentSubscriptionId.Value == subscriptionId;
        }
    }
}