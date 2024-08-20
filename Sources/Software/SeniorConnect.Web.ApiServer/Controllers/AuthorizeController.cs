using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SeniorConnect.Web.ApiServer.Controllers
{
    [Authorize]
    [ApiController]
    public class AuthorizeController : Controller
    {
        protected int LoggedUserSubscription { get; set; }
        protected int LoggedUserId { get; set; }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
         
            LoggedUserSubscription = int.Parse(User.FindFirst("subscription")?.Value ?? "0");
            LoggedUserId = int.Parse(User.FindFirst("subject")?.Value ?? "0");
        }
    }
}
