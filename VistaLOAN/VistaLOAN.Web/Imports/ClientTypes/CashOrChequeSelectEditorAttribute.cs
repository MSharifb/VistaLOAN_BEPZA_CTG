using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace VistaLOAN
{
    public partial class CashOrChequeSelectEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "VistaLOAN.CashOrChequeSelectEditor";

        public CashOrChequeSelectEditorAttribute()
            : base(Key)
        {
        }

        public String EmptyOptionText
        {
            get { return GetOption<String>("emptyOptionText"); }
            set { SetOption("emptyOptionText", value); }
        }

        public object Items
        {
            get { return GetOption<object>("items"); }
            set { SetOption("items", value); }
        }
    }
}

