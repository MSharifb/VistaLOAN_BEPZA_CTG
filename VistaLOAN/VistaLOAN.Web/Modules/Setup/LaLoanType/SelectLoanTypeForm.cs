using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace VistaLOAN.Setup.Forms
{
    [FormScript("Setup.SelectLoanTypeForm")]
    public class SelectLoanTypeForm
    {
        [DisplayName("Loan Type")]
        [LookupEditor(typeof(Setup.Entities.LaLoanTypeRow))]
        public Int32 LoanTypeInformationId { get; set; }
    }
}