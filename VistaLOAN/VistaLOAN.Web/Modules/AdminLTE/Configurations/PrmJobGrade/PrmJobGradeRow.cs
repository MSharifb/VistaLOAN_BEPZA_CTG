
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;


    [ConnectionKey("LoanDB"), DisplayName("Prm Job Grade"), InstanceName("Prm Job Grade"), TwoLevelCached]
    [ReadPermission("Configurations:PRM_JobGrade:Read")]
    [InsertPermission("Configurations:PRM_JobGrade:Insert")]
    [UpdatePermission("Configurations:PRM_JobGrade:Update")]
    [DeletePermission("Configurations:PRM_JobGrade:Delete")]
    [LookupScript("Configurations.PrmJobGrade", Permission = "?")]
    public sealed class PrmJobGradeRow : Row, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Salary Scale
        [DisplayName("Salary Scale"), NotNull, ForeignKey("[dbo].[PRM_SalaryScale]", "Id"), LeftJoin("jSalaryScale"), TextualField("SalaryScaleSalaryScaleName")]
        [LookupEditor(typeof(Configurations.Entities.PrmSalaryScaleRow), InplaceAdd = true)]
        public Int32? SalaryScaleId { get { return Fields.SalaryScaleId[this]; } set { Fields.SalaryScaleId[this] = value; } }
        public partial class RowFields { public Int32Field SalaryScaleId; }
        #endregion SalaryScaleId

        #region Grade Name
        [DisplayName("Grade Name"), Size(100), NotNull, QuickSearch]
        public String GradeName { get { return Fields.GradeName[this]; } set { Fields.GradeName[this] = value; } }
        public partial class RowFields { public StringField GradeName; }
        #endregion GradeName

        #region Grade Code
        [DisplayName("Grade Code"), Size(20)]
        public String GradeCode { get { return Fields.GradeCode[this]; } set { Fields.GradeCode[this] = value; } }
        public partial class RowFields { public StringField GradeCode; }
        #endregion GradeCode

        #region Number Of Steps
        [DisplayName("Number Of Steps")]
        public Int32? NumberOfSteps { get { return Fields.NumberOfSteps[this]; } set { Fields.NumberOfSteps[this] = value; } }
        public partial class RowFields { public Int32Field NumberOfSteps; }
        #endregion NumberOfSteps

        #region Initial Basic
        [DisplayName("Initial Basic"), Size(10), Scale(2)]
        public Decimal? InitialBasic { get { return Fields.InitialBasic[this]; } set { Fields.InitialBasic[this] = value; } }
        public partial class RowFields { public DecimalField InitialBasic; }
        #endregion InitialBasic

        #region Last Basic
        [DisplayName("Last Basic"), Size(10), Scale(2)]
        public Decimal? LastBasic { get { return Fields.LastBasic[this]; } set { Fields.LastBasic[this] = value; } }
        public partial class RowFields { public DecimalField LastBasic; }
        #endregion LastBasic

        #region Yearly Increment
        [DisplayName("Yearly Increment"), Size(10), Scale(2)]
        public Decimal? YearlyIncrement { get { return Fields.YearlyIncrement[this]; } set { Fields.YearlyIncrement[this] = value; } }
        public partial class RowFields { public DecimalField YearlyIncrement; }
        #endregion YearlyIncrement

        #region Date Of Effective
        [DisplayName("Date Of Effective"), NotNull]
        public DateTime? DateOfEffective { get { return Fields.DateOfEffective[this]; } set { Fields.DateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField DateOfEffective; }
        #endregion DateOfEffective

        #region Is Consolidated
        [DisplayName("Is Consolidated")]
        public Boolean? IsConsolidated { get { return Fields.IsConsolidated[this]; } set { Fields.IsConsolidated[this] = value; } }
        public partial class RowFields { public BooleanField IsConsolidated; }
        #endregion IsConsolidated

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

        #region Pay Scale
        [DisplayName("Pay Scale"), Size(200)]
        public String PayScale { get { return Fields.PayScale[this]; } set { Fields.PayScale[this] = value; } }
        public partial class RowFields { public StringField PayScale; }
        #endregion PayScale


        #region Foreign Fields

        [DisplayName("Salary Scale Salary Scale Name"), Expression("jSalaryScale.[SalaryScaleName]")]
        public String SalaryScaleSalaryScaleName { get { return Fields.SalaryScaleSalaryScaleName[this]; } set { Fields.SalaryScaleSalaryScaleName[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleSalaryScaleName; }


        [DisplayName("Salary Scale Date Of Circulation"), Expression("jSalaryScale.[DateOfCirculation]")]
        public DateTime? SalaryScaleDateOfCirculation { get { return Fields.SalaryScaleDateOfCirculation[this]; } set { Fields.SalaryScaleDateOfCirculation[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleDateOfCirculation; }


        [DisplayName("Salary Scale Date Of Effective"), Expression("jSalaryScale.[DateOfEffective]")]
        public DateTime? SalaryScaleDateOfEffective { get { return Fields.SalaryScaleDateOfEffective[this]; } set { Fields.SalaryScaleDateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleDateOfEffective; }


        [DisplayName("Salary Scale I User"), Expression("jSalaryScale.[IUser]")]
        public String SalaryScaleIUser { get { return Fields.SalaryScaleIUser[this]; } set { Fields.SalaryScaleIUser[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleIUser; }


        [DisplayName("Salary Scale I Date"), Expression("jSalaryScale.[IDate]")]
        public DateTime? SalaryScaleIDate { get { return Fields.SalaryScaleIDate[this]; } set { Fields.SalaryScaleIDate[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleIDate; }


        [DisplayName("Salary Scale E User"), Expression("jSalaryScale.[EUser]")]
        public String SalaryScaleEUser { get { return Fields.SalaryScaleEUser[this]; } set { Fields.SalaryScaleEUser[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleEUser; }


        [DisplayName("Salary Scale E Date"), Expression("jSalaryScale.[EDate]")]
        public DateTime? SalaryScaleEDate { get { return Fields.SalaryScaleEDate[this]; } set { Fields.SalaryScaleEDate[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleEDate; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.GradeName; }
        }
        #endregion Id and Name fields

        #region Constructor
        public PrmJobGradeRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[PRM_JobGrade]";

        public partial class RowFields : RowFieldsBase
        {
            public RowFields()
            : base("[dbo].[PRM_JobGrade]")
            {
                LocalTextPrefix = "Configurations.PrmJobGrade";
            }
        }
        #endregion RowFields
    }
}
