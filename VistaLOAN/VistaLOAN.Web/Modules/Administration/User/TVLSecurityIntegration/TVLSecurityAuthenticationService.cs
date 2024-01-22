namespace VistaLOAN.Administration
{
    using Entities;
    using Repositories;
    using Serenity;
    using Serenity.Abstractions;
    using Serenity.Data;
    using System;

    public class TVLSecurityAuthenticationService : IAuthenticationService
    {
        public bool Validate(ref string username, string password)
        {
            if (username.IsTrimmedEmpty() || string.IsNullOrEmpty(password))
                return false;

            username = username.TrimToEmpty();

            SecurityService.UserManagementServiceClient u = new SecurityService.UserManagementServiceClient();
            var isValidUser = u.ValidateUser(username, password);
            return isValidUser;
        }

    }
}