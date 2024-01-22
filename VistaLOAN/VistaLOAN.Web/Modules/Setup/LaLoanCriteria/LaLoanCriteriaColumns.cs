
namespace VistaLOAN.Setup.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Setup.LaLoanCriteria")]
    [BasedOnRow(typeof(Entities.LaLoanCriteriaRow))]
    public class LaLoanCriteriaColumns
    {

        [EditLink]
        public String SchemeName { get; set; }

        public String LoanTypeLoanTypeName { get; set; }


    }
}