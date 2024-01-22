
namespace VistaLOAN.Task.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Task.LaLoanCircularInformation")]
    [BasedOnRow(typeof(Entities.LaLoanCircularInformationRow))]
    public class LaLoanCircularInformationForm
    {
        public Int32 LoanTypeId { get; set; }
        public Int32 FiscalYearId { get; set; }
        public DateTime CircularDate { get; set; }
        public String ReferenceNo { get; set; }
        public String CircularDescription { get; set; }
        public byte[] Attachment { get; set; }
        public String IUser { get; set; }
        public DateTime IDate { get; set; }
        public String EUser { get; set; }
        public DateTime EDate { get; set; }
    }
}