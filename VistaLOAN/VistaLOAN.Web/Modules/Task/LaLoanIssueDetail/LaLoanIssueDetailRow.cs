
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Loan Issue Instalment"), InstanceName("Loan Issue Instalment"), TwoLevelCached]
    [ReadPermission("Task:LaLoanIssue:Read")]
    [InsertPermission("Task:LaLoanIssue:Insert")]
    [UpdatePermission("Task:LaLoanIssue:Update")]
    [DeletePermission("Task:LaLoanIssue:Delete")]
    [LookupScript("Task.LaLoanIssueDetail")]
    public sealed class LaLoanIssueDetailRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Loan Issue
        [DisplayName("Loan Issue"), Column("LoanIssueId"), NotNull, ForeignKey("[dbo].[LA_LoanIssue]", "Id"), LeftJoin("jLoanIssue"), TextualField("LoanIssueIUser")]
        public Int32? LoanIssueId { get { return Fields.LoanIssueId[this]; } set { Fields.LoanIssueId[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueId; }
        #endregion LoanIssueId

        #region Issue Date
        [DisplayName("Issue Date"), NotNull]
        public DateTime? IssueDate { get { return Fields.IssueDate[this]; } set { Fields.IssueDate[this] = value; } }
        public partial class RowFields { public DateTimeField IssueDate; }
        #endregion IssueDate

        #region Loan Paid Amount
        [DisplayName("Loan Paid Amount"), Size(18), Scale(2), NotNull]
        public Decimal? LoanPaidAmount { get { return Fields.LoanPaidAmount[this]; } set { Fields.LoanPaidAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanPaidAmount; }
        #endregion LoanPaidAmount

        #region Foreign Fields

        [DisplayName("Loan Issue Loan Application Id"), Expression("jLoanIssue.[LoanApplicationId]")]
        public Int32? LoanIssueLoanApplicationId { get { return Fields.LoanIssueLoanApplicationId[this]; } set { Fields.LoanIssueLoanApplicationId[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueLoanApplicationId; }

        [DisplayName("Loan Issue Effective Month"), Expression("jLoanIssue.[EffectiveMonth]")]
        public Int32? LoanIssueEffectiveMonth { get { return Fields.LoanIssueEffectiveMonth[this]; } set { Fields.LoanIssueEffectiveMonth[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueEffectiveMonth; }

        [DisplayName("Loan Issue Effective Year"), Expression("jLoanIssue.[EffectiveYear]")]
        public Int32? LoanIssueEffectiveYear { get { return Fields.LoanIssueEffectiveYear[this]; } set { Fields.LoanIssueEffectiveYear[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueEffectiveYear; }


        [DisplayName("Loan Issue Loan Amount"), Expression("jLoanIssue.[LoanAmount]")]
        public Decimal? LoanIssueLoanAmount { get { return Fields.LoanIssueLoanAmount[this]; } set { Fields.LoanIssueLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueLoanAmount; }

        [DisplayName("Loan Issue I User"), Expression("jLoanIssue.[IUser]")]
        public String LoanIssueIUser { get { return Fields.LoanIssueIUser[this]; } set { Fields.LoanIssueIUser[this] = value; } }
        public partial class RowFields { public StringField LoanIssueIUser; }

        [DisplayName("Loan Issue Principal Installment Amount"), Expression("jLoanIssue.[PrincipalInstallmentAmount]")]
        public Decimal? LoanIssuePrincipalInstallmentAmount { get { return Fields.LoanIssuePrincipalInstallmentAmount[this]; } set { Fields.LoanIssuePrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssuePrincipalInstallmentAmount; }


        [DisplayName("Loan Issue Interest Amount"), Expression("jLoanIssue.[InterestAmount]")]
        public Decimal? LoanIssueInterestAmount { get { return Fields.LoanIssueInterestAmount[this]; } set { Fields.LoanIssueInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueInterestAmount; }


        [DisplayName("Loan Issue Interest Installment Amount"), Expression("jLoanIssue.[InterestInstallmentAmount]")]
        public Decimal? LoanIssueInterestInstallmentAmount { get { return Fields.LoanIssueInterestInstallmentAmount[this]; } set { Fields.LoanIssueInterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueInterestInstallmentAmount; }

        [DisplayName("Loan Issue Is Full Paid"), Expression("jLoanIssue.[IsFullPaid]")]
        public Boolean? LoanIssueIsFullPaid { get { return Fields.LoanIssueIsFullPaid[this]; } set { Fields.LoanIssueIsFullPaid[this] = value; } }
        public partial class RowFields { public BooleanField LoanIssueIsFullPaid; }

        [DisplayName("Loan Issue Is Close"), Expression("jLoanIssue.[IsClose]")]
        public Boolean? LoanIssueIsClose { get { return Fields.LoanIssueIsClose[this]; } set { Fields.LoanIssueIsClose[this] = value; } }
        public partial class RowFields { public BooleanField LoanIssueIsClose; }


        [DisplayName("Loan Issue Full Paid Date"), Expression("jLoanIssue.[FullPaidDate]")]
        public DateTime? LoanIssueFullPaidDate { get { return Fields.LoanIssueFullPaidDate[this]; } set { Fields.LoanIssueFullPaidDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanIssueFullPaidDate; }


        [DisplayName("Loan Issue Is Posting"), Expression("jLoanIssue.[IsPosting]")]
        public Boolean? LoanIssueIsPosting { get { return Fields.LoanIssueIsPosting[this]; } set { Fields.LoanIssueIsPosting[this] = value; } }
        public partial class RowFields { public BooleanField LoanIssueIsPosting; }

        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.LoanIssueIUser; }
        }

        #endregion Id and Name fields

        #region Constructor
        public LaLoanIssueDetailRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanIssueDetail]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanIssueDetail]")
            {
                LocalTextPrefix = "Task.LaLoanIssueDetail";
            }
        }
        #endregion RowFields
    }
}
