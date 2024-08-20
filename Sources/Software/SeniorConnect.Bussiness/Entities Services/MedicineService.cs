using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class MedicineService : IEntityServiceInterface<Medicine>
    {
        private readonly IRepository<Medicine> _repository;
        private readonly IRepository<MedicineDeviceAssociation> _medicineAssociationRepository;
        private readonly SubscriptionService _subscriptionService;
        private readonly DeviceService _deviceService;

        public MedicineService(IRepository<Medicine> medicineRepository, IRepository<MedicineDeviceAssociation> medicineAssociationRepository,
                               SubscriptionService subscriptionService, DeviceService deviceService)
        {
            _subscriptionService = subscriptionService;
            _repository = medicineRepository;
            _deviceService = deviceService;
            _medicineAssociationRepository = medicineAssociationRepository;
        }

        public async Task AddMedicine(Medicine medicine)
        {
            ArgumentNullException.ThrowIfNull(medicine);

            if (string.IsNullOrEmpty(medicine.Name))
                throw new RequiredMemberEmptyException(nameof(medicine.Name));

            if (_subscriptionService.GetSubscriptionById(medicine.SubscriptionId) == null)
                throw new InvalidSubscriptionException($"Subscription with id {medicine.SubscriptionId} not found");

            var originalMedicine = await GetMedicineById(medicine.Id);

            if (originalMedicine != null)
                throw new EntityAlreadyExistsException($"Medicine with id {medicine.Id} already exists");

            await _repository.AddAsync(medicine);
        }

        public async Task UpdateMedicine(Medicine medicine)
        {
            ArgumentNullException.ThrowIfNull(medicine);
            var originalMedicine = await GetMedicineById(medicine.Id);

            if (originalMedicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicine.Id} not found");

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
            if (await GetMedicineById(medicineId) == null)
                throw new EntityNotFoundException($"Medicine with id {medicineId} not found");

            await _repository.DeleteByIdAsync(medicineId);
        }

        public async Task<Medicine> GetMedicineById(int medicineId)
        {
            var medicine = await _repository.GetByIdAsync(medicineId);
            return medicine;
        }

        public async Task<List<Medicine>> GetMedicinesFromSubscription(int subscriptionId)
        {
            var medicines = await _repository.GetAllAsync(m => m.SubscriptionId == subscriptionId);
            return medicines;
        }

        public async Task AssociateMedicineToDevice(int medicineId, int deviceId, int position)
        {
            var medicine = await GetMedicineById(medicineId);
            var device = await _deviceService.GetDeviceById(deviceId);

            if (medicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicineId} not found");

            if (device == null)
                throw new EntityNotFoundException($"Device with id {deviceId} not found");

            var savedAssociation = await _medicineAssociationRepository.GetFirst(m => m.DeviceId == deviceId && m.MedicineId == medicineId && m.Position == position, false);

            if (savedAssociation != null)
                throw new EntityAlreadyExistsException("Association already exists");

            var association = new MedicineDeviceAssociation()
            {
                DeviceId = deviceId,
                MedicineId = medicineId,
                Position = position
            };

            await _medicineAssociationRepository.AddAsync(association);
        }

        public async Task DessasociateMedicineToDevice(int medicineId, int deviceId, int medicinePosition)
        {
            var medicine = await GetMedicineById(medicineId);
            var device = await _deviceService.GetDeviceById(deviceId);

            if (medicine == null)
                throw new EntityNotFoundException($"Medicine with id {medicineId} not found");

            if (device == null)
                throw new EntityNotFoundException($"Device with id {deviceId} not found");

            var association = await _medicineAssociationRepository.GetFirst(m => m.DeviceId == deviceId && m.MedicineId == medicineId && m.Position == medicinePosition, false);

            if (association == null)
                throw new EntityNotFoundException($"Association not found");

            await _medicineAssociationRepository.DeleteByIdAsync(association.Id);
        }
    }
}
