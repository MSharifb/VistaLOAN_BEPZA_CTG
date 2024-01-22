
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Loan Installment Detail"), InstanceName("Loan Installment Detail"), TwoLevelCached]
    //[ReadPermission("Task:LA_MonthlyLoanInstallmentDetail:Read")]
    //[InsertPermission("Task:LA_MonthlyLoanInstallmentDetail:Insert")]
    //[UpdatePermission("Task:LA_MonthlyLoanInstallmentDetail:Update")]
    //[DeletePermission("Task:LA_MonthlyLoanInstallmentDetail:Delete")]
    [ReadPermission("*")]
    [ModifyPermission("*")]
    [LookupScript("Task.LaMonthlyLoanInstallmentDetail", Permission = "?")]
    public sealed class LaMonthlyLoanInstallmentDetailRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Monthly Loan Installment
        [DisplayName("Monthly Loan Installment"), NotNull, ForeignKey("[dbo].[LA_MonthlyLoanInstallment]", "Id"), LeftJoin("jMonthlyLoanInstallment"), TextualField("MonthlyLoanInstallmentForMonth")]
        [LookupEditor(typeof(Task.Entities.LaMonthlyLoanInstallmentRow), InplaceAdd = true)]
        public Int32? MonthlyLoanInstallmentId { get { return Fields.MonthlyLoanInstallmentId[this]; } set { Fields.MonthlyLoanInstallmentId[this] = value; } }
        public partial class RowFields { public Int32Field MonthlyLoanInstallmentId; }
        #endregion MonthlyLoanInstallmentId

        #region Loan Issue
        [DisplayName("Loan Issue"), NotNull, ForeignKey("[dbo].[LA_LoanIssue]", "Id"), LeftJoin("jLoanIssue"), TextualField("LoanIssueIUser")]
        [LookupEditor(typeof(Task.Entities.LaLoanIssueRow))]
        public Int32? LoanIssueId { get { return Fields.LoanIssueId[this]; } set { Fields.LoanIssueId[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueId; }
        #endregion LoanIssueId

        #region Employee Id
        [DisplayName("Employee Id"), NotNull, ForeignKey("[dbo].[PRM_EmploymentInfo]", "Id"), LeftJoin("jEmploymentInfo"), TextualField("EmpId"), LookupInclude]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public Int32? EmployeeId { get { return Fields.EmployeeId[this]; } set { Fields.EmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeId; }
        #endregion EmployeeId

        #region Principal Installment Amount
        [DisplayName("Principal Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? PrincipalInstallmentAmount { get { return Fields.PrincipalInstallmentAmount[this]; } set { Fields.PrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalInstallmentAmount; }
        #endregion PrincipalInstallmentAmount

        #region Interest Installment Amount
        [DisplayName("Interest Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? InterestInstallmentAmount { get { return Fields.InterestInstallmentAmount[this]; } set { Fields.InterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestInstallmentAmount; }
        #endregion InterestInstallmentAmount

        #region Total Installment Amount
        [DisplayName("Total Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? TotalInstallmentAmount { get { return Fields.TotalInstallmentAmount[this]; } set { Fields.TotalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField TotalInstallmentAmount; }
        #endregion TotalInstallmentAmount

        #region Foreign Fields

        [DisplayName("Monthly Loan Installment For Month"), Expression("jMonthlyLoanInstallment.[ForMonth]")]
        public String MonthlyLoanInstallmentForMonth { get { return Fields.MonthlyLoanInstallmentForMonth[this]; } set { Fields.MonthlyLoanInstallmentForMonth[this] = value; } }
        public partial class RowFields { public StringField MonthlyLoanInstallmentForMonth; }


        [DisplayName("Monthly Loan Installment For Year"), Expression("jMonthlyLoanInstallment.[ForYear]")]
        public String MonthlyLoanInstallmentForYear { get { return Fields.MonthlyLoanInstallmentForYear[this]; } set { Fields.MonthlyLoanInstallmentForYear[this] = value; } }
        public partial class RowFields { public StringField MonthlyLoanInstallmentForYear; }


        [DisplayName("Monthly Loan Installment I User"), Expression("jMonthlyLoanInstallment.[IUser]")]
        public String MonthlyLoanInstallmentIUser { get { return Fields.MonthlyLoanInstallmentIUser[this]; } set { Fields.MonthlyLoanInstallmentIUser[this] = value; } }
        public partial class RowFields { public StringField MonthlyLoanInstallmentIUser; }


        [DisplayName("Monthly Loan Installment I Date"), Expression("jMonthlyLoanInstallment.[IDate]")]
        public DateTime? MonthlyLoanInstallmentIDate { get { return Fields.MonthlyLoanInstallmentIDate[this]; } set { Fields.MonthlyLoanInstallmentIDate[this] = value; } }
        public partial class RowFields { public DateTimeField MonthlyLoanInstallmentIDate; }


        [DisplayName("Monthly Loan Installment E User"), Expression("jMonthlyLoanInstallment.[EUser]")]
        public String MonthlyLoanInstallmentEUser { get { return Fields.MonthlyLoanInstallmentEUser[this]; } set { Fields.MonthlyLoanInstallmentEUser[this] = value; } }
        public partial class RowFields { public StringField MonthlyLoanInstallmentEUser; }


        [DisplayName("Monthly Loan Installment E Date"), Expression("jMonthlyLoanInstallment.[EDate]")]
        public DateTime? MonthlyLoanInstallmentEDate { get { return Fields.MonthlyLoanInstallmentEDate[this]; } set { Fields.MonthlyLoanInstallmentEDate[this] = value; } }
        public partial class RowFields { public DateTimeField MonthlyLoanInstallmentEDate; }


        [DisplayName("Monthly Loan Installment Total Principal Installment Amount"), Expression("jMonthlyLoanInstallment.[TotalPrincipalInstallmentAmount]")]
        public Decimal? MonthlyLoanInstallmentTotalPrincipalInstallmentAmount { get { return Fields.MonthlyLoanInstallmentTotalPrincipalInstallmentAmount[this]; } set { Fields.MonthlyLoanInstallmentTotalPrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField MonthlyLoanInstallmentTotalPrincipalInstallmentAmount; }


        [DisplayName("Monthly Loan Installment Total Interest Installment Amount"), Expression("jMonthlyLoanInstallment.[TotalInterestInstallmentAmount]")]
        public Decimal? MonthlyLoanInstallmentTotalInterestInstallmentAmount { get { return Fields.MonthlyLoanInstallmentTotalInterestInstallmentAmount[this]; } set { Fields.MonthlyLoanInstallmentTotalInterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField MonthlyLoanInstallmentTotalInterestInstallmentAmount; }


        [DisplayName("Monthly Loan Installment Is Process"), Expression("jMonthlyLoanInstallment.[IsProcess]")]
        public Boolean? MonthlyLoanInstallmentIsProcess { get { return Fields.MonthlyLoanInstallmentIsProcess[this]; } set { Fields.MonthlyLoanInstallmentIsProcess[this] = value; } }
        public partial class RowFields { public BooleanField MonthlyLoanInstallmentIsProcess; }


        [DisplayName("Loan Issue Loan Application Id"), Expression("jLoanIssue.[LoanApplicationId]"), ForeignKey("[dbo].[LA_LoanApplication]", "Id"), LeftJoin("jLoanAppliacation")]
        public Int32? LoanIssueLoanApplicationId { get { return Fields.LoanIssueLoanApplicationId[this]; } set { Fields.LoanIssueLoanApplicationId[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueLoanApplicationId; }

        [DisplayName("Loan No"), Expression("jLoanAppliacation.LoanNo"), QuickFilter(true), QuickSearch]
        [MinSelectLevel(SelectLevel.List)]
        public String LoanNo { get { return Fields.LoanNo[this]; } set { Fields.LoanNo[this] = value; } }
        public partial class RowFields { public StringField LoanNo; }


        [DisplayName("Loan Issue Effective Month"), Expression("jLoanIssue.[EffectiveMonth]")]
        public Int32? LoanIssueEffectiveMonth { get { return Fields.LoanIssueEffectiveMonth[this]; } set { Fields.LoanIssueEffectiveMonth[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueEffectiveMonth; }


        [DisplayName("Loan Issue Effective Year"), Expression("jLoanIssue.[EffectiveYear]")]
        public Int32? LoanIssueEffectiveYear { get { return Fields.LoanIssueEffectiveYear[this]; } set { Fields.LoanIssueEffectiveYear[this] = value; } }
        public partial class RowFields { public Int32Field LoanIssueEffectiveYear; }


        [DisplayName("Loan Issue Loan Amount"), Expression("jLoanIssue.[LoanAmount]")]
        public Decimal? LoanIssueLoanAmount { get { return Fields.LoanIssueLoanAmount[this]; } set { Fields.LoanIssueLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueLoanAmount; }


        [DisplayName("Loan Issue Principal Installment Amount"), Expression("jLoanIssue.[PrincipalInstallmentAmount]")]
        public Decimal? LoanIssuePrincipalInstallmentAmount { get { return Fields.LoanIssuePrincipalInstallmentAmount[this]; } set { Fields.LoanIssuePrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssuePrincipalInstallmentAmount; }


        [DisplayName("Loan Issue Interest Amount"), Expression("jLoanIssue.[InterestAmount]")]
        public Decimal? LoanIssueInterestAmount { get { return Fields.LoanIssueInterestAmount[this]; } set { Fields.LoanIssueInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueInterestAmount; }


        [DisplayName("Loan Issue Interest Installment Amount"), Expression("jLoanIssue.[InterestInstallmentAmount]")]
        public Decimal? LoanIssueInterestInstallmentAmount { get { return Fields.LoanIssueInterestInstallmentAmount[this]; } set { Fields.LoanIssueInterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueInterestInstallmentAmount; }


        [DisplayName("Loan Issue Last Principal Installment Amount"), Expression("jLoanIssue.[LastPrincipalInstallmentAmount]")]
        public Decimal? LoanIssueLastPrincipalInstallmentAmount { get { return Fields.LoanIssueLastPrincipalInstallmentAmount[this]; } set { Fields.LoanIssueLastPrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueLastPrincipalInstallmentAmount; }


        [DisplayName("Loan Issue Last Interest Installment Amount"), Expression("jLoanIssue.[LastInterestInstallmentAmount]")]
        public Decimal? LoanIssueLastInterestInstallmentAmount { get { return Fields.LoanIssueLastInterestInstallmentAmount[this]; } set { Fields.LoanIssueLastInterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanIssueLastInterestInstallmentAmount; }


        [DisplayName("Loan Issue I User"), Expression("jLoanIssue.[IUser]")]
        public String LoanIssueIUser { get { return Fields.LoanIssueIUser[this]; } set { Fields.LoanIssueIUser[this] = value; } }
        public partial class RowFields { public StringField LoanIssueIUser; }


        [DisplayName("Loan Issue I Date"), Expression("jLoanIssue.[IDate]")]
        public DateTime? LoanIssueIDate { get { return Fields.LoanIssueIDate[this]; } set { Fields.LoanIssueIDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanIssueIDate; }


        [DisplayName("Loan Issue E User"), Expression("jLoanIssue.[EUser]")]
        public String LoanIssueEUser { get { return Fields.LoanIssueEUser[this]; } set { Fields.LoanIssueEUser[this] = value; } }
        public partial class RowFields { public StringField LoanIssueEUser; }


        [DisplayName("Loan Issue E Date"), Expression("jLoanIssue.[EDate]")]
        public DateTime? LoanIssueEDate { get { return Fields.LoanIssueEDate[this]; } set { Fields.LoanIssueEDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanIssueEDate; }


        [DisplayName("Loan Issue Is Full Paid"), Expression("jLoanIssue.[IsFullPaid]")]
        public Boolean? LoanIssueIsFullPaid { get { return Fields.LoanIssueIsFullPaid[this]; } set { Fields.LoanIssueIsFullPaid[this] = value; } }
        public partial class RowFields { public BooleanField LoanIssueIsFullPaid; }


        [DisplayName("Loan Issue Is Reschedule"), Expression("jLoanIssue.[IsReschedule]")]
        public Boolean? LoanIssueIsReschedule { get { return Fields.LoanIssueIsReschedule[this]; } set { Fields.LoanIssueIsReschedule[this] = value; } }
        public partial class RowFields { public BooleanField LoanIssueIsReschedule; }


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

        [DisplayName("Employee Id"), Expression("jEmploymentInfo.[EmpId]"), QuickSearch, QuickFilter(true)]
        [MinSelectLevel(SelectLevel.List)]
        public String EmpId { get { return Fields.EmpId[this]; } set { Fields.EmpId[this] = value; } }
        public partial class RowFields { public StringField EmpId; }

        [DisplayName("Employee Name"), Expression("jEmploymentInfo.[FullName]"), QuickSearch]
        [MinSelectLevel(SelectLevel.List)]
        public String EmployeeName { get { return Fields.EmployeeName[this]; } set { Fields.EmployeeName[this] = value; } }
        public partial class RowFields { public StringField EmployeeName; }

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
        public LaMonthlyLoanInstallmentDetailRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_MonthlyLoanInstallmentDetail]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_MonthlyLoanInstallmentDetail]")
            {
                LocalTextPrefix = "Task.LaMonthlyLoanInstallmentDetail";
            }
        }
        #endregion RowFields
    }
}
