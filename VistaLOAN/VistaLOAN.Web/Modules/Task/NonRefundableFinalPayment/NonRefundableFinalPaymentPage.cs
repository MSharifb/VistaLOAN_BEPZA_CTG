

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/NonRefundableFinalPayment", typeof(VistaLOAN.Task.Pages.NonRefundableFinalPaymentController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/NonRefundableFinalPayment"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.NonRefundableFinalPaymentRow))]
    public class NonRefundableFinalPaymentController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/NonRefundableFinalPayment/NonRefundableFinalPaymentIndex.cshtml");
        }
    }
}