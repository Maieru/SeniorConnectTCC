using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Provisioning_Gateway.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Teste()
        {
            return Ok("Hello World");
        }
    }
}
