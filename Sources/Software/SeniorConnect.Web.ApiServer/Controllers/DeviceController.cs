using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ILogger<DeviceController> _logger;
        private readonly DeviceService _deviceService;

        public DeviceController(ILogger<DeviceController> logger, DeviceService deviceService)
        {
            _logger = logger;
            _deviceService = deviceService;
        }

        [HttpGet("GetDevices")]
        public async Task<IEnumerable<Device>> GetDevices(int subscriptionId) => await _deviceService.GetDevicesFromSubscription(subscriptionId);

        [HttpGet("GetDevice")]
        public async Task<Device> GetDevice(int deviceId) => await _deviceService.GetDeviceById(deviceId);
    }
}
