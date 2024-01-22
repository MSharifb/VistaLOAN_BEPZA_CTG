
namespace VistaLOAN.Setup.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Setup.LaLoanApplicationLastNumber")]
    [BasedOnRow(typeof(Entities.LaLoanApplicationLastNumberRow))]
    public class LaLoanApplicationLastNumberForm
    {
        public Int32 LoanCriteriaId { get; set; }
        public Int32 LastLoanNumber { get; set; }
    }
}