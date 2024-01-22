
namespace VistaLOAN.HRM.Entities {
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("PRM_EmploymentInfo"), InstanceName("PRM_EmploymentInfo"), TwoLevelCached]
    //[ReadPermission("HRM:PRM_EmploymentInfo:Read")]
    //[InsertPermission("HRM:PRM_EmploymentInfo:Insert")]
    //[UpdatePermission("HRM:PRM_EmploymentInfo:Update")]
    //[DeletePermission("HRM:PRM_EmploymentInfo:Delete")]
    [ModifyPermission("*")]
    [ReadPermission("*")]
    [LookupScript("HRM.EmploymentInfo", Permission = "?")]
    public sealed class EmploymentInfoRow : Row, IIdRow, INameRow {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Emp Id
        [DisplayName("Emp Id"), Column("EmpID"), Size(15), NotNull, QuickSearch,LookupInclude]
        public String EmpId { get { return Fields.EmpId[this]; } set { Fields.EmpId[this] = value; } }
        public partial class RowFields { public StringField EmpId; }
        #endregion EmpId

        #region Employee Initial
        [DisplayName("Employee Initial"), Size(15)]
        public String EmployeeInitial { get { return Fields.EmployeeInitial[this]; } set { Fields.EmployeeInitial[this] = value; } }
        public partial class RowFields { public StringField EmployeeInitial; }
        #endregion EmployeeInitial

        #region Title
        [DisplayName("Title"), ForeignKey("[dbo].[PRM_NameTitle]", "Id"), LeftJoin("jTitle"), TextualField("TitleName")]
        //[LookupEditor(typeof(HRM.Entities.PrmNameTitleRow), InplaceAdd = true)]
        public Int32? TitleId { get { return Fields.TitleId[this]; } set { Fields.TitleId[this] = value; } }
        public partial class RowFields { public Int32Field TitleId; }
        #endregion TitleId

        #region First Name
        [DisplayName("First Name"), Size(50)]
        public String FirstName { get { return Fields.FirstName[this]; } set { Fields.FirstName[this] = value; } }
        public partial class RowFields { public StringField FirstName; }
        #endregion FirstName

        #region Middle Name
        [DisplayName("Middle Name"), Size(50)]
        public String MiddleName { get { return Fields.MiddleName[this]; } set { Fields.MiddleName[this] = value; } }
        public partial class RowFields { public StringField MiddleName; }
        #endregion MiddleName

        #region Last Name
        [DisplayName("Last Name"), Size(50)]
        public String LastName { get { return Fields.LastName[this]; } set { Fields.LastName[this] = value; } }
        public partial class RowFields { public StringField LastName; }
        #endregion LastName

        #region Full Name
        [DisplayName("Full Name"), Size(200), NotNull]
        public String FullName { get { return Fields.FullName[this]; } set { Fields.FullName[this] = value; } }
        public partial class RowFields { public StringField FullName; }
        #endregion FullName

        #region Dateof Joining
        [DisplayName("Dateof Joining"), NotNull, LookupInclude]
        public DateTime? DateofJoining { get { return Fields.DateofJoining[this]; } set { Fields.DateofJoining[this] = value; } }
        public partial class RowFields { public DateTimeField DateofJoining; }
        #endregion DateofJoining

        #region Provision Month
        [DisplayName("Provision Month"), NotNull]
        public Int32? ProvisionMonth { get { return Fields.ProvisionMonth[this]; } set { Fields.ProvisionMonth[this] = value; } }
        public partial class RowFields { public Int32Field ProvisionMonth; }
        #endregion ProvisionMonth

        #region Dateof Confirmation
        [DisplayName("Dateof Confirmation")]
        public DateTime? DateofConfirmation { get { return Fields.DateofConfirmation[this]; } set { Fields.DateofConfirmation[this] = value; } }
        public partial class RowFields { public DateTimeField DateofConfirmation; }
        #endregion DateofConfirmation

        #region Dateof Position
        [DisplayName("Dateof Position"), NotNull]
        public DateTime? DateofPosition { get { return Fields.DateofPosition[this]; } set { Fields.DateofPosition[this] = value; } }
        public partial class RowFields { public DateTimeField DateofPosition; }
        #endregion DateofPosition

        #region Designation
        [DisplayName("Designation"), ForeignKey("[dbo].[PRM_Designation]", "Id"), LeftJoin("jDesignation"), TextualField("DesignationName")]
        //[LookupEditor(typeof(HRM.Entities.PrmDesignationRow), InplaceAdd = true)]
        public Int32? DesignationId { get { return Fields.DesignationId[this]; } set { Fields.DesignationId[this] = value; } }
        public partial class RowFields { public Int32Field DesignationId; }
        #endregion DesignationId

        #region Discipline
        [DisplayName("Discipline"), ForeignKey("[dbo].[PRM_Discipline]", "Id"), LeftJoin("jDiscipline"), TextualField("DisciplineName")]
        //[LookupEditor(typeof(HRM.Entities.PrmDisciplineRow), InplaceAdd = true)]
        public Int32? DisciplineId { get { return Fields.DisciplineId[this]; } set { Fields.DisciplineId[this] = value; } }
        public partial class RowFields { public Int32Field DisciplineId; }
        #endregion DisciplineId

        #region Division
        [DisplayName("Division"), ForeignKey("[dbo].[PRM_Division]", "Id"), LeftJoin("jDivision"), TextualField("DivisionName")]
        //[LookupEditor(typeof(HRM.Entities.PrmDivisionRow), InplaceAdd = true)]
        public Int32? DivisionId { get { return Fields.DivisionId[this]; } set { Fields.DivisionId[this] = value; } }
        public partial class RowFields { public Int32Field DivisionId; }
        #endregion DivisionId

        #region Section
        [DisplayName("Section"), ForeignKey("[dbo].[PRM_Section]", "Id"), LeftJoin("jSection"), TextualField("SectionName")]
        //[LookupEditor(typeof(HRM.Entities.PrmSectionRow), InplaceAdd = true)]
        public Int32? SectionId { get { return Fields.SectionId[this]; } set { Fields.SectionId[this] = value; } }
        public partial class RowFields { public Int32Field SectionId; }
        #endregion SectionId

        #region Sub Section
        [DisplayName("Sub Section"), ForeignKey("[dbo].[PRM_SubSection]", "Id"), LeftJoin("jSubSection"), TextualField("SubSectionName")]
        //[LookupEditor(typeof(HRM.Entities.PrmSubSectionRow), InplaceAdd = true)]
        public Int32? SubSectionId { get { return Fields.SubSectionId[this]; } set { Fields.SubSectionId[this] = value; } }
        public partial class RowFields { public Int32Field SubSectionId; }
        #endregion SubSectionId

        #region Job Location
        [DisplayName("Job Location"), NotNull, ForeignKey("[dbo].[PRM_JobLocation]", "Id"), LeftJoin("jJobLocation"), TextualField("JobLocationName")]
        //[LookupEditor(typeof(HRM.Entities.PrmJobLocationRow), InplaceAdd = true)]
        public Int32? JobLocationId { get { return Fields.JobLocationId[this]; } set { Fields.JobLocationId[this] = value; } }
        public partial class RowFields { public Int32Field JobLocationId; }
        #endregion JobLocationId

        #region Resource Level
        [DisplayName("Resource Level"), ForeignKey("[dbo].[PRM_ResourceLevel]", "Id"), LeftJoin("jResourceLevel"), TextualField("ResourceLevelName")]
        //[LookupEditor(typeof(HRM.Entities.PrmResourceLevelRow), InplaceAdd = true)]
        public Int32? ResourceLevelId { get { return Fields.ResourceLevelId[this]; } set { Fields.ResourceLevelId[this] = value; } }
        public partial class RowFields { public Int32Field ResourceLevelId; }
        #endregion ResourceLevelId

        #region Staff Category
        [DisplayName("Staff Category"), NotNull, ForeignKey("[dbo].[PRM_StaffCategory]", "Id"), LeftJoin("jStaffCategory"), TextualField("StaffCategoryName")]
        //[LookupEditor(typeof(HRM.Entities.PrmStaffCategoryRow), InplaceAdd = true)]
        public Int32? StaffCategoryId { get { return Fields.StaffCategoryId[this]; } set { Fields.StaffCategoryId[this] = value; } }
        public partial class RowFields { public Int32Field StaffCategoryId; }
        #endregion StaffCategoryId

        #region Shift
        [DisplayName("Shift"), ForeignKey("[dbo].[PRM_ShiftName]", "Id"), LeftJoin("jShift"), TextualField("ShiftName")]
        //[LookupEditor(typeof(HRM.Entities.PrmShiftNameRow), InplaceAdd = true)]
        public Int32? ShiftId { get { return Fields.ShiftId[this]; } set { Fields.ShiftId[this] = value; } }
        public partial class RowFields { public Int32Field ShiftId; }
        #endregion ShiftId

        #region Employment Type
        [DisplayName("Employment Type"), NotNull, ForeignKey("[dbo].[PRM_EmploymentType]", "Id"), LeftJoin("jEmploymentType"), TextualField("EmploymentTypeName")]
        //[LookupEditor(typeof(HRM.Entities.PrmEmploymentTypeRow), InplaceAdd = true)]
        public Int32? EmploymentTypeId { get { return Fields.EmploymentTypeId[this]; } set { Fields.EmploymentTypeId[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentTypeId; }
        #endregion EmploymentTypeId

        #region Religion
        [DisplayName("Religion"), ForeignKey("[dbo].[PRM_Religion]", "Id"), LeftJoin("jReligion"), TextualField("ReligionName")]
        //[LookupEditor(typeof(HRM.Entities.PrmReligionRow), InplaceAdd = true)]
        public Int32? ReligionId { get { return Fields.ReligionId[this]; } set { Fields.ReligionId[this] = value; } }
        public partial class RowFields { public Int32Field ReligionId; }
        #endregion ReligionId

        #region Is Contractual
        [DisplayName("Is Contractual"), NotNull]
        public Boolean? IsContractual { get { return Fields.IsContractual[this]; } set { Fields.IsContractual[this] = value; } }
        public partial class RowFields { public BooleanField IsContractual; }
        #endregion IsContractual

        #region Is Consultant
        [DisplayName("Is Consultant"), NotNull]
        public Boolean? IsConsultant { get { return Fields.IsConsultant[this]; } set { Fields.IsConsultant[this] = value; } }
        public partial class RowFields { public BooleanField IsConsultant; }
        #endregion IsConsultant

        #region Is Overtime Eligible
        [DisplayName("Is Overtime Eligible")]
        public Boolean? IsOvertimeEligible { get { return Fields.IsOvertimeEligible[this]; } set { Fields.IsOvertimeEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsOvertimeEligible; }
        #endregion IsOvertimeEligible

        #region Overtime Rate
        [DisplayName("Overtime Rate"), Size(5), Scale(2)]
        public Decimal? OvertimeRate { get { return Fields.OvertimeRate[this]; } set { Fields.OvertimeRate[this] = value; } }
        public partial class RowFields { public DecimalField OvertimeRate; }
        #endregion OvertimeRate

        #region Mobile No
        [DisplayName("Mobile No."), Size(50)]
        public String MobileNo { get { return Fields.MobileNo[this]; } set { Fields.MobileNo[this] = value; } }
        public partial class RowFields { public StringField MobileNo; }
        #endregion MobileNo

        #region Emial Address
        [DisplayName("Emial Address"), Size(50)]
        public String EmialAddress { get { return Fields.EmialAddress[this]; } set { Fields.EmialAddress[this] = value; } }
        public partial class RowFields { public StringField EmialAddress; }
        #endregion EmialAddress

        #region Bank
        [DisplayName("Bank"), ForeignKey("[dbo].[PRM_BankName]", "Id"), LeftJoin("jBank"), TextualField("BankName")]
        //[LookupEditor(typeof(HRM.Entities.PrmBankNameRow), InplaceAdd = true)]
        public Int32? BankId { get { return Fields.BankId[this]; } set { Fields.BankId[this] = value; } }
        public partial class RowFields { public Int32Field BankId; }
        #endregion BankId

        #region Bank Branch
        [DisplayName("Bank Branch"), ForeignKey("[dbo].[PRM_BankBranch]", "Id"), LeftJoin("jBankBranch"), TextualField("BankBranchName")]
        //[LookupEditor(typeof(HRM.Entities.PrmBankBranchRow), InplaceAdd = true)]
        public Int32? BankBranchId { get { return Fields.BankBranchId[this]; } set { Fields.BankBranchId[this] = value; } }
        public partial class RowFields { public Int32Field BankBranchId; }
        #endregion BankBranchId

        #region Bank Account No
        [DisplayName("Bank Account No."), Size(50)]
        public String BankAccountNo { get { return Fields.BankAccountNo[this]; } set { Fields.BankAccountNo[this] = value; } }
        public partial class RowFields { public StringField BankAccountNo; }
        #endregion BankAccountNo

        #region Employment Status
        [DisplayName("Employment Status"), NotNull, ForeignKey("[dbo].[PRM_EmploymentStatus]", "Id"), LeftJoin("jEmploymentStatus"), TextualField("EmploymentStatusName")]
        //[LookupEditor(typeof(HRM.Entities.PrmEmploymentStatusRow), InplaceAdd = true)]
        public Int32? EmploymentStatusId { get { return Fields.EmploymentStatusId[this]; } set { Fields.EmploymentStatusId[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentStatusId; }
        #endregion EmploymentStatusId

        #region Dateof Inactive
        [DisplayName("Dateof Inactive")]
        public DateTime? DateofInactive { get { return Fields.DateofInactive[this]; } set { Fields.DateofInactive[this] = value; } }
        public partial class RowFields { public DateTimeField DateofInactive; }
        #endregion DateofInactive

        #region Is Bonus Eligible
        [DisplayName("Is Bonus Eligible")]
        public Boolean? IsBonusEligible { get { return Fields.IsBonusEligible[this]; } set { Fields.IsBonusEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsBonusEligible; }
        #endregion IsBonusEligible

        #region Is Tax Paidby Iwm
        [DisplayName("Is Tax Paidby Iwm"), Column("IsTaxPaidbyIWM")]
        public Boolean? IsTaxPaidbyIwm { get { return Fields.IsTaxPaidbyIwm[this]; } set { Fields.IsTaxPaidbyIwm[this] = value; } }
        public partial class RowFields { public BooleanField IsTaxPaidbyIwm; }
        #endregion IsTaxPaidbyIwm

        #region Salary Scale
        [DisplayName("Salary Scale"), NotNull, ForeignKey("[dbo].[PRM_SalaryScale]", "Id"), LeftJoin("jSalaryScale"), TextualField("SalaryScaleSalaryScaleName")]
        //[LookupEditor(typeof(HRM.Entities.PrmSalaryScaleRow), InplaceAdd = true)]
        public Int32? SalaryScaleId { get { return Fields.SalaryScaleId[this]; } set { Fields.SalaryScaleId[this] = value; } }
        public partial class RowFields { public Int32Field SalaryScaleId; }
        #endregion SalaryScaleId

        #region Job Grade
        [DisplayName("Job Grade"), NotNull, ForeignKey("[dbo].[PRM_JobGrade]", "Id"), LeftJoin("jJobGrade"), TextualField("JobGradeGradeName")]
        //[LookupEditor(typeof(HRM.Entities.PrmJobGradeRow), InplaceAdd = true)]
        public Int32? JobGradeId { get { return Fields.JobGradeId[this]; } set { Fields.JobGradeId[this] = value; } }
        public partial class RowFields { public Int32Field JobGradeId; }
        #endregion JobGradeId

        #region Gender
        [DisplayName("Gender"), Size(20), NotNull]
        public String Gender { get { return Fields.Gender[this]; } set { Fields.Gender[this] = value; } }
        public partial class RowFields { public StringField Gender; }
        #endregion Gender

        #region Contract Expire Date
        [DisplayName("Contract Expire Date")]
        public DateTime? ContractExpireDate { get { return Fields.ContractExpireDate[this]; } set { Fields.ContractExpireDate[this] = value; } }
        public partial class RowFields { public DateTimeField ContractExpireDate; }
        #endregion ContractExpireDate

        #region Dateof Birth
        [DisplayName("Dateof Birth"), LookupInclude]
        public DateTime? DateofBirth { get { return Fields.DateofBirth[this]; } set { Fields.DateofBirth[this] = value; } }
        public partial class RowFields { public DateTimeField DateofBirth; }
        #endregion DateofBirth

        #region Contract Duration
        [DisplayName("Contract Duration"), Size(5), Scale(2)]
        public Decimal? ContractDuration { get { return Fields.ContractDuration[this]; } set { Fields.ContractDuration[this] = value; } }
        public partial class RowFields { public DecimalField ContractDuration; }
        #endregion ContractDuration

        #region Contract Type
        [DisplayName("Contract Type")]
        public Int32? ContractType { get { return Fields.ContractType[this]; } set { Fields.ContractType[this] = value; } }
        public partial class RowFields { public Int32Field ContractType; }
        #endregion ContractType

        #region Actual Rate
        [DisplayName("Actual Rate"), Size(10), Scale(2)]
        public Decimal? ActualRate { get { return Fields.ActualRate[this]; } set { Fields.ActualRate[this] = value; } }
        public partial class RowFields { public DecimalField ActualRate; }
        #endregion ActualRate

        #region Budget Rate
        [DisplayName("Budget Rate"), Size(10), Scale(2)]
        public Decimal? BudgetRate { get { return Fields.BudgetRate[this]; } set { Fields.BudgetRate[this] = value; } }
        public partial class RowFields { public DecimalField BudgetRate; }
        #endregion BudgetRate

        #region Organogram Level
        [DisplayName("Organogram Level"), NotNull, ForeignKey("[dbo].[PRM_OrganogramLevel]", "Id"), LeftJoin("jOrganogramLevel"), TextualField("OrganogramLevelLevelName")]
        //[LookupEditor(typeof(HRM.Entities.PrmOrganogramLevelRow), InplaceAdd = true)]
        public Int32? OrganogramLevelId { get { return Fields.OrganogramLevelId[this]; } set { Fields.OrganogramLevelId[this] = value; } }
        public partial class RowFields { public Int32Field OrganogramLevelId; }
        #endregion OrganogramLevelId

        #region Dateof Appointment
        [DisplayName("Dateof Appointment"), NotNull]
        public DateTime? DateofAppointment { get { return Fields.DateofAppointment[this]; } set { Fields.DateofAppointment[this] = value; } }
        public partial class RowFields { public DateTimeField DateofAppointment; }
        #endregion DateofAppointment

        #region Order No
        [DisplayName("Order No."), Size(50)]
        public String OrderNo { get { return Fields.OrderNo[this]; } set { Fields.OrderNo[this] = value; } }
        public partial class RowFields { public StringField OrderNo; }
        #endregion OrderNo

        #region Quota
        [DisplayName("Quota"), ForeignKey("[dbo].[PRM_QuotaName]", "Id"), LeftJoin("jQuota"), TextualField("QuotaName")]
        ////[LookupEditor(typeof(HRM.Entities.PrmQuotaNameRow), InplaceAdd = true)]
        public Int32? QuotaId { get { return Fields.QuotaId[this]; } set { Fields.QuotaId[this] = value; } }
        public partial class RowFields { public Int32Field QuotaId; }
        #endregion QuotaId

        #region Employee Class
        [DisplayName("Employee Class"), ForeignKey("[dbo].[PRM_EmployeeClass]", "Id"), LeftJoin("jEmployeeClass"), TextualField("EmployeeClassName")]
        ////[LookupEditor(typeof(HRM.Entities.PrmEmployeeClassRow), InplaceAdd = true)]
        public Int32? EmployeeClassId { get { return Fields.EmployeeClassId[this]; } set { Fields.EmployeeClassId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeClassId; }
        #endregion EmployeeClassId

        #region Employment Process
        [DisplayName("Employment Process"), ForeignKey("[dbo].[PRM_EmploymentProcess]", "Id"), LeftJoin("jEmploymentProcess"), TextualField("EmploymentProcessName")]
        ////[LookupEditor(typeof(HRM.Entities.PrmEmploymentProcessRow), InplaceAdd = true)]
        public Int32? EmploymentProcessId { get { return Fields.EmploymentProcessId[this]; } set { Fields.EmploymentProcessId[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentProcessId; }
        #endregion EmploymentProcessId

        #region Seniority Position
        [DisplayName("Seniority Position"), Size(50)]
        public String SeniorityPosition { get { return Fields.SeniorityPosition[this]; } set { Fields.SeniorityPosition[this] = value; } }
        public partial class RowFields { public StringField SeniorityPosition; }
        #endregion SeniorityPosition

        #region Dateof Seniority
        [DisplayName("Dateof Seniority")]
        public DateTime? DateofSeniority { get { return Fields.DateofSeniority[this]; } set { Fields.DateofSeniority[this] = value; } }
        public partial class RowFields { public DateTimeField DateofSeniority; }
        #endregion DateofSeniority

        #region Prl Date
        [DisplayName("Prl Date"), Column("PRLDate")]
        public DateTime? PrlDate { get { return Fields.PrlDate[this]; } set { Fields.PrlDate[this] = value; } }
        public partial class RowFields { public DateTimeField PrlDate; }
        #endregion PrlDate

        #region Is Pension Eligible
        [DisplayName("Is Pension Eligible")]
        public Boolean? IsPensionEligible { get { return Fields.IsPensionEligible[this]; } set { Fields.IsPensionEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsPensionEligible; }
        #endregion IsPensionEligible

        #region Is Leverage Eligible
        [DisplayName("Is Leverage Eligible")]
        public Boolean? IsLeverageEligible { get { return Fields.IsLeverageEligible[this]; } set { Fields.IsLeverageEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsLeverageEligible; }
        #endregion IsLeverageEligible

        #region Card No
        [DisplayName("Card No."), Size(20)]
        public String CardNo { get { return Fields.CardNo[this]; } set { Fields.CardNo[this] = value; } }
        public partial class RowFields { public StringField CardNo; }
        #endregion CardNo

        #region Finger Print Identiy No
        [DisplayName("Finger Print Identiy No."), Size(50)]
        public String FingerPrintIdentiyNo { get { return Fields.FingerPrintIdentiyNo[this]; } set { Fields.FingerPrintIdentiyNo[this] = value; } }
        public partial class RowFields { public StringField FingerPrintIdentiyNo; }
        #endregion FingerPrintIdentiyNo

        #region Attendance Effective Date
        [DisplayName("Attendance Effective Date")]
        public DateTime? AttendanceEffectiveDate { get { return Fields.AttendanceEffectiveDate[this]; } set { Fields.AttendanceEffectiveDate[this] = value; } }
        public partial class RowFields { public DateTimeField AttendanceEffectiveDate; }
        #endregion AttendanceEffectiveDate

        #region Attendance Status
        [DisplayName("Attendance Status")]
        public Boolean? AttendanceStatus { get { return Fields.AttendanceStatus[this]; } set { Fields.AttendanceStatus[this] = value; } }
        public partial class RowFields { public BooleanField AttendanceStatus; }
        #endregion AttendanceStatus

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

        #region Is General Shifted
        [DisplayName("Is General Shifted"), NotNull]
        public Boolean? IsGeneralShifted { get { return Fields.IsGeneralShifted[this]; } set { Fields.IsGeneralShifted[this] = value; } }
        public partial class RowFields { public BooleanField IsGeneralShifted; }
        #endregion IsGeneralShifted

        #region Region
        [DisplayName("Region"), NotNull, ForeignKey("[dbo].[PRM_Region]", "Id"), LeftJoin("jRegion"), TextualField("RegionName")]
        ////[LookupEditor(typeof(HRM.Entities.PrmRegionRow), InplaceAdd = true)]
        public Int32? RegionId { get { return Fields.RegionId[this]; } set { Fields.RegionId[this] = value; } }
        public partial class RowFields { public Int32Field RegionId; }
        #endregion RegionId


        #region Foreign Fields
        [DisplayName("Title Name"), Expression("jTitle.[Name]")]
        public String TitleName { get { return Fields.TitleName[this]; } set { Fields.TitleName[this] = value; } }
        public partial class RowFields { public StringField TitleName; }

        [DisplayName("Title Name"), Expression("T0.EmpId + ' - ' + T0.FullName + ' (' + CASE WHEN jDesignation.ShortName IS NOT NULL THEN  jDesignation.ShortName ELSE jDesignation.Name END+')'")]
        public String LookupText { get { return Fields.LookupText[this]; } set { Fields.LookupText[this] = value; } }
        public partial class RowFields { public StringField LookupText; }


        [DisplayName("Title Sort Order"), Expression("jTitle.[SortOrder]")]
        public Int32? TitleSortOrder { get { return Fields.TitleSortOrder[this]; } set { Fields.TitleSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field TitleSortOrder; }


        [DisplayName("Designation Grade Id"), Expression("jDesignation.[GradeId]")]
        public Int32? DesignationGradeId { get { return Fields.DesignationGradeId[this]; } set { Fields.DesignationGradeId[this] = value; } }
        public partial class RowFields { public Int32Field DesignationGradeId; }


        [DisplayName("Designation Name"), Expression("jDesignation.[Name]")]
        public String DesignationName { get { return Fields.DesignationName[this]; } set { Fields.DesignationName[this] = value; } }
        public partial class RowFields { public StringField DesignationName; }

        [DisplayName("Designation Name"), Expression("jDesignation.[ShortName]")]
        public String DesignationShortName { get { return Fields.DesignationShortName[this]; } set { Fields.DesignationShortName[this] = value; } }
        public partial class RowFields { public StringField DesignationShortName; }


        [DisplayName("Designation Name B"), Expression("jDesignation.[NameB]")]
        public String DesignationNameB { get { return Fields.DesignationNameB[this]; } set { Fields.DesignationNameB[this] = value; } }
        public partial class RowFields { public StringField DesignationNameB; }


        [DisplayName("Designation Employee Class Id"), Expression("jDesignation.[EmployeeClassId]")]
        public Int32? DesignationEmployeeClassId { get { return Fields.DesignationEmployeeClassId[this]; } set { Fields.DesignationEmployeeClassId[this] = value; } }
        public partial class RowFields { public Int32Field DesignationEmployeeClassId; }


        [DisplayName("Designation   Rank"), Expression("jDesignation.[__Rank]")]
        public Int32? DesignationRank { get { return Fields.DesignationRank[this]; } set { Fields.DesignationRank[this] = value; } }
        public partial class RowFields { public Int32Field DesignationRank; }


        [DisplayName("Designation Job Description"), Expression("jDesignation.[JobDescription]")]
        public String DesignationJobDescription { get { return Fields.DesignationJobDescription[this]; } set { Fields.DesignationJobDescription[this] = value; } }
        public partial class RowFields { public StringField DesignationJobDescription; }


        [DisplayName("Designation Sorting Order"), Expression("jDesignation.[SortingOrder]")]
        public Int32? DesignationSortingOrder { get { return Fields.DesignationSortingOrder[this]; } set { Fields.DesignationSortingOrder[this] = value; } }
        public partial class RowFields { public Int32Field DesignationSortingOrder; }


        [DisplayName("Discipline Name"), Expression("jDiscipline.[Name]")]
        public String DisciplineName { get { return Fields.DisciplineName[this]; } set { Fields.DisciplineName[this] = value; } }
        public partial class RowFields { public StringField DisciplineName; }


        [DisplayName("Discipline Sort Order"), Expression("jDiscipline.[SortOrder]")]
        public Int32? DisciplineSortOrder { get { return Fields.DisciplineSortOrder[this]; } set { Fields.DisciplineSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field DisciplineSortOrder; }


        [DisplayName("Division Name"), Expression("jDivision.[Name]")]
        public String DivisionName { get { return Fields.DivisionName[this]; } set { Fields.DivisionName[this] = value; } }
        public partial class RowFields { public StringField DivisionName; }


        [DisplayName("Division Sort Order"), Expression("jDivision.[SortOrder]")]
        public Int32? DivisionSortOrder { get { return Fields.DivisionSortOrder[this]; } set { Fields.DivisionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field DivisionSortOrder; }


        [DisplayName("Section Name"), Expression("jSection.[Name]")]
        public String SectionName { get { return Fields.SectionName[this]; } set { Fields.SectionName[this] = value; } }
        public partial class RowFields { public StringField SectionName; }


        [DisplayName("Section Sort Order"), Expression("jSection.[SortOrder]")]
        public Int32? SectionSortOrder { get { return Fields.SectionSortOrder[this]; } set { Fields.SectionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field SectionSortOrder; }


        [DisplayName("Sub Section Name"), Expression("jSubSection.[Name]")]
        public String SubSectionName { get { return Fields.SubSectionName[this]; } set { Fields.SubSectionName[this] = value; } }
        public partial class RowFields { public StringField SubSectionName; }


        [DisplayName("Sub Section Sort Order"), Expression("jSubSection.[SortOrder]")]
        public Int32? SubSectionSortOrder { get { return Fields.SubSectionSortOrder[this]; } set { Fields.SubSectionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field SubSectionSortOrder; }


        [DisplayName("Job Location Name"), Expression("jJobLocation.[Name]")]
        public String JobLocationName { get { return Fields.JobLocationName[this]; } set { Fields.JobLocationName[this] = value; } }
        public partial class RowFields { public StringField JobLocationName; }


        [DisplayName("Job Location Sort Order"), Expression("jJobLocation.[SortOrder]")]
        public Int32? JobLocationSortOrder { get { return Fields.JobLocationSortOrder[this]; } set { Fields.JobLocationSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field JobLocationSortOrder; }


        [DisplayName("Resource Level Name"), Expression("jResourceLevel.[Name]")]
        public String ResourceLevelName { get { return Fields.ResourceLevelName[this]; } set { Fields.ResourceLevelName[this] = value; } }
        public partial class RowFields { public StringField ResourceLevelName; }


        [DisplayName("Resource Level Sort Order"), Expression("jResourceLevel.[SortOrder]")]
        public Int32? ResourceLevelSortOrder { get { return Fields.ResourceLevelSortOrder[this]; } set { Fields.ResourceLevelSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field ResourceLevelSortOrder; }


        [DisplayName("Staff Category Name"), Expression("jStaffCategory.[Name]")]
        public String StaffCategoryName { get { return Fields.StaffCategoryName[this]; } set { Fields.StaffCategoryName[this] = value; } }
        public partial class RowFields { public StringField StaffCategoryName; }


        [DisplayName("Staff Category Sort Order"), Expression("jStaffCategory.[SortOrder]")]
        public Int32? StaffCategorySortOrder { get { return Fields.StaffCategorySortOrder[this]; } set { Fields.StaffCategorySortOrder[this] = value; } }
        public partial class RowFields { public Int32Field StaffCategorySortOrder; }


        [DisplayName("Staff Category Retirement Age"), Expression("jStaffCategory.[RetirementAge]")]
        public Double? StaffCategoryRetirementAge { get { return Fields.StaffCategoryRetirementAge[this]; } set { Fields.StaffCategoryRetirementAge[this] = value; } }
        public partial class RowFields { public DoubleField StaffCategoryRetirementAge; }


        [DisplayName("Shift Name"), Expression("jShift.[Name]")]
        public String ShiftName { get { return Fields.ShiftName[this]; } set { Fields.ShiftName[this] = value; } }
        public partial class RowFields { public StringField ShiftName; }


        [DisplayName("Shift Sort Order"), Expression("jShift.[SortOrder]")]
        public Int32? ShiftSortOrder { get { return Fields.ShiftSortOrder[this]; } set { Fields.ShiftSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field ShiftSortOrder; }


        [DisplayName("Employment Type Name"), Expression("jEmploymentType.[Name]")]
        public String EmploymentTypeName { get { return Fields.EmploymentTypeName[this]; } set { Fields.EmploymentTypeName[this] = value; } }
        public partial class RowFields { public StringField EmploymentTypeName; }


        [DisplayName("Employment Type Sort Order"), Expression("jEmploymentType.[SortOrder]")]
        public Int32? EmploymentTypeSortOrder { get { return Fields.EmploymentTypeSortOrder[this]; } set { Fields.EmploymentTypeSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentTypeSortOrder; }


        [DisplayName("Religion Name"), Expression("jReligion.[Name]")]
        public String ReligionName { get { return Fields.ReligionName[this]; } set { Fields.ReligionName[this] = value; } }
        public partial class RowFields { public StringField ReligionName; }


        [DisplayName("Religion Sort Order"), Expression("jReligion.[SortOrder]")]
        public Int32? ReligionSortOrder { get { return Fields.ReligionSortOrder[this]; } set { Fields.ReligionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field ReligionSortOrder; }


        [DisplayName("Bank Name"), Expression("jBank.[Name]")]
        public String BankName { get { return Fields.BankName[this]; } set { Fields.BankName[this] = value; } }
        public partial class RowFields { public StringField BankName; }


        [DisplayName("Bank Branch Bank Id"), Expression("jBankBranch.[BankId]")]
        public Int32? BankBranchBankId { get { return Fields.BankBranchBankId[this]; } set { Fields.BankBranchBankId[this] = value; } }
        public partial class RowFields { public Int32Field BankBranchBankId; }


        [DisplayName("Bank Branch Name"), Expression("jBankBranch.[Name]")]
        public String BankBranchName { get { return Fields.BankBranchName[this]; } set { Fields.BankBranchName[this] = value; } }
        public partial class RowFields { public StringField BankBranchName; }


        [DisplayName("Bank Branch Address"), Expression("jBankBranch.[Address]")]
        public String BankBranchAddress { get { return Fields.BankBranchAddress[this]; } set { Fields.BankBranchAddress[this] = value; } }
        public partial class RowFields { public StringField BankBranchAddress; }


        [DisplayName("Employment Status Name"), Expression("jEmploymentStatus.[Name]")]
        public String EmploymentStatusName { get { return Fields.EmploymentStatusName[this]; } set { Fields.EmploymentStatusName[this] = value; } }
        public partial class RowFields { public StringField EmploymentStatusName; }


        [DisplayName("Employment Status Sort Order"), Expression("jEmploymentStatus.[SortOrder]")]
        public Int32? EmploymentStatusSortOrder { get { return Fields.EmploymentStatusSortOrder[this]; } set { Fields.EmploymentStatusSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentStatusSortOrder; }


        [DisplayName("Salary Scale Salary Scale Name"), Expression("jSalaryScale.[SalaryScaleName]")]
        public String SalaryScaleSalaryScaleName { get { return Fields.SalaryScaleSalaryScaleName[this]; } set { Fields.SalaryScaleSalaryScaleName[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleSalaryScaleName; }


        [DisplayName("Salary Scale Date Of Circulation"), Expression("jSalaryScale.[DateOfCirculation]")]
        public DateTime? SalaryScaleDateOfCirculation { get { return Fields.SalaryScaleDateOfCirculation[this]; } set { Fields.SalaryScaleDateOfCirculation[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleDateOfCirculation; }


        [DisplayName("Salary Scale Date Of Effective"), Expression("jSalaryScale.[DateOfEffective]")]
        public DateTime? SalaryScaleDateOfEffective { get { return Fields.SalaryScaleDateOfEffective[this]; } set { Fields.SalaryScaleDateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleDateOfEffective; }


        [DisplayName("Job Grade Salary Scale Id"), Expression("jJobGrade.[SalaryScaleId]")]
        public Int32? JobGradeSalaryScaleId { get { return Fields.JobGradeSalaryScaleId[this]; } set { Fields.JobGradeSalaryScaleId[this] = value; } }
        public partial class RowFields { public Int32Field JobGradeSalaryScaleId; }


        [DisplayName("Job Grade Grade Name"), Expression("jJobGrade.[GradeName]")]
        public String JobGradeGradeName { get { return Fields.JobGradeGradeName[this]; } set { Fields.JobGradeGradeName[this] = value; } }
        public partial class RowFields { public StringField JobGradeGradeName; }


        [DisplayName("Job Grade Grade Code"), Expression("jJobGrade.[GradeCode]")]
        public String JobGradeGradeCode { get { return Fields.JobGradeGradeCode[this]; } set { Fields.JobGradeGradeCode[this] = value; } }
        public partial class RowFields { public StringField JobGradeGradeCode; }


        [DisplayName("Job Grade Number Of Steps"), Expression("jJobGrade.[NumberOfSteps]")]
        public Int32? JobGradeNumberOfSteps { get { return Fields.JobGradeNumberOfSteps[this]; } set { Fields.JobGradeNumberOfSteps[this] = value; } }
        public partial class RowFields { public Int32Field JobGradeNumberOfSteps; }


        [DisplayName("Job Grade Initial Basic"), Expression("jJobGrade.[InitialBasic]")]
        public Decimal? JobGradeInitialBasic { get { return Fields.JobGradeInitialBasic[this]; } set { Fields.JobGradeInitialBasic[this] = value; } }
        public partial class RowFields { public DecimalField JobGradeInitialBasic; }


        [DisplayName("Job Grade Last Basic"), Expression("jJobGrade.[LastBasic]")]
        public Decimal? JobGradeLastBasic { get { return Fields.JobGradeLastBasic[this]; } set { Fields.JobGradeLastBasic[this] = value; } }
        public partial class RowFields { public DecimalField JobGradeLastBasic; }


        [DisplayName("Job Grade Yearly Increment"), Expression("jJobGrade.[YearlyIncrement]")]
        public Decimal? JobGradeYearlyIncrement { get { return Fields.JobGradeYearlyIncrement[this]; } set { Fields.JobGradeYearlyIncrement[this] = value; } }
        public partial class RowFields { public DecimalField JobGradeYearlyIncrement; }


        [DisplayName("Job Grade Date Of Effective"), Expression("jJobGrade.[DateOfEffective]")]
        public DateTime? JobGradeDateOfEffective { get { return Fields.JobGradeDateOfEffective[this]; } set { Fields.JobGradeDateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField JobGradeDateOfEffective; }


        [DisplayName("Job Grade Is Consolidated"), Expression("jJobGrade.[IsConsolidated]")]
        public Boolean? JobGradeIsConsolidated { get { return Fields.JobGradeIsConsolidated[this]; } set { Fields.JobGradeIsConsolidated[this] = value; } }
        public partial class RowFields { public BooleanField JobGradeIsConsolidated; }


        [DisplayName("Job Grade Pay Scale"), Expression("jJobGrade.[PayScale]")]
        public String JobGradePayScale { get { return Fields.JobGradePayScale[this]; } set { Fields.JobGradePayScale[this] = value; } }
        public partial class RowFields { public StringField JobGradePayScale; }


        [DisplayName("Organogram Level Organogram Type Id"), Expression("jOrganogramLevel.[OrganogramTypeId]")]
        public Int32? OrganogramLevelOrganogramTypeId { get { return Fields.OrganogramLevelOrganogramTypeId[this]; } set { Fields.OrganogramLevelOrganogramTypeId[this] = value; } }
        public partial class RowFields { public Int32Field OrganogramLevelOrganogramTypeId; }


        [DisplayName("Organogram Level Level Name"), Expression("jOrganogramLevel.[LevelName]")]
        public String OrganogramLevelLevelName { get { return Fields.OrganogramLevelLevelName[this]; } set { Fields.OrganogramLevelLevelName[this] = value; } }
        public partial class RowFields { public StringField OrganogramLevelLevelName; }


        [DisplayName("Organogram Level Parent Id"), Expression("jOrganogramLevel.[ParentId]")]
        public Int32? OrganogramLevelParentId { get { return Fields.OrganogramLevelParentId[this]; } set { Fields.OrganogramLevelParentId[this] = value; } }
        public partial class RowFields { public Int32Field OrganogramLevelParentId; }


        [DisplayName("Organogram Level Code"), Expression("jOrganogramLevel.[Code]")]
        public String OrganogramLevelCode { get { return Fields.OrganogramLevelCode[this]; } set { Fields.OrganogramLevelCode[this] = value; } }
        public partial class RowFields { public StringField OrganogramLevelCode; }


        [DisplayName("Organogram Level Prefix"), Expression("jOrganogramLevel.[Prefix]")]
        public String OrganogramLevelPrefix { get { return Fields.OrganogramLevelPrefix[this]; } set { Fields.OrganogramLevelPrefix[this] = value; } }
        public partial class RowFields { public StringField OrganogramLevelPrefix; }


        [DisplayName("Organogram Level Position"), Expression("jOrganogramLevel.[Position]")]
        public Int32? OrganogramLevelPosition { get { return Fields.OrganogramLevelPosition[this]; } set { Fields.OrganogramLevelPosition[this] = value; } }
        public partial class RowFields { public Int32Field OrganogramLevelPosition; }


        [DisplayName("Organogram Level Is Active"), Expression("jOrganogramLevel.[IsActive]")]
        public Boolean? OrganogramLevelIsActive { get { return Fields.OrganogramLevelIsActive[this]; } set { Fields.OrganogramLevelIsActive[this] = value; } }
        public partial class RowFields { public BooleanField OrganogramLevelIsActive; }


        [DisplayName("Quota Name"), Expression("jQuota.[Name]")]
        public String QuotaName { get { return Fields.QuotaName[this]; } set { Fields.QuotaName[this] = value; } }
        public partial class RowFields { public StringField QuotaName; }


        [DisplayName("Quota Sort Order"), Expression("jQuota.[SortOrder]")]
        public Int32? QuotaSortOrder { get { return Fields.QuotaSortOrder[this]; } set { Fields.QuotaSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field QuotaSortOrder; }


        [DisplayName("Employee Class Name"), Expression("jEmployeeClass.[Name]")]
        public String EmployeeClassName { get { return Fields.EmployeeClassName[this]; } set { Fields.EmployeeClassName[this] = value; } }
        public partial class RowFields { public StringField EmployeeClassName; }


        [DisplayName("Employee Class Sort Order"), Expression("jEmployeeClass.[SortOrder]")]
        public Int32? EmployeeClassSortOrder { get { return Fields.EmployeeClassSortOrder[this]; } set { Fields.EmployeeClassSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeClassSortOrder; }


        [DisplayName("Employment Process Name"), Expression("jEmploymentProcess.[Name]")]
        public String EmploymentProcessName { get { return Fields.EmploymentProcessName[this]; } set { Fields.EmploymentProcessName[this] = value; } }
        public partial class RowFields { public StringField EmploymentProcessName; }


        [DisplayName("Employment Process Sort Order"), Expression("jEmploymentProcess.[SortOrder]")]
        public Int32? EmploymentProcessSortOrder { get { return Fields.EmploymentProcessSortOrder[this]; } set { Fields.EmploymentProcessSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentProcessSortOrder; }


        [DisplayName("Region Name"), Expression("jRegion.[Name]")]
        public String RegionName { get { return Fields.RegionName[this]; } set { Fields.RegionName[this] = value; } }
        public partial class RowFields { public StringField RegionName; }


        [DisplayName("Region Sort Order"), Expression("jRegion.[SortOrder]")]
        public Int32? RegionSortOrder { get { return Fields.RegionSortOrder[this]; } set { Fields.RegionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field RegionSortOrder; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField {
            get { return Fields.LookupText; }
        }
        #endregion Id and Name fields

        #region Constructor
        public EmploymentInfoRow()
        : base(Fields) {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();
        public const string TableName = "[dbo].[PRM_EmploymentInfo]";

        public partial class RowFields : RowFieldsBase {
            public RowFields()
            : base(EmploymentInfoRow.TableName) {
                LocalTextPrefix = "HRM.EmploymentInfo";
            }
        }
        #endregion RowFields
    }
}
