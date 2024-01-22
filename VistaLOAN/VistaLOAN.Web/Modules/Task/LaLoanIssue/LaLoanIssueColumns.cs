
namespace VistaLOAN.Task.Columns
{
    using Serenity.ComponentModel;
    using System;

    [ColumnsScript("Task.LaLoanIssue")]
    [BasedOnRow(typeof(Entities.LaLoanIssueRow))]
    public class LaLoanIssueColumns
    {

        [EditLink, Width(100)]
        public String LoanApplicationLoanNo { get; set; }

        [EditLink, Width(100)]
        public String EmpId { get; set; }

        public String EmpFullName { get; set; }

        //public Int32 EffectiveMonth { get; set; }
        //public Int32 EffectiveYear { get; set; }

        [AlignRight]
        public Decimal LoanAmount { get; set; }

        //public Decimal PrincipalInstallmentAmount { get; set; }

        [AlignRight]
        public Decimal InterestAmount { get; set; }

        //public Decimal InterestInstallmentAmount { get; set; }
        //public Decimal LastPrincipalInstallmentAmount { get; set; }
        //public Decimal LastInterestInstallmentAmount { get; set; }

        public Boolean IsFullPaid { get; set; }

        [AlignRight]
        public DateTime FullPaidDate { get; set; }

        //public Boolean IsReschedule { get; set; }

        public Boolean IsClose { get; set; }

        //public Boolean IsPosting { get; set; }
    }
}