using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Serenity.Data;
using VistaLOAN.Task.Entities;

namespace VistaLOAN.Modules.Reports.InterestCalculator
{
    [RoutePrefix("Reports/InterestCalculator"), Route("{action=index}")]
    public class InterestCalculatorController : Controller
    {
        // GET: InterestCalculator
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            model.InterestRate = 10;
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/InterestCalculator/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@DateAsOn", Value = model.ToDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@loanId", Value = model.LoanApplicationId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@InterestRate", Value = model.InterestRate , DbType = DbType.Decimal}
                          };

            dt = new CommonSPCall().GetDataTable("LA_RptInterestCalculator", param);
            model.pReportTitle = "As on " +Convert.ToDateTime(model.ToDate).ToString("dd-MM-yyyy");

            decimal interestAmount = (decimal)dt.Compute("Sum(InterestAmount)", "");
            model.TotalInterestAmount = interestAmount;

            Session["ds"] = "DataSet1";
            Session["dt"] = dt;

            Session["rpath"] = "~/Modules/Reports/Rdlc/InterestCalculator.rdlc";
            Session["model"] = model;

            return View("~/Modules/Reports/InterestCalculator/Index.cshtml", model);
        }
        public JsonResult ConfirmInterest(string empId, int loanId, decimal interestRate, DateTime date, decimal totalInterest)
        {
            try
            {
                System.Data.DataTable dt = new System.Data.DataTable();
                Session["dt"] = null;
                Session["rpath"] = null;

                SqlParameter[] param =
                              {
                                new SqlParameter{ ParameterName = "@DateAsOn", Value = date , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@EmpID", Value = empId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@loanId", Value = loanId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@InterestRate", Value = interestRate , DbType = DbType.Decimal}
                          };

                dt = new CommonSPCall().GetDataTable("LA_RptInterestCalculator", param);

                decimal interestAmount = (decimal)dt.Compute("Sum(InterestAmount)", "");
                if(totalInterest > 0)
                {
                    interestAmount = totalInterest;
                }
                int c = UpdateLoanApplication(interestAmount, loanId, date);
                return Json(new
                {
                    IsSuccess = c,
                    InterestAmount = interestAmount
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }
        public int UpdateLoanApplication(decimal interestAmount, int loanId, DateTime asonDate)
        {
            var items = 0;
            var dd = asonDate.ToString("yyyy-MM-dd");
            using (var connection = SqlConnections.NewFor<LaLoanApplicationRow>())
            {
                items = connection.Query<Int32>("UPDATE LA_LoanApplication Set ApplyInterestAmount ="+ interestAmount + ", GrantedInterestAmount ="+ interestAmount + " WHERE Id = "+loanId, commandType: CommandType.Text).Count();
                items = connection.Query<Int32>("UPDATE LA_LoanIssue Set InterestAmount =" + interestAmount + ",InterestConfirmDate = "+ "\'" + dd + "\'" + " WHERE LoanApplicationId = " + loanId, commandType: CommandType.Text).Count();
            }
            return items;
        }
    }
}