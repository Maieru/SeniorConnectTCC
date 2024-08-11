using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.TOs.User;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [ApiController]
    [Authorize]
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
        [AllowAnonymous]
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

        [HttpGet("GetToken")]
        [AllowAnonymous]
        public async Task<IActionResult> GetToken(string username, string password)
        {
            try
            {
                var token = await _userService.GetToken(username, password);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
