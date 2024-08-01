using Microsoft.AspNetCore.Mvc;
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
        private readonly DeviceRepository _deviceRepository;
        private readonly DeviceProvisioningService _deviceProvisioningService;
        private readonly LogService _logService;

        public ProvisioningController(ILogger<ProvisioningController> logger, DeviceRepository deviceRepository, DeviceProvisioningService deviceProvisioningService, LogService logService)
        {
            _logger = logger;
            _deviceRepository = deviceRepository;
            _deviceProvisioningService = deviceProvisioningService;
            _logService = logService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(int subscriptionId)
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

                await _deviceRepository.AddAsync(device);

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
