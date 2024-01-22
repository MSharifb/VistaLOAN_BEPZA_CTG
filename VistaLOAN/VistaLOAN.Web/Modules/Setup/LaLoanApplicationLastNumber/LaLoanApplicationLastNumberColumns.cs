
namespace VistaLOAN.Setup.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Setup.LaLoanApplicationLastNumber")]
    [BasedOnRow(typeof(Entities.LaLoanApplicationLastNumberRow))]
    public class LaLoanApplicationLastNumberColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
        public Int32 Id { get; set; }
        public Int32 LoanCriteriaId { get; set; }
        public Int32 LastLoanNumber { get; set; }
    }
}