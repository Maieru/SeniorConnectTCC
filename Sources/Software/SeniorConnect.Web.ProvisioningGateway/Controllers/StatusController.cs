using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Services;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class StatusController : ControllerBase
    {
        private readonly LogService _logService;
        
        public StatusController(LogService logService)
        {
            _logService = logService;
        }

        [HttpGet("GetStatus")]
        [AllowAnonymous]
        public IActionResult GetStatus() => Ok("Everything is fine!");
    }
}
