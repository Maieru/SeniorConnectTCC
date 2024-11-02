using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [Route("v1/[controller]")]
    public class SchedulingController : AuthorizeController
    {
        private readonly SchedulingService _schedulingService;
        private readonly LogService _logService;

        public SchedulingController(SchedulingService schedulingService, LogService logService)
        {
            _schedulingService = schedulingService;
            _logService = logService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            _schedulingService.CurrentSubscriptionId = LoggedUserSubscription;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateScheduling(Scheduling scheduling)
        {
            try
            {
                await _schedulingService.AddScheduling(scheduling);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, scheduling);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateScheduling(Scheduling scheduling)
        {
            try
            {
                await _schedulingService.UpdateScheduling(scheduling, true);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, scheduling);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteScheduling(int schedulingId)
        {
            try
            {
                await _schedulingService.DeleteScheduling(schedulingId);
                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, schedulingId);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetSchedulingById(int schedulingId)
        {
            try
            {
                var scheduling = await _schedulingService.GetSchedulingById(schedulingId);
                return Ok(scheduling);
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, schedulingId);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GetByMedicine")]
        public async Task<IActionResult> GetSchelingByMedicine(int medicineId)
        {
            try
            {
                var scheduling = await _schedulingService.GetSchedulingsFromMedicine(medicineId);
                return Ok(scheduling);
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, medicineId);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
