using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.NRLFPHistory
{
    [RoutePrefix("Reports/NRLFPHistory"), Route("{action=index}")]
    public class NRLFPHistoryController : Controller
    {
        // GET: NRLFPHistory
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.LoanTypeId = user.LoanTypeInformationId;
            return View("~/Modules/Reports/NRLFPHistory/Index.cshtml", model);
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
                                new SqlParameter{ ParameterName = "@PFLoanType", Value = model.LoanType , DbType = DbType.String}
                          };

            dt = new CommonSPCall().GetDataTable("LA_NRL_FP_History", param);
            Session["rpath"] = "~/Modules/Reports/Rdlc/NRLFPHistory.rdlc";
            Session["ds"] = "DataSet1";

            Session["dt"] = dt;

            model.pReportTitle = "NRL/FP Settlement Breakup/History";

            Session["model"] = model;
            return View("~/Modules/Reports/NRLFPHistory/Index.cshtml", model);
        }
    }
}