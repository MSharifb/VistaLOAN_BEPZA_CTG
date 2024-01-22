
namespace VistaLOAN.Task.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Task.LaCpfCashOrChequeCollection")]
    [BasedOnRow(typeof(Entities.LaCpfCashOrChequeCollectionRow))]
    public class LaCpfCashOrChequeCollectionForm
    {
        [Category("Properties")]
        public Int32 EmployeeId { get; set; }

        [MonthListEditor]
        public String CollectionMonth { get; set; }

        public String CollectionYear { get; set; }

        [CashOrChequeSelectEditor]
        public String CashorCheque { get; set; }

        public DateTime? CollectionDate { get; set; }

        [TextAreaEditor(Rows = 2)]
        public String Remarks { get; set; }

        [DisplayName("Collection Type"), RadioButtonEditor]
        public CollectionType CollectionType { get; set; }

        [Category("Loan Installment")]
        public Int32 ApplicationId { get; set; }
        [DecimalEditor(MinValue = "-999999999.99", MaxValue = "999999999.99"), HalfWidth]
        public Decimal PrincipalInstallment { get; set; }
        [DecimalEditor(MinValue = "-999999999.99", MaxValue = "999999999.99"), HalfWidth]
        public Decimal InterestInstallment { get; set; }

        [Category("PF Contribution")]
        [DecimalEditor(MinValue = "-999999999.99", MaxValue = "999999999.99"),HalfWidth]
        public Decimal PfOwnContribution { get; set; }
        [DecimalEditor(MinValue = "-999999999.99", MaxValue = "999999999.99"),HalfWidth]
        public Decimal PFOwnInterest { get; set; }
        [DecimalEditor(MinValue = "-999999999.99", MaxValue = "999999999.99"),HalfWidth]
        public Decimal PFCompanyContribution { get; set; }
        [DecimalEditor(MinValue = "-999999999.99", MaxValue = "999999999.99"),HalfWidth]
        public Decimal PFCompanyInterest { get; set; }

    }
}