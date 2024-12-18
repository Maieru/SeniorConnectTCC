﻿using SeniorConnect.Bussiness.Entities;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class MedicineService : IEntityServiceInterface<Medicine>
    {
        private const int MAX_POSITION = 8;

        private readonly IRepository<Medicine> _repository;
        private readonly IRepository<MedicineDeviceAssociation> _medicineAssociationRepository;
        private readonly SubscriptionService _subscriptionService;
        private readonly DeviceService _deviceService;
        private readonly IConfigurationChangeRegisterService _configurationChangeRegisterService;
        private readonly AdministrationService _administrationService;

        private int? _currentSubscriptionId;
        public int? CurrentSubscriptionId
        {
            get => _currentSubscriptionId;
            set
            {
                _deviceService.CurrentSubscriptionId = value;
                _currentSubscriptionId = value;
            }
        }

        public MedicineService(IRepository<Medicine> medicineRepository, IRepository<MedicineDeviceAssociation> medicineAssociationRepository,
                               DeviceService deviceService, IConfigurationChangeRegisterService configurationChangeRegisterService,
                               AdministrationService administrationService,
                               SubscriptionService subscriptionService)
        {
            _repository = medicineRepository;
            _deviceService = deviceService;
            _medicineAssociationRepository = medicineAssociationRepository;
            _configurationChangeRegisterService = configurationChangeRegisterService;
            _administrationService = administrationService;
            _subscriptionService = subscriptionService;

        }

        public async Task AddMedicine(Medicine medicine)
        {
            ArgumentNullException.ThrowIfNull(medicine);

            if (string.IsNullOrEmpty(medicine.Name))
                throw new RequiredMemberEmptyException(nameof(medicine.Name));

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            if (await _subscriptionService.GetSubscriptionById(medicine.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {medicine.SubscriptionId} not found");

            await _repository.AddAsync(medicine);
        }

        public async Task UpdateMedicine(Medicine medicine)
        {
            ArgumentNullException.ThrowIfNull(medicine);
            var originalMedicine = await GetMedicineById(medicine.Id);

            if (originalMedicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicine.Id} not found");

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            if (await _subscriptionService.GetSubscriptionById(medicine.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {medicine.SubscriptionId} not found");

            if (originalMedicine.SubscriptionId != medicine.SubscriptionId)
                throw new InvalidSubscriptionException("SubscriptionId cannot be changed");

            if (string.IsNullOrEmpty(medicine.Name))
                throw new RequiredMemberEmptyException(nameof(medicine.Name));

            originalMedicine.Name = medicine.Name;

            await _repository.UpdateAsync(originalMedicine);
        }

        public async Task DeleteMedicine(int medicineId)
        {
            var medicine = await GetMedicineById(medicineId);

            if (medicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicineId} not found");

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            await _repository.DeleteByIdAsync(medicineId);
        }

        public async Task<Medicine> GetMedicineById(int medicineId)
        {
            var medicine = await _repository.GetByIdAsync(medicineId);

            if (medicine != null && !ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            return medicine;
        }

        public async Task<List<Medicine>> GetMedicinesFromSubscription(int subscriptionId)
        {
            if (!ValidateAccessToSubscription(subscriptionId))
                throw new CannotAccessSubscriptionException(subscriptionId);

            var medicines = await _repository.GetAllAsync(m => m.SubscriptionId == subscriptionId);
            return medicines;
        }

        public async Task AssociateMedicineToDevice(int medicineId, int deviceId, int position)
        {
            var medicine = await GetMedicineById(medicineId);
            var device = await _deviceService.GetDeviceById(deviceId);

            if (position > MAX_POSITION)
                throw new InvalidDataProvidedException($"Position cannot be greater than {MAX_POSITION}");

            if (medicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicineId} not found");

            if (device == null)
                throw new EntityNotFoundException($"Device with id {deviceId} not found");

            var savedAssociation = await _medicineAssociationRepository.GetFirst(m => m.DeviceId == deviceId && m.Position == position, false);

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            if (!ValidateAccessToSubscription(device.SubscriptionId))
                throw new CannotAccessSubscriptionException(device.SubscriptionId);

            if (savedAssociation != null)
            {
                if (savedAssociation.MedicineId == medicineId)
                    throw new EntityAlreadyExistsException("Association already exists");

                await _medicineAssociationRepository.DeleteByIdAsync(savedAssociation.Id);
            }


            var association = new MedicineDeviceAssociation()
            {
                DeviceId = deviceId,
                MedicineId = medicineId,
                Position = position
            };

            await _medicineAssociationRepository.AddAsync(association);
            await _configurationChangeRegisterService.RegisterConfigurationChangeRequest(medicine.SubscriptionId, device.DeviceName);
        }

        public async Task DessasociateMedicineToDevice(int medicineId, int deviceId, int medicinePosition)
        {
            var medicine = await GetMedicineById(medicineId);
            var device = await _deviceService.GetDeviceById(deviceId);

            if (medicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicineId} not found");

            if (device == null)
                throw new EntityNotFoundException($"Device with id {deviceId} not found");

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            if (!ValidateAccessToSubscription(device.SubscriptionId))
                throw new CannotAccessSubscriptionException(device.SubscriptionId);

            var association = await _medicineAssociationRepository.GetFirst(m => m.DeviceId == deviceId && m.MedicineId == medicineId && m.Position == medicinePosition, false);

            if (association == null)
                throw new EntityNotFoundException($"Association not found");

            await _medicineAssociationRepository.DeleteByIdAsync(association.Id);
            await _configurationChangeRegisterService.RegisterConfigurationChangeRequest(medicine.SubscriptionId, device.DeviceName);
        }

        public async Task<List<MedicineDeviceAssociation>> GetMedicinesAssociatedToDevice(int deviceId)
        {
            return await _medicineAssociationRepository.GetAllAsync(m => m.DeviceId == deviceId);
        }

        public async Task NotifyMedicineChange(int medicine)
        {
            var medicineDeviceAssociations = await _medicineAssociationRepository.GetAllAsync(m => m.MedicineId == medicine);

            foreach (var association in medicineDeviceAssociations.DistinctBy(d => d.DeviceId).ToList())
            {
                var device = await _deviceService.GetDeviceById(association.DeviceId);
                await _configurationChangeRegisterService.RegisterConfigurationChangeRequest(device.SubscriptionId, device.DeviceName);
            }
        }

        private bool ValidateAccessToSubscription(int subscriptionId)
        {
            if (!CurrentSubscriptionId.HasValue)
                return true;

            return CurrentSubscriptionId.Value == subscriptionId;
        }
    }
}
