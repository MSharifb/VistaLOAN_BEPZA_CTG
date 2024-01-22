using Serenity.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VistaLOAN.Configurations.Entities;

namespace VistaLOAN.Modules.Reports.LoanRecoveryStatement
{
    [RoutePrefix("Reports/LoanRecoveryStatement"), Route("{action=index}")]
    public class LoanRecoveryStatementController : Controller
    {
        // GET: LoanRecoveryStatement
        public ActionResult Index(ReportSearchViewModel model)
        {
            Session["dt"] = null;
            Session["rpath"] = null;
            model.AmountType = "principle";
            return View("~/Modules/Reports/LoanRecoveryStatement/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@LoanTypeId",Value = model.LoanTypeId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@FinancialYearId", Value = model.FinancialYearId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@AmountType", Value = model.AmountType , DbType = DbType.String}
                          };

            dt = new CommonSPCall().GetDataTable("LA_RptLoanRecoveryStatement", param);
            model.pReportTitle = "Loan Recovery Statement";
            Session["ds"] = "RptLoanRecovery";
            Session["dt"] = dt;
            Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanRecoveryStatement.rdlc";

            using (var connection = SqlConnections.NewFor<AccAccountingPeriodInformationRow>())
            {
                var items = connection.List<AccAccountingPeriodInformationRow>().Where(x => x.Id == model.FinancialYearId).FirstOrDefault();
                model.FromDate = items.PeriodStartDate;
                model.ToDate = items.PeriodEndDate;
                model.Year = items.YearName;
            }

            Session["model"] = model;

            return View("~/Modules/Reports/LoanRecoveryStatement/Index.cshtml", model);
        }
    }
}