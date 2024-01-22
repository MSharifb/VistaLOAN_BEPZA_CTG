using Serenity.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VistaLOAN.Task.Entities;

namespace VistaLOAN.Modules.Reports.PFFundDataMigration
{
    [RoutePrefix("Reports/PfFundDataMigration"), Route("{action=index}")]
    public class PFFundDataMigrationController : Controller
    {
        // GET: PFFundDataMigration
        public ActionResult Index(ReportSearchViewModel model)
        {
            var user = (UserDefinition)Serenity.Authorization.UserDefinition;
            model.LoanTypeId = user.LoanTypeInformationId;
            model.InterestRate = 10;
            Session["dt"] = null;
            Session["rpath"] = null;
            return View("~/Modules/Reports/PFFundDataMigration/Index.cshtml", model);
        }
        public JsonResult ConfirmInterest(string empId, string pfEmpId)
        {
            try
            {
                int c = UpdateLoanApplication(empId, pfEmpId);
                return Json(new
                {
                    IsSuccess = c,
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }
        public int UpdateLoanApplication(string empId, string pfEmpId)
        {
            var items = 0;
            using (var connection = SqlConnections.NewFor<LaLoanApplicationRow>())
            {
                items = connection.Query<Int32>("UPDATE CPF_PFFundDataMigration Set EMPID =" + empId + "WHERE EMPID = " +"'"+ pfEmpId + "'", commandType: CommandType.Text).Count();
            }
            return items;
        }

    }
}