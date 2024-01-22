
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaLoanApplication")]
    [BasedOnRow(typeof(Entities.LaLoanApplicationRow))]
    public class LaLoanApplicationColumns
    {

        [EditLink]
        public String EmployeeName { get; set; }

        public String LoanNo { get; set; }

        //public Int32 EmployeeId { get; set; }
        //public Int32 SeniorityNo { get; set; }

        public DateTime ApplyDate { get; set; }

        //public Int32 LoanCriteriaId { get; set; }

        public String LoanCriteriaSchemeName { get; set; }

        [DisplayName("Loan Amount")]
        public Decimal ApplyLoanAmount { get; set; }
        //public Int32 ApplyPrincipalInstallmentNo { get; set; }
        [DisplayName("Interest Amount")]
        public Decimal ApplyInterestAmount { get; set; }
        //public Int32 ApplyInterestInstallmentNo { get; set; }
        //public Decimal ApplyInterestRate { get; set; }
        public String Purpose { get; set; }
        [DisplayName("Approved Loan Amount")]
        public Decimal GrantedLoanAmount { get; set; }
        //public Int32 GrantedPrincipalInstallmentNo { get; set; }
        [DisplayName("Approved Interest Amount")]
        public Decimal GrantedInterestAmount { get; set; }
        //public Int32 GrantedInterestInstallmentNo { get; set; }
        //public Decimal GrantedInterestRate { get; set; }
        //public Int32 NodeId { get; set; }
        //public String ApproverId { get; set; }
        //public Int32 AppStatusId { get; set; }
        public String StatusName { get; set; }
        //public Boolean IsDiscard { get; set; }
        //public Boolean IsApprovalProcess { get; set; }
        //public Boolean IsOffLine { get; set; }

        //public DateTime ApprovedDate { get; set; }

        //public Boolean IsReApply { get; set; }
        //public Boolean IsIssue { get; set; }
        //public String ResponsiblePersonId { get; set; }
    }
}