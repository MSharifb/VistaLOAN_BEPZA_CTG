
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaMonthlyLoanInstallment")]
    [BasedOnRow(typeof(Entities.LaMonthlyLoanInstallmentRow))]
    public class LaMonthlyLoanInstallmentColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight,Hidden]
        public Int32 Id { get; set; }
        [EditLink,SortOrder(1,true)]
        public String ForMonth { get; set; }
        public String ForYear { get; set; }
        [Hidden]
        public String IUser { get; set; }
        public DateTime IDate { get; set; }
        [Hidden]
        public String EUser { get; set; }
        [Hidden]
        public DateTime EDate { get; set; }
        [Hidden]
        public Decimal TotalPrincipalInstallmentAmount { get; set; }
        [Hidden]
        public Decimal TotalInterestInstallmentAmount { get; set; }
        [Hidden]
        public Boolean IsProcess { get; set; }
    }
}