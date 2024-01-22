
namespace VistaLOAN.Task.Columns
{
    using Serenity.ComponentModel;
    using System;
    using System.ComponentModel;

    [ColumnsScript("Task.LaLoanApplicationOffline")]
    [BasedOnRow(typeof(Entities.LaLoanApplicationRow))]
    public class LaLoanApplicationOfflineColumns
    {
        [EditLink, Width(50)]
        public String EmpId { get; set; }

        [EditLink]
        public String EmployeeName { get; set; }
        [QuickFilter]
        public String LoanNo { get; set; }

        //public Int32 EmployeeId { get; set; }
        //public Int32 SeniorityNo { get; set; }

        [AlignRight]
        public DateTime ApplyDate { get; set; }

        [DisplayName("Loan Amount"), AlignRight]
        public Decimal ApplyLoanAmount { get; set; }

        //public Int32 ApplyPrincipalInstallmentNo { get; set; }

        [DisplayName("Interest Amount"), AlignRight]
        public Decimal ApplyInterestAmount { get; set; }

        //public Int32 ApplyInterestInstallmentNo { get; set; }
        //public Decimal ApplyInterestRate { get; set; }

        public String Purpose { get; set; }

        [DisplayName("Approved Loan"), AlignRight]
        public Decimal GrantedLoanAmount { get; set; }

        //public Int32 GrantedPrincipalInstallmentNo { get; set; }

        [DisplayName("Approved Interest"), AlignRight]
        public Decimal GrantedInterestAmount { get; set; }

        //public Int32 GrantedInterestInstallmentNo { get; set; }
        //public Decimal GrantedInterestRate { get; set; }
        //public Int32 NodeId { get; set; }
        //public String ApproverId { get; set; }
        //public Int32 AppStatusId { get; set; }

        [QuickFilter, FilterOnly]
        public Int32 LoanCriteriaId { get; set; }

        public String LoanCriteriaSchemeName { get; set; }

        //public Boolean IsDiscard { get; set; }
        //public Boolean IsOffLine { get; set; }

        [Width(50)]
        public String StatusName { get; set; }

        public DateTime ApprovedDate { get; set; }
        [QuickFilter]
        public String PFLoanType { get; set; }

        //public Boolean IsReApply { get; set; }

        public Boolean IsIssue { get; set; }

        //public Boolean IsApprovalProcess { get; set; }

        //public String ResponsiblePersonId { get; set; }
    }
}