
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaMonthlyLoanInstallmentDetail")]
    [BasedOnRow(typeof(Entities.LaMonthlyLoanInstallmentDetailRow))]
    public class LaMonthlyLoanInstallmentDetailColumns
    {

        [Hidden]
        public Int32 MonthlyLoanInstallmentId { get; set; }
        [Hidden]
        public Int32 LoanIssueId { get; set; }
        [Hidden]
        public Int32 EmployeeId { get; set; }
        [EditLink,QuickFilter]
        public String LoanNo { get; set; }
        public Decimal EmpId { get; set; }
        public String EmployeeName { get; set; }
        public Decimal PrincipalInstallmentAmount { get; set; }
        public Decimal InterestInstallmentAmount { get; set; }
        public Decimal TotalInstallmentAmount { get; set; }
        [Hidden]
        public String IUser { get; set; }
        [Hidden]
        public DateTime IDate { get; set; }
        [Hidden]
        public String EUser { get; set; }
        [Hidden]
        public DateTime EDate { get; set; }
    }
}