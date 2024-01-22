

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Setup/LaLoanCriteria", typeof(VistaLOAN.Setup.Pages.LaLoanCriteriaController))]

namespace VistaLOAN.Setup.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Setup/LaLoanCriteria"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanCriteriaRow))]
    public class LaLoanCriteriaController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Setup/LaLoanCriteria/LaLoanCriteriaIndex.cshtml");
        }
    }
}