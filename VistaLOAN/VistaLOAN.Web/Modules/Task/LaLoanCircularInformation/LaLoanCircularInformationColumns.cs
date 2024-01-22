
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaLoanCircularInformation")]
    [BasedOnRow(typeof(Entities.LaLoanCircularInformationRow))]
    public class LaLoanCircularInformationColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
        public Int32 Id { get; set; }
        public Int32 LoanTypeId { get; set; }
        public Int32 FiscalYearId { get; set; }
        public DateTime CircularDate { get; set; }
        [EditLink]
        public String ReferenceNo { get; set; }
        public String CircularDescription { get; set; }
        public byte[] Attachment { get; set; }
        public String IUser { get; set; }
        public DateTime IDate { get; set; }
        public String EUser { get; set; }
        public DateTime EDate { get; set; }
    }
}