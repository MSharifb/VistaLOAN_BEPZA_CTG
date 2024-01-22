using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.LoanStatus
{
    [RoutePrefix("Reports/LoanStatus"), Route("{action=index}")]
    public class LoanStatusController : Controller
    {
        // GET: LoanStatus
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/LoanStatus/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
                          {
                                new SqlParameter{ ParameterName = "@EndDate", Value = model.ToDate , DbType = DbType.Date},
                                new SqlParameter{ ParameterName = "@EmpID", Value = model.EmpId , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@LoanNo", Value = model.LoanNo , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@zoneList", Value = model.ZoneInfoList , DbType = DbType.String}
                          };

            dt = new CommonSPCall().GetDataTable("LA_uspRptLoanStatus", param);

            Session["ds"] = "RptLoanStatus";
            Session["dt"] = dt;
            Session["rpath"] = "~/Modules/Reports/Rdlc/RptLoanStatus.rdlc";
            TempData["model"] = model;

            return View("~/Modules/Reports/LoanStatus/Index.cshtml", model);
        }
    }
}