

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaLoanIssueDetail", typeof(VistaLOAN.Task.Pages.LaLoanIssueDetailController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaLoanIssueDetail"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanIssueDetailRow))]
    public class LaLoanIssueDetailController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaLoanIssueDetail/LaLoanIssueDetailIndex.cshtml");
        }
    }
}