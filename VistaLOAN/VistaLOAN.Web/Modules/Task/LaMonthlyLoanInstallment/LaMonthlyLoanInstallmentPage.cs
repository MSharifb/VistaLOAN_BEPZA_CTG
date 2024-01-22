

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaMonthlyLoanInstallment", typeof(VistaLOAN.Task.Pages.LaMonthlyLoanInstallmentController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaMonthlyLoanInstallment"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaMonthlyLoanInstallmentRow))]
    public class LaMonthlyLoanInstallmentController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaMonthlyLoanInstallment/LaMonthlyLoanInstallmentIndex.cshtml");
        }
    }
}