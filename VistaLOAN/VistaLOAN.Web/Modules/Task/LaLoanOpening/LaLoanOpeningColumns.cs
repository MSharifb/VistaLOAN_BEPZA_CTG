
namespace VistaLOAN.Task.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Task.LaLoanOpening")]
    [BasedOnRow(typeof(Entities.LaLoanOpeningRow))]
    public class LaLoanOpeningColumns
    {

        [EditLink, Width(100)]
        public String LoanApplicationLoanNo { get; set; }

        [Width(100)]
        public String EmpId { get; set; }

        public String EmployeeName { get; set; }

        [DisplayName("Loan Amount"), AlignRight]
        public Decimal LoanApplicationGrantedLoanAmount { get; set; }

        //public String BalanceMonth { get; set; }
        //public String BalanceYear { get; set; }
        //public Int32 PrincipalInstallmentNo { get; set; }
        //public Decimal PrincipalInstallmentAmount { get; set; }

        [AlignRight]
        public Decimal PrincipalPaidAmount { get; set; }

        [AlignRight]
        public Decimal PrincipalDueAmount { get; set; }

        //public Int32 InterestInstallmentNo { get; set; }
        //public Decimal InterestInstallmentAmount { get; set; }

        [AlignRight]
        public Decimal InterestPaidAmount { get; set; }

        [AlignRight]
        public Decimal InterestDueAmount { get; set; }

        //public Int32 LoanApplicationId { get; set; }

        [QuickFilter, FilterOnly]
        public int LoanApplicationLoanCriteriaId { get; set; }

    }
}