

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Setup/LaLoanApplicationLastNumber", typeof(VistaLOAN.Setup.Pages.LaLoanApplicationLastNumberController))]

namespace VistaLOAN.Setup.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Setup/LaLoanApplicationLastNumber"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanApplicationLastNumberRow))]
    public class LaLoanApplicationLastNumberController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Setup/LaLoanApplicationLastNumber/LaLoanApplicationLastNumberIndex.cshtml");
        }
    }
}