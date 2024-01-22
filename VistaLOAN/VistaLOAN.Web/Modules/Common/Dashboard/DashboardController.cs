
using System.Linq;


namespace VistaLOAN.Common.Pages
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Web.Mvc;
    using System.Web.Security;

    [RoutePrefix("Dashboard"), Route("{action=index}")]
    public class DashboardController : Controller
    {
        [Authorize, HttpGet, Route("~/")]
        public ActionResult Index()
        {
            var user = (UserDefinition)Authorization.UserDefinition;
            var model = new DashboardPageModel();

            if (user != null)
            {
                PrepareModel(model, user.ZoneID, user.FundControlInformationId);
            }

            return View(MVC.Views.Common.Dashboard.DashboardIndex, model);
        }

        [Authorize, HttpPost, Route("~/")]
        public ActionResult Index(DashboardPageModel model)
        {
            if (model.CurrentZone > 0)
            {
                var user = (UserDefinition) Authorization.UserDefinition;
                PrepareModel(model, model.CurrentZone, user.FundControlInformationId);
            }

            return View(MVC.Views.Common.Dashboard.DashboardIndex, model);
        }

        private void PrepareModel(DashboardPageModel model, int zoneId, int fundcontrolId)
        {

        }

    }
}