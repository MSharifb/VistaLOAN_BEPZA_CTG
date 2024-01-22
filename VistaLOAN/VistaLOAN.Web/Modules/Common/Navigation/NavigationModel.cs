
namespace VistaLOAN.Navigation
{
    using VistaLOAN.Administration.Entities;
    using Serenity;
    using Serenity.Navigation;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Linq;
    using System.Web;
    using System.Web.Hosting;

    public partial class NavigationModel
    {
        public static string cacheKey = "LeftNavigationModel:NavigationItems:" + (Authorization.UserId ?? "-1");
        public List<NavigationItem> Items { get; private set; }
        public int[] ActivePath { get; set; }

        public NavigationModel()
        {
            Items = TwoLevelCache.GetLocalStoreOnly(cacheKey, TimeSpan.Zero,
                UserPermissionRow.Fields.GenerationKey, () =>
                    GetNavItems()
                        );

            SetActivePath();
        }
        public List<NavigationItem> GetNavItems()
        {
            if (ConfigurationManager.AppSettings["UseExtarnalUserManagementService"] == "true")
            {
                var user = Authorization.UserDefinition as UserDefinition;
                var menus = user?.Menus?.Select(s => new MyNavigationItem
                {
                    Id = s.MenuId,
                    ParentId = s.ParentMenuId < 0 ? 0 : s.ParentMenuId,
                    Serial = s.SerialNo,
                    Title = s.MenuCaption,
                    Url = s.PageUrl,

                }).OrderBy(o => o.Serial).ToList();

                var rootMenues = menus?.Where(f => f?.ParentId == 0)?.ToList();
                menus?.RemoveAll(f => f?.ParentId == 0);
                if (rootMenues != null)
                {
                    foreach (var menu in rootMenues)
                    {
                        if (menus.Exists(e => e.ParentId == menu.Id))
                        {
                            menu?.AddChildren(FlatToHierarchy(menus, menu.Id));
                            menus?.RemoveAll(f => f.ParentId == menu.Id);
                        }
                    }
                    rootMenues.RemoveAll(f => f.Children.Count == 0);
                    rootMenues.Insert(0, new MyNavigationItem
                    {
                        Serial = 0,
                        Title = "Dashboard",
                        Url = VirtualPathUtility.ToAbsolute("~/")
                    });
                }

                return rootMenues?.ToList<NavigationItem>() ?? new List<NavigationItem>();
            }
            else
            {
                return NavigationHelper.GetNavigationItems(x => x != null && x.StartsWith("~/") ? VirtualPathUtility.ToAbsolute(x) : x);
            }
        }

        public static List<MyNavigationItem> FlatToHierarchy(IEnumerable<MyNavigationItem> list, int parentId = 0)
        {
            return (from i in list
                    where i.ParentId == parentId
                    select new MyNavigationItem
                    {
                        Id = i.Id,
                        Title = i.Title,
                        Url = i.Url.StartsWith("~/") ? VirtualPathUtility.ToAbsolute(i.Url) : VirtualPathUtility.ToAbsolute("~/" + i.Url),
                        ParentId = i.ParentId,
                        Children_ = list.Any(a => a.ParentId == i.Id) ? FlatToHierarchy(list, i.Id) : new List<MyNavigationItem>(),
                        ModuleId = i.ModuleId
                    }).ToList();
        }

        private void SetActivePath()
        {
            string currentUrl = "";
            if (HttpContext.Current != null)
            {
                var requestUrl = HttpContext.Current.Request.Url;
                currentUrl = requestUrl.ToString();
                if (!requestUrl.ToString().EndsWith("/") &&
                    String.Compare(requestUrl.AbsolutePath, HostingEnvironment.ApplicationVirtualPath, StringComparison.OrdinalIgnoreCase) == 0)
                    currentUrl += "/";
            }

            int[] currentPath = new int[10];
            int[] bestMatch = null;
            int bestMatchLength = 0;

            foreach (var item in Items)
                SearchActivePath(item, currentUrl, currentPath, 0, ref bestMatch, ref bestMatchLength);

            ActivePath = bestMatch == null ? new int[10] { -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 } : bestMatch;
        }

        private void SearchActivePath(NavigationItem link, string currentUrl, int[] currentPath, int depth,
            ref int[] bestMatch, ref int bestMatchLength)
        {
            currentPath[depth + 1] = 0;
            var url = link.Url ?? "";

            if (url != null && url.StartsWith("~/", StringComparison.Ordinal))
                url = VirtualPathUtility.ToAbsolute(url);

            if (currentUrl.IndexOf(url, StringComparison.OrdinalIgnoreCase) >= 0 &&
                (bestMatchLength == 0 || url.Length > bestMatchLength))
            {
                bestMatch = (int[])currentPath.Clone();
                bestMatchLength = url.Length;
            }

            if (depth <= 9)
            {
                foreach (var child in link.Children)
                    SearchActivePath(child, currentUrl, currentPath, depth + 1, ref bestMatch, ref bestMatchLength);
            }

            currentPath[depth]++;
        }
    }
}