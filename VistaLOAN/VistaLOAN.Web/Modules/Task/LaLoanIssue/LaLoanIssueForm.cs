
namespace VistaLOAN.Task.Forms
{
    using Serenity.ComponentModel;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;

    [FormScript("Task.LaLoanIssue")]
    [BasedOnRow(typeof(Entities.LaLoanIssueRow))]
    public class LaLoanIssueForm
    {
        public Int32 EmployeeId { get; set; }

        public Int32 LoanApplicationId { get; set; }

        [Hidden]
        public Int32 EffectiveMonth { get; set; }

        [Hidden]
        public Int32 EffectiveYear { get; set; }

        [ReadOnly(true)]
        public Decimal LoanAmount { get; set; }

        [Hidden,DefaultValue(0)]
        public Decimal PrincipalInstallmentAmount { get; set; }

        [DefaultValue(0)]
        public Decimal InterestAmount { get; set; }

        [Hidden, DefaultValue(0)]
        public Decimal InterestInstallmentAmount { get; set; }

        public Boolean IsFullPaid { get; set; }

        [Hidden,DefaultValue(false)]
        public Boolean IsReschedule { get; set; }

        [DefaultValue(false)]
        public Boolean IsClose { get; set; }

        public DateTime FullPaidDate { get; set; }

        [DefaultValue(0)]
        public Decimal LastPrincipalInstallmentAmount { get; set; }

        [DefaultValue(0)]
        public Decimal LastInterestInstallmentAmount { get; set; }

        [Hidden, DefaultValue(false)]
        public Boolean IsPosting { get; set; }

        public DateTime CloseDate { get; set; }

        [Category("Loan Issue Instalment")]
        [LaLoanIssueDetailEditor]
        public List<Entities.LaLoanIssueDetailRow> LaLoanIssueDetail { get; set; }

    }
}