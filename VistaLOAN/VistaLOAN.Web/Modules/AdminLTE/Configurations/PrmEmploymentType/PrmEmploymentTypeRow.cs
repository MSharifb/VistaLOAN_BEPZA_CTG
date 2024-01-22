
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Prm Employment Type"), InstanceName("Prm Employment Type"), TwoLevelCached]
    [ReadPermission("Configurations:PRM_EmploymentType:Read")]
    [InsertPermission("Configurations:PRM_EmploymentType:Insert")]
    [UpdatePermission("Configurations:PRM_EmploymentType:Update")]
    [DeletePermission("Configurations:PRM_EmploymentType:Delete")]
    [LookupScript("Configurations.PrmEmploymentType", Permission = "?")]
    public sealed class PrmEmploymentTypeRow : Row, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Name
        [DisplayName("Name"), Size(100), NotNull, QuickSearch]
        public String Name { get { return Fields.Name[this]; } set { Fields.Name[this] = value; } }
        public partial class RowFields { public StringField Name; }
        #endregion Name

        #region Sort Order
        [DisplayName("Sort Order"), NotNull]
        public Int32? SortOrder { get { return Fields.SortOrder[this]; } set { Fields.SortOrder[this] = value; } }
        public partial class RowFields { public Int32Field SortOrder; }
        #endregion SortOrder

        #region Remarks
        [DisplayName("Remarks"), Size(100)]
        public String Remarks { get { return Fields.Remarks[this]; } set { Fields.Remarks[this] = value; } }
        public partial class RowFields { public StringField Remarks; }
        #endregion Remarks

        #region I User
        [DisplayName("I User"), Size(50), NotNull]
        public String IUser { get { return Fields.IUser[this]; } set { Fields.IUser[this] = value; } }
        public partial class RowFields { public StringField IUser; }
        #endregion IUser

        #region E User
        [DisplayName("E User"), Size(50)]
        public String EUser { get { return Fields.EUser[this]; } set { Fields.EUser[this] = value; } }
        public partial class RowFields { public StringField EUser; }
        #endregion EUser

        #region I Date
        [DisplayName("I Date"), NotNull]
        public DateTime? IDate { get { return Fields.IDate[this]; } set { Fields.IDate[this] = value; } }
        public partial class RowFields { public DateTimeField IDate; }
        #endregion IDate

        #region E Date
        [DisplayName("E Date")]
        public DateTime? EDate { get { return Fields.EDate[this]; } set { Fields.EDate[this] = value; } }
        public partial class RowFields { public DateTimeField EDate; }
        #endregion EDate


        #region Foreign Fields

        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.Name; }
        }
        #endregion Id and Name fields

        #region Constructor
        public PrmEmploymentTypeRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[PRM_EmploymentType]";

        public partial class RowFields : RowFieldsBase
        {
            public RowFields()
            : base("[dbo].[PRM_EmploymentType]")
            {
                LocalTextPrefix = "Configurations.PrmEmploymentType";
            }
        }
        #endregion RowFields
    }
}
