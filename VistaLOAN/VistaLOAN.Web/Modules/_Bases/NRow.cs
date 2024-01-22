using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace VistaLOAN
{
    public abstract class NRow : Row, ILoggingRow
    {
        [NotMapped]
        public int? __id { get { return Fields.__id[this]; } set { Fields.__id[this] = value; } }

        [DisplayName("Insert Date")]
        public DateTime? IDate { get { return Fields.IDate[this]; } set { Fields.IDate[this] = value; } }

        [DisplayName("Insert User Id")]
        public string IUser { get { return Fields.IUser[this]; } set { Fields.IUser[this] = value; } }

        [DisplayName("Update Date")]
        public DateTime? EDate { get { return Fields.EDate[this]; } set { Fields.EDate[this] = value; } }

        [DisplayName("Update User Id")]
        public string EUser { get { return Fields.EUser[this]; } set { Fields.EUser[this] = value; } }

        IIdField IInsertLogRow.InsertUserIdField
        {
            get { return Fields.IUser; }
        }

        IIdField IUpdateLogRow.UpdateUserIdField
        {
            get { return Fields.EUser; }
        }

        DateTimeField IInsertLogRow.InsertDateField
        {
            get { return Fields.IDate; }
        }

        DateTimeField IUpdateLogRow.UpdateDateField
        {
            get { return Fields.EDate; }
        }

        public NRow(NRowFields fields) : base(fields)
        {
            Fields = fields;
        }

        private NRowFields Fields;

        public abstract class NRowFields : RowFieldsBase
        {

            public Int32Field __id;
            public StringField IUser;
            public StringField EUser;
            public DateTimeField IDate;
            public DateTimeField EDate;

            public NRowFields(string tableName = null, string fieldPrefix = "") : base(tableName, fieldPrefix)
            {

            }
        }

    }
}