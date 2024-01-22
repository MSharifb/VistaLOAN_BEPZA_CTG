using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.LoanInstallmentReceived
{
    [RoutePrefix("Reports/LoanInstallmentReceived"), Route("{action=index}")]
    public class LoanInstallmentReceivedController : Controller
    {
        public SqlConnection con;
        public LoanInstallmentReceivedController()
        {
            string constr = ConfigurationManager.ConnectionStrings["LOANDB"].ToString();
            con = new SqlConnection(constr);
        }

        // GET: LoanInstallmentReceived
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            Session["dt"] = null;
            Session["rpath"] = null;
            model.IsWithCashChequeAmount = true;
            model.LoanTypeId = user.LoanTypeInformationId;
            return View("~/Modules/Reports/LoanInstallmentReceived/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            var dt = new DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            model.FromDate = new DateTime(Convert.ToInt32(model.Year), Convert.ToDateTime(model.Month + " 01, 1900").Month, 1);
            model.ToDate = Convert.ToDateTime(model.FromDate).AddMonths(1).AddDays(-1);

            List<SqlParameter> param = new List<SqlParameter>
                          {
                                new SqlParameter{ ParameterName = "@FromDate", Value = model.FromDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@ToDate", Value = model.ToDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String}
                          };
            if (model.ReportType == "LRS")
            {
                con.Open();
                bool? isPFLoan = con.Query<Boolean>("SELECT IsPfLoan FROM LA_LoanType WHERE id = " + model.LoanTypeId, commandType: CommandType.Text)?.FirstOrDefault();
                if (Convert.ToBoolean(isPFLoan))
                {
                    model.pReportTitle = "List of Refundable Loan";
                }
                else
                {
                    model.pReportTitle = "Statement of ";
                    model.pReportTitle += con.Query<string>("SELECT LoanTypeName FROM LA_LoanType WHERE Id = " + model.LoanTypeId, commandType: CommandType.Text)?.FirstOrDefault();
                }
                con.Close();

                param.Add(new SqlParameter { ParameterName = "@LoanTypeId", Value = model.LoanTypeId, DbType = DbType.Int32 });
                param.Add(new SqlParameter { ParameterName = "@IsWithCash", Value = model.IsWithCashChequeAmount, DbType = DbType.Boolean });

                dt = new CommonSPCall().GetDataTable("LA_RptLoanReceiveDetail", param.ToArray());

                Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanReceiveDetail_Format1.rdlc";
                Session["ds"] = "RptLoanReceiveDetail";
            }
            else if (model.ReportType == "NRLS")
            {
                model.pReportTitle = "List of Non-Refundable Loan";
                dt = new CommonSPCall().GetDataTable("LA_RptNonRefundableLoan", param.ToArray());
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptNonRefundableLoanStatement.rdlc";
                Session["ds"] = "DataSet1";
            }

            Session["dt"] = dt;
            Session["model"] = model;

            return View("~/Modules/Reports/LoanInstallmentReceived/Index.cshtml", model);
        }
    }
}