
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaLoanIssueDetail")]
    [BasedOnRow(typeof(Entities.LaLoanIssueDetailRow))]
    public class LaLoanIssueDetailColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight,Hidden]
        public Int32 Id { get; set; }
        [Hidden]
        public Int32 LoanIssueId { get; set; }
        public DateTime IssueDate { get; set; }
        public Decimal LoanPaidAmount { get; set; }
        //[EditLink]
        //public String IUser { get; set; }
        //public DateTime IDate { get; set; }
        //public String EUser { get; set; }
        //public DateTime EDate { get; set; }
    }
}