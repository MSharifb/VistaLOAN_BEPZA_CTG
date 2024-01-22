using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Linq;
using System;
using Dapper;

namespace VistaLOAN.Modules.Reports.MonthlyCollectionStatement
{
    [RoutePrefix("Reports/MonthlyCollectionStatement"), Route("{action=index}")]
    public class MonthlyCollectionStatementController : Controller
    {
        public SqlConnection con;
        public MonthlyCollectionStatementController()
        {
            string constr = ConfigurationManager.ConnectionStrings["LOANDB"].ToString();
            con = new SqlConnection(constr);
        }
        // GET: MonthlyCollectionStatement
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/MonthlyCollectionStatement/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@FromDate", Value = model.FromDate , DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@ToDate", Value = model.ToDate, DbType = DbType.DateTime},
                                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId, DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@IsOpening", Value = model.IsWithCashChequeAmount , DbType = DbType.Boolean}
                          };
            if (model.IsYearly)
            {
                dt = new CommonSPCall().GetDataTable("LA_RptYearlyCollectionStatement", param);
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptYearlyCollectionStatement.rdlc";
            }
            else
            {
                dt = new CommonSPCall().GetDataTable("LA_RptMonthlyCollectionStatement", param);
                Session["rpath"] = "~/Modules/Reports/Rdlc/RptMonthlyCollectionStatement.rdlc";
            }
            con.Open();
            model.pReportTitle = "Statement of ";
            model.pReportTitle += con.Query<string>("SELECT LoanTypeName FROM LA_LoanType WHERE Id = " + model.LoanTypeId, commandType: CommandType.Text)?.FirstOrDefault();
            con.Close();

            Session["ds"] = "DataSet1";
            Session["dt"] = dt;
            Session["model"] = model;

            return View("~/Modules/Reports/MonthlyCollectionStatement/Index.cshtml", model);
        }
    }
}