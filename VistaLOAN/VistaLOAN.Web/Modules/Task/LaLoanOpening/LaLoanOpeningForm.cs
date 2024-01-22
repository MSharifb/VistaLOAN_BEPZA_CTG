
namespace VistaLOAN.Task.Forms
{
    using Serenity.ComponentModel;
    using System;
    using System.ComponentModel;

    [FormScript("Task.LaLoanOpening")]
    [BasedOnRow(typeof(Entities.LaLoanOpeningRow))]
    public class LaLoanOpeningForm
    {
        public Int32 EmployeeId { get; set; }

        public Int32 LoanApplicationId { get; set; }

        [MonthListEditor]
        public String BalanceMonth { get; set; }

        public String BalanceYear { get; set; }

        [Hidden, DefaultValue(0)]
        public Int32 PrincipalInstallmentNo { get; set; }

        [Hidden, DefaultValue(0)]
        public Decimal PrincipalInstallmentAmount { get; set; }

        [DisplayName("Loan Amount"), OneWay, ReadOnly(true)]
        public Decimal LoanAmount { get; set; }

        [DisplayName("Interest Amount"), OneWay, ReadOnly(true)]
        public Decimal InterestAmount { get; set; }

        public Decimal PrincipalPaidAmount { get; set; }

        [ReadOnly(true)]
        [DecimalEditor(MaxValue = "999999999.99", MinValue = "-999999999.99")]
        public Decimal PrincipalDueAmount { get; set; }

        [Hidden, DefaultValue(0)]
        public Int32 InterestInstallmentNo { get; set; }

        [Hidden, DefaultValue(0)]
        public Decimal InterestInstallmentAmount { get; set; }

        [DefaultValue(0)]
        public Decimal InterestPaidAmount { get; set; }

        [DefaultValue(0)]
        [DecimalEditor(MaxValue = "999999999.99", MinValue = "-999999999.99")]
        public Decimal InterestDueAmount { get; set; }

    }
}