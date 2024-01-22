using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.PendingInterest
{
    [RoutePrefix("Reports/PendingInterest"), Route("{action=index}")]
    public class PendingInterestController : Controller
    {
        // GET: PendingInterest
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.LoanTypeId = user.LoanTypeInformationId;
            return View("~/Modules/Reports/PendingInterest/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {

            var dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@FromDate", Value = model.FromDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@ToDate", Value = model.ToDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@ReportType", Value = model.ReportType , DbType = DbType.String}
                          };      

            dt = new CommonSPCall().GetDataTable("LA_RptPendingInterest", null);
            Session["rpath"] = "~/Modules/Reports/Rdlc/PendingInterest.rdlc";
            Session["ds"] = "DataSet1";

            Session["dt"] = dt;

            model.pReportTitle = "Pending Interest";

            Session["model"] = model;
            return View("~/Modules/Reports/PendingInterest/Index.cshtml", model);
        }
    }
}