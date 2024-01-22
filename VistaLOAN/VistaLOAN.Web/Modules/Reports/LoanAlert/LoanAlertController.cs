using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.LoanAlert
{
    [RoutePrefix("Reports/LoanAlert"), Route("{action=index}")]
    public class LoanAlertController : Controller
    {
        // GET: LoanAlert
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.LoanTypeId = user.LoanTypeInformationId;
            return View("~/Modules/Reports/LoanAlert/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@Year", Value = model.Year , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@Month", Value = model.Month , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.Int32}
                          };

            dt = new CommonSPCall().GetDataTable("LA_RptLoanAlert", param);
            model.pReportTitle = "As on " + model.Month + "/" + model.Year;

            Session["ds"] = "DataSet1";
            Session["dt"] = dt;

            Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanAlert.rdlc";
            Session["model"] = model;

            return View("~/Modules/Reports/LoanAlert/Index.cshtml", model);
        }
    }
}