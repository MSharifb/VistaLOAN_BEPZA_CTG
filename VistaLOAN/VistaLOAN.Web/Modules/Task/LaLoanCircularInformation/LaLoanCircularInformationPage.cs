

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaLoanCircularInformation", typeof(VistaLOAN.Task.Pages.LaLoanCircularInformationController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaLoanCircularInformation"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanCircularInformationRow))]
    public class LaLoanCircularInformationController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaLoanCircularInformation/LaLoanCircularInformationIndex.cshtml");
        }
    }
}