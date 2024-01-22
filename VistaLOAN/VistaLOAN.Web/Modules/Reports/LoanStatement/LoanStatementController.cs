using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.LoanStatement
{
    [RoutePrefix("Reports/LoanStatement"), Route("{action=index}")]
    public class LoanStatementController : Controller
    {
        // GET: LoanStatement
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/LoanStatement/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@LoanNo", Value = model.LoanNo, DbType = DbType.String},
                          };

            dt = new CommonSPCall().GetDataTable("LA_RptLoanStatement", param);

            Session["ds"] = "RptLoanStatement";
            Session["dt"] = dt;
            Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanStatement.rdlc";
            TempData["model"] = model;

            return View("~/Modules/Reports/LoanStatement/Index.cshtml", model);
        }

    }
}