
namespace VistaLOAN.Setup.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("Setup.LaLoanEligibleInformation")]
    [BasedOnRow(typeof(Entities.LaLoanEligibleInformationRow))]
    public class LaLoanEligibleInformationForm
    {
        public Int32 LoanTypeId { get; set; }
        public Int32 EmployeeCategoryId { get; set; }
        public Int32 GradeFromId { get; set; }
        public Int32 GradeToId { get; set; }
        public Int32 ServiceDurationMin { get; set; }
        public Int32 MaxNoLoanApply { get; set; }
    }
}