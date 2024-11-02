using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.TOs.Medicine;
using System.Net.WebSockets;
using System.Security.AccessControl;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [Route("v1/[controller]")]
    public class MedicineController : AuthorizeController
    {
        private readonly MedicineService _medicineService;
        private readonly LogService _logService;
        private readonly AdministrationService _administrationService;
        private readonly SchedulingService _schedulingService;
        public MedicineController(MedicineService medicineService, LogService logService, AdministrationService administrationService, SchedulingService schedulingService)
        {
            _medicineService = medicineService;
            _logService = logService;
            _administrationService = administrationService;
            _schedulingService = schedulingService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            _medicineService.CurrentSubscriptionId = LoggedUserSubscription;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateMedicine(Medicine medicine)
        {
            try
            {
                await _medicineService.AddMedicine(medicine);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, medicine);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateMedicine(Medicine medicine)
        {
            try
            {
                await _medicineService.UpdateMedicine(medicine);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, medicine);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteMedicine(int medicineId)
        {
            try
            {
                await _medicineService.DeleteMedicine(medicineId);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { medicineId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetMedicine(int medicineId)
        {
            try
            {
                return Ok(await _medicineService.GetMedicineById(medicineId));
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { medicineId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetAllFromSubscription")]
        public async Task<IActionResult> GetAllFromSubscription(int subscriptionId)
        {
            try
            {
                return Ok(await _medicineService.GetMedicinesFromSubscription(subscriptionId));
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { subscriptionId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("AssociateToDevice")]
        public async Task<IActionResult> AssociateToDevice(int medicineId, int deviceId, int medicinePosition)
        {
            try
            {
                await _medicineService.AssociateMedicineToDevice(medicineId, deviceId, medicinePosition);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { medicineId, deviceId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("DessasociateFromDevice")]
        public async Task<IActionResult> DessasociateFromDevice(int medicineId, int deviceId, int medicinePosition)
        {
            try
            {
                await _medicineService.DessasociateMedicineToDevice(medicineId, deviceId, medicinePosition);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { medicineId, deviceId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetMedicinesAssociatedToDevice")]
        public async Task<IActionResult> GetMedicinesAssociatedToDevice(int deviceId)
        {
            try
            {
                var returnList = new List<MedicineAssociationTO>();
                var deviceAssociations = await _medicineService.GetMedicinesAssociatedToDevice(deviceId);

                foreach (var association in deviceAssociations)
                {
                    var associatedMedicine = await _medicineService.GetMedicineById(association.MedicineId);
                    returnList.Add(new MedicineAssociationTO()
                    {
                        Id = association.Id,
                        Name = associatedMedicine.Name,
                        Position = association.Position,
                        SubscriptionId = associatedMedicine.SubscriptionId,
                        DeviceId = association.DeviceId,
                        MedicineId = association.MedicineId
                    });
                }

                return Ok(returnList);
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { deviceId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("PostManualAdministration")]
        public async Task<IActionResult> AddManualAdministration(int medicineId, int scheduleId)
        {
            try
            {
                var medicine = await _medicineService.GetMedicineById(medicineId);
                var scheduling = await _schedulingService.GetSchedulingById(scheduleId);

                await _administrationService.AddManualAdministration(medicine, scheduling);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { medicineId, scheduleId });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetUnadministeredSchedulings")]
        public async Task<IActionResult> GetUnadministeredSchedulings(int? hours)
        {
            try
            {
                var period = TimeSpan.FromHours(8);

                if (hours.HasValue)
                    period = period = TimeSpan.FromHours(hours.Value);

                var unadministeredSchedulings = await _schedulingService.GetUnadministeredSchedulings(period, LoggedUserSubscription);

                return Ok(unadministeredSchedulings);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}