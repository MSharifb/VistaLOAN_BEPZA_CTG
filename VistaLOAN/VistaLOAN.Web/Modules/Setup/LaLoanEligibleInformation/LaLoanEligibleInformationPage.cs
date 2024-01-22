

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Setup/LaLoanEligibleInformation", typeof(VistaLOAN.Setup.Pages.LaLoanEligibleInformationController))]

namespace VistaLOAN.Setup.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Setup/LaLoanEligibleInformation"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanEligibleInformationRow))]
    public class LaLoanEligibleInformationController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Setup/LaLoanEligibleInformation/LaLoanEligibleInformationIndex.cshtml");
        }
    }
}