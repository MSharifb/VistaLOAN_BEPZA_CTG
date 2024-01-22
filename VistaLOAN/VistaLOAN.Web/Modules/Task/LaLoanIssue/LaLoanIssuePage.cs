

[assembly:Serenity.Navigation.NavigationLink(int.MaxValue, "Task/LaLoanIssue", typeof(VistaLOAN.Task.Pages.LaLoanIssueController))]

namespace VistaLOAN.Task.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("Task/LaLoanIssue"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.LaLoanIssueRow))]
    public class LaLoanIssueController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/Task/LaLoanIssue/LaLoanIssueIndex.cshtml");
        }
    }
}