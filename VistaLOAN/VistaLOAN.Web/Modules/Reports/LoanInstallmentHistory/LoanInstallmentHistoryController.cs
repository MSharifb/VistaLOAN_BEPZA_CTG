using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.LoanInstallmentHistory
{
    [RoutePrefix("Reports/LoanInstallmentHistory"), Route("{action=index}")]
    public class LoanInstallmentHistoryController : Controller
    {
        // GET: LoanInstallmentReceived
        public ActionResult Index(ReportSearchViewModel model)
        {
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/LoanInstallmentHistory/Index.cshtml", model);
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
            return View("~/Modules/Reports/LoanInstallmentHistory/Index.cshtml", model);
        }
    }
}