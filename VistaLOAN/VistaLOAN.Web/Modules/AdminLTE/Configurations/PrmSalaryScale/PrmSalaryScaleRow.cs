
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;


    [ConnectionKey("LoanDB"), DisplayName("Prm Salary Scale"), InstanceName("Prm Salary Scale"), TwoLevelCached]
    [ReadPermission("Configurations:PRM_SalaryScale:Read")]
    [InsertPermission("Configurations:PRM_SalaryScale:Insert")]
    [UpdatePermission("Configurations:PRM_SalaryScale:Update")]
    [DeletePermission("Configurations:PRM_SalaryScale:Delete")]
    [LookupScript("Configurations.PrmSalaryScale", Permission = "?")]
    public sealed class PrmSalaryScaleRow : Row, IIdRow, INameRow
    {
            #region Id
            [DisplayName("Id"), Identity]
            public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
            public partial class RowFields { public Int32Field Id; }
            #endregion Id

            #region Salary Scale Name
            [DisplayName("Salary Scale Name"), Size(50), NotNull, QuickSearch]
            public String SalaryScaleName { get { return Fields.SalaryScaleName[this]; } set { Fields.SalaryScaleName[this] = value; } }
            public partial class RowFields { public StringField SalaryScaleName; }
            #endregion SalaryScaleName

            #region Date Of Circulation
            [DisplayName("Date Of Circulation"), NotNull]
            public DateTime? DateOfCirculation { get { return Fields.DateOfCirculation[this]; } set { Fields.DateOfCirculation[this] = value; } }
            public partial class RowFields { public DateTimeField DateOfCirculation; }
            #endregion DateOfCirculation

            #region Date Of Effective
            [DisplayName("Date Of Effective"), NotNull]
            public DateTime? DateOfEffective { get { return Fields.DateOfEffective[this]; } set { Fields.DateOfEffective[this] = value; } }
            public partial class RowFields { public DateTimeField DateOfEffective; }
            #endregion DateOfEffective

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
            get { return Fields.SalaryScaleName; }
            }
            #endregion Id and Name fields

    #region Constructor
    public PrmSalaryScaleRow()
    : base(Fields)
    {
    }
    #endregion Constructor

    #region RowFields
    public static readonly RowFields Fields = new RowFields().Init();

    public const string TableName = "[dbo].[PRM_SalaryScale]";

    public partial class RowFields : RowFieldsBase
    {
    public RowFields()
    : base("[dbo].[PRM_SalaryScale]")
    {
    LocalTextPrefix = "Configurations.PrmSalaryScale";
    }
    }
    #endregion RowFields
    }
    }
