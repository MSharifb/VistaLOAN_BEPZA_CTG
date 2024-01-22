using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace VistaLOAN
{
    public partial class MonthListEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "VistaLOAN.MonthListEditor";

        public MonthListEditorAttribute()
            : base(Key)
        {
        }
    }
}

