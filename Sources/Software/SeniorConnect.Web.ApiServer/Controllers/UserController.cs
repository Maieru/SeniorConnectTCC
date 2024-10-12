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
        private readonly SubscriptionService _subscriptionService;
        private readonly DeviceService _deviceService;
        private readonly MedicineService _medicineService;

        public UserController(LogService logService, UserService userService, SubscriptionService subscriptionService,
                              DeviceService deviceService, MedicineService medicineService)
        {
            _logService = logService;
            _userService = userService;
            _subscriptionService = subscriptionService;
            _deviceService = deviceService;
            _medicineService = medicineService;
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

        [HttpDelete("DeleteUser")]
        [Authorize]
        public async Task<IActionResult> DeleteUser()
        {
            try
            {
                var loggedUserSubscription = int.Parse(User.FindFirst("subscription")?.Value ?? "0");
                var loggedUserId = int.Parse(User.FindFirst("subject")?.Value ?? "0");

                if (loggedUserId == 0)
                    return BadRequest("Não foi possível detectar o código do usuário");

                var subscription = await _subscriptionService.GetSubscriptionById(loggedUserSubscription);

                if (subscription == null)
                    return BadRequest("Não foi possível detectar a assinatura do usuário");

                var subscriptionMedicines = await _medicineService.GetMedicinesFromSubscription(loggedUserSubscription);

                foreach (var medicine in subscriptionMedicines)
                    await _medicineService.DeleteMedicine(medicine.Id); // This will delete all schedulings, associations and administrations of that medicine too

                var subscriptionDevices = await _deviceService.GetDevicesFromSubscription(loggedUserSubscription);

                foreach (var device in subscriptionDevices)
                    await _deviceService.DeleteDevice(device.Id);

                await _userService.DeleteUser(loggedUserId);
                await _subscriptionService.DeleteSubscription(loggedUserSubscription);

                return Ok();
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}