namespace VistaLOAN
{
    using Administration;
    using Serenity;
    using Serenity.Abstractions;
    using Serenity.Data;
    using Serenity.Web;
    using System;
    using System.Configuration;

    public static partial class SiteInitialization
    {
        public static void ApplicationStart()
        {
            try
            {
                SqlSettings.AutoQuotedIdentifiers = true;
                Serenity.Web.CommonInitialization.Run();

                var registrar = Dependency.Resolve<IDependencyRegistrar>();
                registrar.RegisterInstance<IAuthorizationService>(new Administration.AuthorizationService());
                if (ConfigurationManager.AppSettings["UseExtarnalUserManagementService"] == "true")
                {
                    registrar.RegisterInstance<IAuthenticationService>(new TVLSecurityAuthenticationService());
                    registrar.RegisterInstance<IPermissionService>(new LogicOperatorPermissionService(new TVLSecurityPermissionService()));
                    registrar.RegisterInstance<IUserRetrieveService>(new TVLSecurityUserRetrieveService());
                }
                else
                {
                    registrar.RegisterInstance<IAuthenticationService>(new AuthenticationService());
                    registrar.RegisterInstance<IPermissionService>(new LogicOperatorPermissionService(new PermissionService()));
                    registrar.RegisterInstance<IUserRetrieveService>(new UserRetrieveService());
                }

                if (!ConfigurationManager.AppSettings["LDAP"].IsTrimmedEmpty())
                    registrar.RegisterInstance<IDirectoryService>(new LdapDirectoryService());

                if (!ConfigurationManager.AppSettings["ActiveDirectory"].IsTrimmedEmpty())
                    registrar.RegisterInstance<IDirectoryService>(new ActiveDirectoryService());

                InitializeExceptionLog();
            }
            catch (Exception ex)
            {
                ex.Log();
                throw;
            }

            foreach (var databaseKey in databaseKeys)
            {
                EnsureDatabase(databaseKey);
                RunMigrations(databaseKey);
            }
        }

        public static void ApplicationEnd()
        {
        }
    }
}