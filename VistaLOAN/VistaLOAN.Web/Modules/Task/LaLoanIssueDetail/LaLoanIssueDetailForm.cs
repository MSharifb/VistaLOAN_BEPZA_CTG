
namespace VistaLOAN.Task.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Task.LaLoanIssueDetail")]
    [BasedOnRow(typeof(Entities.LaLoanIssueDetailRow))]
    public class LaLoanIssueDetailForm
    {
        [Hidden]
        public Int32 LoanIssueId { get; set; }
        public DateTime IssueDate { get; set; }
        public Decimal LoanPaidAmount { get; set; }

    }
}