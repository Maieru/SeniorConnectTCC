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

        public DeviceService(DatabaseContext context)
        {
            _databaseContext = context;
            _repository = new DeviceRepository(context);
        }

        public async Task<List<Device>> GetDevicesFromSubscription(int subscriptionId)
        {
            var devices = await _repository.GetAllAsync(d => d.SubscriptionId == subscriptionId);
            return devices;
        }

        public async Task<Device> GetDeviceById(int deviceId)
        {
            var device = await _repository.GetByIdAsync(deviceId);
            return device;
        }

        public async Task AddDevice(Device device)
        {
            if (device == null)
                throw new ArgumentNullException(nameof(device));

            var subscriptionRepository = new SubscriptionService(_databaseContext);

            if (await subscriptionRepository.GetSubscriptionById(device.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {device.SubscriptionId} not found");

            await _repository.AddAsync(device);
        }

        public async Task UpdateDevice(Device device)
        {
            if (device == null)
                throw new ArgumentNullException(nameof(device));

            var subscriptionRepository = new SubscriptionService(_databaseContext);

            if (await subscriptionRepository.GetSubscriptionById(device.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {device.SubscriptionId} not found");

            if (await GetDeviceById(device.Id) == null)
                throw new EntityNotFoundException($"Device with id {device.Id} not found");

            await _repository.UpdateAsync(device);
        }

        public async Task DeleteDevice(int deviceId)
        {
            if (await GetDeviceById(deviceId) == null)
                throw new EntityNotFoundException($"Device with id {deviceId} not found");

            await _repository.DeleteByIdAsync(deviceId);
        }
    }
}