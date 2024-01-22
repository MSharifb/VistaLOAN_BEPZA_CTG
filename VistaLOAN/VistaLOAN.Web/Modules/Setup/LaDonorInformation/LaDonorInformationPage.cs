

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Setup/LaDonorInformation", typeof(VistaLOAN.Setup.Pages.LaDonorInformationController))]

namespace VistaLOAN.Setup.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Setup/LaDonorInformation"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaDonorInformationRow))]
    public class LaDonorInformationController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Setup/LaDonorInformation/LaDonorInformationIndex.cshtml");
        }
    }
}