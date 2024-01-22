using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace VistaLOAN.Task
{
    public partial class LaLoanIssueDetailEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "VistaLOAN.Task.LaLoanIssueDetailEditor";

        public LaLoanIssueDetailEditorAttribute()
            : base(Key)
        {
        }
    }
}

