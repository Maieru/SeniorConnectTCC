using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.TOs.User;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly LogService _logService;

        public UserController(LogService logService, UserService userService)
        {
            _logService = logService;
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
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, userTO);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, new { username, password });
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
