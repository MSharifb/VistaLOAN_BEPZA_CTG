namespace VistaLOAN.Administration
{
    using VistaLOAN.Administration.Entities;
    using Serenity;
    using Serenity.Abstractions;
    using Serenity.Data;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class TVLSecurityPermissionService : IPermissionService
    {

        public bool HasPermission(string permission)
        {
            if (Authorization.Username == "admin" || Authorization.Username == "administrator")
                return true;

            var user = (UserDefinition)Authorization.UserDefinition;

            bool grant = user.Permissions?.Exists(e => e == permission.Replace(':', '/')) ?? false;
            return grant;
        }

    }
}