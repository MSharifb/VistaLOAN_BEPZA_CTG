

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaLoanOpening", typeof(VistaLOAN.Task.Pages.LaLoanOpeningController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaLoanOpening"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanOpeningRow))]
    public class LaLoanOpeningController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaLoanOpening/LaLoanOpeningIndex.cshtml");
        }
    }
}