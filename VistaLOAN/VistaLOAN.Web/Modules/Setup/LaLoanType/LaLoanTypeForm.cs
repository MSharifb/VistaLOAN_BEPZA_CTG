
namespace VistaLOAN.Setup.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Setup.LaLoanType")]
    [BasedOnRow(typeof(Entities.LaLoanTypeRow))]
    public class LaLoanTypeForm
    {
        public String LoanTypeName { get; set; }
        public Int32 PrincipalHeadId { get; set; }
        public Int32 InterestHeadId { get; set; }
        public Boolean IsWelfareLoan { get; set; }
        public Boolean IsPfLoan { get; set; }
        public Boolean IsInterestPaymentWithPricipal { get; set; }
        public Boolean IsInterestCalculateOnIssueDate { get; set; }
        public Int32 GracePeriodMonth { get; set; }

        public Int32 CalculationType { get; set; }
        public String ShortCode { get; set; }

    }
}