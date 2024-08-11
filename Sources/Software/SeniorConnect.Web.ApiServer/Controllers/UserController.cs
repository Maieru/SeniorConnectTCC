using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.TOs.User;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserService _userService;

        public UserController(ILogger<UserController> logger, UserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateUserTO userTO)
        {
            try
            {
                await _userService.CreateUser(userTO);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
