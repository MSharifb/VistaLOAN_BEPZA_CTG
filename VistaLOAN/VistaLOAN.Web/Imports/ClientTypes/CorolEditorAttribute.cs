using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace VistaLOAN
{
    public partial class CorolEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "VistaLOAN.CorolEditor";

        public CorolEditorAttribute()
            : base(Key)
        {
        }
    }
}

