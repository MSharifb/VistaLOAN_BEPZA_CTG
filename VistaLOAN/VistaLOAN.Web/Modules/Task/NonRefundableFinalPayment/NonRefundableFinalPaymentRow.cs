
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("NRL/FP Settlement"), InstanceName("NRL/FP Settlement"), TwoLevelCached]
    [ReadPermission("Task:NonRefundableFinalPayment:Read")]
    [InsertPermission("Task:NonRefundableFinalPayment:Insert")]
    [UpdatePermission("Task:NonRefundableFinalPayment:Update")]
    [DeletePermission("Task:NonRefundableFinalPayment:Delete")]
    [LookupScript("Task.NonRefundableFinalPayment")]
    public sealed class NonRefundableFinalPaymentRow : Row, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Loan No
        [DisplayName("Loan No"), Size(25), QuickSearch]
        public String LoanNo { get { return Fields.LoanNo[this]; } set { Fields.LoanNo[this] = value; } }
        public partial class RowFields { public StringField LoanNo; }
        #endregion LoanNo

        #region Employee Id
        [DisplayName("Employee Id"), NotNull, ForeignKey("[dbo].[PRM_EmploymentInfo]", "Id"), LeftJoin("jEmploymentInfo"), TextualField("EmpId"), LookupInclude]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public Int32? EmployeeId { get { return Fields.EmployeeId[this]; } set { Fields.EmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeId; }
        #endregion EmployeeId

        #region Seniority No
        [DisplayName("Seniority No")]
        public Int32? SeniorityNo { get { return Fields.SeniorityNo[this]; } set { Fields.SeniorityNo[this] = value; } }
        public partial class RowFields { public Int32Field SeniorityNo; }
        #endregion SeniorityNo

        #region Apply Date
        [DisplayName("Apply Date"), NotNull]
        public DateTime? ApplyDate { get { return Fields.ApplyDate[this]; } set { Fields.ApplyDate[this] = value; } }
        public partial class RowFields { public DateTimeField ApplyDate; }
        #endregion ApplyDate

        #region Loan Criteria
        [DisplayName("Loan Criteria"), NotNull, ForeignKey("[dbo].[LA_LoanCriteria]", "Id"), LeftJoin("jLoanCriteria"), TextualField("LoanCriteriaSchemeName")]
        [LookupEditor(typeof(Setup.Entities.LaLoanCriteriaRow))]
        public Int32? LoanCriteriaId { get { return Fields.LoanCriteriaId[this]; } set { Fields.LoanCriteriaId[this] = value; } }
        public partial class RowFields { public Int32Field LoanCriteriaId; }
        #endregion LoanCriteriaId

        #region Apply Loan Amount
        [DisplayName("Apply Loan Amount"), Size(18), Scale(2), NotNull]
        public Decimal? ApplyLoanAmount { get { return Fields.ApplyLoanAmount[this]; } set { Fields.ApplyLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField ApplyLoanAmount; }
        #endregion ApplyLoanAmount

        #region Apply Principal Installment No
        [DisplayName("Apply Principal Installment No"), NotNull]
        public Int32? ApplyPrincipalInstallmentNo { get { return Fields.ApplyPrincipalInstallmentNo[this]; } set { Fields.ApplyPrincipalInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field ApplyPrincipalInstallmentNo; }
        #endregion ApplyPrincipalInstallmentNo

        #region Apply Interest Amount
        [DisplayName("Apply Interest Amount"), Size(18), Scale(2), NotNull]
        public Decimal? ApplyInterestAmount { get { return Fields.ApplyInterestAmount[this]; } set { Fields.ApplyInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField ApplyInterestAmount; }
        #endregion ApplyInterestAmount

        #region Apply Interest Installment No
        [DisplayName("Apply Interest Installment No"), NotNull]
        public Int32? ApplyInterestInstallmentNo { get { return Fields.ApplyInterestInstallmentNo[this]; } set { Fields.ApplyInterestInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field ApplyInterestInstallmentNo; }
        #endregion ApplyInterestInstallmentNo

        #region Apply Interest Rate
        [DisplayName("Apply Interest Rate"), Size(18), Scale(2), NotNull]
        public Decimal? ApplyInterestRate { get { return Fields.ApplyInterestRate[this]; } set { Fields.ApplyInterestRate[this] = value; } }
        public partial class RowFields { public DecimalField ApplyInterestRate; }
        #endregion ApplyInterestRate

        #region Purpose
        [DisplayName("Purpose"), Size(-1)]
        public String Purpose { get { return Fields.Purpose[this]; } set { Fields.Purpose[this] = value; } }
        public partial class RowFields { public StringField Purpose; }
        #endregion Purpose

        #region Granted Loan Amount
        [DisplayName("Granted Loan Amount"), Size(18), Scale(2), NotNull]
        public Decimal? GrantedLoanAmount { get { return Fields.GrantedLoanAmount[this]; } set { Fields.GrantedLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField GrantedLoanAmount; }
        #endregion GrantedLoanAmount

        #region Granted Principal Installment No
        [DisplayName("Granted Principal Installment No"), NotNull]
        public Int32? GrantedPrincipalInstallmentNo { get { return Fields.GrantedPrincipalInstallmentNo[this]; } set { Fields.GrantedPrincipalInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field GrantedPrincipalInstallmentNo; }
        #endregion GrantedPrincipalInstallmentNo

        #region Granted Interest Amount
        [DisplayName("Granted Interest Amount"), Size(18), Scale(2), NotNull]
        public Decimal? GrantedInterestAmount { get { return Fields.GrantedInterestAmount[this]; } set { Fields.GrantedInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField GrantedInterestAmount; }
        #endregion GrantedInterestAmount

        #region Granted Interest Installment No
        [DisplayName("Granted Interest Installment No"), NotNull]
        public Int32? GrantedInterestInstallmentNo { get { return Fields.GrantedInterestInstallmentNo[this]; } set { Fields.GrantedInterestInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field GrantedInterestInstallmentNo; }
        #endregion GrantedInterestInstallmentNo

        #region Granted Interest Rate
        [DisplayName("Granted Interest Rate"), Size(18), Scale(2), NotNull]
        public Decimal? GrantedInterestRate { get { return Fields.GrantedInterestRate[this]; } set { Fields.GrantedInterestRate[this] = value; } }
        public partial class RowFields { public DecimalField GrantedInterestRate; }
        #endregion GrantedInterestRate

        #region Is Issue
        [DisplayName("Is Issue"), NotNull]
        public Boolean? IsIssue { get { return Fields.IsIssue[this]; } set { Fields.IsIssue[this] = value; } }
        public partial class RowFields { public BooleanField IsIssue; }
        #endregion IsIssue

        #region Is Approval Process
        [DisplayName("Is Approval Process"), NotNull]
        public Boolean? IsApprovalProcess { get { return Fields.IsApprovalProcess[this]; } set { Fields.IsApprovalProcess[this] = value; } }
        public partial class RowFields { public BooleanField IsApprovalProcess; }
        #endregion IsApprovalProcess

        #region Approver Id
        [DisplayName("Approver/Recommender"), Size(-1), NotNull]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public String ApproverId { get { return Fields.ApproverId[this]; } set { Fields.ApproverId[this] = value; } }
        public partial class RowFields { public StringField ApproverId; }
        #endregion ApproverId

        #region Approved Date
        [DisplayName("Approved Date")]
        public DateTime? ApprovedDate { get { return Fields.ApprovedDate[this]; } set { Fields.ApprovedDate[this] = value; } }
        public partial class RowFields { public DateTimeField ApprovedDate; }
        #endregion ApprovedDate

        #region App Status Id
        [DisplayName("Application Status"), Column("AppStatusID"), NotNull, ForeignKey("[dbo].[APV_ApprovalStatus]", "Id"), LeftJoin("jApprovalStatus"), TextualField("StatusName")]
        [LookupEditor(typeof(Configurations.Entities.ApvApprovalStatusRow)), LookupInclude]
        public Int32? AppStatusId { get { return Fields.AppStatusId[this]; } set { Fields.AppStatusId[this] = value; } }
        public partial class RowFields { public Int32Field AppStatusId; }
        #endregion AppStatusId

        #region Is Discard
        [DisplayName("Is Discard"), NotNull]
        public Boolean? IsDiscard { get { return Fields.IsDiscard[this]; } set { Fields.IsDiscard[this] = value; } }
        public partial class RowFields { public BooleanField IsDiscard; }
        #endregion IsDiscard

        #region Is Off Line
        [DisplayName("Is Off Line"), NotNull]
        public Boolean? IsOffLine { get { return Fields.IsOffLine[this]; } set { Fields.IsOffLine[this] = value; } }
        public partial class RowFields { public BooleanField IsOffLine; }
        #endregion IsOffLine

        #region Is Re Apply
        [DisplayName("Is Re Apply"), NotNull]
        public Boolean? IsReApply { get { return Fields.IsReApply[this]; } set { Fields.IsReApply[this] = value; } }
        public partial class RowFields { public BooleanField IsReApply; }
        #endregion IsReApply

        #region Responsible Person Id
        [DisplayName("Responsible Person Id"), Column("ResponsiblePersonID"), Size(-1)]
        public String ResponsiblePersonId { get { return Fields.ResponsiblePersonId[this]; } set { Fields.ResponsiblePersonId[this] = value; } }
        public partial class RowFields { public StringField ResponsiblePersonId; }
        #endregion ResponsiblePersonId

        #region Employee Wise Loan Id
        [DisplayName("Employee Wise Loan Id")]
        public Int32? EmployeeWiseLoanId { get { return Fields.EmployeeWiseLoanId[this]; } set { Fields.EmployeeWiseLoanId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeWiseLoanId; }
        #endregion EmployeeWiseLoanId

        #region Node Id
        [DisplayName("Node Id"), NotNull]
        public Int32? NodeId { get { return Fields.NodeId[this]; } set { Fields.NodeId[this] = value; } }
        public partial class RowFields { public Int32Field NodeId; }
        #endregion NodeId

        #region Pf Loan Type
        [DisplayName("Pf Loan Type"), Column("PFLoanType"), Size(50), QuickFilter]
        public String PfLoanType { get { return Fields.PfLoanType[this]; } set { Fields.PfLoanType[this] = value; } }
        public partial class RowFields { public StringField PfLoanType; }
        #endregion PfLoanType

        #region Non Refund Pf Own Loan Amount
        [DisplayName("PF Own Contribution"), Column("NonRefundPFOwnLoanAmount"), Size(18), Scale(2)]
        public Decimal? NonRefundPfOwnLoanAmount { get { return Fields.NonRefundPfOwnLoanAmount[this]; } set { Fields.NonRefundPfOwnLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundPfOwnLoanAmount; }
        #endregion NonRefundPfOwnLoanAmount

        #region Non Refund Pf Company Loan Amount
        [DisplayName("PF BEPZA Contribution"), Column("NonRefundPFCompanyLoanAmount"), Size(18), Scale(2)]
        public Decimal? NonRefundPfCompanyLoanAmount { get { return Fields.NonRefundPfCompanyLoanAmount[this]; } set { Fields.NonRefundPfCompanyLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundPfCompanyLoanAmount; }
        #endregion NonRefundPfCompanyLoanAmount

        #region Non Refund Own Interest Loan Amount
        [DisplayName("PF Own Interest"), Size(18), Scale(2)]
        public Decimal? NonRefundOwnInterestLoanAmount { get { return Fields.NonRefundOwnInterestLoanAmount[this]; } set { Fields.NonRefundOwnInterestLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundOwnInterestLoanAmount; }
        #endregion NonRefundOwnInterestLoanAmount

        #region Non Refund Company Interest Loan Amount
        [DisplayName("PF BEPZA Interest"), Size(18), Scale(2)]
        public Decimal? NonRefundCompanyInterestLoanAmount { get { return Fields.NonRefundCompanyInterestLoanAmount[this]; } set { Fields.NonRefundCompanyInterestLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundCompanyInterestLoanAmount; }
        #endregion NonRefundCompanyInterestLoanAmount

        #region I User
        [DisplayName("I User"), Size(-1)]
        public String IUser { get { return Fields.IUser[this]; } set { Fields.IUser[this] = value; } }
        public partial class RowFields { public StringField IUser; }
        #endregion IUser

        #region I Date
        [DisplayName("I Date"), NotNull]
        public DateTime? IDate { get { return Fields.IDate[this]; } set { Fields.IDate[this] = value; } }
        public partial class RowFields { public DateTimeField IDate; }
        #endregion IDate

        #region E User
        [DisplayName("E User"), Size(-1)]
        public String EUser { get { return Fields.EUser[this]; } set { Fields.EUser[this] = value; } }
        public partial class RowFields { public StringField EUser; }
        #endregion EUser

        #region E Date
        [DisplayName("E Date")]
        public DateTime? EDate { get { return Fields.EDate[this]; } set { Fields.EDate[this] = value; } }
        public partial class RowFields { public DateTimeField EDate; }
        #endregion EDate


        #region Foreign Fields

        [DisplayName("Loan Criteria Scheme Name"), Expression("jLoanCriteria.[SchemeName]")]
        public String LoanCriteriaSchemeName { get { return Fields.LoanCriteriaSchemeName[this]; } set { Fields.LoanCriteriaSchemeName[this] = value; } }
        public partial class RowFields { public StringField LoanCriteriaSchemeName; }


        [DisplayName("Loan Criteria Loan Type Id"), Expression("jLoanCriteria.[LoanTypeId]")]
        public Int32? LoanCriteriaLoanTypeId { get { return Fields.LoanCriteriaLoanTypeId[this]; } set { Fields.LoanCriteriaLoanTypeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanCriteriaLoanTypeId; }


        [DisplayName("Loan Criteria I User"), Expression("jLoanCriteria.[IUser]")]
        public String LoanCriteriaIUser { get { return Fields.LoanCriteriaIUser[this]; } set { Fields.LoanCriteriaIUser[this] = value; } }
        public partial class RowFields { public StringField LoanCriteriaIUser; }


        [DisplayName("Loan Criteria I Date"), Expression("jLoanCriteria.[IDate]")]
        public DateTime? LoanCriteriaIDate { get { return Fields.LoanCriteriaIDate[this]; } set { Fields.LoanCriteriaIDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanCriteriaIDate; }


        [DisplayName("Loan Criteria E User"), Expression("jLoanCriteria.[EUser]")]
        public String LoanCriteriaEUser { get { return Fields.LoanCriteriaEUser[this]; } set { Fields.LoanCriteriaEUser[this] = value; } }
        public partial class RowFields { public StringField LoanCriteriaEUser; }


        [DisplayName("Loan Criteria E Date"), Expression("jLoanCriteria.[EDate]")]
        public DateTime? LoanCriteriaEDate { get { return Fields.LoanCriteriaEDate[this]; } set { Fields.LoanCriteriaEDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanCriteriaEDate; }

        [DisplayName("Employee Name"), Expression("jEmploymentInfo.[FullName]"), QuickSearch]
        public String EmployeeName { get { return Fields.EmployeeName[this]; } set { Fields.EmployeeName[this] = value; } }
        public partial class RowFields { public StringField EmployeeName; }

        [DisplayName("Employee Id"), Expression("jEmploymentInfo.[EmpId]"), QuickFilter(true), QuickSearch]
        public String EmpId { get { return Fields.EmpId[this]; } set { Fields.EmpId[this] = value; } }
        public partial class RowFields { public StringField EmpId; }

        [DisplayName("Status Name"), Expression("jApprovalStatus.[StatusName]")]
        public String StatusName { get { return Fields.StatusName[this]; } set { Fields.StatusName[this] = value; } }
        public partial class RowFields { public StringField StatusName; }

        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.LoanNo; }
        }
        #endregion Id and Name fields

        #region Constructor
        public NonRefundableFinalPaymentRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanApplication]";

        public partial class RowFields : RowFieldsBase
        {
            public RowFields()
            : base("[dbo].[LA_LoanApplication]")
            {
                LocalTextPrefix = "Task.NonRefundableFinalPayment";
            }
        }
        #endregion RowFields
    }
}
