
namespace VistaLOAN.Setup.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;


    [ConnectionKey("LoanDB"), DisplayName("Loan Eligible Information"), InstanceName("Loan Eligible Information"), TwoLevelCached]
    [ReadPermission("Setup:LaLoanEligibleInformation:Read")]
    [InsertPermission("Setup:LaLoanEligibleInformation:Insert")]
    [UpdatePermission("Setup:LaLoanEligibleInformation:Update")]
    [DeletePermission("Setup:LaLoanEligibleInformation:Delete")]
    [LookupScript("Setup.LaLoanEligibleInformation")]
    public sealed class LaLoanEligibleInformationRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Loan Type
        [DisplayName("Loan Type"), NotNull, ForeignKey("[dbo].[LA_LoanType]", "Id"), LeftJoin("jLoanType"), TextualField("LoanTypeLoanTypeName")]
        [LookupEditor(typeof(Setup.Entities.LaLoanTypeRow), InplaceAdd = true)]
        public Int32? LoanTypeId { get { return Fields.LoanTypeId[this]; } set { Fields.LoanTypeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanTypeId; }
        #endregion LoanTypeId

        #region Employee Category
        [DisplayName("Employee Category"), NotNull, ForeignKey("[dbo].[PRM_EmploymentType]", "Id"), LeftJoin("jEmployeeCategory"), TextualField("EmployeeCategoryName")]
        [LookupEditor(typeof(Configurations.Entities.PrmEmploymentTypeRow))]
        public Int32? EmployeeCategoryId { get { return Fields.EmployeeCategoryId[this]; } set { Fields.EmployeeCategoryId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeCategoryId; }
        #endregion EmployeeCategoryId

        #region Grade From
        [DisplayName("Grade From"), NotNull, ForeignKey("[dbo].[PRM_JobGrade]", "Id"), LeftJoin("jGradeFrom"), TextualField("GradeFromGradeName")]
        [LookupEditor(typeof(Configurations.Entities.PrmJobGradeRow))]
        public Int32? GradeFromId { get { return Fields.GradeFromId[this]; } set { Fields.GradeFromId[this] = value; } }
        public partial class RowFields { public Int32Field GradeFromId; }
        #endregion GradeFromId

        #region Grade To
        [DisplayName("Grade To"), NotNull, ForeignKey("[dbo].[PRM_JobGrade]", "Id"), LeftJoin("jGradeTo"), TextualField("GradeToGradeName")]
        [LookupEditor(typeof(Configurations.Entities.PrmJobGradeRow))]
        public Int32? GradeToId { get { return Fields.GradeToId[this]; } set { Fields.GradeToId[this] = value; } }
        public partial class RowFields { public Int32Field GradeToId; }
        #endregion GradeToId

        #region Service Duration Min
        [DisplayName("Minimum Service Duration"), NotNull]
        public Int32? ServiceDurationMin { get { return Fields.ServiceDurationMin[this]; } set { Fields.ServiceDurationMin[this] = value; } }
        public partial class RowFields { public Int32Field ServiceDurationMin; }
        #endregion ServiceDurationMin

        #region Max No Loan Apply
        [DisplayName("Max Number of Loan Apply"), NotNull]
        public Int32? MaxNoLoanApply { get { return Fields.MaxNoLoanApply[this]; } set { Fields.MaxNoLoanApply[this] = value; } }
        public partial class RowFields { public Int32Field MaxNoLoanApply; }
        #endregion MaxNoLoanApply


        #region Foreign Fields

        [DisplayName("Loan Type Name"), Expression("jLoanType.[LoanTypeName]")]
        public String LoanTypeLoanTypeName { get { return Fields.LoanTypeLoanTypeName[this]; } set { Fields.LoanTypeLoanTypeName[this] = value; } }
        public partial class RowFields { public StringField LoanTypeLoanTypeName; }


        [DisplayName("Loan Type Principal Head Id"), Expression("jLoanType.[PrincipalHeadId]")]
        public Int32? LoanTypePrincipalHeadId { get { return Fields.LoanTypePrincipalHeadId[this]; } set { Fields.LoanTypePrincipalHeadId[this] = value; } }
        public partial class RowFields { public Int32Field LoanTypePrincipalHeadId; }


        [DisplayName("Loan Type Interest Head Id"), Expression("jLoanType.[InterestHeadId]")]
        public Int32? LoanTypeInterestHeadId { get { return Fields.LoanTypeInterestHeadId[this]; } set { Fields.LoanTypeInterestHeadId[this] = value; } }
        public partial class RowFields { public Int32Field LoanTypeInterestHeadId; }


        [DisplayName("Loan Type Is Welfare Loan"), Expression("jLoanType.[IsWelfareLoan]")]
        public Boolean? LoanTypeIsWelfareLoan { get { return Fields.LoanTypeIsWelfareLoan[this]; } set { Fields.LoanTypeIsWelfareLoan[this] = value; } }
        public partial class RowFields { public BooleanField LoanTypeIsWelfareLoan; }


        [DisplayName("Loan Type Is Pf Loan"), Expression("jLoanType.[IsPfLoan]")]
        public Boolean? LoanTypeIsPfLoan { get { return Fields.LoanTypeIsPfLoan[this]; } set { Fields.LoanTypeIsPfLoan[this] = value; } }
        public partial class RowFields { public BooleanField LoanTypeIsPfLoan; }


        [DisplayName("Loan Type Is Interest Payment With Pricipal"), Expression("jLoanType.[IsInterestPaymentWithPricipal]")]
        public Boolean? LoanTypeIsInterestPaymentWithPricipal { get { return Fields.LoanTypeIsInterestPaymentWithPricipal[this]; } set { Fields.LoanTypeIsInterestPaymentWithPricipal[this] = value; } }
        public partial class RowFields { public BooleanField LoanTypeIsInterestPaymentWithPricipal; }


        [DisplayName("Loan Type Is Interest Calculate On Issue Date"), Expression("jLoanType.[IsInterestCalculateOnIssueDate]")]
        public Boolean? LoanTypeIsInterestCalculateOnIssueDate { get { return Fields.LoanTypeIsInterestCalculateOnIssueDate[this]; } set { Fields.LoanTypeIsInterestCalculateOnIssueDate[this] = value; } }
        public partial class RowFields { public BooleanField LoanTypeIsInterestCalculateOnIssueDate; }


        [DisplayName("Loan Type Grace Period Month"), Expression("jLoanType.[GracePeriodMonth]")]
        public Int32? LoanTypeGracePeriodMonth { get { return Fields.LoanTypeGracePeriodMonth[this]; } set { Fields.LoanTypeGracePeriodMonth[this] = value; } }
        public partial class RowFields { public Int32Field LoanTypeGracePeriodMonth; }


        [DisplayName("Loan Type Calculation Type"), Expression("jLoanType.[CalculationType]")]
        public Int32? LoanTypeCalculationType { get { return Fields.LoanTypeCalculationType[this]; } set { Fields.LoanTypeCalculationType[this] = value; } }
        public partial class RowFields { public Int32Field LoanTypeCalculationType; }


        [DisplayName("Loan Type Short Code"), Expression("jLoanType.[ShortCode]")]
        public String LoanTypeShortCode { get { return Fields.LoanTypeShortCode[this]; } set { Fields.LoanTypeShortCode[this] = value; } }
        public partial class RowFields { public StringField LoanTypeShortCode; }


        [DisplayName("Loan Type I User"), Expression("jLoanType.[IUser]")]
        public String LoanTypeIUser { get { return Fields.LoanTypeIUser[this]; } set { Fields.LoanTypeIUser[this] = value; } }
        public partial class RowFields { public StringField LoanTypeIUser; }


        [DisplayName("Loan Type I Date"), Expression("jLoanType.[IDate]")]
        public DateTime? LoanTypeIDate { get { return Fields.LoanTypeIDate[this]; } set { Fields.LoanTypeIDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanTypeIDate; }


        [DisplayName("Loan Type E User"), Expression("jLoanType.[EUser]")]
        public String LoanTypeEUser { get { return Fields.LoanTypeEUser[this]; } set { Fields.LoanTypeEUser[this] = value; } }
        public partial class RowFields { public StringField LoanTypeEUser; }


        [DisplayName("Loan Type E Date"), Expression("jLoanType.[EDate]")]
        public DateTime? LoanTypeEDate { get { return Fields.LoanTypeEDate[this]; } set { Fields.LoanTypeEDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanTypeEDate; }


        [DisplayName("Employee Category Name"), Expression("jEmployeeCategory.[Name]")]
        public String EmployeeCategoryName { get { return Fields.EmployeeCategoryName[this]; } set { Fields.EmployeeCategoryName[this] = value; } }
        public partial class RowFields { public StringField EmployeeCategoryName; }


        [DisplayName("Employee Category Sort Order"), Expression("jEmployeeCategory.[SortOrder]")]
        public Int32? EmployeeCategorySortOrder { get { return Fields.EmployeeCategorySortOrder[this]; } set { Fields.EmployeeCategorySortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeCategorySortOrder; }


        [DisplayName("Employee Category Remarks"), Expression("jEmployeeCategory.[Remarks]")]
        public String EmployeeCategoryRemarks { get { return Fields.EmployeeCategoryRemarks[this]; } set { Fields.EmployeeCategoryRemarks[this] = value; } }
        public partial class RowFields { public StringField EmployeeCategoryRemarks; }


        [DisplayName("Employee Category I User"), Expression("jEmployeeCategory.[IUser]")]
        public String EmployeeCategoryIUser { get { return Fields.EmployeeCategoryIUser[this]; } set { Fields.EmployeeCategoryIUser[this] = value; } }
        public partial class RowFields { public StringField EmployeeCategoryIUser; }


        [DisplayName("Employee Category E User"), Expression("jEmployeeCategory.[EUser]")]
        public String EmployeeCategoryEUser { get { return Fields.EmployeeCategoryEUser[this]; } set { Fields.EmployeeCategoryEUser[this] = value; } }
        public partial class RowFields { public StringField EmployeeCategoryEUser; }


        [DisplayName("Employee Category I Date"), Expression("jEmployeeCategory.[IDate]")]
        public DateTime? EmployeeCategoryIDate { get { return Fields.EmployeeCategoryIDate[this]; } set { Fields.EmployeeCategoryIDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmployeeCategoryIDate; }


        [DisplayName("Employee Category E Date"), Expression("jEmployeeCategory.[EDate]")]
        public DateTime? EmployeeCategoryEDate { get { return Fields.EmployeeCategoryEDate[this]; } set { Fields.EmployeeCategoryEDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmployeeCategoryEDate; }


        [DisplayName("Grade From Salary Scale Id"), Expression("jGradeFrom.[SalaryScaleId]")]
        public Int32? GradeFromSalaryScaleId { get { return Fields.GradeFromSalaryScaleId[this]; } set { Fields.GradeFromSalaryScaleId[this] = value; } }
        public partial class RowFields { public Int32Field GradeFromSalaryScaleId; }


        [DisplayName("Grade From"), Expression("jGradeFrom.[GradeName]")]
        public String GradeFromGradeName { get { return Fields.GradeFromGradeName[this]; } set { Fields.GradeFromGradeName[this] = value; } }
        public partial class RowFields { public StringField GradeFromGradeName; }


        [DisplayName("Grade From Grade Code"), Expression("jGradeFrom.[GradeCode]")]
        public String GradeFromGradeCode { get { return Fields.GradeFromGradeCode[this]; } set { Fields.GradeFromGradeCode[this] = value; } }
        public partial class RowFields { public StringField GradeFromGradeCode; }


        [DisplayName("Grade From Number Of Steps"), Expression("jGradeFrom.[NumberOfSteps]")]
        public Int32? GradeFromNumberOfSteps { get { return Fields.GradeFromNumberOfSteps[this]; } set { Fields.GradeFromNumberOfSteps[this] = value; } }
        public partial class RowFields { public Int32Field GradeFromNumberOfSteps; }


        [DisplayName("Grade From Initial Basic"), Expression("jGradeFrom.[InitialBasic]")]
        public Decimal? GradeFromInitialBasic { get { return Fields.GradeFromInitialBasic[this]; } set { Fields.GradeFromInitialBasic[this] = value; } }
        public partial class RowFields { public DecimalField GradeFromInitialBasic; }


        [DisplayName("Grade From Last Basic"), Expression("jGradeFrom.[LastBasic]")]
        public Decimal? GradeFromLastBasic { get { return Fields.GradeFromLastBasic[this]; } set { Fields.GradeFromLastBasic[this] = value; } }
        public partial class RowFields { public DecimalField GradeFromLastBasic; }


        [DisplayName("Grade From Yearly Increment"), Expression("jGradeFrom.[YearlyIncrement]")]
        public Decimal? GradeFromYearlyIncrement { get { return Fields.GradeFromYearlyIncrement[this]; } set { Fields.GradeFromYearlyIncrement[this] = value; } }
        public partial class RowFields { public DecimalField GradeFromYearlyIncrement; }


        [DisplayName("Grade From Date Of Effective"), Expression("jGradeFrom.[DateOfEffective]")]
        public DateTime? GradeFromDateOfEffective { get { return Fields.GradeFromDateOfEffective[this]; } set { Fields.GradeFromDateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField GradeFromDateOfEffective; }


        [DisplayName("Grade From Is Consolidated"), Expression("jGradeFrom.[IsConsolidated]")]
        public Boolean? GradeFromIsConsolidated { get { return Fields.GradeFromIsConsolidated[this]; } set { Fields.GradeFromIsConsolidated[this] = value; } }
        public partial class RowFields { public BooleanField GradeFromIsConsolidated; }


        [DisplayName("Grade From I User"), Expression("jGradeFrom.[IUser]")]
        public String GradeFromIUser { get { return Fields.GradeFromIUser[this]; } set { Fields.GradeFromIUser[this] = value; } }
        public partial class RowFields { public StringField GradeFromIUser; }


        [DisplayName("Grade From I Date"), Expression("jGradeFrom.[IDate]")]
        public DateTime? GradeFromIDate { get { return Fields.GradeFromIDate[this]; } set { Fields.GradeFromIDate[this] = value; } }
        public partial class RowFields { public DateTimeField GradeFromIDate; }


        [DisplayName("Grade From E User"), Expression("jGradeFrom.[EUser]")]
        public String GradeFromEUser { get { return Fields.GradeFromEUser[this]; } set { Fields.GradeFromEUser[this] = value; } }
        public partial class RowFields { public StringField GradeFromEUser; }


        [DisplayName("Grade From E Date"), Expression("jGradeFrom.[EDate]")]
        public DateTime? GradeFromEDate { get { return Fields.GradeFromEDate[this]; } set { Fields.GradeFromEDate[this] = value; } }
        public partial class RowFields { public DateTimeField GradeFromEDate; }


        [DisplayName("Grade From Pay Scale"), Expression("jGradeFrom.[PayScale]")]
        public String GradeFromPayScale { get { return Fields.GradeFromPayScale[this]; } set { Fields.GradeFromPayScale[this] = value; } }
        public partial class RowFields { public StringField GradeFromPayScale; }


        [DisplayName("Grade To Salary Scale Id"), Expression("jGradeTo.[SalaryScaleId]")]
        public Int32? GradeToSalaryScaleId { get { return Fields.GradeToSalaryScaleId[this]; } set { Fields.GradeToSalaryScaleId[this] = value; } }
        public partial class RowFields { public Int32Field GradeToSalaryScaleId; }


        [DisplayName("Grade To"), Expression("jGradeTo.[GradeName]")]
        public String GradeToGradeName { get { return Fields.GradeToGradeName[this]; } set { Fields.GradeToGradeName[this] = value; } }
        public partial class RowFields { public StringField GradeToGradeName; }


        [DisplayName("Grade To Grade Code"), Expression("jGradeTo.[GradeCode]")]
        public String GradeToGradeCode { get { return Fields.GradeToGradeCode[this]; } set { Fields.GradeToGradeCode[this] = value; } }
        public partial class RowFields { public StringField GradeToGradeCode; }


        [DisplayName("Grade To Number Of Steps"), Expression("jGradeTo.[NumberOfSteps]")]
        public Int32? GradeToNumberOfSteps { get { return Fields.GradeToNumberOfSteps[this]; } set { Fields.GradeToNumberOfSteps[this] = value; } }
        public partial class RowFields { public Int32Field GradeToNumberOfSteps; }


        [DisplayName("Grade To Initial Basic"), Expression("jGradeTo.[InitialBasic]")]
        public Decimal? GradeToInitialBasic { get { return Fields.GradeToInitialBasic[this]; } set { Fields.GradeToInitialBasic[this] = value; } }
        public partial class RowFields { public DecimalField GradeToInitialBasic; }


        [DisplayName("Grade To Last Basic"), Expression("jGradeTo.[LastBasic]")]
        public Decimal? GradeToLastBasic { get { return Fields.GradeToLastBasic[this]; } set { Fields.GradeToLastBasic[this] = value; } }
        public partial class RowFields { public DecimalField GradeToLastBasic; }


        [DisplayName("Grade To Yearly Increment"), Expression("jGradeTo.[YearlyIncrement]")]
        public Decimal? GradeToYearlyIncrement { get { return Fields.GradeToYearlyIncrement[this]; } set { Fields.GradeToYearlyIncrement[this] = value; } }
        public partial class RowFields { public DecimalField GradeToYearlyIncrement; }


        [DisplayName("Grade To Date Of Effective"), Expression("jGradeTo.[DateOfEffective]")]
        public DateTime? GradeToDateOfEffective { get { return Fields.GradeToDateOfEffective[this]; } set { Fields.GradeToDateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField GradeToDateOfEffective; }


        [DisplayName("Grade To Is Consolidated"), Expression("jGradeTo.[IsConsolidated]")]
        public Boolean? GradeToIsConsolidated { get { return Fields.GradeToIsConsolidated[this]; } set { Fields.GradeToIsConsolidated[this] = value; } }
        public partial class RowFields { public BooleanField GradeToIsConsolidated; }


        [DisplayName("Grade To I User"), Expression("jGradeTo.[IUser]")]
        public String GradeToIUser { get { return Fields.GradeToIUser[this]; } set { Fields.GradeToIUser[this] = value; } }
        public partial class RowFields { public StringField GradeToIUser; }


        [DisplayName("Grade To I Date"), Expression("jGradeTo.[IDate]")]
        public DateTime? GradeToIDate { get { return Fields.GradeToIDate[this]; } set { Fields.GradeToIDate[this] = value; } }
        public partial class RowFields { public DateTimeField GradeToIDate; }


        [DisplayName("Grade To E User"), Expression("jGradeTo.[EUser]")]
        public String GradeToEUser { get { return Fields.GradeToEUser[this]; } set { Fields.GradeToEUser[this] = value; } }
        public partial class RowFields { public StringField GradeToEUser; }


        [DisplayName("Grade To E Date"), Expression("jGradeTo.[EDate]")]
        public DateTime? GradeToEDate { get { return Fields.GradeToEDate[this]; } set { Fields.GradeToEDate[this] = value; } }
        public partial class RowFields { public DateTimeField GradeToEDate; }


        [DisplayName("Grade To Pay Scale"), Expression("jGradeTo.[PayScale]")]
        public String GradeToPayScale { get { return Fields.GradeToPayScale[this]; } set { Fields.GradeToPayScale[this] = value; } }
        public partial class RowFields { public StringField GradeToPayScale; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.IUser; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaLoanEligibleInformationRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanEligibleInformation]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanEligibleInformation]")
            {
                LocalTextPrefix = "Setup.LaLoanEligibleInformation";
            }
        }
        #endregion RowFields
    }
}
