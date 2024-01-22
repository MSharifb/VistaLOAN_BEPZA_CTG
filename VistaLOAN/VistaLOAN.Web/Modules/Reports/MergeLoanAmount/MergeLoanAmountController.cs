using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VistaLOAN.Modules.Reports.MergeLoanAmount
{
    [RoutePrefix("Reports/MergeLoanAmount"), Route("{action=index}")]
    public class MergeLoanAmountController : Controller
    {
        // GET: MergeLoanAmount
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            return View("~/Modules/Reports/MergeLoanAmount/Index.cshtml", model);
        }
        public JsonResult MergeLoanIsntallmentAmount( int loanId, string year, string month)
        {
            try
            {
                System.Data.DataTable dt = new System.Data.DataTable();
                Session["dt"] = null;
                Session["rpath"] = null;

                SqlParameter[] param =
                              {
                                new SqlParameter{ ParameterName = "@LoanId", Value = loanId , DbType = DbType.Int32},
                                new SqlParameter{ ParameterName = "@Year", Value = year , DbType = DbType.String},
                                new SqlParameter{ ParameterName = "@Month", Value = month , DbType = DbType.String}
                          };

                dt = new CommonSPCall().GetDataTable("LA_procMergeLoanInstallmentAmount", param);
                return Json(new
                {
                    IsSuccess = 1,
                    InterestAmount = 1
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }

    }
}