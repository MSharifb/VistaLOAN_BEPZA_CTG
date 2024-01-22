namespace VistaLOAN
{
    using Serenity;
    using Serenity.Navigation;
    using System;
    using System.Collections.Generic;

    [Serializable]
    public class UserDefinition : IUserDefinition
    {
        public string Id { get { return UserId.ToInvariant(); } }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string UserImage { get; set; }
        public short IsActive { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Source { get; set; }
        public DateTime? UpdateDate { get; set; }
        public DateTime? LastDirectoryUpdate { get; set; }

        public List<SecurityService.Menu> Menus { get; set; } // all permitted menues flat
        public List<string> Permissions { get; set; }
        public int FundControlInformationId { get; set; }
        public int ZoneID { get; set; }
        public int FinancialYearId { get; set; }
        public int BaseCurrencyId { get; set; }
        public string BaseCurrency { get; set; }
        public string FundControlName { get; set; }
        public string ZoneName { get; set; }
        public string FinancialYearName { get; set; }
        public int EmpId { get; set; }
        public string DesignationName { get; set; }
        public int LoanTypeInformationId { get; set; }
        public string LoanTypeName { get; set; }
    }
}