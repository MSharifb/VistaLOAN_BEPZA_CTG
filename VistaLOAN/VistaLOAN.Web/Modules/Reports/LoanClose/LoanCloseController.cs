using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.LoanClose
{
    [RoutePrefix("Reports/LoanClose"), Route("{action=index}")]
    public class LoanCloseController : Controller
    {
        // GET: LoanClose
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.LoanTypeId = user.LoanTypeInformationId;
            return View("~/Modules/Reports/LoanClose/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {

            var dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            model.FromDate = new DateTime(Convert.ToInt32(model.Year), Convert.ToDateTime(model.Month + " 01, 1900").Month, 1);
            model.ToDate = Convert.ToDateTime(model.FromDate).AddMonths(1).AddDays(-1);

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@FromDate", Value = model.FromDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@ToDate", Value = model.ToDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@ReportType", Value = model.ReportType , DbType = DbType.String}
                          };

            if (model.ReportType == "DeductFromSalaryButLoanInstallmentAbsent")
            {
                dt = new CommonSPCall().GetDataTable("LA_RptSalaryAndLoanInstallmentMismatch", param);
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptMismatchOfLoanInstAndSalary.rdlc";
                Session["ds"] = "RptSalaryAndLoanInstallmentMismatch";
            }
            else if (model.ReportType == "CashCollection")
            {
                dt = new CommonSPCall().GetDataTable("LA_RptMonthlyLoanCashChequeCollection", param);
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptMonthlyCashChequeCollection.rdlc";
                Session["ds"] = "DataSet1";
            }
            else
            {
               SqlParameter[] param2 =
              {
                                new SqlParameter{ ParameterName = "@FromDate", Value = model.FromDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@ToDate", Value = model.ToDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@ReportType", Value = model.ReportType , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@PFLoanType", Value = model.LoanType , DbType = DbType.String}
              };

                dt = new CommonSPCall().GetDataTable("LA_RptLoanClose", param2);
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanClose.rdlc";
                Session["ds"] = "RptLoanClose";
            }

            Session["dt"] = dt;

            if (model.ReportType == "IssuedLoan")
            {
                if(model.LoanType == "Refundable")
                   model.pReportTitle = "Issued Refundable Loan";
                else if(model.LoanType == "Non-Refundable")
                    model.pReportTitle = "Issued Non-Refundable Loan";
                else if (model.LoanType == "FinalPayment")
                    model.pReportTitle = "Issued Final Payment";
            }
            else if (model.ReportType == "ClosedLoan")
                model.pReportTitle = "All Closed Loan";
            else if (model.ReportType == "DeductFromSalaryButLoanInstallmentAbsent")
                model.pReportTitle = "Mismatch of Loan Installments and Salary Deduction";
            else if (model.ReportType == "CashCollection")
                model.pReportTitle = "Monthly Cash/Cheque Collection Statement";

            Session["model"] = model;
            return View("~/Modules/Reports/LoanClose/Index.cshtml", model);
        }
    }
}