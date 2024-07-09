using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;
using System.Diagnostics;

namespace Provisioning_Gateway.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DatabaseContext _context;
        private readonly DeviceRepository _deviceRepository;

        public HomeController(ILogger<HomeController> logger, DeviceRepository deviceRepository)
        {
            _logger = logger;
            _deviceRepository = deviceRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Teste()
        {
            var dispositivos = await _deviceRepository.GetAllAsync();
            return Json(dispositivos);
        }
    }
}
