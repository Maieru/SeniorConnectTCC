using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.TOs.Medicine;
using System.Linq;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class ReportService
    {
        private readonly MedicineService _medicineService;
        private readonly SchedulingService _schedulingService;

        private int? _currentSubscriptionId;
        public int? CurrentSubscriptionId
        {
            get => _currentSubscriptionId;
            set
            {
                _medicineService.CurrentSubscriptionId = value;
                _schedulingService.CurrentSubscriptionId = value;
                _currentSubscriptionId = value;
            }
        }

        public ReportService(MedicineService medicineService, SchedulingService schedulingService)
        {
            _schedulingService = schedulingService;
            _medicineService = medicineService;
        }

        public async Task<List<DailyMedicineSchedulesTO>> GetWeeklyScheduleReport(int subscriptionId)
        {
            if (!ValidateAccessToSubscription(subscriptionId))
                throw new CannotAccessSubscriptionException(subscriptionId);

            var schedulesOfTheWeek = new List<DailyMedicineSchedulesTO>();
            var scheduledMedicines = await _schedulingService.GetSchedulingsFromSubscription(subscriptionId);

            foreach (DayOfWeek day in Enum.GetValues(typeof(DayOfWeek)))
            {
                var dailySchedule = new DailyMedicineSchedulesTO
                {
                    DayOfWeek = day,
                    ScheduledMedicines = new List<DailyMedicineScheduleTO>()
                };

                var scheduledMedicinesOfTheDay = scheduledMedicines.Where(s => s.DaysOfWeek.Contains(((int)day).ToString()));

                foreach (var schedule in scheduledMedicinesOfTheDay.GroupBy(s => s.MedicineId))
                    dailySchedule.ScheduledMedicines.Add(await CreateDailyMedicineScheduleTO(schedule.Key, schedule.ToList()));

                schedulesOfTheWeek.Add(dailySchedule);
            }

            return schedulesOfTheWeek;
        }

        private async Task<DailyMedicineScheduleTO> CreateDailyMedicineScheduleTO(int medicineId, List<Scheduling> schedules)
        {
            var medicine = await _medicineService.GetMedicineById(medicineId);

            return new DailyMedicineScheduleTO
            {
                MedicineId = medicine.Id,
                MedicineName = medicine.Name,
                MedicineTimes = schedules.Select(s => new MedicineTimeTO
                {
                    Hour = s.Hour,
                    Minute = s.Minute
                }).ToList()
            };
        }

        private bool ValidateAccessToSubscription(int subscriptionId)
        {
            if (!CurrentSubscriptionId.HasValue)
                return true;

            return CurrentSubscriptionId.Value == subscriptionId;
        }
    }
}
