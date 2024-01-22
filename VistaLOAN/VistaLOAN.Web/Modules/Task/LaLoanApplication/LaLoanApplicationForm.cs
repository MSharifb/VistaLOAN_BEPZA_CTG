﻿
namespace VistaLOAN.Task.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Task.LaLoanApplication")]
    [BasedOnRow(typeof(Entities.LaLoanApplicationRow))]
    public class LaLoanApplicationForm
    {
        [OneWay, ReadOnly(true),HalfWidth]
        public String EmployeeName { get; set; }
        [Hidden]
        public Int32 EmployeeId { get; set; }
        [Hidden,DefaultValue(0)]
        public Int32 SeniorityNo { get; set; }
        [HalfWidth]
        public Int32 LoanCriteriaId { get; set; }
        [ReadOnly(true), HalfWidth]
        public String LoanNo { get; set; }
        [DisplayName("Application Date"), HalfWidth, DefaultValue("Now")]
        public DateTime ApplyDate { get; set; }
        [DisplayName("Loan Amount"), HalfWidth]
        public Decimal ApplyLoanAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 ApplyPrincipalInstallmentNo { get; set; }

        [DisplayName("Interest Amount"),DefaultValue(0), Hidden]
        public Decimal ApplyInterestAmount { get; set; }

        [Hidden, DefaultValue(0)]
        public Int32 ApplyInterestInstallmentNo { get; set; }
        [Hidden, DefaultValue(0)]
        public Decimal ApplyInterestRate { get; set; }
        public String Purpose { get; set; }
        [Hidden, DefaultValue(0)]
        public Decimal GrantedLoanAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 GrantedPrincipalInstallmentNo { get; set; }
        [Hidden, DefaultValue(0)]
        public Decimal GrantedInterestAmount { get; set; }
        [Hidden, DefaultValue(0)]
        public Int32 GrantedInterestInstallmentNo { get; set; }
        [Hidden, DefaultValue(0)]
        public Decimal GrantedInterestRate { get; set; }
        [Hidden,DefaultValue(0)]
        public Int32 NodeId { get; set; }
        [HalfWidth]
        public String ApproverId { get; set; }
        [ReadOnly(true), HalfWidth]
        public Int32 AppStatusId { get; set; }
        [Hidden]
        public Boolean IsDiscard { get; set; }
        [Hidden]
        public Boolean IsApprovalProcess { get; set; }
        [Hidden,DefaultValue(false)]
        public Boolean IsOffLine { get; set; }
        [Hidden]
        public String IUser { get; set; }
        [Hidden]
        public DateTime IDate { get; set; }
        [Hidden]
        public String EUser { get; set; }
        [Hidden]
        public DateTime EDate { get; set; }
        [Hidden]
        public DateTime ApprovedDate { get; set; }
        [PFLoanTypeEditor, HalfWidth, ReadOnly(true)]
        public string PFLoanType { get; set; }
        [Hidden]
        public Boolean IsReApply { get; set; }
        [Hidden,DefaultValue(false)]
        public Boolean IsIssue { get; set; }
        [Hidden]
        public String ResponsiblePersonId { get; set; }
        [ReadOnly(true), HalfWidth]
        public Int32 EmployeeWiseLoanId { get; set; }
        [HalfWidth]
        public Decimal NonRefundPFOwnLoanAmount { get; set; }
        [HalfWidth]
        public Decimal NonRefundPFCompanyLoanAmount { get; set; }
        [HalfWidth]
        public Decimal NonRefundOwnInterestLoanAmount { get; set; }
        [HalfWidth]
        public Decimal NonRefundCompanyInterestLoanAmount { get; set; }

        [OneWay, ReadOnly(true), DisplayName("Own Contribution"), HalfWidth]
        public decimal EmpOwnContribution { get; set; }
        [OneWay, ReadOnly(true), DisplayName("Own Interest"), HalfWidth]
        public decimal EmpOwnInterest { get; set; }
        [OneWay, ReadOnly(true), DisplayName("BEPZA Contribution"), HalfWidth]
        public decimal CompanyContribution { get; set; }
        [OneWay, ReadOnly(true), DisplayName("BEPZA Interest"), HalfWidth]
        public decimal CompanyInterest { get; set; }
        [OneWay,Hidden]
        public String Signature { get; set; }
        [OneWay]
        public String Sign { get; set; }

    }
}