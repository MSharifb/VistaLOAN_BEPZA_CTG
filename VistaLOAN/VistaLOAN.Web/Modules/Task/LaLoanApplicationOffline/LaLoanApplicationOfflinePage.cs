
namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaLoanApplicationOffline"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanApplicationRow))]
    public class LaLoanApplicationOfflineController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaLoanApplicationOffline/LaLoanApplicationOfflineIndex.cshtml");
        }
    }
}