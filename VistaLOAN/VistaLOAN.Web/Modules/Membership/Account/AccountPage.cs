
namespace VistaLOAN.Membership.Pages
{
    using Administration;
    using Common;
    using Navigation;
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Configuration;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Security;

    [RoutePrefix("Account"), Route("{action=index}")]
    public partial class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login(string activated)
        {
            if (ConfigurationManager.AppSettings["UseExtarnalUserManagementService"] == "true")
            {
                var url = ConfigurationManager.AppSettings["ExtarnalDashboardUrl"];
                return Redirect(url);
            }
            else
            {

                ViewData["Activated"] = activated;
                ViewData["HideLeftNavigation"] = true;
                return View(MVC.Views.Membership.Account.AccountLogin);
            }
        }

        [HttpPost, JsonFilter]
        public Result<ServiceResponse> Login(LoginRequest request)
        {
            return this.ExecuteMethod(() =>
            {
                request.CheckNotNull();

                if (string.IsNullOrEmpty(request.Username))
                    throw new ArgumentNullException("username");

                var username = request.Username;

                if (WebSecurityHelper.Authenticate(ref username, request.Password, false))
                    return new ServiceResponse();

                throw new ValidationError("AuthenticationError", Texts.Validation.AuthenticationError);
            });
        }

        [HttpGet]
        public ActionResult LoginQ(string userName, string password, string module, int ZoneID)
        {
            var request = new LoginRequest();
            request.Username = userName;
            request.Password = password;
            Login(request);

            new TVLSecurityUserRetrieveService().LoadUserMenuAndPermistions(userName, module);

            var uu = new TVLSecurityUserRetrieveService().ByUsername(userName) as UserDefinition; //force to load userdefinition
            uu.ZoneID = ZoneID;
            uu.FinancialYearId = 1;

            using (var connection = Serenity.Data.SqlConnections.NewFor<Configurations.Entities.PrmZoneInfoRow>())
            {
                var _zone = connection.List<Configurations.Entities.PrmZoneInfoRow>(Configurations.Entities.PrmZoneInfoRow.Fields.Id == ZoneID);
                if (_zone != null)
                    uu.ZoneName = _zone[0].ZoneName;

                EmploymentInfo empId = connection.Query<EmploymentInfo>("select e.id, d.Name from PRM_EmploymentInfo e join PRM_Designation d on e.DesignationId=d.Id where e.EmpID='" + userName + "'", commandType: System.Data.CommandType.Text).SingleOrDefault();
                if (empId != null)
                {
                    uu.DesignationName = empId.Name;
                    uu.EmpId = empId.Id;
                  //  uu.UserId = empId.Id;
                }
            }
            //   var user = Authorization.UserDefinition as UserDefinition;
            //  user.ZoneID = ZoneID;
            return Redirect(Url.Content("~"));

        }

        [HttpGet]
        public ActionResult LoginVoucherQ(string userName, string password, int ZoneID, int FundControl, int VoucherType, int VoucherTempId)
        {
            var user = Authorization.UserDefinition as UserDefinition;
            if (user == null)
            {
                var request = new LoginRequest();
                request.Username = userName;
                request.Password = password;
                Login(request);
                new TVLSecurityUserRetrieveService().LoadUserMenuAndPermistions(userName, "ACC");

                var uu = new TVLSecurityUserRetrieveService().ByUsername(userName) as UserDefinition; //force to load userdefinition
                uu.ZoneID = ZoneID;
                uu.FinancialYearId = 1;
                using (var connection = Serenity.Data.SqlConnections.NewFor<Configurations.Entities.PrmZoneInfoRow>())
                {
                    var _zone = connection.List<Configurations.Entities.PrmZoneInfoRow>(Configurations.Entities.PrmZoneInfoRow.Fields.Id == ZoneID);
                    if (_zone != null)
                        uu.ZoneName = _zone[0].ZoneName;

                    EmploymentInfo empId = connection.Query<EmploymentInfo>("select e.id, d.Name from PRM_EmploymentInfo e join PRM_Designation d on e.DesignationId=d.Id where e.EmpID='" + userName + "'", commandType: System.Data.CommandType.Text).SingleOrDefault();
                    if (empId != null)
                    {
                        uu.DesignationName = empId.Name;
                        uu.EmpId = empId.Id;
                    }
                }
            }
            //   var user = Authorization.UserDefinition as UserDefinition;
            //  user.ZoneID = ZoneID;
            string _URL = Url.Content("~/Transaction/AccVoucherInformation/VoucherAPI?VoucherType=" + VoucherType + "&VoucherTempId=" + VoucherTempId + "&FundControl=" + FundControl);
            return Redirect(_URL);

        }

        private ActionResult Error(string message)
        {
            return View(MVC.Views.Errors.ValidationError,
                new ValidationError(Texts.Validation.InvalidResetToken));
        }

        public ActionResult Signout()
        {
            TwoLevelCache.Remove(NavigationModel.cacheKey);
            TwoLevelCache.Remove("DashboardPageModel");

            UserRetrieveService.RemoveCachedUser(Convert.ToInt32(Authorization.UserId), Authorization.Username);
            LocalCache.RemoveAll();

            Session.Clear();
            Session.Abandon();
            FormsAuthentication.SignOut();

            if (ConfigurationManager.AppSettings["UseExtarnalUserManagementService"] == "true")
            {
                var url = ConfigurationManager.AppSettings["ExtarnalDashboardLogOff"];
                return Redirect(url);
            }
            else
            {
                return new RedirectResult("~/");
            }
        }

        public ActionResult GoExternalDashboard()
        {
            if (ConfigurationManager.AppSettings["UseExtarnalUserManagementService"] == "true")
            {
                var url = ConfigurationManager.AppSettings["ExtarnalDashboardUrl"];
                return Redirect(url);
            }
            else
            {
                return new RedirectResult("~/");
            }
        }
    }
    class EmploymentInfo
    {
        public Int32 Id { get; set; }
        public String Name { get; set; }
    }
}