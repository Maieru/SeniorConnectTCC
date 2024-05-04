using Microsoft.AspNetCore.Mvc;

namespace SimpleAPIServer.Controllers
{
    [Route("SimpleAPI/[action]")]
    public class SimpleAPIController : Controller
    {
        [HttpGet(Name = "SimpleRequest")]
        public IActionResult SimpleRequest()
        {
            return Json("This is a simples response :)");
        }
    }
}
