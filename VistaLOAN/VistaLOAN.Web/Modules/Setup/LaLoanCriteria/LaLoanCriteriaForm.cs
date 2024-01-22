
namespace VistaLOAN.Setup.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Setup.LaLoanCriteria")]
    [BasedOnRow(typeof(Entities.LaLoanCriteriaRow))]
    public class LaLoanCriteriaForm
    {
        public String SchemeName { get; set; }
        public Int32 LoanTypeId { get; set; }
    }
}