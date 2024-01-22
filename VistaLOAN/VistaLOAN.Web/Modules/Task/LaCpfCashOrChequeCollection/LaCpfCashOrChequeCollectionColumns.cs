
namespace VistaLOAN.Task.Columns
{
    using Serenity.ComponentModel;
    using System;

    [ColumnsScript("Task.LaCpfCashOrChequeCollection")]
    [BasedOnRow(typeof(Entities.LaCpfCashOrChequeCollectionRow))]
    public class LaCpfCashOrChequeCollectionColumns
    {
        [EditLink, Width(70), QuickFilter]
        public String EmployeeEmpId { get; set; }

        [EditLink]
        public String EmployeeFullName { get; set; }

        [EditLink, Width(50), QuickFilter]
        public String CollectionMonth { get; set; }

        [Width(50), QuickFilter]
        public String CollectionYear { get; set; }

        [Width(50)]
        public String CashorCheque { get; set; }

        [Width(150), QuickFilter]
        public CollectionType CollectionType { get; set; }

        [Width(70)]
        public String ApplicationLoanNo { get; set; }

        [AlignRight, Width(90)]
        public DateTime ApplicationApplyDate { get; set; }

        [AlignRight, Width(70)]
        public Decimal PrincipalInstallment { get; set; }

        [AlignRight, Width(70)]
        public Decimal InterestInstallment { get; set; }

        [AlignRight, Width(70)]
        public Decimal PfOwnContribution { get; set; }

        public String Remarks { get; set; }

    }
}