
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.NonRefundableFinalPayment")]
    [BasedOnRow(typeof(Entities.NonRefundableFinalPaymentRow))]
    public class NonRefundableFinalPaymentColumns
    {
        [EditLink, Width(50)]
        public String EmpId { get; set; }

        [EditLink]
        public String EmployeeName { get; set; }
        [QuickFilter]
        public String LoanNo { get; set; }

        [AlignRight]
        public DateTime ApplyDate { get; set; }

        [DisplayName("Loan Amount"), AlignRight]
        public Decimal ApplyLoanAmount { get; set; }

        [DisplayName("Interest Amount"), AlignRight]
        public Decimal ApplyInterestAmount { get; set; }

        public String Purpose { get; set; }

        [DisplayName("Approved Loan"), AlignRight]
        public Decimal GrantedLoanAmount { get; set; }

        [DisplayName("Approved Interest"), AlignRight]
        public Decimal GrantedInterestAmount { get; set; }

        [QuickFilter, FilterOnly]
        public Int32 LoanCriteriaId { get; set; }

        public String LoanCriteriaSchemeName { get; set; }

        [Width(50)]
        public String StatusName { get; set; }

        public DateTime ApprovedDate { get; set; }
        [QuickFilter]
        public String PFLoanType { get; set; }

        public Boolean IsIssue { get; set; }
    }
}