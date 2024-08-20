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
    public class SchedulingService : IEntityServiceInterface<Scheduling>
    {
        private readonly IRepository<Scheduling> _repository;
        private readonly MedicineService _medicineService;

        private int? _currentSubscriptionId;
        public int? CurrentSubscriptionId 
        {
            get => _currentSubscriptionId;
            set
            {
                _medicineService.CurrentSubscriptionId = value;
                _currentSubscriptionId = value;
            }
        }

        public SchedulingService(IRepository<Scheduling> repository, SubscriptionService subscriptionService, MedicineService medicineService)
        {
            _repository = repository;
            _medicineService = medicineService;
        }

        public async Task AddScheduling(Scheduling scheduling)
        {
            ArgumentNullException.ThrowIfNull(scheduling);

            if (string.IsNullOrEmpty(scheduling.DaysOfWeek))
                throw new RequiredMemberEmptyException(nameof(scheduling.DaysOfWeek));

            var medicine = await _medicineService.GetMedicineById(scheduling.MedicineId);

            if (medicine == null)
                throw new EntityNotFoundException($"Medicine with id {scheduling.MedicineId} not found");

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            if (DaysOfWeekAreValid(scheduling.DaysOfWeek))
                throw new InvalidDataProvidedException("Days of the week was invalid");

            await _repository.AddAsync(scheduling);
        }

        public async Task UpdateScheduling(Scheduling scheduling)
        {
            ArgumentNullException.ThrowIfNull(scheduling);
            var originalScheduling = await GetSchedulingById(scheduling.Id);

            if (originalScheduling == null)
                throw new EntityNotFoundException($"Scheduling with id {scheduling.Id} not found");

            if (originalScheduling.MedicineId != scheduling.MedicineId)
                throw new InvalidDataProvidedException("Medicine cannot be changed");

            var medicine = await _medicineService.GetMedicineById(scheduling.MedicineId);

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            if (string.IsNullOrEmpty(scheduling.DaysOfWeek))
                throw new RequiredMemberEmptyException(nameof(scheduling.DaysOfWeek));

            originalScheduling.Hour = scheduling.Hour;
            originalScheduling.Minute = scheduling.Minute;
            originalScheduling.DaysOfWeek = scheduling.DaysOfWeek;
            originalScheduling.Active = scheduling.Active;

            await _repository.UpdateAsync(originalScheduling);
        }

        public async Task DeleteScheduling(int schedulingId)
        {
            var scheduling = await GetSchedulingById(schedulingId);

            if (scheduling == null)
                throw new EntityNotFoundException($"Scheduling with id {schedulingId} not found");

            var medicine = await _medicineService.GetMedicineById(scheduling.MedicineId);

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            await _repository.DeleteByIdAsync(schedulingId);
        }

        public async Task<Scheduling> GetSchedulingById(int schedulingId)
        {
            var scheduling = await _repository.GetByIdAsync(schedulingId);

            if (scheduling != null)
            {
                var medicine = await _medicineService.GetMedicineById(scheduling.MedicineId);

                if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                    throw new CannotAccessSubscriptionException(medicine.SubscriptionId);
            }

            return scheduling;
        }

        public async Task<List<Scheduling>> GetSchedulingsFromMedicine(int medicineId)
        {
            var medicine = await _medicineService.GetMedicineById(medicineId);

            if (!ValidateAccessToSubscription(medicine.SubscriptionId))
                throw new CannotAccessSubscriptionException(medicine.SubscriptionId);

            var schedulings = await _repository.GetAllAsync(s => s.MedicineId == medicineId);
            return schedulings;
        }

        private bool DaysOfWeekAreValid(string daysOfWeek)
        {
            if (string.IsNullOrEmpty(daysOfWeek))
                return false;

            var days = daysOfWeek.Split(',');

            if (days.Length == 0)
                return false;

            foreach (var day in days)
                if (!Enum.IsDefined(typeof(DayOfWeek), day))
                    return false;

            return true;
        }

        private bool ValidateAccessToSubscription(int subscriptionId)
        {
            if (!CurrentSubscriptionId.HasValue)
                return true;

            return CurrentSubscriptionId.Value == subscriptionId;
        }
    }
}
