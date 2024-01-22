

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaRequestedLoanApplication", typeof(VistaLOAN.Task.Pages.LaRequestedLoanApplicationController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaRequestedLoanApplication"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaRequestedLoanApplicationRow))]
    public class LaRequestedLoanApplicationController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaRequestedLoanApplication/LaRequestedLoanApplicationIndex.cshtml");
        }
    }
}