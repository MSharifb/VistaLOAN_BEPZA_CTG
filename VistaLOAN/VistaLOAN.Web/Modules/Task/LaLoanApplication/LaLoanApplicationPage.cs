

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaLoanApplication", typeof(VistaLOAN.Task.Pages.LaLoanApplicationController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaLoanApplication"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanApplicationRow))]
    public class LaLoanApplicationController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaLoanApplication/LaLoanApplicationIndex.cshtml");
        }
    }
}