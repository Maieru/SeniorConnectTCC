using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/[controller]")]
    public class MedicineController : ControllerBase
    {
        private readonly MedicineService _medicineService;
        private readonly LogService _logService;

        public MedicineController(MedicineService medicineService, LogService logService)
        {
            _medicineService = medicineService;
            _logService = logService;
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
    }
}