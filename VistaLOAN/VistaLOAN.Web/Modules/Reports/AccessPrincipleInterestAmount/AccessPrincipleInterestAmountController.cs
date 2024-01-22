using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.AccessPrincipleInterestAmount
{
    [RoutePrefix("Reports/AccessPrincipleInterestAmount"), Route("{action=index}")]
    public class AccessPrincipleInterestAmountController : Controller
    {
        // GET: AccessPrincipleInterestAmount
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/AccessPrincipleInterestAmount/Index.cshtml", model);
        }
        [HttpPost]
        public ActionResult Index(ReportSearchViewModel model, int? id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();
            Session["dt"] = null;
            Session["rpath"] = null;

            SqlParameter[] param =
            {
                new SqlParameter{ ParameterName = "@EmployeeId", Value = model.EmpId , DbType = DbType.String},
                new SqlParameter{ ParameterName = "@LoanId", Value = model.LoanApplicationId , DbType = DbType.String},
                new SqlParameter{ ParameterName = "@LoanTypeId", Value = model.LoanTypeId , DbType = DbType.String}

            };

            dt = new CommonSPCall().GetDataTable("LA_RtpAccessPrincipleInterestAmount", param);

            Session["ds"] = "DataSet1";
            Session["dt"] = dt;

            Session["rpath"] = "~/Modules/Reports/Rdlc/AccessPrincipleInterestAmount.rdlc";

            Session["model"] = model;
            return View("~/Modules/Reports/AccessPrincipleInterestAmount/Index.cshtml", model);
        }
    }
}