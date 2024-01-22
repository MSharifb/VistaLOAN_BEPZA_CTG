using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Serenity.Services;
using Serenity.Data;
using VistaLOAN.Configurations.Entities;

namespace VistaLOAN.Modules.Reports.LoanIssueStatement
{
    [RoutePrefix("Reports/LoanIssueStatement"), Route("{action=index}")]
    public class LoanIssueStatementController : Controller
    {
        // GET: LoanIssueStatement
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.AmountType = "principle";
            model.RangeType = "Fin";
            model.IsRunning = true;
            model.LoanPresent = "All";
            return View("~/Modules/Reports/LoanIssueStatement/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@FinancialYearId", Value = model.FinancialYearId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@RangeType", Value = model.RangeType , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@FromDate", Value = model.FromDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@ToDate", Value = model.ToDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@LoanPresent", Value = model.LoanPresent , DbType = DbType.String}

                          };
            if (model.AmountType == "principle")
            {
                if (model.LoanType.Contains("Motor"))
                {
                    dt = new CommonSPCall().GetDataTable("LA_RptLoanIssueforMotorCar", param);
                    Session["ds"] = "RptLoanIssueforMotorCar";
                    Session["dt"] = dt;
                    Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanIssueforMotorCar.rdlc";
                }
                else
                {
                    dt = new CommonSPCall().GetDataTable("LA_RptLoanIssueforHBLoan", param);
                    Session["ds"] = "RptLoanIssueforHBLoan";
                    Session["dt"] = dt;
                    Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanIssueforHBLoan.rdlc";
                }
            }
            else
            {
                dt = new CommonSPCall().GetDataTable("LA_RptLoanInterestStatement", param);
                Session["ds"] = "DataSet1";
                Session["dt"] = dt;
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanInterestStatement.rdlc";
            }

            if (model.RangeType == "Fin")
            {
                using (var connection = SqlConnections.NewFor<AccAccountingPeriodInformationRow>())
                {
                    var items = connection.List<AccAccountingPeriodInformationRow>().Where(x => x.Id == model.FinancialYearId).FirstOrDefault();
                    model.FromDate = items.PeriodStartDate;
                    model.ToDate = items.PeriodEndDate;
                    model.Year = items.YearName;
                }
            }
            else
            {
                model.Year = string.Concat(model.FromDate.Value.ToString("dd-MM-yyyy"), " to ", model.ToDate.Value.ToString("dd-MM-yyyy"));
            }
            string amountType1 = model.AmountType.First().ToString().ToUpper() + model.AmountType.Substring(1);
            model.pReportTitle = model.LoanType + " " + amountType1 + " as on " + model.ToDate.Value.ToString("dd-MM-yyyy");

            //model.pReportTitle = model.LoanType + " as on " + model.ToDate.Value.ToString("dd-MM-yyyy");

            Session["model"] = model;
            return View("~/Modules/Reports/LoanIssueStatement/Index.cshtml", model);
        }
    }
}