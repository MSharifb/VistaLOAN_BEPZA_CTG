
namespace VistaLOAN.Task.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Task.LaMonthlyLoanInstallment")]
    [BasedOnRow(typeof(Entities.LaMonthlyLoanInstallmentRow))]
    public class LaMonthlyLoanInstallmentForm
    {
        [HalfWidth,ReadOnly(true),MonthListEditor]
        public string ForMonth { get; set; }
        [HalfWidth, ReadOnly(true)]
        public String ForYear { get; set; }
        [Hidden]
        public String IUser { get; set; }
        [Hidden]
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

        [Category("Loan Instalment Details")]
        [LaMonthlyLoanInstallmentDetailEditor]
        public List<Entities.LaMonthlyLoanInstallmentDetailRow> LaMonthlyLoanInstallmentDetailList { get; set; }
    }
}