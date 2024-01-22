

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaMonthlyLoanInstallmentDetail", typeof(VistaLOAN.Task.Pages.LaMonthlyLoanInstallmentDetailController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaMonthlyLoanInstallmentDetail"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaMonthlyLoanInstallmentDetailRow))]
    public class LaMonthlyLoanInstallmentDetailController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaMonthlyLoanInstallmentDetail/LaMonthlyLoanInstallmentDetailIndex.cshtml");
        }
    }
}