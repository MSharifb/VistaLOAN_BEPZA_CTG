
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Apv Approval Status"), InstanceName("Apv Approval Status"), TwoLevelCached]
    [ReadPermission("Configurations:APV_ApprovalStatus:Read")]
    [InsertPermission("Configurations:APV_ApprovalStatus:Insert")]
    [UpdatePermission("Configurations:APV_ApprovalStatus:Update")]
    [DeletePermission("Configurations:APV_ApprovalStatus:Delete")]
    [LookupScript("Configurations.ApvApprovalStatus", Permission = "?")]
    public sealed class ApvApprovalStatusRow : Row, IIdRow, INameRow
    {        
            #region Id
            [DisplayName("Id"), Identity]
            public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
            public partial class RowFields { public Int32Field Id; }
            #endregion Id
                
            #region Status Name
            [DisplayName("Status Name"), Size(50), NotNull, QuickSearch]
            public String StatusName { get { return Fields.StatusName[this]; } set { Fields.StatusName[this] = value; } }
            public partial class RowFields { public StringField StatusName; }
            #endregion StatusName
                
            #region Action Type
            [DisplayName("Action Type"), Size(50), NotNull]
            public String ActionType { get { return Fields.ActionType[this]; } set { Fields.ActionType[this] = value; } }
            public partial class RowFields { public StringField ActionType; }
            #endregion ActionType
                
            #region Sort Order
            [DisplayName("Sort Order"), NotNull]
            public Int32? SortOrder { get { return Fields.SortOrder[this]; } set { Fields.SortOrder[this] = value; } }
            public partial class RowFields { public Int32Field SortOrder; }
            #endregion SortOrder
                
            #region I User
            [DisplayName("I User"), Size(50), NotNull]
            public String IUser { get { return Fields.IUser[this]; } set { Fields.IUser[this] = value; } }
            public partial class RowFields { public StringField IUser; }
            #endregion IUser
                
            #region I Date
            [DisplayName("I Date"), NotNull]
            public DateTime? IDate { get { return Fields.IDate[this]; } set { Fields.IDate[this] = value; } }
            public partial class RowFields { public DateTimeField IDate; }
            #endregion IDate
                
            #region E User
            [DisplayName("E User"), Size(50)]
            public String EUser { get { return Fields.EUser[this]; } set { Fields.EUser[this] = value; } }
            public partial class RowFields { public StringField EUser; }
            #endregion EUser
                
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
            get { return Fields.StatusName; }
            }
            #endregion Id and Name fields

    #region Constructor
    public ApvApprovalStatusRow()
    : base(Fields)
    {
    }
    #endregion Constructor

    #region RowFields
    public static readonly RowFields Fields = new RowFields().Init();

    public const string TableName = "[dbo].[APV_ApprovalStatus]";

    public partial class RowFields : RowFieldsBase
    {
    public RowFields()
    : base("[dbo].[APV_ApprovalStatus]")
    {
    LocalTextPrefix = "Configurations.ApvApprovalStatus";
    }
    }
    #endregion RowFields
    }
    }
