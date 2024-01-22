namespace VistaLOAN.Administration
{
    using Navigation;
    using SecurityService;
    using Serenity;
    using Serenity.Abstractions;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.UserRow;

    public class TVLSecurityUserRetrieveService : IUserRetrieveService
    {
        private static MyRow.RowFields fld { get { return MyRow.Fields; } }
        private SecurityService.UserManagementServiceClient u = new SecurityService.UserManagementServiceClient();

        private UserDefinition GetFirst(string userName, int userId)
        {
            var user = new User();
            if (!userName.IsNullOrEmpty())
            {
                try
                {
                    user = u.GetUserByLoginId(userName);
                }
                catch (Exception ex)
                {
                    throw new ValidationError("Security service does not response.", ex);
                }
            }
            else if (userId > 0)
            {
                try
                {
                    user = u.GetUser(userId);
                }
                catch (Exception ex)
                {
                    throw new ValidationError("Security service does not response.", ex);
                }

            }
            else
                return null;

            if (user != null)
            {
                var userDefinition = new UserDefinition
                {
                    UserId = user.UserId,
                    Username = user.LoginId,
                    Email = user.EmailAddress,
                    //UserImage = user.UserImage,
                    DisplayName = user.FirstName + " " + user.LastName,
                    IsActive = (short)(user.Status ? 1 : 0),
                    //Source = user.Source,
                    PasswordHash = user.Password,
                    //PasswordSalt = user.PasswordSalt,
                    UpdateDate = user.UpdatedDate,
                    //LastDirectoryUpdate = user.LastPasswordChangedDate
                };

                return userDefinition;
            }
            return null;
        }



        public IUserDefinition ById(string id)
        {
            return TwoLevelCache.Get<UserDefinition>("UserByID_" + id, TimeSpan.Zero, TimeSpan.FromDays(1), fld.GenerationKey, () =>
            {
                return GetFirst(null, Convert.ToInt32(id));
            });
        }

        public IUserDefinition ByUsername(string username)
        {
            if (username.IsEmptyOrNull())
                return null;

            return TwoLevelCache.Get<UserDefinition>("UserByName_" + username.ToLowerInvariant(),
                TimeSpan.Zero, TimeSpan.FromDays(1), fld.GenerationKey, () =>
            {
                return GetFirst(username, 0);
            });
        }

        public void LoadUserMenuAndPermistions(string username, string currentModule = "LAMS")
        {
            TwoLevelCache.Remove(NavigationModel.cacheKey);
            TwoLevelCache.Remove("DashboardPageModel");

            var userDefinition = ByUsername(username) as UserDefinition;
            //userDefinition.CurrentModule = currentModule;
            userDefinition.Permissions = new System.Collections.Generic.List<string>();
            List<Menu> menues = new List<Menu>();


            menues = u.GetMenus(userDefinition.Username, "ERP_BEPZA", currentModule).ToList();

            var mm = menues.FindAll(w => w.IsAssignedMenu || string.IsNullOrEmpty(w.PageUrl));

            userDefinition.Menus = mm.FindAll(f => f.IsAssignedMenu || mm.Exists(e => e.ParentMenuId == f.MenuId));


            foreach (var menu in userDefinition.Menus.FindAll(f => !string.IsNullOrEmpty(f.PageUrl)))
            {
                var pageUrl = menu.PageUrl.StartsWith("#") ? menu.PageUrl.Substring(1) : menu.PageUrl;
                pageUrl = pageUrl.Split('?')[0];

                userDefinition.Permissions.Add(pageUrl);
                //if (menu.IsViewAssigned)
                userDefinition.Permissions.Add(pageUrl + "/Read");
                if (menu.IsAddAssigned)
                    userDefinition.Permissions.Add(pageUrl + "/Insert");
                if (menu.IsEditAssigned)
                    userDefinition.Permissions.Add(pageUrl + "/Update");
                if (menu.IsDeleteAssigned)
                    userDefinition.Permissions.Add(pageUrl + "/Delete");
            }
        }
        public static void RemoveCachedUser(int? userId, string username)
        {
            if (userId != null)
                TwoLevelCache.Remove("UserByID_" + userId);

            if (username != null)
                TwoLevelCache.Remove("UserByName_" + username.ToLowerInvariant());
        }
    }
}