using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;
using System.Diagnostics;

namespace Provisioning_Gateway.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ProvisioningController : Controller
    {
        private readonly ILogger<ProvisioningController> _logger;
        private readonly DatabaseContext _context;
        private readonly DeviceService _deviceService;
        private readonly DeviceProvisioningService _deviceProvisioningService;
        private readonly LogService _logService;

        public ProvisioningController(ILogger<ProvisioningController> logger, DeviceService deviceService, DeviceProvisioningService deviceProvisioningService, LogService logService)
        {
            _logger = logger;
            _deviceService = deviceService;
            _deviceProvisioningService = deviceProvisioningService;
            _logService = logService;
        }

        [HttpPost("EnrollDevice")]
        public async Task<IActionResult> EnrollDevice(int subscriptionId)
        {
            try
            {
                var deviceId = await _deviceProvisioningService.CreateDevice();

                var device = new Device()
                {
                    DeviceName = deviceId,
                    SubscriptionId = subscriptionId,
                    ModificationDate = DateTime.UtcNow
                };

                await _deviceService.AddDevice(device);

                return Ok(device);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { subscriptionId });
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
