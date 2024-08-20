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

            if (await _medicineService.GetMedicineById(scheduling.MedicineId) == null)
                throw new EntityNotFoundException($"Medicine with id {scheduling.MedicineId} not found");

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
            if (await GetSchedulingById(schedulingId) == null)
                throw new EntityNotFoundException($"Scheduling with id {schedulingId} not found");

            await _repository.DeleteByIdAsync(schedulingId);
        }

        public async Task<Scheduling> GetSchedulingById(int schedulingId)
        {
            var scheduling = await _repository.GetByIdAsync(schedulingId);
            return scheduling;
        }

        public async Task<List<Scheduling>> GetSchedulingsFromMedicine(int medicineId)
        {
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
    }
}
