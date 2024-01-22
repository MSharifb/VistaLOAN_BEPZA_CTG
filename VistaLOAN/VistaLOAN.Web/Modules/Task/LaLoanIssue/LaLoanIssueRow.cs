
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Loan Issue"), InstanceName("Loan Issue"), TwoLevelCached]
    [ReadPermission("Task:LaLoanIssue:Read")]
    [InsertPermission("Task:LaLoanIssue:Insert")]
    [UpdatePermission("Task:LaLoanIssue:Update")]
    [DeletePermission("Task:LaLoanIssue:Delete")]
    [LookupScript("Task.LaLoanIssue")]
    public sealed class LaLoanIssueRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Loan Application
        [DisplayName("Loan Application"), NotNull, ForeignKey("[dbo].[LA_LoanApplication]", "Id"), LeftJoin("jLoanApplication"), TextualField("LoanApplicationLoanNo")]
        [LookupEditor(typeof(Task.Entities.LaLoanApplicationRow))]
        public Int32? LoanApplicationId { get { return Fields.LoanApplicationId[this]; } set { Fields.LoanApplicationId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationId; }
        #endregion LoanApplicationId

        #region Effective Month
        [DisplayName("Effective Month")]
        public Int32? EffectiveMonth { get { return Fields.EffectiveMonth[this]; } set { Fields.EffectiveMonth[this] = value; } }
        public partial class RowFields { public Int32Field EffectiveMonth; }
        #endregion EffectiveMonth

        #region Effective Year
        [DisplayName("Effective Year")]
        public Int32? EffectiveYear { get { return Fields.EffectiveYear[this]; } set { Fields.EffectiveYear[this] = value; } }
        public partial class RowFields { public Int32Field EffectiveYear; }
        #endregion EffectiveYear

        #region Loan Amount
        [DisplayName("Loan Amount"), Size(18), Scale(2), NotNull]
        public Decimal? LoanAmount { get { return Fields.LoanAmount[this]; } set { Fields.LoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanAmount; }
        #endregion LoanAmount

        #region Principal Installment Amount
        [DisplayName("Principal Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? PrincipalInstallmentAmount { get { return Fields.PrincipalInstallmentAmount[this]; } set { Fields.PrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalInstallmentAmount; }
        #endregion PrincipalInstallmentAmount

        #region Interest Amount
        [DisplayName("Interest Amount"), Size(18), Scale(2), NotNull]
        public Decimal? InterestAmount { get { return Fields.InterestAmount[this]; } set { Fields.InterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestAmount; }
        #endregion InterestAmount

        #region Interest Installment Amount
        [DisplayName("Interest Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? InterestInstallmentAmount { get { return Fields.InterestInstallmentAmount[this]; } set { Fields.InterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestInstallmentAmount; }
        #endregion InterestInstallmentAmount

        #region Last Principal Installment Amount
        [DisplayName("Excess Principal Amount"), Size(18), Scale(2), NotNull]
        public Decimal? LastPrincipalInstallmentAmount { get { return Fields.LastPrincipalInstallmentAmount[this]; } set { Fields.LastPrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LastPrincipalInstallmentAmount; }
        #endregion LastPrincipalInstallmentAmount

        #region Last Interest Installment Amount
        [DisplayName("Excess Interest Amount"), Size(18), Scale(2), NotNull]
        public Decimal? LastInterestInstallmentAmount { get { return Fields.LastInterestInstallmentAmount[this]; } set { Fields.LastInterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField LastInterestInstallmentAmount; }
        #endregion LastInterestInstallmentAmount

        #region Is Full Paid
        [DisplayName("Is Full Paid"), NotNull]
        public Boolean? IsFullPaid { get { return Fields.IsFullPaid[this]; } set { Fields.IsFullPaid[this] = value; } }
        public partial class RowFields { public BooleanField IsFullPaid; }
        #endregion IsFullPaid

        #region Is Reschedule
        [DisplayName("Is Reschedule"), NotNull]
        public Boolean? IsReschedule { get { return Fields.IsReschedule[this]; } set { Fields.IsReschedule[this] = value; } }
        public partial class RowFields { public BooleanField IsReschedule; }
        #endregion IsReschedule

        #region Is Close
        [DisplayName("Is Close"), NotNull]
        public Boolean? IsClose { get { return Fields.IsClose[this]; } set { Fields.IsClose[this] = value; } }
        public partial class RowFields { public BooleanField IsClose; }
        #endregion IsClose

        #region Full Paid Date
        [DisplayName("Full Paid Date")]
        public DateTime? FullPaidDate { get { return Fields.FullPaidDate[this]; } set { Fields.FullPaidDate[this] = value; } }
        public partial class RowFields { public DateTimeField FullPaidDate; }
        #endregion FullPaidDate

        #region Is Posting
        [DisplayName("Is Posting"), NotNull]
        public Boolean? IsPosting { get { return Fields.IsPosting[this]; } set { Fields.IsPosting[this] = value; } }
        public partial class RowFields { public BooleanField IsPosting; }
        #endregion IsPosting

        #region Close Date
        [DisplayName("Close Date")]
        public DateTime? CloseDate { get { return Fields.CloseDate[this]; } set { Fields.CloseDate[this] = value; } }
        public partial class RowFields { public DateTimeField CloseDate; }
        #endregion Close Date

        #region Interest Confirm Date
        [DisplayName("Interest Confirm Date")]
        public DateTime? InterestConfirmDate { get { return Fields.InterestConfirmDate[this]; } set { Fields.InterestConfirmDate[this] = value; } }
        public partial class RowFields { public DateTimeField InterestConfirmDate; }
        #endregion Interest Confirm Date

        #region Foreign Fields

        [DisplayName("Loan No"), Expression("jLoanApplication.[LoanNo]"), QuickSearch, QuickFilter(true)]
        public String LoanApplicationLoanNo { get { return Fields.LoanApplicationLoanNo[this]; } set { Fields.LoanApplicationLoanNo[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationLoanNo; }


        [DisplayName("Loan Application Employee Id"), Expression("jLoanApplication.[EmployeeId]"), ForeignKey("[dbo].[PRM_EmploymentInfo]", "Id"), LeftJoin("jLoanAppliacationEmploymentInfo"), TextualField("EmpId")]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public Int32? LoanApplicationEmployeeId { get { return Fields.LoanApplicationEmployeeId[this]; } set { Fields.LoanApplicationEmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationEmployeeId; }


        [DisplayName("Employee Id"),  Expression("jLoanAppliacationEmploymentInfo.EmpId"), QuickFilter(true), QuickSearch]
        public String EmpId { get { return Fields.EmpId[this]; } set { Fields.EmpId[this] = value; } }
        public partial class RowFields { public StringField EmpId; }


        [DisplayName("Employee Name"),  Expression("jLoanAppliacationEmploymentInfo.FullName"), QuickSearch]
        public String EmpFullName { get { return Fields.EmpFullName[this]; } set { Fields.EmpFullName[this] = value; } }
        public partial class RowFields { public StringField EmpFullName; }


        [DisplayName("Loan Application Seniority No"), Expression("jLoanApplication.[SeniorityNo]")]
        public Int32? LoanApplicationSeniorityNo { get { return Fields.LoanApplicationSeniorityNo[this]; } set { Fields.LoanApplicationSeniorityNo[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationSeniorityNo; }


        [DisplayName("Loan Application Apply Date"), Expression("jLoanApplication.[ApplyDate]")]
        public DateTime? LoanApplicationApplyDate { get { return Fields.LoanApplicationApplyDate[this]; } set { Fields.LoanApplicationApplyDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanApplicationApplyDate; }


        [DisplayName("Loan Application Loan Criteria Id"), Expression("jLoanApplication.[LoanCriteriaId]")]
        public Int32? LoanApplicationLoanCriteriaId { get { return Fields.LoanApplicationLoanCriteriaId[this]; } set { Fields.LoanApplicationLoanCriteriaId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationLoanCriteriaId; }


        [DisplayName("Loan Application Apply Loan Amount"), Expression("jLoanApplication.[ApplyLoanAmount]")]
        public Decimal? LoanApplicationApplyLoanAmount { get { return Fields.LoanApplicationApplyLoanAmount[this]; } set { Fields.LoanApplicationApplyLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationApplyLoanAmount; }

        [DisplayName("Loan Application Apply Interest Amount"), Expression("jLoanApplication.[ApplyInterestAmount]")]
        public Decimal? LoanApplicationApplyInterestAmount { get { return Fields.LoanApplicationApplyInterestAmount[this]; } set { Fields.LoanApplicationApplyInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationApplyInterestAmount; }

        [DisplayName("Loan Application Apply Interest Rate"), Expression("jLoanApplication.[ApplyInterestRate]")]
        public Decimal? LoanApplicationApplyInterestRate { get { return Fields.LoanApplicationApplyInterestRate[this]; } set { Fields.LoanApplicationApplyInterestRate[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationApplyInterestRate; }

        [DisplayName("Loan Application Granted Loan Amount"), Expression("jLoanApplication.[GrantedLoanAmount]")]
        public Decimal? LoanApplicationGrantedLoanAmount { get { return Fields.LoanApplicationGrantedLoanAmount[this]; } set { Fields.LoanApplicationGrantedLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationGrantedLoanAmount; }

        [DisplayName("Loan Application Granted Interest Amount"), Expression("jLoanApplication.[GrantedInterestAmount]")]
        public Decimal? LoanApplicationGrantedInterestAmount { get { return Fields.LoanApplicationGrantedInterestAmount[this]; } set { Fields.LoanApplicationGrantedInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationGrantedInterestAmount; }

        [DisplayName("Loan Application Granted Interest Rate"), Expression("jLoanApplication.[GrantedInterestRate]")]
        public Decimal? LoanApplicationGrantedInterestRate { get { return Fields.LoanApplicationGrantedInterestRate[this]; } set { Fields.LoanApplicationGrantedInterestRate[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationGrantedInterestRate; }

        [DisplayName("Loan Application Approver Id"), Expression("jLoanApplication.[ApproverId]")]
        public String LoanApplicationApproverId { get { return Fields.LoanApplicationApproverId[this]; } set { Fields.LoanApplicationApproverId[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationApproverId; }


        [DisplayName("Loan Application App Status Id"), Expression("jLoanApplication.[AppStatusID]")]
        public Int32? LoanApplicationAppStatusId { get { return Fields.LoanApplicationAppStatusId[this]; } set { Fields.LoanApplicationAppStatusId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationAppStatusId; }


        [DisplayName("Loan Application Is Discard"), Expression("jLoanApplication.[IsDiscard]")]
        public Boolean? LoanApplicationIsDiscard { get { return Fields.LoanApplicationIsDiscard[this]; } set { Fields.LoanApplicationIsDiscard[this] = value; } }
        public partial class RowFields { public BooleanField LoanApplicationIsDiscard; }


        [DisplayName("Loan Application Is Approval Process"), Expression("jLoanApplication.[IsApprovalProcess]")]
        public Boolean? LoanApplicationIsApprovalProcess { get { return Fields.LoanApplicationIsApprovalProcess[this]; } set { Fields.LoanApplicationIsApprovalProcess[this] = value; } }
        public partial class RowFields { public BooleanField LoanApplicationIsApprovalProcess; }

        [DisplayName("Loan Application Approved Date"), Expression("jLoanApplication.[ApprovedDate]")]
        public DateTime? LoanApplicationApprovedDate { get { return Fields.LoanApplicationApprovedDate[this]; } set { Fields.LoanApplicationApprovedDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanApplicationApprovedDate; }


        [DisplayName("Loan Application  Pf Loan Type"), Expression("jLoanApplication.[PFLoanType]")]
        public String LoanApplicationPFLoanType { get { return Fields.LoanApplicationPFLoanType[this]; } set { Fields.LoanApplicationPFLoanType[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationPFLoanType; }

        [DisplayName("Loan Application Is Issue"), Expression("jLoanApplication.[IsIssue]")]
        public Boolean? LoanApplicationIsIssue { get { return Fields.LoanApplicationIsIssue[this]; } set { Fields.LoanApplicationIsIssue[this] = value; } }
        public partial class RowFields { public BooleanField LoanApplicationIsIssue; }


        [DisplayName("Loan Application Responsible Person Id"), Expression("jLoanApplication.[ResponsiblePersonID]")]
        public String LoanApplicationResponsiblePersonId { get { return Fields.LoanApplicationResponsiblePersonId[this]; } set { Fields.LoanApplicationResponsiblePersonId[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationResponsiblePersonId; }


        #endregion Foreign Fields

        #region Loan Amount
        //[DisplayName("Loan No"), NotMapped]
        //public String LoanNo { get { return Fields.LoanNo[this]; } set { Fields.LoanNo[this] = value; } }
        //public partial class RowFields { public StringField LoanNo; }
        #endregion LoanAmount

        #region Employee Id

        [DisplayName("Employee"), NotNull, NotMapped]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public Int32? EmployeeId { get { return Fields.EmployeeId[this]; } set { Fields.EmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeId; }
        #endregion EmployeeId

        #region Loan Issue Detail
        [DisplayName("Detail Information"), MasterDetailRelation(foreignKey: "LoanIssueId"), NotMapped]
        public List<LaLoanIssueDetailRow> LaLoanIssueDetail
        {
            get { return Fields.LaLoanIssueDetail[this]; }
            set { Fields.LaLoanIssueDetail[this] = value; }
        }
        public partial class RowFields { public RowListField<LaLoanIssueDetailRow> LaLoanIssueDetail; }
        #endregion

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.LoanApplicationLoanNo; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaLoanIssueRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanIssue]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanIssue]")
            {
                LocalTextPrefix = "Task.LaLoanIssue";
            }
        }
        #endregion RowFields
    }
}
