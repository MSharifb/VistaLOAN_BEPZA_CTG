
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Loan Application"), InstanceName("Loan Application"), TwoLevelCached]
    [ReadPermission("Task:LaLoanApplication:Read")]
    [InsertPermission("Task:LaLoanApplication:Insert")]
    [UpdatePermission("Task:LaLoanApplication:Update")]
    [DeletePermission("Task:LaLoanApplication:Delete")]
    [LookupScript("Task.LaLoanApplication", Expiration = -1)]
    public sealed class LaLoanApplicationRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Loan No
        [DisplayName("Loan No"), Size(25), NotNull, QuickSearch, QuickFilter(true)]
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
        [DisplayName("Seniority No"), NotNull]
        public Int32? SeniorityNo { get { return Fields.SeniorityNo[this]; } set { Fields.SeniorityNo[this] = value; } }
        public partial class RowFields { public Int32Field SeniorityNo; }
        #endregion SeniorityNo

        #region Apply Date
        [DisplayName("Apply Date"), NotNull, QuickFilter(true)]
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
        [DisplayName("Apply Loan Amount"), Size(18), Scale(2), NotNull, QuickFilter(true)]
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

        #region Node Id
        [DisplayName("Node Id"), NotNull]
        public Int32? NodeId { get { return Fields.NodeId[this]; } set { Fields.NodeId[this] = value; } }
        public partial class RowFields { public Int32Field NodeId; }
        #endregion NodeId

        #region Approver Id
        [DisplayName("Approver/Recommender"), Size(-1), NotNull]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public String ApproverId { get { return Fields.ApproverId[this]; } set { Fields.ApproverId[this] = value; } }
        public partial class RowFields { public StringField ApproverId; }
        #endregion ApproverId

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

        #region Is Approval Process
        [DisplayName("Is Approval Process"), NotNull]
        public Boolean? IsApprovalProcess { get { return Fields.IsApprovalProcess[this]; } set { Fields.IsApprovalProcess[this] = value; } }
        public partial class RowFields { public BooleanField IsApprovalProcess; }
        #endregion IsApprovalProcess

        #region Is Off Line
        [DisplayName("Is Off Line"), NotNull]
        public Boolean? IsOffLine { get { return Fields.IsOffLine[this]; } set { Fields.IsOffLine[this] = value; } }
        public partial class RowFields { public BooleanField IsOffLine; }
        #endregion IsOffLine

        #region Approved Date
        [DisplayName("Approved Date")]
        public DateTime? ApprovedDate { get { return Fields.ApprovedDate[this]; } set { Fields.ApprovedDate[this] = value; } }
        public partial class RowFields { public DateTimeField ApprovedDate; }
        #endregion ApprovedDate

        #region Is Re Apply
        [DisplayName("Is Re Apply"), NotNull]
        public Boolean? IsReApply { get { return Fields.IsReApply[this]; } set { Fields.IsReApply[this] = value; } }
        public partial class RowFields { public BooleanField IsReApply; }
        #endregion IsReApply

        #region Is Issue
        [DisplayName("Is Issue"), NotNull, LookupInclude]
        public Boolean? IsIssue { get { return Fields.IsIssue[this]; } set { Fields.IsIssue[this] = value; } }
        public partial class RowFields { public BooleanField IsIssue; }
        #endregion IsIssue

        #region Responsible Person Id
        [DisplayName("Responsible Person Id"), Column("ResponsiblePersonID"), Size(-1)]
        public String ResponsiblePersonId { get { return Fields.ResponsiblePersonId[this]; } set { Fields.ResponsiblePersonId[this] = value; } }
        public partial class RowFields { public StringField ResponsiblePersonId; }
        #endregion ResponsiblePersonId

        [DisplayName("Employee Wise Loan Id"), Column("EmployeeWiseLoanId")]
        public Int32? EmployeeWiseLoanId { get { return Fields.EmployeeWiseLoanId[this]; } set { Fields.EmployeeWiseLoanId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeWiseLoanId; }

        [DisplayName("PF Loan Type"),QuickFilter]
        public String PFLoanType { get { return Fields.PFLoanType[this]; } set { Fields.PFLoanType[this] = value; } }
        public partial class RowFields { public StringField PFLoanType; }

        #region Non Refund PF Own Loan Amount
        [DisplayName("Loan Amount(Own Cont)"), Size(18), Scale(2)]
        public Decimal? NonRefundPFOwnLoanAmount { get { return Fields.NonRefundPFOwnLoanAmount[this]; } set { Fields.NonRefundPFOwnLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundPFOwnLoanAmount; }
        #endregion NonRefundPFOwnLoanAmount

        #region Non Refund PF Company Loan Amount
        [DisplayName("Loan Amount(BEPZA Cont.)"), Size(18), Scale(2)]
        public Decimal? NonRefundPFCompanyLoanAmount { get { return Fields.NonRefundPFCompanyLoanAmount[this]; } set { Fields.NonRefundPFCompanyLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundPFCompanyLoanAmount; }
        #endregion NonRefundPFCompanyLoanAmount

        #region Non Refund Own Interest Loan Amount
        [DisplayName("Loan Amount(Own Interest)"), Size(18), Scale(2)]
        public Decimal? NonRefundOwnInterestLoanAmount { get { return Fields.NonRefundOwnInterestLoanAmount[this]; } set { Fields.NonRefundOwnInterestLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundOwnInterestLoanAmount; }
        #endregion NonRefundOwnInterestLoanAmount

        #region Non Refund Company Interest Loan Amount
        [DisplayName("Loan Amount(BEPZA Interest)"), Size(18), Scale(2)]
        public Decimal? NonRefundCompanyInterestLoanAmount { get { return Fields.NonRefundCompanyInterestLoanAmount[this]; } set { Fields.NonRefundCompanyInterestLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField NonRefundCompanyInterestLoanAmount; }
        #endregion NonRefundCompanyInterestLoanAmount



        #region Foreign Fields

        [DisplayName("Loan Scheme"), Expression("jLoanCriteria.[SchemeName]")]
        public String LoanCriteriaSchemeName { get { return Fields.LoanCriteriaSchemeName[this]; } set { Fields.LoanCriteriaSchemeName[this] = value; } }
        public partial class RowFields { public StringField LoanCriteriaSchemeName; }

        [DisplayName("Loan Criteria Loan Type Id"), Expression("jLoanCriteria.[LoanTypeId]"), LookupInclude]
        public Int32? LoanCriteriaLoanTypeId { get { return Fields.LoanCriteriaLoanTypeId[this]; } set { Fields.LoanCriteriaLoanTypeId[this] = value; } }
        public partial class RowFields { public Int32Field LoanCriteriaLoanTypeId; }

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

        [DisplayName("Signature"),NotMapped]
        public String Signature { get { return Fields.Signature[this]; } set { Fields.Signature[this] = value; } }
        public partial class RowFields { public StringField Signature; }
        [DisplayName("Signature"), NotMapped]
        public String Sign { get { return Fields.Sign[this]; } set { Fields.Sign[this] = value; } }
        public partial class RowFields { public StringField Sign; }


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
        public LaLoanApplicationRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanApplication]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanApplication]")
            {
                LocalTextPrefix = "Task.LaLoanApplication";
            }
        }
        #endregion RowFields
    }
}
