
namespace VistaLOAN.Setup.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Setup.LaLoanEligibleInformation")]
    [BasedOnRow(typeof(Entities.LaLoanEligibleInformationRow))]
    public class LaLoanEligibleInformationColumns
    {
        [EditLink]
        public string LoanTypeLoanTypeName { get; set; }
        public string EmployeeCategoryName { get; set; }
        public string GradeFromGradeName { get; set; }
        public string GradeToGradeName { get; set; }
        public Int32 ServiceDurationMin { get; set; }
        public Int32 MaxNoLoanApply { get; set; }

    }
}