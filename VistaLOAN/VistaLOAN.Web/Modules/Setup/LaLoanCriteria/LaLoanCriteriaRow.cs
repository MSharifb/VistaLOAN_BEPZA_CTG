
namespace VistaLOAN.Setup.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Loan Criteria"), InstanceName("Loan Criteria"), TwoLevelCached]
    //[ReadPermission("Setup:LaLoanCriteria:Read")]
    [InsertPermission("Setup:LaLoanCriteria:Insert")]
    [UpdatePermission("Setup:LaLoanCriteria:Update")]
    [DeletePermission("Setup:LaLoanCriteria:Delete")]
    [ReadPermission("*")]
    [LookupScript("Setup.LaLoanCriteria", Permission = "?")]
    public sealed class LaLoanCriteriaRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Scheme Name
        [DisplayName("Scheme Name"), Size(-1), NotNull, QuickSearch]
        public String SchemeName { get { return Fields.SchemeName[this]; } set { Fields.SchemeName[this] = value; } }
        public partial class RowFields { public StringField SchemeName; }
        #endregion SchemeName

        #region Loan Type
        [DisplayName("Loan Type"), NotNull, ForeignKey("[dbo].[LA_LoanType]", "Id"), LeftJoin("jLoanType"), TextualField("LoanTypeLoanTypeName")]
        [LookupEditor(typeof(Setup.Entities.LaLoanTypeRow), InplaceAdd = true),LookupInclude]
        public Int32? LoanTypeId { get { return Fields.LoanTypeId[this]; } set { Fields.LoanTypeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanTypeId; }
        #endregion LoanTypeId

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


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.SchemeName; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaLoanCriteriaRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanCriteria]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanCriteria]")
            {
                LocalTextPrefix = "Setup.LaLoanCriteria";
            }
        }
        #endregion RowFields
    }
}
