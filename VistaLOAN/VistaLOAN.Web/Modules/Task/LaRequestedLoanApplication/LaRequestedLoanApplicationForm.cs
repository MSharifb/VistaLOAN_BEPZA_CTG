
namespace VistaLOAN.Task.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Task.LaRequestedLoanApplication")]
    [BasedOnRow(typeof(Entities.LaRequestedLoanApplicationRow))]
    public class LaRequestedLoanApplicationForm
    {
        [Category("Application Information")]
        [OneWay, ReadOnly(true)]
        public String EmployeeName { get; set; }
        [Hidden]
        public Int32 EmployeeId { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 SeniorityNo { get; set; }
        [ReadOnly(true)]
        public Int32 LoanCriteriaId { get; set; }
        [ReadOnly(true)]
        public String LoanNo { get; set; }
        [DisplayName("Application Date"), ReadOnly(true)]
        public DateTime ApplyDate { get; set; }
        [DisplayName("Loan Amount"), ReadOnly(true)]
        public Decimal ApplyLoanAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 ApplyPrincipalInstallmentNo { get; set; }
        [DisplayName("Interest Amount"), ReadOnly(true)]
        public Decimal ApplyInterestAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 ApplyInterestInstallmentNo { get; set; }
        [Hidden, DefaultValue(0)]
        public Decimal ApplyInterestRate { get; set; }
        [ReadOnly(true)]
        public String Purpose { get; set; }
        [Category("Recommender/Approver Information")]
        [DisplayName("Approved Loan Amount"),Required]
        public Decimal GrantedLoanAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 GrantedPrincipalInstallmentNo { get; set; }
        [DisplayName("Approved Interest Amount"), DefaultValue(0)]
        public Decimal GrantedInterestAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 GrantedInterestInstallmentNo { get; set; }
        [Hidden, DefaultValue(0)]
        public Decimal GrantedInterestRate { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 NodeId { get; set; }
        [Hidden]
        public String ApproverId { get; set; }

        public String NextApproverId { get; set; }

        [ReadOnly(true)]
        public Int32 AppStatusId { get; set; }

        [Hidden]
        public Boolean IsDiscard { get; set; }

        [Hidden]
        public Boolean IsApprovalProcess { get; set; }

        [Hidden, DefaultValue(false)]
        public Boolean IsOffLine { get; set; }

        [Hidden]
        public DateTime ApprovedDate { get; set; }

        [DisplayName("Type"), RadioButtonEditor(EnumKey = "PFLoanType")]
        public PFLoanType PFLoanType { get; set; }

        [Hidden]
        public Boolean IsReApply { get; set; }
        [Hidden, DefaultValue(false)]
        public Boolean IsIssue { get; set; }
        [Hidden]
        public String ResponsiblePersonId { get; set; }
        [ReadOnly(true)]
        public Int32 EmployeeWiseLoanId { get; set; }
    }
}