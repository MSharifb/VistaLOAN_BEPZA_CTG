using Dapper;
using Serenity;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.MyLoanInstallmentHistory
{
    [RoutePrefix("Reports/MyLoanInstallmentHistory"), Route("{action=index}")]
    public class MyLoanInstallmentHistoryController : Controller
    {
        public SqlConnection con;
        public MyLoanInstallmentHistoryController()
        {
            string constr = ConfigurationManager.ConnectionStrings["LOANDB"].ToString();
            con = new SqlConnection(constr);
        }

        // GET: LoanInstallmentReceived
        public ActionResult Index(ReportSearchViewModel model)
        {
            Session["dt"] = null;
            Session["rpath"] = null;
            UserDefinition user = (UserDefinition)Authorization.UserDefinition;
            if (user != null)
            {
                model.EmpId = GetEmpID(user.EmpId);
            }
            return View("~/Modules/Reports/MyLoanInstallmentHistory/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
            {
                new SqlParameter{ ParameterName = "@EmpId", Value = model.EmpId , DbType = DbType.String},
                new SqlParameter{ ParameterName = "@LoanApplicationId", Value = model.LoanApplicationId , DbType = DbType.String}
            };

            dt = new CommonSPCall().GetDataTable("LA_RptLoanInstallmentHistory", param);

            Session["ds"] = "DataSet1";
            Session["dt"] = dt;

            Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanInstallmentHistory.rdlc";

            Session["model"] = model;
            return View("~/Modules/Reports/MyLoanInstallmentHistory/Index.cshtml", model);
        }

        public string GetEmpID(int employeeId)
        {
            string _result = string.Empty;
            _result = con
                     .Query<string>("SELECT EmpID FROM PRM_EmploymentInfo WHERE Id=" + employeeId, commandType: CommandType.Text)
                     .FirstOrDefault();
            return _result;
        }
    }
}