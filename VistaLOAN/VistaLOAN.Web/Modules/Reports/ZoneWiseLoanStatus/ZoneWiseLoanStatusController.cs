using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.ZoneWiseLoanStatus
{
    [RoutePrefix("Reports/ZoneWiseLoanStatus"), Route("{action=index}")]
    public class ZoneWiseLoanStatusController : Controller
    {
        // GET: ZoneWiseLoanStatus
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.LoanTypeId = user.LoanTypeInformationId;
            model.ZoneInfoList = user.ZoneID.ToString();
            return View("~/Modules/Reports/ZoneWiseLoanStatus/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@ZoneList", Value = model.ZoneInfoList , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@AsOnDate", Value = model.ToDate , DbType = DbType.Date},
                                new SqlParameter{ ParameterName = "@EmpId", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.Int32}
                          };

            dt = new CommonSPCall().GetDataTable("LA_RptZoneWiseLoanStatus", param);
            model.pReportTitle = "As on " + Convert.ToDateTime(model.ToDate).ToString("dd-MM-yyyy");

            Session["ds"] = "DataSet1";
            Session["dt"] = dt;

            Session["rpath"] = "~/Modules/Reports/Rdlc/ZoneWiseLoanStatus.rdlc";
            Session["model"] = model;

            return View("~/Modules/Reports/ZoneWiseLoanStatus/Index.cshtml", model);
        }

    }
}