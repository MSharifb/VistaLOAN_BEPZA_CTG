

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Setup/LaLoanType", typeof(VistaLOAN.Setup.Pages.LaLoanTypeController))]

namespace VistaLOAN.Setup.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Setup/LaLoanType"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanTypeRow))]
    public class LaLoanTypeController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Setup/LaLoanType/LaLoanTypeIndex.cshtml");
        }
    }
}