
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaRequestedLoanApplication")]
    [BasedOnRow(typeof(Entities.LaRequestedLoanApplicationRow))]
    public class LaRequestedLoanApplicationColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public Int32 Id { get; set; }
        [EditLink]
        public String EmployeeName { get; set; }
        public String LoanNo { get; set; }
        public DateTime ApplyDate { get; set; }
        public String LoanCriteriaSchemeName { get; set; }
        [DisplayName("Loan Amount")]
        public Decimal ApplyLoanAmount { get; set; }
        [DisplayName("Interest Amount")]
        public Decimal ApplyInterestAmount { get; set; }
        public String Purpose { get; set; }
        [DisplayName("Approved Loan Amount")]
        public Decimal GrantedLoanAmount { get; set; }
        [DisplayName("Approved Interest Amount")]
        public Decimal GrantedInterestAmount { get; set; }
        public String StatusName { get; set; }
    }
}