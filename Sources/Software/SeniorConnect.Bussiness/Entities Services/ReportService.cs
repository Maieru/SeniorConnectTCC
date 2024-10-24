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
        private readonly AdministrationService _administrationService;

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

        public ReportService(MedicineService medicineService, SchedulingService schedulingService, AdministrationService administrationService)
        {
            _schedulingService = schedulingService;
            _medicineService = medicineService;
            _administrationService = administrationService;
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

        public async Task<AdhesionReportTO> GetAdhesionReport(int subscriptionId, int daysToBeEvaluated = 7)
        {
            var medicines = await _medicineService.GetMedicinesFromSubscription(subscriptionId);

            var adhesionReport = new AdhesionReportTO
            {
                MedicinesAdhesion = new List<MedicineAdhesionTO>()
            };

            if (medicines.Count == 0)
                return adhesionReport;

            foreach (var medicine in medicines)
                adhesionReport.MedicinesAdhesion.Add(await CalculateMedicineAdhesion(medicine, daysToBeEvaluated));

            adhesionReport.TotalSchedulings = adhesionReport.MedicinesAdhesion.Sum(m => m.TotalSchedulings);
            adhesionReport.TotalAdhesion = adhesionReport.MedicinesAdhesion.Sum(m => m.Adhesion) / adhesionReport.MedicinesAdhesion.Count;
            adhesionReport.MissedDosesPercentage = 100 - adhesionReport.TotalAdhesion;

            return adhesionReport;
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

        private async Task<MedicineAdhesionTO> CalculateMedicineAdhesion(Medicine medicine, int daysToBeEvaluated)
        {
            var administrations = await _administrationService.GetAdministrationsFromMedicine(medicine.Id, daysToBeEvaluated);
            var schedulings = await _schedulingService.GetSchedulingsFromMedicine(medicine.Id);
            var medicineAdhesionTO = new MedicineAdhesionTO
            {
                MedicineId = medicine.Id,
                MedicineName = medicine.Name,
                MissedSchedulings = new List<MissedSchedulingTO>()
            };

            foreach (var scheduling in schedulings)
            {
                var administrationsOfScheduling = administrations.Where(a => a.SchedulingId == scheduling.Id).ToList();

                foreach (var day in scheduling.DaysOfWeekList)
                {
                    medicineAdhesionTO.TotalSchedulings++;

                    var weekDayOffset = daysToBeEvaluated + ((int)DateTime.UtcNow.AddHours(-3).DayOfWeek - (int)day) + 1;
                    var dayToEvaluate = DateTime.UtcNow.AddDays(-weekDayOffset).Date.AddHours(scheduling.Hour).AddMinutes(scheduling.Minute);

                    if (scheduling.LastChange > dayToEvaluate.AddHours(3))
                        continue;

                    var administrationsOfSchedulingOnDay = administrationsOfScheduling.Where(a => a.Date.Date == dayToEvaluate.Date).FirstOrDefault();

                    if (administrationsOfSchedulingOnDay == null)
                    {
                        medicineAdhesionTO.MissedSchedulings.Add(new MissedSchedulingTO
                        {
                            DayOfWeek = (int)day,
                            Hour = scheduling.Hour,
                            Minute = scheduling.Minute,
                            Day = dayToEvaluate.Day,
                            Month = dayToEvaluate.Month
                        });
                    }
                }
            }

            if (medicineAdhesionTO.MissedSchedulings.Count == 0)
                medicineAdhesionTO.Adhesion = 100;
            else
                medicineAdhesionTO.Adhesion = (1 - (medicineAdhesionTO.MissedSchedulings.Count / medicineAdhesionTO.TotalSchedulings)) * 100;

            return medicineAdhesionTO;
        }

        private bool ValidateAccessToSubscription(int subscriptionId)
        {
            if (!CurrentSubscriptionId.HasValue)
                return true;

            return CurrentSubscriptionId.Value == subscriptionId;
        }
    }
}
