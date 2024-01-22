using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace VistaLOAN.Task
{
    public partial class LaMonthlyLoanInstallmentDetailEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "VistaLOAN.Task.LaMonthlyLoanInstallmentDetailEditor";

        public LaMonthlyLoanInstallmentDetailEditorAttribute()
            : base(Key)
        {
        }
    }
}

