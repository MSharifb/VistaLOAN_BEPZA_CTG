
namespace VistaLOAN.Task.Entities
{
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;

    [ConnectionKey("LoanDB"), DisplayName("Loan Opening"), InstanceName("Loan Opening"), TwoLevelCached]
    [ReadPermission("Task:LaLoanOpening:Read")]
    [InsertPermission("Task:LaLoanOpening:Insert")]
    [UpdatePermission("Task:LaLoanOpening:Update")]
    [DeletePermission("Task:LaLoanOpening:Delete")]
    [LookupScript("Task.LaLoanOpening")]
    public sealed class LaLoanOpeningRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Employee Id
        [DisplayName("Employee"), NotNull, ForeignKey("[dbo].[PRM_EmploymentInfo]", "Id"), LeftJoin("jEmploymentInfo"), TextualField("EmpId"), LookupInclude]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public Int32? EmployeeId { get { return Fields.EmployeeId[this]; } set { Fields.EmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeId; }
        #endregion EmployeeId

        #region Balance Month
        [DisplayName("Balance Month"),NotNull]
        public String BalanceMonth { get { return Fields.BalanceMonth[this]; } set { Fields.BalanceMonth[this] = value; } }
        public partial class RowFields { public StringField BalanceMonth; }
        #endregion BalanceMonth

        #region Balance Year
        [DisplayName("Balance Year"),NotNull]
        public String BalanceYear { get { return Fields.BalanceYear[this]; } set { Fields.BalanceYear[this] = value; } }
        public partial class RowFields { public StringField BalanceYear; }
        #endregion BalanceYear

        #region Principal Installment No
        [DisplayName("Principal Installment No"), NotNull]
        public Int32? PrincipalInstallmentNo { get { return Fields.PrincipalInstallmentNo[this]; } set { Fields.PrincipalInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field PrincipalInstallmentNo; }
        #endregion PrincipalInstallmentNo

        #region Principal Installment Amount
        [DisplayName("Principal Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? PrincipalInstallmentAmount { get { return Fields.PrincipalInstallmentAmount[this]; } set { Fields.PrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalInstallmentAmount; }
        #endregion PrincipalInstallmentAmount

        #region Principal Paid Amount
        [DisplayName("Principal Paid Amount"), Size(18), Scale(2), NotNull]
        public Decimal? PrincipalPaidAmount { get { return Fields.PrincipalPaidAmount[this]; } set { Fields.PrincipalPaidAmount[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalPaidAmount; }
        #endregion PrincipalPaidAmount

        #region Principal Due Amount
        [DisplayName("Principal Due Amount"), Size(18), Scale(2), NotNull]
        public Decimal? PrincipalDueAmount { get { return Fields.PrincipalDueAmount[this]; } set { Fields.PrincipalDueAmount[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalDueAmount; }
        #endregion PrincipalDueAmount

        #region Interest Installment No
        [DisplayName("Interest Installment No"), NotNull]
        public Int32? InterestInstallmentNo { get { return Fields.InterestInstallmentNo[this]; } set { Fields.InterestInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field InterestInstallmentNo; }
        #endregion InterestInstallmentNo

        #region Interest Installment Amount
        [DisplayName("Interest Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? InterestInstallmentAmount { get { return Fields.InterestInstallmentAmount[this]; } set { Fields.InterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestInstallmentAmount; }
        #endregion InterestInstallmentAmount

        #region Interest Paid Amount
        [DisplayName("Interest Paid Amount"), Size(18), Scale(2), NotNull]
        public Decimal? InterestPaidAmount { get { return Fields.InterestPaidAmount[this]; } set { Fields.InterestPaidAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestPaidAmount; }
        #endregion InterestPaidAmount

        #region Interest Due Amount
        [DisplayName("Interest Due Amount"), Size(18), Scale(2), NotNull]
        public Decimal? InterestDueAmount { get { return Fields.InterestDueAmount[this]; } set { Fields.InterestDueAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestDueAmount; }
        #endregion InterestDueAmount

        #region Loan Application
        [DisplayName("Loan Application"), NotNull, ForeignKey("[dbo].[LA_LoanApplication]", "Id"), LeftJoin("jLoanApplication"), TextualField("LoanApplicationLoanNo")]
        [LookupEditor(typeof(Task.Entities.LaLoanApplicationRow), CascadeFrom = "EmployeeId")]
        public Int32? LoanApplicationId { get { return Fields.LoanApplicationId[this]; } set { Fields.LoanApplicationId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationId; }
        #endregion LoanApplicationId


        #region Foreign Fields

        [DisplayName("Loan No"), Expression("jLoanApplication.[LoanNo]"), QuickSearch]
        public String LoanApplicationLoanNo { get { return Fields.LoanApplicationLoanNo[this]; } set { Fields.LoanApplicationLoanNo[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationLoanNo; }


        [DisplayName("Loan Application Employee Id"), Expression("jLoanApplication.[EmployeeId]")]
        public Int32? LoanApplicationEmployeeId { get { return Fields.LoanApplicationEmployeeId[this]; } set { Fields.LoanApplicationEmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationEmployeeId; }


        [DisplayName("Loan Application Seniority No"), Expression("jLoanApplication.[SeniorityNo]")]
        public Int32? LoanApplicationSeniorityNo { get { return Fields.LoanApplicationSeniorityNo[this]; } set { Fields.LoanApplicationSeniorityNo[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationSeniorityNo; }


        [DisplayName("Loan Application Apply Date"), Expression("jLoanApplication.[ApplyDate]")]
        public DateTime? LoanApplicationApplyDate { get { return Fields.LoanApplicationApplyDate[this]; } set { Fields.LoanApplicationApplyDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanApplicationApplyDate; }


        [Expression("jLoanApplication.[LoanCriteriaId]")]
        [DisplayName("Loan Criteria"), ForeignKey("[dbo].[LA_LoanCriteria]", "Id"), LeftJoin("jLoanCriteria"), TextualField("LoanCriteriaSchemeName")]
        [LookupEditor(typeof(Setup.Entities.LaLoanCriteriaRow))]
        public Int32? LoanApplicationLoanCriteriaId { get { return Fields.LoanApplicationLoanCriteriaId[this]; } set { Fields.LoanApplicationLoanCriteriaId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationLoanCriteriaId; }

        [DisplayName("Loan Scheme"), Expression("jLoanCriteria.[SchemeName]")]
        public String LoanCriteriaSchemeName { get { return Fields.LoanCriteriaSchemeName[this]; } set { Fields.LoanCriteriaSchemeName[this] = value; } }
        public partial class RowFields { public StringField LoanCriteriaSchemeName; }


        [DisplayName("Loan Application Apply Loan Amount"), Expression("jLoanApplication.[ApplyLoanAmount]")]
        public Decimal? LoanApplicationApplyLoanAmount { get { return Fields.LoanApplicationApplyLoanAmount[this]; } set { Fields.LoanApplicationApplyLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationApplyLoanAmount; }


        [DisplayName("Loan Application Apply Principal Installment No"), Expression("jLoanApplication.[ApplyPrincipalInstallmentNo]")]
        public Int32? LoanApplicationApplyPrincipalInstallmentNo { get { return Fields.LoanApplicationApplyPrincipalInstallmentNo[this]; } set { Fields.LoanApplicationApplyPrincipalInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationApplyPrincipalInstallmentNo; }


        [DisplayName("Loan Application Apply Interest Amount"), Expression("jLoanApplication.[ApplyInterestAmount]")]
        public Decimal? LoanApplicationApplyInterestAmount { get { return Fields.LoanApplicationApplyInterestAmount[this]; } set { Fields.LoanApplicationApplyInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationApplyInterestAmount; }


        [DisplayName("Loan Application Apply Interest Installment No"), Expression("jLoanApplication.[ApplyInterestInstallmentNo]")]
        public Int32? LoanApplicationApplyInterestInstallmentNo { get { return Fields.LoanApplicationApplyInterestInstallmentNo[this]; } set { Fields.LoanApplicationApplyInterestInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationApplyInterestInstallmentNo; }


        [DisplayName("Loan Application Apply Interest Rate"), Expression("jLoanApplication.[ApplyInterestRate]")]
        public Decimal? LoanApplicationApplyInterestRate { get { return Fields.LoanApplicationApplyInterestRate[this]; } set { Fields.LoanApplicationApplyInterestRate[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationApplyInterestRate; }


        [DisplayName("Loan Application Purpose"), Expression("jLoanApplication.[Purpose]")]
        public String LoanApplicationPurpose { get { return Fields.LoanApplicationPurpose[this]; } set { Fields.LoanApplicationPurpose[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationPurpose; }


        [DisplayName("Loan Application Granted Loan Amount"), Expression("jLoanApplication.[GrantedLoanAmount]")]
        public Decimal? LoanApplicationGrantedLoanAmount { get { return Fields.LoanApplicationGrantedLoanAmount[this]; } set { Fields.LoanApplicationGrantedLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationGrantedLoanAmount; }


        [DisplayName("Loan Application Granted Principal Installment No"), Expression("jLoanApplication.[GrantedPrincipalInstallmentNo]")]
        public Int32? LoanApplicationGrantedPrincipalInstallmentNo { get { return Fields.LoanApplicationGrantedPrincipalInstallmentNo[this]; } set { Fields.LoanApplicationGrantedPrincipalInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationGrantedPrincipalInstallmentNo; }


        [DisplayName("Loan Application Granted Interest Amount"), Expression("jLoanApplication.[GrantedInterestAmount]")]
        public Decimal? LoanApplicationGrantedInterestAmount { get { return Fields.LoanApplicationGrantedInterestAmount[this]; } set { Fields.LoanApplicationGrantedInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationGrantedInterestAmount; }


        [DisplayName("Loan Application Granted Interest Installment No"), Expression("jLoanApplication.[GrantedInterestInstallmentNo]")]
        public Int32? LoanApplicationGrantedInterestInstallmentNo { get { return Fields.LoanApplicationGrantedInterestInstallmentNo[this]; } set { Fields.LoanApplicationGrantedInterestInstallmentNo[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationGrantedInterestInstallmentNo; }


        [DisplayName("Loan Application Granted Interest Rate"), Expression("jLoanApplication.[GrantedInterestRate]")]
        public Decimal? LoanApplicationGrantedInterestRate { get { return Fields.LoanApplicationGrantedInterestRate[this]; } set { Fields.LoanApplicationGrantedInterestRate[this] = value; } }
        public partial class RowFields { public DecimalField LoanApplicationGrantedInterestRate; }


        [DisplayName("Loan Application Node Id"), Expression("jLoanApplication.[NodeId]")]
        public Int32? LoanApplicationNodeId { get { return Fields.LoanApplicationNodeId[this]; } set { Fields.LoanApplicationNodeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanApplicationNodeId; }


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


        [DisplayName("Loan Application Is Off Line"), Expression("jLoanApplication.[IsOffLine]")]
        public Boolean? LoanApplicationIsOffLine { get { return Fields.LoanApplicationIsOffLine[this]; } set { Fields.LoanApplicationIsOffLine[this] = value; } }
        public partial class RowFields { public BooleanField LoanApplicationIsOffLine; }


        [DisplayName("Loan Application I User"), Expression("jLoanApplication.[IUser]")]
        public String LoanApplicationIUser { get { return Fields.LoanApplicationIUser[this]; } set { Fields.LoanApplicationIUser[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationIUser; }


        [DisplayName("Loan Application I Date"), Expression("jLoanApplication.[IDate]")]
        public DateTime? LoanApplicationIDate { get { return Fields.LoanApplicationIDate[this]; } set { Fields.LoanApplicationIDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanApplicationIDate; }


        [DisplayName("Loan Application E User"), Expression("jLoanApplication.[EUser]")]
        public String LoanApplicationEUser { get { return Fields.LoanApplicationEUser[this]; } set { Fields.LoanApplicationEUser[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationEUser; }


        [DisplayName("Loan Application E Date"), Expression("jLoanApplication.[EDate]")]
        public DateTime? LoanApplicationEDate { get { return Fields.LoanApplicationEDate[this]; } set { Fields.LoanApplicationEDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanApplicationEDate; }


        [DisplayName("Loan Application Approved Date"), Expression("jLoanApplication.[ApprovedDate]")]
        public DateTime? LoanApplicationApprovedDate { get { return Fields.LoanApplicationApprovedDate[this]; } set { Fields.LoanApplicationApprovedDate[this] = value; } }
        public partial class RowFields { public DateTimeField LoanApplicationApprovedDate; }


        [DisplayName("Loan Application  Pf Loan Type"), Expression("jLoanApplication.[PFLoanType]")]
        public String LoanApplicationPFLoanType { get { return Fields.LoanApplicationPFLoanType[this]; } set { Fields.LoanApplicationPFLoanType[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationPFLoanType; }


        [DisplayName("Loan Application Is Re Apply"), Expression("jLoanApplication.[IsReApply]")]
        public Boolean? LoanApplicationIsReApply { get { return Fields.LoanApplicationIsReApply[this]; } set { Fields.LoanApplicationIsReApply[this] = value; } }
        public partial class RowFields { public BooleanField LoanApplicationIsReApply; }


        [DisplayName("Loan Application Is Issue"), Expression("jLoanApplication.[IsIssue]")]
        public Boolean? LoanApplicationIsIssue { get { return Fields.LoanApplicationIsIssue[this]; } set { Fields.LoanApplicationIsIssue[this] = value; } }
        public partial class RowFields { public BooleanField LoanApplicationIsIssue; }


        [DisplayName("Loan Application Responsible Person Id"), Expression("jLoanApplication.[ResponsiblePersonID]")]
        public String LoanApplicationResponsiblePersonId { get { return Fields.LoanApplicationResponsiblePersonId[this]; } set { Fields.LoanApplicationResponsiblePersonId[this] = value; } }
        public partial class RowFields { public StringField LoanApplicationResponsiblePersonId; }


        #endregion Foreign Fields

        [DisplayName("Employee Id"), Expression("jEmploymentInfo.[EmpId]"), QuickSearch, QuickFilter(true)]
        public String EmpId { get { return Fields.EmpId[this]; } set { Fields.EmpId[this] = value; } }
        public partial class RowFields { public StringField EmpId; }

        [DisplayName("Employee Name"), Expression("jEmploymentInfo.[FullName]"), QuickSearch]
        public String EmployeeName { get { return Fields.EmployeeName[this]; } set { Fields.EmployeeName[this] = value; } }
        public partial class RowFields { public StringField EmployeeName; }


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
        public LaLoanOpeningRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanOpening]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanOpening]")
            {
                LocalTextPrefix = "Task.LaLoanOpening";
            }
        }
        #endregion RowFields
    }
}
