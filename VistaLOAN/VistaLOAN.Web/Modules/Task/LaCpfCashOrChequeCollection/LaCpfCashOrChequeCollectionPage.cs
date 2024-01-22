

//[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaCpfCashOrChequeCollection", typeof(VistaLOAN.Task.Pages.LaCpfCashOrChequeCollectionController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaCpfCashOrChequeCollection"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaCpfCashOrChequeCollectionRow))]
    public class LaCpfCashOrChequeCollectionController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaCpfCashOrChequeCollection/LaCpfCashOrChequeCollectionIndex.cshtml");
        }
    }
}