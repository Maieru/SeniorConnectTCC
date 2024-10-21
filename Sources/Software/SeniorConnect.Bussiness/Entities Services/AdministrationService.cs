using SeniorConnect.Bussiness.Entities;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Enum;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class AdministrationService
    {
        private readonly IRepository<Administration> _repository;
        private readonly SchedulingService _schedulingService;

        public AdministrationService(IRepository<Administration> repository, SchedulingService schedulingService)
        {
            _repository = repository;
            _schedulingService = schedulingService;
        }

        public async Task AddAdministration(Medicine medicine, Scheduling scheduling, Device device)
        {
            if (medicine.SubscriptionId != device.SubscriptionId)
                throw new ArgumentException("Medicine and device are not from the same subscription");

            await AddAdministration(medicine, scheduling, device, EnumAdministrationReason.TriggeredAutomaticly);
        }

        public async Task AddManualAdministration(Medicine medicine, Scheduling scheduling)
        {
            await AddAdministration(medicine, scheduling, null, EnumAdministrationReason.TriggeredManually);
        }

        private async Task AddAdministration(Medicine medicine, Scheduling scheduling, Device device, EnumAdministrationReason reason)
        {
            if (medicine == null)
                throw new ArgumentNullException(nameof(medicine));

            if (scheduling == null)
                throw new ArgumentNullException(nameof(scheduling));

            if (scheduling.MedicineId != medicine.Id)
                throw new ArgumentException("Scheduling and medicine are not associated");

            if (device == null && reason == EnumAdministrationReason.TriggeredAutomaticly)
                throw new ArgumentNullException(nameof(device));

            var administration = new Administration()
            {
                Date = DateTime.UtcNow,
                SubscriptionId = medicine.SubscriptionId,
                MedicineId = medicine.Id,
                SchedulingId = scheduling.Id,
                DeviceId = device?.Id,
                Reason = reason,
            };

            await _repository.AddAsync(administration);
            await _schedulingService.UpdateLastAdministration(scheduling.Id);
        }


        public async Task<Administration> GetAdministrationBySchedulingId(int schedulingId)
        {
            var administration = await _repository.GetFirst(a => a.SchedulingId == schedulingId);

            return administration;
        }

        public async Task<List<Administration>> GetAdministrationsFromMedicine(int medicineId, int daysToBeEvaluated)
        {
            return await _repository.GetAllAsync(a => a.MedicineId == medicineId && a.Date >= DateTime.UtcNow.AddDays(-daysToBeEvaluated));
        }
    }
}
