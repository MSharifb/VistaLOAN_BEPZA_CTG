
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), TableName(TableName)]
    [DisplayName("Cash Or Cheque Collection"), InstanceName("Cash Or Cheque Collection"), TwoLevelCached]

    [ReadPermission("Task:LaCpfCashOrChequeCollection:Read")]
    [InsertPermission("Task:LaCpfCashOrChequeCollection:Insert")]
    [UpdatePermission("Task:LaCpfCashOrChequeCollection:Update")]
    [DeletePermission("Task:LaCpfCashOrChequeCollection:Delete")]
    [LookupScript("Task.LaCpfCashOrChequeCollection", Permission = "?")]
    public sealed class LaCpfCashOrChequeCollectionRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Employee
        [DisplayName("Employee"), NotNull, ForeignKey("[dbo].[PRM_EmploymentInfo]", "Id"), LeftJoin("jEmployee"), TextualField("EmployeeEmpId")]
        [LookupEditor(typeof(HRM.Entities.EmploymentInfoRow))]
        public Int32? EmployeeId { get { return Fields.EmployeeId[this]; } set { Fields.EmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeId; }
        #endregion EmployeeId

        #region Collection Month
        [DisplayName("Collection Month"), Size(20), NotNull, QuickSearch]
        [MonthListEditor]
        public String CollectionMonth { get { return Fields.CollectionMonth[this]; } set { Fields.CollectionMonth[this] = value; } }
        public partial class RowFields { public StringField CollectionMonth; }
        #endregion CollectionMonth

        #region Collection Year
        [DisplayName("Collection Year"), Size(4), NotNull]
        public String CollectionYear { get { return Fields.CollectionYear[this]; } set { Fields.CollectionYear[this] = value; } }
        public partial class RowFields { public StringField CollectionYear; }
        #endregion CollectionYear

        #region Cashor Cheque
        [DisplayName("Cash/Cheque/JV"), Size(20), NotNull]
        public String CashorCheque { get { return Fields.CashorCheque[this]; } set { Fields.CashorCheque[this] = value; } }
        public partial class RowFields { public StringField CashorCheque; }
        #endregion CashorCheque

        #region Remarks
        [DisplayName("Remarks")]
        public String Remarks { get { return Fields.Remarks[this]; } set { Fields.Remarks[this] = value; } }
        public partial class RowFields { public StringField Remarks; }
        #endregion Remarks

        #region Collection Type
        [DisplayName("Collection Type"), NotNull]
        public CollectionType? CollectionType { get { return Fields.CollectionType[this]; } set { Fields.CollectionType[this] = value; } }
        public partial class RowFields { public EnumField<CollectionType> CollectionType; }
        #endregion CollectionType

        #region Application
        [DisplayName("Application"), ForeignKey("[dbo].[LA_LoanApplication]", "Id"), LeftJoin("jApplication"), TextualField("ApplicationLoanNo")]
        [LookupEditor(typeof(Task.Entities.LaLoanApplicationRow), CascadeFrom = "EmployeeId")]
        public Int32? ApplicationId { get { return Fields.ApplicationId[this]; } set { Fields.ApplicationId[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationId; }
        #endregion ApplicationId

        #region Principal Installment
        [DisplayName("Principal"), Size(18), Scale(2)]
        public Decimal? PrincipalInstallment { get { return Fields.PrincipalInstallment[this]; } set { Fields.PrincipalInstallment[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalInstallment; }
        #endregion PrincipalInstallment

        #region Interest Installment
        [DisplayName("Interest"), Size(18), Scale(2)]
        public Decimal? InterestInstallment { get { return Fields.InterestInstallment[this]; } set { Fields.InterestInstallment[this] = value; } }
        public partial class RowFields { public DecimalField InterestInstallment; }
        #endregion InterestInstallment

        #region Pf Own Contribution
        [DisplayName("Own Contribution"), Column("PFOwnContribution"), Size(18), Scale(2)]
        public Decimal? PfOwnContribution { get { return Fields.PfOwnContribution[this]; } set { Fields.PfOwnContribution[this] = value; } }
        public partial class RowFields { public DecimalField PfOwnContribution; }
        #endregion PfOwnContribution

        #region PF Own Interest
        [DisplayName("PF Own Interest"), Column("PFOwnInterest"), Size(18), Scale(2)]
        public Decimal? PFOwnInterest { get { return Fields.PFOwnInterest[this]; } set { Fields.PFOwnInterest[this] = value; } }
        public partial class RowFields { public DecimalField PFOwnInterest; }
        #endregion PfOwnContribution

        #region PF Company Contribution
        [DisplayName("PF BEPZA Contribution"), Column("PFCompanyContribution"), Size(18), Scale(2)]
        public Decimal? PFCompanyContribution { get { return Fields.PFCompanyContribution[this]; } set { Fields.PFCompanyContribution[this] = value; } }
        public partial class RowFields { public DecimalField PFCompanyContribution; }
        #endregion PfOwnContribution

        #region PF Company Interest
        [DisplayName("PF BEPZA Interest"), Column("PFCompanyInterest"), Size(18), Scale(2)]
        public Decimal? PFCompanyInterest { get { return Fields.PFCompanyInterest[this]; } set { Fields.PFCompanyInterest[this] = value; } }
        public partial class RowFields { public DecimalField PFCompanyInterest; }
        #endregion PfOwnContribution

        #region Collection Date
        [DisplayName("Collection Date"), Column("CollectionDate")]
        public DateTime? CollectionDate { get { return Fields.CollectionDate[this]; } set { Fields.CollectionDate[this] = value; } }
        public partial class RowFields { public DateTimeField CollectionDate; }
        #endregion PfOwnContribution

        #region Foreign Fields

        [DisplayName("Employee Id"), Expression("jEmployee.[EmpID]")]
        public String EmployeeEmpId { get { return Fields.EmployeeEmpId[this]; } set { Fields.EmployeeEmpId[this] = value; } }
        public partial class RowFields { public StringField EmployeeEmpId; }

        [DisplayName("Employee Name"), Expression("jEmployee.[FullName]")]
        public String EmployeeFullName { get { return Fields.EmployeeFullName[this]; } set { Fields.EmployeeFullName[this] = value; } }
        public partial class RowFields { public StringField EmployeeFullName; }

        [DisplayName("Employee Designation Id"), Expression("jEmployee.[DesignationId]")]
        public Int32? EmployeeDesignationId { get { return Fields.EmployeeDesignationId[this]; } set { Fields.EmployeeDesignationId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeDesignationId; }


        [DisplayName("Employee Status Designation Id"), Expression("jEmployee.[StatusDesignationId]")]
        public Int32? EmployeeStatusDesignationId { get { return Fields.EmployeeStatusDesignationId[this]; } set { Fields.EmployeeStatusDesignationId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeStatusDesignationId; }


        [DisplayName("Employee Discipline Id"), Expression("jEmployee.[DisciplineId]")]
        public Int32? EmployeeDisciplineId { get { return Fields.EmployeeDisciplineId[this]; } set { Fields.EmployeeDisciplineId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeDisciplineId; }


        [DisplayName("Employee Division Id"), Expression("jEmployee.[DivisionId]")]
        public Int32? EmployeeDivisionId { get { return Fields.EmployeeDivisionId[this]; } set { Fields.EmployeeDivisionId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeDivisionId; }


        [DisplayName("Employee Section Id"), Expression("jEmployee.[SectionId]")]
        public Int32? EmployeeSectionId { get { return Fields.EmployeeSectionId[this]; } set { Fields.EmployeeSectionId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeSectionId; }


        [DisplayName("Employee Sub Section Id"), Expression("jEmployee.[SubSectionId]")]
        public Int32? EmployeeSubSectionId { get { return Fields.EmployeeSubSectionId[this]; } set { Fields.EmployeeSubSectionId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeSubSectionId; }

        [DisplayName("Application No"), Expression("jApplication.[LoanNo]")]
        public String ApplicationLoanNo { get { return Fields.ApplicationLoanNo[this]; } set { Fields.ApplicationLoanNo[this] = value; } }
        public partial class RowFields { public StringField ApplicationLoanNo; }


        [DisplayName("Application Employee Id"), Expression("jApplication.[EmployeeId]")]
        public Int32? ApplicationEmployeeId { get { return Fields.ApplicationEmployeeId[this]; } set { Fields.ApplicationEmployeeId[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationEmployeeId; }


        [DisplayName("Application Seniority No"), Expression("jApplication.[SeniorityNo]")]
        public Int32? ApplicationSeniorityNo { get { return Fields.ApplicationSeniorityNo[this]; } set { Fields.ApplicationSeniorityNo[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationSeniorityNo; }


        [DisplayName("Apply Date"), Expression("jApplication.[ApplyDate]")]
        public DateTime? ApplicationApplyDate { get { return Fields.ApplicationApplyDate[this]; } set { Fields.ApplicationApplyDate[this] = value; } }
        public partial class RowFields { public DateTimeField ApplicationApplyDate; }


        [DisplayName("Application Loan Criteria Id"), Expression("jApplication.[LoanCriteriaId]")]
        public Int32? ApplicationLoanCriteriaId { get { return Fields.ApplicationLoanCriteriaId[this]; } set { Fields.ApplicationLoanCriteriaId[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationLoanCriteriaId; }


        [DisplayName("Application Apply Loan Amount"), Expression("jApplication.[ApplyLoanAmount]")]
        public Decimal? ApplicationApplyLoanAmount { get { return Fields.ApplicationApplyLoanAmount[this]; } set { Fields.ApplicationApplyLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField ApplicationApplyLoanAmount; }

        [DisplayName("Application Apply Interest Amount"), Expression("jApplication.[ApplyInterestAmount]")]
        public Decimal? ApplicationApplyInterestAmount { get { return Fields.ApplicationApplyInterestAmount[this]; } set { Fields.ApplicationApplyInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField ApplicationApplyInterestAmount; }

        [DisplayName("Application Purpose"), Expression("jApplication.[Purpose]")]
        public String ApplicationPurpose { get { return Fields.ApplicationPurpose[this]; } set { Fields.ApplicationPurpose[this] = value; } }
        public partial class RowFields { public StringField ApplicationPurpose; }


        [DisplayName("Application Granted Loan Amount"), Expression("jApplication.[GrantedLoanAmount]")]
        public Decimal? ApplicationGrantedLoanAmount { get { return Fields.ApplicationGrantedLoanAmount[this]; } set { Fields.ApplicationGrantedLoanAmount[this] = value; } }
        public partial class RowFields { public DecimalField ApplicationGrantedLoanAmount; }

        [DisplayName("Application Granted Interest Amount"), Expression("jApplication.[GrantedInterestAmount]")]
        public Decimal? ApplicationGrantedInterestAmount { get { return Fields.ApplicationGrantedInterestAmount[this]; } set { Fields.ApplicationGrantedInterestAmount[this] = value; } }
        public partial class RowFields { public DecimalField ApplicationGrantedInterestAmount; }

        [DisplayName("Application Node Id"), Expression("jApplication.[NodeId]")]
        public Int32? ApplicationNodeId { get { return Fields.ApplicationNodeId[this]; } set { Fields.ApplicationNodeId[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationNodeId; }


        [DisplayName("Application Approver Id"), Expression("jApplication.[ApproverId]")]
        public String ApplicationApproverId { get { return Fields.ApplicationApproverId[this]; } set { Fields.ApplicationApproverId[this] = value; } }
        public partial class RowFields { public StringField ApplicationApproverId; }


        [DisplayName("Application App Status Id"), Expression("jApplication.[AppStatusID]")]
        public Int32? ApplicationAppStatusId { get { return Fields.ApplicationAppStatusId[this]; } set { Fields.ApplicationAppStatusId[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationAppStatusId; }


        [DisplayName("Application Is Discard"), Expression("jApplication.[IsDiscard]")]
        public Boolean? ApplicationIsDiscard { get { return Fields.ApplicationIsDiscard[this]; } set { Fields.ApplicationIsDiscard[this] = value; } }
        public partial class RowFields { public BooleanField ApplicationIsDiscard; }


        [DisplayName("Application Is Approval Process"), Expression("jApplication.[IsApprovalProcess]")]
        public Boolean? ApplicationIsApprovalProcess { get { return Fields.ApplicationIsApprovalProcess[this]; } set { Fields.ApplicationIsApprovalProcess[this] = value; } }
        public partial class RowFields { public BooleanField ApplicationIsApprovalProcess; }


        [DisplayName("Application Is Off Line"), Expression("jApplication.[IsOffLine]")]
        public Boolean? ApplicationIsOffLine { get { return Fields.ApplicationIsOffLine[this]; } set { Fields.ApplicationIsOffLine[this] = value; } }
        public partial class RowFields { public BooleanField ApplicationIsOffLine; }

        [DisplayName("Application Approved Date"), Expression("jApplication.[ApprovedDate]")]
        public DateTime? ApplicationApprovedDate { get { return Fields.ApplicationApprovedDate[this]; } set { Fields.ApplicationApprovedDate[this] = value; } }
        public partial class RowFields { public DateTimeField ApplicationApprovedDate; }


        [DisplayName("Application Is Issue"), Expression("jApplication.[IsIssue]")]
        public Boolean? ApplicationIsIssue { get { return Fields.ApplicationIsIssue[this]; } set { Fields.ApplicationIsIssue[this] = value; } }
        public partial class RowFields { public BooleanField ApplicationIsIssue; }


        [DisplayName("Application Responsible Person Id"), Expression("jApplication.[ResponsiblePersonID]")]
        public String ApplicationResponsiblePersonId { get { return Fields.ApplicationResponsiblePersonId[this]; } set { Fields.ApplicationResponsiblePersonId[this] = value; } }
        public partial class RowFields { public StringField ApplicationResponsiblePersonId; }


        [DisplayName("Application Employee Wise Loan Id"), Expression("jApplication.[EmployeeWiseLoanId]")]
        public Int32? ApplicationEmployeeWiseLoanId { get { return Fields.ApplicationEmployeeWiseLoanId[this]; } set { Fields.ApplicationEmployeeWiseLoanId[this] = value; } }
        public partial class RowFields { public Int32Field ApplicationEmployeeWiseLoanId; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.CollectionMonth; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaCpfCashOrChequeCollectionRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_CPF_CashOrChequeCollection]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_CPF_CashOrChequeCollection]")
            {
                LocalTextPrefix = "Task.LaCpfCashOrChequeCollection";
            }
        }
        #endregion RowFields
    }
}
