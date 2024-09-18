using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [Route("v1/[controller]")]
    public class ReportController : AuthorizeController
    {

        private readonly ReportService _reportService;
        private readonly LogService _logService;

        public ReportController(ReportService reportService, LogService logService)
        {
            _reportService = reportService;
            _logService = logService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            _reportService.CurrentSubscriptionId = LoggedUserSubscription;
        }

        [HttpGet("GetWeeklySchedulesReport")]
        public async Task<IActionResult> GetWeeklySchedulesReport(int subscriptionId)
        {
            try
            {
                return Ok(await _reportService.GetWeeklyScheduleReport(subscriptionId));
            }
            catch (InvalidDataProvidedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logService.LogException(ex, subscriptionId);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
