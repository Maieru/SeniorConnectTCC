using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [Route("v1/[controller]")]
    public class DeviceController : AuthorizeController
    {
        private readonly DeviceService _deviceService;
        private readonly LogService _logService;

        public DeviceController(LogService logService, DeviceService deviceService)
        {
            _deviceService = deviceService;
            _logService = logService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            _deviceService.CurrentSubscriptionId = LoggedUserSubscription;
        }

        [HttpGet("GetDevices")]
        public async Task<IActionResult> GetDevices(int subscriptionId)
        {
            try
            {
                return Ok(await _deviceService.GetDevicesFromSubscription(subscriptionId));
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

        [HttpGet("GetDevice")]
        public async Task<IActionResult> GetDevice(int deviceId)
        {
            try
            {
                return Ok(await _deviceService.GetDeviceById(deviceId));
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
    }
}