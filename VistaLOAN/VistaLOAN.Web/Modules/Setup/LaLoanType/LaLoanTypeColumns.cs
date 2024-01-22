
namespace VistaLOAN.Setup.Columns
{
    using Serenity.ComponentModel;
    using System;

    [ColumnsScript("Setup.LaLoanType")]
    [BasedOnRow(typeof(Entities.LaLoanTypeRow))]
    public class LaLoanTypeColumns
    {

        [EditLink]
        public String LoanTypeName { get; set; }
        //public Int32 PrincipalHeadId { get; set; }
        //public Int32 InterestHeadId { get; set; }
        //public Boolean IsWelfareLoan { get; set; }
        //public Boolean IsInterestPaymentWithPricipal { get; set; }
        //public Boolean IsInterestCalculateOnIssueDate { get; set; }
        //public Int32 GracePeriodMonth { get; set; }
        //public Int32 CalculationType { get; set; }
        public String ShortCode { get; set; }
        public String PrincipalHeadHeadName { get; set; }
        public String InterestHeadHeadName { get; set; }
        public Boolean IsPfLoan { get; set; }
    }
}