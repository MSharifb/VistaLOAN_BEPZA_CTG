

//[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "HRM/EmploymentInfo", typeof(VistaLOAN.HRM.Pages.EmploymentInfoController))]

namespace VistaLOAN.HRM.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("HRM/EmploymentInfo"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.EmploymentInfoRow))]
    public class EmploymentInfoController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/HRM/EmploymentInfo/EmploymentInfoIndex.cshtml");
        }
    }
}