namespace VistaLOAN
{
    using Serenity.ComponentModel;
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// This data will be available from script code using a dynamic script.
    /// Add properties you need from script code and set them in UserEndpoint.GetUserData.
    /// </summary>
    [ScriptInclude]
    public class ScriptUserDefinition
    {
        public String Username { get; set; }
        public String DisplayName { get; set; }
        public Boolean IsAdmin { get; set; }
        public int FundControlInformationId { get; set; }
        public int BaseCurrencyId { get; set; }
        public string BaseCurrency { get; set; }
        public int ZoneID { get; set; }
        public string FundControlName { get; set; }
        public string ZoneName { get; set; }
        public string FinancialYearName { get; set; }
        public int EmpId { get; set; }
        public Dictionary<string, bool> Permissions { get; set; }
        public string DesignationName { get; set; }
        public int LoanTypeInformationId { get; set; }
        public string LoanTypeName { get; set; }
    }
}