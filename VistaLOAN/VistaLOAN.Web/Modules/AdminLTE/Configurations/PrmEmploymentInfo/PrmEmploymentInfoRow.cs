
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("PRM_EmploymentInfo"), InstanceName("PRM_EmploymentInfo"), TwoLevelCached]
    //[ReadPermission("Configurations:PRM_EmploymentInfo:Read")]
    //[InsertPermission("Configurations:PRM_EmploymentInfo:Insert")]
    //[UpdatePermission("Configurations:PRM_EmploymentInfo:Update")]
    //[DeletePermission("Configurations:PRM_EmploymentInfo:Delete")]
    [ModifyPermission("*")]
    [ReadPermission("*")]
    [LookupScript("Configurations.PrmEmploymentInfo", Permission = "?")]
    public sealed class PrmEmploymentInfoRow : Row, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Emp Id
        [DisplayName("Emp Id"), Column("EmpID"), Size(15), NotNull, QuickSearch]
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

        #region Full Name Bangla
        [DisplayName("Full Name Bangla"), Size(200)]
        public String FullNameBangla { get { return Fields.FullNameBangla[this]; } set { Fields.FullNameBangla[this] = value; } }
        public partial class RowFields { public StringField FullNameBangla; }
        #endregion FullNameBangla

        #region Dateof Joining
        [DisplayName("Dateof Joining"), NotNull]
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
        [DisplayName("Designation"), NotNull, ForeignKey("[dbo].[PRM_Designation]", "Id"), LeftJoin("jDesignation"), TextualField("DesignationName")]

        public Int32? DesignationId { get { return Fields.DesignationId[this]; } set { Fields.DesignationId[this] = value; } }
        public partial class RowFields { public Int32Field DesignationId; }
        #endregion DesignationId

        #region Status Designation
        [DisplayName("Status Designation"), ForeignKey("[dbo].[PRM_Designation]", "Id"), LeftJoin("jStatusDesignation"), TextualField("StatusDesignationName")]

        public Int32? StatusDesignationId { get { return Fields.StatusDesignationId[this]; } set { Fields.StatusDesignationId[this] = value; } }
        public partial class RowFields { public Int32Field StatusDesignationId; }
        #endregion StatusDesignationId

        #region Discipline
        [DisplayName("Discipline"), ForeignKey("[dbo].[PRM_Discipline]", "Id"), LeftJoin("jDiscipline"), TextualField("DisciplineName")]

        public Int32? DisciplineId { get { return Fields.DisciplineId[this]; } set { Fields.DisciplineId[this] = value; } }
        public partial class RowFields { public Int32Field DisciplineId; }
        #endregion DisciplineId

        #region Division
        [DisplayName("Division"), ForeignKey("[dbo].[PRM_Division]", "Id"), LeftJoin("jDivision"), TextualField("DivisionName")]

        public Int32? DivisionId { get { return Fields.DivisionId[this]; } set { Fields.DivisionId[this] = value; } }
        public partial class RowFields { public Int32Field DivisionId; }
        #endregion DivisionId

        #region Section
        [DisplayName("Section"), ForeignKey("[dbo].[PRM_Section]", "Id"), LeftJoin("jSection"), TextualField("SectionName")]

        public Int32? SectionId { get { return Fields.SectionId[this]; } set { Fields.SectionId[this] = value; } }
        public partial class RowFields { public Int32Field SectionId; }
        #endregion SectionId

        #region Sub Section
        [DisplayName("Sub Section"), ForeignKey("[dbo].[PRM_SubSection]", "Id"), LeftJoin("jSubSection"), TextualField("SubSectionName")]

        public Int32? SubSectionId { get { return Fields.SubSectionId[this]; } set { Fields.SubSectionId[this] = value; } }
        public partial class RowFields { public Int32Field SubSectionId; }
        #endregion SubSectionId

        #region Job Location
        [DisplayName("Job Location"), NotNull, ForeignKey("[dbo].[PRM_JobLocation]", "Id"), LeftJoin("jJobLocation"), TextualField("JobLocationName")]

        public Int32? JobLocationId { get { return Fields.JobLocationId[this]; } set { Fields.JobLocationId[this] = value; } }
        public partial class RowFields { public Int32Field JobLocationId; }
        #endregion JobLocationId

        #region Resource Level
        [DisplayName("Resource Level"), ForeignKey("[dbo].[PRM_ResourceLevel]", "Id"), LeftJoin("jResourceLevel"), TextualField("ResourceLevelName")]

        public Int32? ResourceLevelId { get { return Fields.ResourceLevelId[this]; } set { Fields.ResourceLevelId[this] = value; } }
        public partial class RowFields { public Int32Field ResourceLevelId; }
        #endregion ResourceLevelId

        #region Staff Category
        [DisplayName("Staff Category"), NotNull, ForeignKey("[dbo].[PRM_StaffCategory]", "Id"), LeftJoin("jStaffCategory"), TextualField("StaffCategoryName")]

        public Int32? StaffCategoryId { get { return Fields.StaffCategoryId[this]; } set { Fields.StaffCategoryId[this] = value; } }
        public partial class RowFields { public Int32Field StaffCategoryId; }
        #endregion StaffCategoryId

        #region Employment Type
        [DisplayName("Employment Type"), NotNull, ForeignKey("[dbo].[PRM_EmploymentType]", "Id"), LeftJoin("jEmploymentType"), TextualField("EmploymentTypeName")]

        public Int32? EmploymentTypeId { get { return Fields.EmploymentTypeId[this]; } set { Fields.EmploymentTypeId[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentTypeId; }
        #endregion EmploymentTypeId

        #region Religion
        [DisplayName("Religion"), NotNull, ForeignKey("[dbo].[PRM_Religion]", "Id"), LeftJoin("jReligion"), TextualField("ReligionName")]

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
        [DisplayName("Is Overtime Eligible"), NotNull]
        public Boolean? IsOvertimeEligible { get { return Fields.IsOvertimeEligible[this]; } set { Fields.IsOvertimeEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsOvertimeEligible; }
        #endregion IsOvertimeEligible

        #region Overtime Rate
        [DisplayName("Overtime Rate"), Size(5), Scale(2)]
        public Decimal? OvertimeRate { get { return Fields.OvertimeRate[this]; } set { Fields.OvertimeRate[this] = value; } }
        public partial class RowFields { public DecimalField OvertimeRate; }
        #endregion OvertimeRate

        #region Mobile No
        [DisplayName("Mobile No"), Size(50)]
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

        public Int32? BankId { get { return Fields.BankId[this]; } set { Fields.BankId[this] = value; } }
        public partial class RowFields { public Int32Field BankId; }
        #endregion BankId

        #region Bank Branch
        [DisplayName("Bank Branch"), ForeignKey("[dbo].[PRM_BankBranch]", "Id"), LeftJoin("jBankBranch"), TextualField("BankBranchName")]

        public Int32? BankBranchId { get { return Fields.BankBranchId[this]; } set { Fields.BankBranchId[this] = value; } }
        public partial class RowFields { public Int32Field BankBranchId; }
        #endregion BankBranchId

        #region Bank Account No
        [DisplayName("Bank Account No"), Size(50)]
        public String BankAccountNo { get { return Fields.BankAccountNo[this]; } set { Fields.BankAccountNo[this] = value; } }
        public partial class RowFields { public StringField BankAccountNo; }
        #endregion BankAccountNo

        #region Employment Status
        [DisplayName("Employment Status"), NotNull, ForeignKey("[dbo].[PRM_EmploymentStatus]", "Id"), LeftJoin("jEmploymentStatus"), TextualField("EmploymentStatusName")]

        public Int32? EmploymentStatusId { get { return Fields.EmploymentStatusId[this]; } set { Fields.EmploymentStatusId[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentStatusId; }
        #endregion EmploymentStatusId

        #region Dateof Inactive
        [DisplayName("Dateof Inactive")]
        public DateTime? DateofInactive { get { return Fields.DateofInactive[this]; } set { Fields.DateofInactive[this] = value; } }
        public partial class RowFields { public DateTimeField DateofInactive; }
        #endregion DateofInactive

        #region Is Bonus Eligible
        [DisplayName("Is Bonus Eligible"), NotNull]
        public Boolean? IsBonusEligible { get { return Fields.IsBonusEligible[this]; } set { Fields.IsBonusEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsBonusEligible; }
        #endregion IsBonusEligible

        #region Salary Scale
        [DisplayName("Salary Scale"), NotNull, ForeignKey("[dbo].[PRM_SalaryScale]", "Id"), LeftJoin("jSalaryScale"), TextualField("SalaryScaleSalaryScaleName")]

        public Int32? SalaryScaleId { get { return Fields.SalaryScaleId[this]; } set { Fields.SalaryScaleId[this] = value; } }
        public partial class RowFields { public Int32Field SalaryScaleId; }
        #endregion SalaryScaleId

        #region Job Grade
        [DisplayName("Job Grade"), NotNull, ForeignKey("[dbo].[PRM_JobGrade]", "Id"), LeftJoin("jJobGrade"), TextualField("JobGradeGradeName")]

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
        [DisplayName("Dateof Birth"), NotNull]
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

        #region Organogram Level
        [DisplayName("Organogram Level"), NotNull, ForeignKey("[dbo].[PRM_OrganogramLevel]", "Id"), LeftJoin("jOrganogramLevel"), TextualField("OrganogramLevelLevelName")]

        public Int32? OrganogramLevelId { get { return Fields.OrganogramLevelId[this]; } set { Fields.OrganogramLevelId[this] = value; } }
        public partial class RowFields { public Int32Field OrganogramLevelId; }
        #endregion OrganogramLevelId

        #region Dateof Appointment
        [DisplayName("Dateof Appointment"), NotNull]
        public DateTime? DateofAppointment { get { return Fields.DateofAppointment[this]; } set { Fields.DateofAppointment[this] = value; } }
        public partial class RowFields { public DateTimeField DateofAppointment; }
        #endregion DateofAppointment

        #region Order No
        [DisplayName("Order No"), Size(50)]
        public String OrderNo { get { return Fields.OrderNo[this]; } set { Fields.OrderNo[this] = value; } }
        public partial class RowFields { public StringField OrderNo; }
        #endregion OrderNo

        #region Quota
        [DisplayName("Quota"), ForeignKey("[dbo].[PRM_QuotaName]", "Id"), LeftJoin("jQuota"), TextualField("QuotaName")]

        public Int32? QuotaId { get { return Fields.QuotaId[this]; } set { Fields.QuotaId[this] = value; } }
        public partial class RowFields { public Int32Field QuotaId; }
        #endregion QuotaId

        #region Employee Class
        [DisplayName("Employee Class"), ForeignKey("[dbo].[PRM_EmployeeClass]", "Id"), LeftJoin("jEmployeeClass"), TextualField("EmployeeClassName")]

        public Int32? EmployeeClassId { get { return Fields.EmployeeClassId[this]; } set { Fields.EmployeeClassId[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeClassId; }
        #endregion EmployeeClassId

        #region Employment Process
        [DisplayName("Employment Process"), ForeignKey("[dbo].[PRM_EmploymentProcess]", "Id"), LeftJoin("jEmploymentProcess"), TextualField("EmploymentProcessName")]

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
        [DisplayName("Is Pension Eligible"), NotNull]
        public Boolean? IsPensionEligible { get { return Fields.IsPensionEligible[this]; } set { Fields.IsPensionEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsPensionEligible; }
        #endregion IsPensionEligible

        #region Is Leverage Eligible
        [DisplayName("Is Leverage Eligible"), NotNull]
        public Boolean? IsLeverageEligible { get { return Fields.IsLeverageEligible[this]; } set { Fields.IsLeverageEligible[this] = value; } }
        public partial class RowFields { public BooleanField IsLeverageEligible; }
        #endregion IsLeverageEligible

        #region Card No
        [DisplayName("Card No"), Size(20)]
        public String CardNo { get { return Fields.CardNo[this]; } set { Fields.CardNo[this] = value; } }
        public partial class RowFields { public StringField CardNo; }
        #endregion CardNo

        #region Finger Print Identiy No
        [DisplayName("Finger Print Identiy No"), Size(50)]
        public String FingerPrintIdentiyNo { get { return Fields.FingerPrintIdentiyNo[this]; } set { Fields.FingerPrintIdentiyNo[this] = value; } }
        public partial class RowFields { public StringField FingerPrintIdentiyNo; }
        #endregion FingerPrintIdentiyNo

        #region Attendance Effective Date
        [DisplayName("Attendance Effective Date")]
        public DateTime? AttendanceEffectiveDate { get { return Fields.AttendanceEffectiveDate[this]; } set { Fields.AttendanceEffectiveDate[this] = value; } }
        public partial class RowFields { public DateTimeField AttendanceEffectiveDate; }
        #endregion AttendanceEffectiveDate

        #region Attendance Status
        [DisplayName("Attendance Status"), NotNull]
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

        #region Zone Info
        [DisplayName("Zone Info"), NotNull, ForeignKey("[dbo].[PRM_ZoneInfo]", "Id"), LeftJoin("jZoneInfo"), TextualField("ZoneInfoZoneName")]
        [LookupEditor(typeof(Configurations.Entities.PrmZoneInfoRow), InplaceAdd = true)]
        public Int32? ZoneInfoId { get { return Fields.ZoneInfoId[this]; } set { Fields.ZoneInfoId[this] = value; } }
        public partial class RowFields { public Int32Field ZoneInfoId; }
        #endregion ZoneInfoId

        #region Telephone Office
        [DisplayName("Telephone Office"), Size(50)]
        public String TelephoneOffice { get { return Fields.TelephoneOffice[this]; } set { Fields.TelephoneOffice[this] = value; } }
        public partial class RowFields { public StringField TelephoneOffice; }
        #endregion TelephoneOffice

        #region Intercom
        [DisplayName("Intercom"), Size(50)]
        public String Intercom { get { return Fields.Intercom[this]; } set { Fields.Intercom[this] = value; } }
        public partial class RowFields { public StringField Intercom; }
        #endregion Intercom

        #region Honorary Degree
        [DisplayName("Honorary Degree"), Size(150)]
        public String HonoraryDegree { get { return Fields.HonoraryDegree[this]; } set { Fields.HonoraryDegree[this] = value; } }
        public partial class RowFields { public StringField HonoraryDegree; }
        #endregion HonoraryDegree

        #region Is Eligible For Cpf
        [DisplayName("Is Eligible For Cpf")]
        public Boolean? IsEligibleForCpf { get { return Fields.IsEligibleForCpf[this]; } set { Fields.IsEligibleForCpf[this] = value; } }
        public partial class RowFields { public BooleanField IsEligibleForCpf; }
        #endregion IsEligibleForCpf

        #region Tax Region
        [DisplayName("Tax Region"), ForeignKey("[dbo].[PGM_TaxRegionRule]", "Id"), LeftJoin("jTaxRegion"), TextualField("TaxRegionRegionName")]

        public Int32? TaxRegionId { get { return Fields.TaxRegionId[this]; } set { Fields.TaxRegionId[this] = value; } }
        public partial class RowFields { public Int32Field TaxRegionId; }
        #endregion TaxRegionId

        #region Tax Assessee Type
        [DisplayName("Tax Assessee Type")]
        public Int16? TaxAssesseeType { get { return Fields.TaxAssesseeType[this]; } set { Fields.TaxAssesseeType[this] = value; } }
        public partial class RowFields { public Int16Field TaxAssesseeType; }
        #endregion TaxAssesseeType

        #region Having Child With Disability
        [DisplayName("Having Child With Disability")]
        public Boolean? HavingChildWithDisability { get { return Fields.HavingChildWithDisability[this]; } set { Fields.HavingChildWithDisability[this] = value; } }
        public partial class RowFields { public BooleanField HavingChildWithDisability; }
        #endregion HavingChildWithDisability

        #region Dateof Retirement
        [DisplayName("Dateof Retirement")]
        public DateTime? DateofRetirement { get { return Fields.DateofRetirement[this]; } set { Fields.DateofRetirement[this] = value; } }
        public partial class RowFields { public DateTimeField DateofRetirement; }
        #endregion DateofRetirement

        #region Salary Withdraw From Zone Id
        [DisplayName("Salary Withdraw From Zone Id")]
        public Int32? SalaryWithdrawFromZoneId { get { return Fields.SalaryWithdrawFromZoneId[this]; } set { Fields.SalaryWithdrawFromZoneId[this] = value; } }
        public partial class RowFields { public Int32Field SalaryWithdrawFromZoneId; }
        #endregion SalaryWithdrawFromZoneId

        #region Region Id
        [DisplayName("Region Id")]
        public Int32? RegionId { get { return Fields.RegionId[this]; } set { Fields.RegionId[this] = value; } }
        public partial class RowFields { public Int32Field RegionId; }
        #endregion RegionId


        #region Foreign Fields
        //[DisplayName("Title Name"), Expression("T0.EmpId + ' - ' + T0.FullName")]
        //public String LookupText { get { return Fields.LookupText[this]; } set { Fields.LookupText[this] = value; } }
        //public partial class RowFields { public StringField LookupText; }


        [DisplayName("Title Name"), Expression("jTitle.[Name]")]
        public String TitleName { get { return Fields.TitleName[this]; } set { Fields.TitleName[this] = value; } }
        public partial class RowFields { public StringField TitleName; }

        [DisplayName("Title Sort Order"), Expression("jTitle.[SortOrder]")]
        public Int32? TitleSortOrder { get { return Fields.TitleSortOrder[this]; } set { Fields.TitleSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field TitleSortOrder; }


        [DisplayName("Title Remarks"), Expression("jTitle.[Remarks]")]
        public String TitleRemarks { get { return Fields.TitleRemarks[this]; } set { Fields.TitleRemarks[this] = value; } }
        public partial class RowFields { public StringField TitleRemarks; }


        [DisplayName("Title I User"), Expression("jTitle.[IUser]")]
        public String TitleIUser { get { return Fields.TitleIUser[this]; } set { Fields.TitleIUser[this] = value; } }
        public partial class RowFields { public StringField TitleIUser; }


        [DisplayName("Title E User"), Expression("jTitle.[EUser]")]
        public String TitleEUser { get { return Fields.TitleEUser[this]; } set { Fields.TitleEUser[this] = value; } }
        public partial class RowFields { public StringField TitleEUser; }


        [DisplayName("Title I Date"), Expression("jTitle.[IDate]")]
        public DateTime? TitleIDate { get { return Fields.TitleIDate[this]; } set { Fields.TitleIDate[this] = value; } }
        public partial class RowFields { public DateTimeField TitleIDate; }


        [DisplayName("Title E Date"), Expression("jTitle.[EDate]")]
        public DateTime? TitleEDate { get { return Fields.TitleEDate[this]; } set { Fields.TitleEDate[this] = value; } }
        public partial class RowFields { public DateTimeField TitleEDate; }


        [DisplayName("Designation Grade Id"), Expression("jDesignation.[GradeId]")]
        public Int32? DesignationGradeId { get { return Fields.DesignationGradeId[this]; } set { Fields.DesignationGradeId[this] = value; } }
        public partial class RowFields { public Int32Field DesignationGradeId; }


        [DisplayName("Designation Name"), Expression("jDesignation.[Name]")]
        public String DesignationName { get { return Fields.DesignationName[this]; } set { Fields.DesignationName[this] = value; } }
        public partial class RowFields { public StringField DesignationName; }


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


        [DisplayName("Designation Remarks"), Expression("jDesignation.[Remarks]")]
        public String DesignationRemarks { get { return Fields.DesignationRemarks[this]; } set { Fields.DesignationRemarks[this] = value; } }
        public partial class RowFields { public StringField DesignationRemarks; }


        [DisplayName("Designation Sorting Order"), Expression("jDesignation.[SortingOrder]")]
        public Int32? DesignationSortingOrder { get { return Fields.DesignationSortingOrder[this]; } set { Fields.DesignationSortingOrder[this] = value; } }
        public partial class RowFields { public Int32Field DesignationSortingOrder; }


        [DisplayName("Designation Short Name"), Expression("jDesignation.[ShortName]")]
        public String DesignationShortName { get { return Fields.DesignationShortName[this]; } set { Fields.DesignationShortName[this] = value; } }
        public partial class RowFields { public StringField DesignationShortName; }


        [DisplayName("Designation I User"), Expression("jDesignation.[IUser]")]
        public String DesignationIUser { get { return Fields.DesignationIUser[this]; } set { Fields.DesignationIUser[this] = value; } }
        public partial class RowFields { public StringField DesignationIUser; }


        [DisplayName("Designation I Date"), Expression("jDesignation.[IDate]")]
        public DateTime? DesignationIDate { get { return Fields.DesignationIDate[this]; } set { Fields.DesignationIDate[this] = value; } }
        public partial class RowFields { public DateTimeField DesignationIDate; }


        [DisplayName("Designation E User"), Expression("jDesignation.[EUser]")]
        public String DesignationEUser { get { return Fields.DesignationEUser[this]; } set { Fields.DesignationEUser[this] = value; } }
        public partial class RowFields { public StringField DesignationEUser; }


        [DisplayName("Designation E Date"), Expression("jDesignation.[EDate]")]
        public DateTime? DesignationEDate { get { return Fields.DesignationEDate[this]; } set { Fields.DesignationEDate[this] = value; } }
        public partial class RowFields { public DateTimeField DesignationEDate; }


        [DisplayName("Status Designation Grade Id"), Expression("jStatusDesignation.[GradeId]")]
        public Int32? StatusDesignationGradeId { get { return Fields.StatusDesignationGradeId[this]; } set { Fields.StatusDesignationGradeId[this] = value; } }
        public partial class RowFields { public Int32Field StatusDesignationGradeId; }


        [DisplayName("Status Designation Name"), Expression("jStatusDesignation.[Name]")]
        public String StatusDesignationName { get { return Fields.StatusDesignationName[this]; } set { Fields.StatusDesignationName[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationName; }


        [DisplayName("Status Designation Name B"), Expression("jStatusDesignation.[NameB]")]
        public String StatusDesignationNameB { get { return Fields.StatusDesignationNameB[this]; } set { Fields.StatusDesignationNameB[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationNameB; }


        [DisplayName("Status Designation Employee Class Id"), Expression("jStatusDesignation.[EmployeeClassId]")]
        public Int32? StatusDesignationEmployeeClassId { get { return Fields.StatusDesignationEmployeeClassId[this]; } set { Fields.StatusDesignationEmployeeClassId[this] = value; } }
        public partial class RowFields { public Int32Field StatusDesignationEmployeeClassId; }


        [DisplayName("Status Designation   Rank"), Expression("jStatusDesignation.[__Rank]")]
        public Int32? StatusDesignationRank { get { return Fields.StatusDesignationRank[this]; } set { Fields.StatusDesignationRank[this] = value; } }
        public partial class RowFields { public Int32Field StatusDesignationRank; }


        [DisplayName("Status Designation Job Description"), Expression("jStatusDesignation.[JobDescription]")]
        public String StatusDesignationJobDescription { get { return Fields.StatusDesignationJobDescription[this]; } set { Fields.StatusDesignationJobDescription[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationJobDescription; }


        [DisplayName("Status Designation Remarks"), Expression("jStatusDesignation.[Remarks]")]
        public String StatusDesignationRemarks { get { return Fields.StatusDesignationRemarks[this]; } set { Fields.StatusDesignationRemarks[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationRemarks; }


        [DisplayName("Status Designation Sorting Order"), Expression("jStatusDesignation.[SortingOrder]")]
        public Int32? StatusDesignationSortingOrder { get { return Fields.StatusDesignationSortingOrder[this]; } set { Fields.StatusDesignationSortingOrder[this] = value; } }
        public partial class RowFields { public Int32Field StatusDesignationSortingOrder; }


        [DisplayName("Status Designation Short Name"), Expression("jStatusDesignation.[ShortName]")]
        public String StatusDesignationShortName { get { return Fields.StatusDesignationShortName[this]; } set { Fields.StatusDesignationShortName[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationShortName; }


        [DisplayName("Status Designation I User"), Expression("jStatusDesignation.[IUser]")]
        public String StatusDesignationIUser { get { return Fields.StatusDesignationIUser[this]; } set { Fields.StatusDesignationIUser[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationIUser; }


        [DisplayName("Status Designation I Date"), Expression("jStatusDesignation.[IDate]")]
        public DateTime? StatusDesignationIDate { get { return Fields.StatusDesignationIDate[this]; } set { Fields.StatusDesignationIDate[this] = value; } }
        public partial class RowFields { public DateTimeField StatusDesignationIDate; }


        [DisplayName("Status Designation E User"), Expression("jStatusDesignation.[EUser]")]
        public String StatusDesignationEUser { get { return Fields.StatusDesignationEUser[this]; } set { Fields.StatusDesignationEUser[this] = value; } }
        public partial class RowFields { public StringField StatusDesignationEUser; }


        [DisplayName("Status Designation E Date"), Expression("jStatusDesignation.[EDate]")]
        public DateTime? StatusDesignationEDate { get { return Fields.StatusDesignationEDate[this]; } set { Fields.StatusDesignationEDate[this] = value; } }
        public partial class RowFields { public DateTimeField StatusDesignationEDate; }


        [DisplayName("Discipline Name"), Expression("jDiscipline.[Name]")]
        public String DisciplineName { get { return Fields.DisciplineName[this]; } set { Fields.DisciplineName[this] = value; } }
        public partial class RowFields { public StringField DisciplineName; }


        [DisplayName("Discipline Sort Order"), Expression("jDiscipline.[SortOrder]")]
        public Int32? DisciplineSortOrder { get { return Fields.DisciplineSortOrder[this]; } set { Fields.DisciplineSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field DisciplineSortOrder; }


        [DisplayName("Discipline Remarks"), Expression("jDiscipline.[Remarks]")]
        public String DisciplineRemarks { get { return Fields.DisciplineRemarks[this]; } set { Fields.DisciplineRemarks[this] = value; } }
        public partial class RowFields { public StringField DisciplineRemarks; }


        [DisplayName("Discipline Zone Info Id"), Expression("jDiscipline.[ZoneInfoId]")]
        public Int32? DisciplineZoneInfoId { get { return Fields.DisciplineZoneInfoId[this]; } set { Fields.DisciplineZoneInfoId[this] = value; } }
        public partial class RowFields { public Int32Field DisciplineZoneInfoId; }


        [DisplayName("Discipline I User"), Expression("jDiscipline.[IUser]")]
        public String DisciplineIUser { get { return Fields.DisciplineIUser[this]; } set { Fields.DisciplineIUser[this] = value; } }
        public partial class RowFields { public StringField DisciplineIUser; }


        [DisplayName("Discipline I Date"), Expression("jDiscipline.[IDate]")]
        public DateTime? DisciplineIDate { get { return Fields.DisciplineIDate[this]; } set { Fields.DisciplineIDate[this] = value; } }
        public partial class RowFields { public DateTimeField DisciplineIDate; }


        [DisplayName("Discipline E User"), Expression("jDiscipline.[EUser]")]
        public String DisciplineEUser { get { return Fields.DisciplineEUser[this]; } set { Fields.DisciplineEUser[this] = value; } }
        public partial class RowFields { public StringField DisciplineEUser; }


        [DisplayName("Discipline E Date"), Expression("jDiscipline.[EDate]")]
        public DateTime? DisciplineEDate { get { return Fields.DisciplineEDate[this]; } set { Fields.DisciplineEDate[this] = value; } }
        public partial class RowFields { public DateTimeField DisciplineEDate; }


        [DisplayName("Division Name"), Expression("jDivision.[Name]")]
        public String DivisionName { get { return Fields.DivisionName[this]; } set { Fields.DivisionName[this] = value; } }
        public partial class RowFields { public StringField DivisionName; }


        [DisplayName("Division Sort Order"), Expression("jDivision.[SortOrder]")]
        public Int32? DivisionSortOrder { get { return Fields.DivisionSortOrder[this]; } set { Fields.DivisionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field DivisionSortOrder; }


        [DisplayName("Division Remarks"), Expression("jDivision.[Remarks]")]
        public String DivisionRemarks { get { return Fields.DivisionRemarks[this]; } set { Fields.DivisionRemarks[this] = value; } }
        public partial class RowFields { public StringField DivisionRemarks; }


        [DisplayName("Division Zone Info Id"), Expression("jDivision.[ZoneInfoId]")]
        public Int32? DivisionZoneInfoId { get { return Fields.DivisionZoneInfoId[this]; } set { Fields.DivisionZoneInfoId[this] = value; } }
        public partial class RowFields { public Int32Field DivisionZoneInfoId; }


        [DisplayName("Division I User"), Expression("jDivision.[IUser]")]
        public String DivisionIUser { get { return Fields.DivisionIUser[this]; } set { Fields.DivisionIUser[this] = value; } }
        public partial class RowFields { public StringField DivisionIUser; }


        [DisplayName("Division E User"), Expression("jDivision.[EUser]")]
        public String DivisionEUser { get { return Fields.DivisionEUser[this]; } set { Fields.DivisionEUser[this] = value; } }
        public partial class RowFields { public StringField DivisionEUser; }


        [DisplayName("Division I Date"), Expression("jDivision.[IDate]")]
        public DateTime? DivisionIDate { get { return Fields.DivisionIDate[this]; } set { Fields.DivisionIDate[this] = value; } }
        public partial class RowFields { public DateTimeField DivisionIDate; }


        [DisplayName("Division E Date"), Expression("jDivision.[EDate]")]
        public DateTime? DivisionEDate { get { return Fields.DivisionEDate[this]; } set { Fields.DivisionEDate[this] = value; } }
        public partial class RowFields { public DateTimeField DivisionEDate; }


        [DisplayName("Section Name"), Expression("jSection.[Name]")]
        public String SectionName { get { return Fields.SectionName[this]; } set { Fields.SectionName[this] = value; } }
        public partial class RowFields { public StringField SectionName; }


        [DisplayName("Section Sort Order"), Expression("jSection.[SortOrder]")]
        public Int32? SectionSortOrder { get { return Fields.SectionSortOrder[this]; } set { Fields.SectionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field SectionSortOrder; }


        [DisplayName("Section Remarks"), Expression("jSection.[Remarks]")]
        public String SectionRemarks { get { return Fields.SectionRemarks[this]; } set { Fields.SectionRemarks[this] = value; } }
        public partial class RowFields { public StringField SectionRemarks; }


        [DisplayName("Section Zone Info Id"), Expression("jSection.[ZoneInfoId]")]
        public Int32? SectionZoneInfoId { get { return Fields.SectionZoneInfoId[this]; } set { Fields.SectionZoneInfoId[this] = value; } }
        public partial class RowFields { public Int32Field SectionZoneInfoId; }


        [DisplayName("Section I User"), Expression("jSection.[IUser]")]
        public String SectionIUser { get { return Fields.SectionIUser[this]; } set { Fields.SectionIUser[this] = value; } }
        public partial class RowFields { public StringField SectionIUser; }


        [DisplayName("Section I Date"), Expression("jSection.[IDate]")]
        public DateTime? SectionIDate { get { return Fields.SectionIDate[this]; } set { Fields.SectionIDate[this] = value; } }
        public partial class RowFields { public DateTimeField SectionIDate; }


        [DisplayName("Section E User"), Expression("jSection.[EUser]")]
        public String SectionEUser { get { return Fields.SectionEUser[this]; } set { Fields.SectionEUser[this] = value; } }
        public partial class RowFields { public StringField SectionEUser; }


        [DisplayName("Section E Date"), Expression("jSection.[EDate]")]
        public DateTime? SectionEDate { get { return Fields.SectionEDate[this]; } set { Fields.SectionEDate[this] = value; } }
        public partial class RowFields { public DateTimeField SectionEDate; }


        [DisplayName("Sub Section Name"), Expression("jSubSection.[Name]")]
        public String SubSectionName { get { return Fields.SubSectionName[this]; } set { Fields.SubSectionName[this] = value; } }
        public partial class RowFields { public StringField SubSectionName; }


        [DisplayName("Sub Section Sort Order"), Expression("jSubSection.[SortOrder]")]
        public Int32? SubSectionSortOrder { get { return Fields.SubSectionSortOrder[this]; } set { Fields.SubSectionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field SubSectionSortOrder; }


        [DisplayName("Sub Section Remarks"), Expression("jSubSection.[Remarks]")]
        public String SubSectionRemarks { get { return Fields.SubSectionRemarks[this]; } set { Fields.SubSectionRemarks[this] = value; } }
        public partial class RowFields { public StringField SubSectionRemarks; }


        [DisplayName("Sub Section I User"), Expression("jSubSection.[IUser]")]
        public String SubSectionIUser { get { return Fields.SubSectionIUser[this]; } set { Fields.SubSectionIUser[this] = value; } }
        public partial class RowFields { public StringField SubSectionIUser; }


        [DisplayName("Sub Section I Date"), Expression("jSubSection.[IDate]")]
        public DateTime? SubSectionIDate { get { return Fields.SubSectionIDate[this]; } set { Fields.SubSectionIDate[this] = value; } }
        public partial class RowFields { public DateTimeField SubSectionIDate; }


        [DisplayName("Sub Section E User"), Expression("jSubSection.[EUser]")]
        public String SubSectionEUser { get { return Fields.SubSectionEUser[this]; } set { Fields.SubSectionEUser[this] = value; } }
        public partial class RowFields { public StringField SubSectionEUser; }


        [DisplayName("Sub Section E Date"), Expression("jSubSection.[EDate]")]
        public DateTime? SubSectionEDate { get { return Fields.SubSectionEDate[this]; } set { Fields.SubSectionEDate[this] = value; } }
        public partial class RowFields { public DateTimeField SubSectionEDate; }


        [DisplayName("Job Location Name"), Expression("jJobLocation.[Name]")]
        public String JobLocationName { get { return Fields.JobLocationName[this]; } set { Fields.JobLocationName[this] = value; } }
        public partial class RowFields { public StringField JobLocationName; }


        [DisplayName("Job Location Sort Order"), Expression("jJobLocation.[SortOrder]")]
        public Int32? JobLocationSortOrder { get { return Fields.JobLocationSortOrder[this]; } set { Fields.JobLocationSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field JobLocationSortOrder; }


        [DisplayName("Job Location Remarks"), Expression("jJobLocation.[Remarks]")]
        public String JobLocationRemarks { get { return Fields.JobLocationRemarks[this]; } set { Fields.JobLocationRemarks[this] = value; } }
        public partial class RowFields { public StringField JobLocationRemarks; }


        [DisplayName("Job Location I User"), Expression("jJobLocation.[IUser]")]
        public String JobLocationIUser { get { return Fields.JobLocationIUser[this]; } set { Fields.JobLocationIUser[this] = value; } }
        public partial class RowFields { public StringField JobLocationIUser; }


        [DisplayName("Job Location E User"), Expression("jJobLocation.[EUser]")]
        public String JobLocationEUser { get { return Fields.JobLocationEUser[this]; } set { Fields.JobLocationEUser[this] = value; } }
        public partial class RowFields { public StringField JobLocationEUser; }


        [DisplayName("Job Location I Date"), Expression("jJobLocation.[IDate]")]
        public DateTime? JobLocationIDate { get { return Fields.JobLocationIDate[this]; } set { Fields.JobLocationIDate[this] = value; } }
        public partial class RowFields { public DateTimeField JobLocationIDate; }


        [DisplayName("Job Location E Date"), Expression("jJobLocation.[EDate]")]
        public DateTime? JobLocationEDate { get { return Fields.JobLocationEDate[this]; } set { Fields.JobLocationEDate[this] = value; } }
        public partial class RowFields { public DateTimeField JobLocationEDate; }


        [DisplayName("Resource Level Name"), Expression("jResourceLevel.[Name]")]
        public String ResourceLevelName { get { return Fields.ResourceLevelName[this]; } set { Fields.ResourceLevelName[this] = value; } }
        public partial class RowFields { public StringField ResourceLevelName; }


        [DisplayName("Resource Level Sort Order"), Expression("jResourceLevel.[SortOrder]")]
        public Int32? ResourceLevelSortOrder { get { return Fields.ResourceLevelSortOrder[this]; } set { Fields.ResourceLevelSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field ResourceLevelSortOrder; }


        [DisplayName("Resource Level Remarks"), Expression("jResourceLevel.[Remarks]")]
        public String ResourceLevelRemarks { get { return Fields.ResourceLevelRemarks[this]; } set { Fields.ResourceLevelRemarks[this] = value; } }
        public partial class RowFields { public StringField ResourceLevelRemarks; }


        [DisplayName("Resource Level I User"), Expression("jResourceLevel.[IUser]")]
        public String ResourceLevelIUser { get { return Fields.ResourceLevelIUser[this]; } set { Fields.ResourceLevelIUser[this] = value; } }
        public partial class RowFields { public StringField ResourceLevelIUser; }


        [DisplayName("Resource Level E User"), Expression("jResourceLevel.[EUser]")]
        public String ResourceLevelEUser { get { return Fields.ResourceLevelEUser[this]; } set { Fields.ResourceLevelEUser[this] = value; } }
        public partial class RowFields { public StringField ResourceLevelEUser; }


        [DisplayName("Resource Level I Date"), Expression("jResourceLevel.[IDate]")]
        public DateTime? ResourceLevelIDate { get { return Fields.ResourceLevelIDate[this]; } set { Fields.ResourceLevelIDate[this] = value; } }
        public partial class RowFields { public DateTimeField ResourceLevelIDate; }


        [DisplayName("Resource Level E Date"), Expression("jResourceLevel.[EDate]")]
        public DateTime? ResourceLevelEDate { get { return Fields.ResourceLevelEDate[this]; } set { Fields.ResourceLevelEDate[this] = value; } }
        public partial class RowFields { public DateTimeField ResourceLevelEDate; }


        [DisplayName("Staff Category Name"), Expression("jStaffCategory.[Name]")]
        public String StaffCategoryName { get { return Fields.StaffCategoryName[this]; } set { Fields.StaffCategoryName[this] = value; } }
        public partial class RowFields { public StringField StaffCategoryName; }


        [DisplayName("Staff Category Sort Order"), Expression("jStaffCategory.[SortOrder]")]
        public Int32? StaffCategorySortOrder { get { return Fields.StaffCategorySortOrder[this]; } set { Fields.StaffCategorySortOrder[this] = value; } }
        public partial class RowFields { public Int32Field StaffCategorySortOrder; }


        [DisplayName("Staff Category Remarks"), Expression("jStaffCategory.[Remarks]")]
        public String StaffCategoryRemarks { get { return Fields.StaffCategoryRemarks[this]; } set { Fields.StaffCategoryRemarks[this] = value; } }
        public partial class RowFields { public StringField StaffCategoryRemarks; }


        [DisplayName("Staff Category I User"), Expression("jStaffCategory.[IUser]")]
        public String StaffCategoryIUser { get { return Fields.StaffCategoryIUser[this]; } set { Fields.StaffCategoryIUser[this] = value; } }
        public partial class RowFields { public StringField StaffCategoryIUser; }


        [DisplayName("Staff Category E User"), Expression("jStaffCategory.[EUser]")]
        public String StaffCategoryEUser { get { return Fields.StaffCategoryEUser[this]; } set { Fields.StaffCategoryEUser[this] = value; } }
        public partial class RowFields { public StringField StaffCategoryEUser; }


        [DisplayName("Staff Category I Date"), Expression("jStaffCategory.[IDate]")]
        public DateTime? StaffCategoryIDate { get { return Fields.StaffCategoryIDate[this]; } set { Fields.StaffCategoryIDate[this] = value; } }
        public partial class RowFields { public DateTimeField StaffCategoryIDate; }


        [DisplayName("Staff Category E Date"), Expression("jStaffCategory.[EDate]")]
        public DateTime? StaffCategoryEDate { get { return Fields.StaffCategoryEDate[this]; } set { Fields.StaffCategoryEDate[this] = value; } }
        public partial class RowFields { public DateTimeField StaffCategoryEDate; }


        [DisplayName("Employment Type Name"), Expression("jEmploymentType.[Name]")]
        public String EmploymentTypeName { get { return Fields.EmploymentTypeName[this]; } set { Fields.EmploymentTypeName[this] = value; } }
        public partial class RowFields { public StringField EmploymentTypeName; }


        [DisplayName("Employment Type Sort Order"), Expression("jEmploymentType.[SortOrder]")]
        public Int32? EmploymentTypeSortOrder { get { return Fields.EmploymentTypeSortOrder[this]; } set { Fields.EmploymentTypeSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentTypeSortOrder; }


        [DisplayName("Employment Type Remarks"), Expression("jEmploymentType.[Remarks]")]
        public String EmploymentTypeRemarks { get { return Fields.EmploymentTypeRemarks[this]; } set { Fields.EmploymentTypeRemarks[this] = value; } }
        public partial class RowFields { public StringField EmploymentTypeRemarks; }


        [DisplayName("Employment Type I User"), Expression("jEmploymentType.[IUser]")]
        public String EmploymentTypeIUser { get { return Fields.EmploymentTypeIUser[this]; } set { Fields.EmploymentTypeIUser[this] = value; } }
        public partial class RowFields { public StringField EmploymentTypeIUser; }


        [DisplayName("Employment Type E User"), Expression("jEmploymentType.[EUser]")]
        public String EmploymentTypeEUser { get { return Fields.EmploymentTypeEUser[this]; } set { Fields.EmploymentTypeEUser[this] = value; } }
        public partial class RowFields { public StringField EmploymentTypeEUser; }


        [DisplayName("Employment Type I Date"), Expression("jEmploymentType.[IDate]")]
        public DateTime? EmploymentTypeIDate { get { return Fields.EmploymentTypeIDate[this]; } set { Fields.EmploymentTypeIDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmploymentTypeIDate; }


        [DisplayName("Employment Type E Date"), Expression("jEmploymentType.[EDate]")]
        public DateTime? EmploymentTypeEDate { get { return Fields.EmploymentTypeEDate[this]; } set { Fields.EmploymentTypeEDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmploymentTypeEDate; }


        [DisplayName("Religion Name"), Expression("jReligion.[Name]")]
        public String ReligionName { get { return Fields.ReligionName[this]; } set { Fields.ReligionName[this] = value; } }
        public partial class RowFields { public StringField ReligionName; }


        [DisplayName("Religion Sort Order"), Expression("jReligion.[SortOrder]")]
        public Int32? ReligionSortOrder { get { return Fields.ReligionSortOrder[this]; } set { Fields.ReligionSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field ReligionSortOrder; }


        [DisplayName("Religion Remarks"), Expression("jReligion.[Remarks]")]
        public String ReligionRemarks { get { return Fields.ReligionRemarks[this]; } set { Fields.ReligionRemarks[this] = value; } }
        public partial class RowFields { public StringField ReligionRemarks; }


        [DisplayName("Religion I User"), Expression("jReligion.[IUser]")]
        public String ReligionIUser { get { return Fields.ReligionIUser[this]; } set { Fields.ReligionIUser[this] = value; } }
        public partial class RowFields { public StringField ReligionIUser; }


        [DisplayName("Religion E User"), Expression("jReligion.[EUser]")]
        public String ReligionEUser { get { return Fields.ReligionEUser[this]; } set { Fields.ReligionEUser[this] = value; } }
        public partial class RowFields { public StringField ReligionEUser; }


        [DisplayName("Religion I Date"), Expression("jReligion.[IDate]")]
        public DateTime? ReligionIDate { get { return Fields.ReligionIDate[this]; } set { Fields.ReligionIDate[this] = value; } }
        public partial class RowFields { public DateTimeField ReligionIDate; }


        [DisplayName("Religion E Date"), Expression("jReligion.[EDate]")]
        public DateTime? ReligionEDate { get { return Fields.ReligionEDate[this]; } set { Fields.ReligionEDate[this] = value; } }
        public partial class RowFields { public DateTimeField ReligionEDate; }


        [DisplayName("Bank Name"), Expression("jBank.[Name]")]
        public String BankName { get { return Fields.BankName[this]; } set { Fields.BankName[this] = value; } }
        public partial class RowFields { public StringField BankName; }


        [DisplayName("Bank Name In Bengali"), Expression("jBank.[NameInBengali]")]
        public String BankNameInBengali { get { return Fields.BankNameInBengali[this]; } set { Fields.BankNameInBengali[this] = value; } }
        public partial class RowFields { public StringField BankNameInBengali; }


        [DisplayName("Bank Remarks"), Expression("jBank.[Remarks]")]
        public String BankRemarks { get { return Fields.BankRemarks[this]; } set { Fields.BankRemarks[this] = value; } }
        public partial class RowFields { public StringField BankRemarks; }


        [DisplayName("Bank Zone Info Id"), Expression("jBank.[ZoneInfoId]")]
        public Int32? BankZoneInfoId { get { return Fields.BankZoneInfoId[this]; } set { Fields.BankZoneInfoId[this] = value; } }
        public partial class RowFields { public Int32Field BankZoneInfoId; }


        [DisplayName("Bank I User"), Expression("jBank.[IUser]")]
        public String BankIUser { get { return Fields.BankIUser[this]; } set { Fields.BankIUser[this] = value; } }
        public partial class RowFields { public StringField BankIUser; }


        [DisplayName("Bank I Date"), Expression("jBank.[IDate]")]
        public DateTime? BankIDate { get { return Fields.BankIDate[this]; } set { Fields.BankIDate[this] = value; } }
        public partial class RowFields { public DateTimeField BankIDate; }


        [DisplayName("Bank E User"), Expression("jBank.[EUser]")]
        public String BankEUser { get { return Fields.BankEUser[this]; } set { Fields.BankEUser[this] = value; } }
        public partial class RowFields { public StringField BankEUser; }


        [DisplayName("Bank E Date"), Expression("jBank.[EDate]")]
        public DateTime? BankEDate { get { return Fields.BankEDate[this]; } set { Fields.BankEDate[this] = value; } }
        public partial class RowFields { public DateTimeField BankEDate; }


        [DisplayName("Bank Branch Bank Id"), Expression("jBankBranch.[BankId]")]
        public Int32? BankBranchBankId { get { return Fields.BankBranchBankId[this]; } set { Fields.BankBranchBankId[this] = value; } }
        public partial class RowFields { public Int32Field BankBranchBankId; }


        [DisplayName("Bank Branch Name"), Expression("jBankBranch.[Name]")]
        public String BankBranchName { get { return Fields.BankBranchName[this]; } set { Fields.BankBranchName[this] = value; } }
        public partial class RowFields { public StringField BankBranchName; }


        [DisplayName("Bank Branch Name In Bengali"), Expression("jBankBranch.[NameInBengali]")]
        public String BankBranchNameInBengali { get { return Fields.BankBranchNameInBengali[this]; } set { Fields.BankBranchNameInBengali[this] = value; } }
        public partial class RowFields { public StringField BankBranchNameInBengali; }


        [DisplayName("Bank Branch Address"), Expression("jBankBranch.[Address]")]
        public String BankBranchAddress { get { return Fields.BankBranchAddress[this]; } set { Fields.BankBranchAddress[this] = value; } }
        public partial class RowFields { public StringField BankBranchAddress; }


        [DisplayName("Bank Branch Address In Bengali"), Expression("jBankBranch.[AddressInBengali]")]
        public String BankBranchAddressInBengali { get { return Fields.BankBranchAddressInBengali[this]; } set { Fields.BankBranchAddressInBengali[this] = value; } }
        public partial class RowFields { public StringField BankBranchAddressInBengali; }


        [DisplayName("Bank Branch Remarks"), Expression("jBankBranch.[Remarks]")]
        public String BankBranchRemarks { get { return Fields.BankBranchRemarks[this]; } set { Fields.BankBranchRemarks[this] = value; } }
        public partial class RowFields { public StringField BankBranchRemarks; }


        [DisplayName("Bank Branch I User"), Expression("jBankBranch.[IUser]")]
        public String BankBranchIUser { get { return Fields.BankBranchIUser[this]; } set { Fields.BankBranchIUser[this] = value; } }
        public partial class RowFields { public StringField BankBranchIUser; }


        [DisplayName("Bank Branch I Date"), Expression("jBankBranch.[IDate]")]
        public DateTime? BankBranchIDate { get { return Fields.BankBranchIDate[this]; } set { Fields.BankBranchIDate[this] = value; } }
        public partial class RowFields { public DateTimeField BankBranchIDate; }


        [DisplayName("Bank Branch E User"), Expression("jBankBranch.[EUser]")]
        public String BankBranchEUser { get { return Fields.BankBranchEUser[this]; } set { Fields.BankBranchEUser[this] = value; } }
        public partial class RowFields { public StringField BankBranchEUser; }


        [DisplayName("Bank Branch E Date"), Expression("jBankBranch.[EDate]")]
        public DateTime? BankBranchEDate { get { return Fields.BankBranchEDate[this]; } set { Fields.BankBranchEDate[this] = value; } }
        public partial class RowFields { public DateTimeField BankBranchEDate; }


        [DisplayName("Employment Status Name"), Expression("jEmploymentStatus.[Name]")]
        public String EmploymentStatusName { get { return Fields.EmploymentStatusName[this]; } set { Fields.EmploymentStatusName[this] = value; } }
        public partial class RowFields { public StringField EmploymentStatusName; }


        [DisplayName("Employment Status Sort Order"), Expression("jEmploymentStatus.[SortOrder]")]
        public Int32? EmploymentStatusSortOrder { get { return Fields.EmploymentStatusSortOrder[this]; } set { Fields.EmploymentStatusSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentStatusSortOrder; }


        [DisplayName("Employment Status I User"), Expression("jEmploymentStatus.[IUser]")]
        public String EmploymentStatusIUser { get { return Fields.EmploymentStatusIUser[this]; } set { Fields.EmploymentStatusIUser[this] = value; } }
        public partial class RowFields { public StringField EmploymentStatusIUser; }


        [DisplayName("Employment Status E User"), Expression("jEmploymentStatus.[EUser]")]
        public String EmploymentStatusEUser { get { return Fields.EmploymentStatusEUser[this]; } set { Fields.EmploymentStatusEUser[this] = value; } }
        public partial class RowFields { public StringField EmploymentStatusEUser; }


        [DisplayName("Employment Status I Date"), Expression("jEmploymentStatus.[IDate]")]
        public DateTime? EmploymentStatusIDate { get { return Fields.EmploymentStatusIDate[this]; } set { Fields.EmploymentStatusIDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmploymentStatusIDate; }


        [DisplayName("Employment Status E Date"), Expression("jEmploymentStatus.[EDate]")]
        public DateTime? EmploymentStatusEDate { get { return Fields.EmploymentStatusEDate[this]; } set { Fields.EmploymentStatusEDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmploymentStatusEDate; }


        [DisplayName("Employment Status Remarks"), Expression("jEmploymentStatus.[Remarks]")]
        public String EmploymentStatusRemarks { get { return Fields.EmploymentStatusRemarks[this]; } set { Fields.EmploymentStatusRemarks[this] = value; } }
        public partial class RowFields { public StringField EmploymentStatusRemarks; }


        [DisplayName("Salary Scale Salary Scale Name"), Expression("jSalaryScale.[SalaryScaleName]")]
        public String SalaryScaleSalaryScaleName { get { return Fields.SalaryScaleSalaryScaleName[this]; } set { Fields.SalaryScaleSalaryScaleName[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleSalaryScaleName; }


        [DisplayName("Salary Scale Date Of Circulation"), Expression("jSalaryScale.[DateOfCirculation]")]
        public DateTime? SalaryScaleDateOfCirculation { get { return Fields.SalaryScaleDateOfCirculation[this]; } set { Fields.SalaryScaleDateOfCirculation[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleDateOfCirculation; }


        [DisplayName("Salary Scale Date Of Effective"), Expression("jSalaryScale.[DateOfEffective]")]
        public DateTime? SalaryScaleDateOfEffective { get { return Fields.SalaryScaleDateOfEffective[this]; } set { Fields.SalaryScaleDateOfEffective[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleDateOfEffective; }


        [DisplayName("Salary Scale I User"), Expression("jSalaryScale.[IUser]")]
        public String SalaryScaleIUser { get { return Fields.SalaryScaleIUser[this]; } set { Fields.SalaryScaleIUser[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleIUser; }


        [DisplayName("Salary Scale I Date"), Expression("jSalaryScale.[IDate]")]
        public DateTime? SalaryScaleIDate { get { return Fields.SalaryScaleIDate[this]; } set { Fields.SalaryScaleIDate[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleIDate; }


        [DisplayName("Salary Scale E User"), Expression("jSalaryScale.[EUser]")]
        public String SalaryScaleEUser { get { return Fields.SalaryScaleEUser[this]; } set { Fields.SalaryScaleEUser[this] = value; } }
        public partial class RowFields { public StringField SalaryScaleEUser; }


        [DisplayName("Salary Scale E Date"), Expression("jSalaryScale.[EDate]")]
        public DateTime? SalaryScaleEDate { get { return Fields.SalaryScaleEDate[this]; } set { Fields.SalaryScaleEDate[this] = value; } }
        public partial class RowFields { public DateTimeField SalaryScaleEDate; }


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


        [DisplayName("Job Grade I User"), Expression("jJobGrade.[IUser]")]
        public String JobGradeIUser { get { return Fields.JobGradeIUser[this]; } set { Fields.JobGradeIUser[this] = value; } }
        public partial class RowFields { public StringField JobGradeIUser; }


        [DisplayName("Job Grade I Date"), Expression("jJobGrade.[IDate]")]
        public DateTime? JobGradeIDate { get { return Fields.JobGradeIDate[this]; } set { Fields.JobGradeIDate[this] = value; } }
        public partial class RowFields { public DateTimeField JobGradeIDate; }


        [DisplayName("Job Grade E User"), Expression("jJobGrade.[EUser]")]
        public String JobGradeEUser { get { return Fields.JobGradeEUser[this]; } set { Fields.JobGradeEUser[this] = value; } }
        public partial class RowFields { public StringField JobGradeEUser; }


        [DisplayName("Job Grade E Date"), Expression("jJobGrade.[EDate]")]
        public DateTime? JobGradeEDate { get { return Fields.JobGradeEDate[this]; } set { Fields.JobGradeEDate[this] = value; } }
        public partial class RowFields { public DateTimeField JobGradeEDate; }


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


        [DisplayName("Organogram Level Zone Info Id"), Expression("jOrganogramLevel.[ZoneInfoId]")]
        public Int32? OrganogramLevelZoneInfoId { get { return Fields.OrganogramLevelZoneInfoId[this]; } set { Fields.OrganogramLevelZoneInfoId[this] = value; } }
        public partial class RowFields { public Int32Field OrganogramLevelZoneInfoId; }


        [DisplayName("Organogram Level I User"), Expression("jOrganogramLevel.[IUser]")]
        public String OrganogramLevelIUser { get { return Fields.OrganogramLevelIUser[this]; } set { Fields.OrganogramLevelIUser[this] = value; } }
        public partial class RowFields { public StringField OrganogramLevelIUser; }


        [DisplayName("Organogram Level I Date"), Expression("jOrganogramLevel.[IDate]")]
        public DateTime? OrganogramLevelIDate { get { return Fields.OrganogramLevelIDate[this]; } set { Fields.OrganogramLevelIDate[this] = value; } }
        public partial class RowFields { public DateTimeField OrganogramLevelIDate; }


        [DisplayName("Organogram Level E User"), Expression("jOrganogramLevel.[EUser]")]
        public String OrganogramLevelEUser { get { return Fields.OrganogramLevelEUser[this]; } set { Fields.OrganogramLevelEUser[this] = value; } }
        public partial class RowFields { public StringField OrganogramLevelEUser; }


        [DisplayName("Organogram Level E Date"), Expression("jOrganogramLevel.[EDate]")]
        public DateTime? OrganogramLevelEDate { get { return Fields.OrganogramLevelEDate[this]; } set { Fields.OrganogramLevelEDate[this] = value; } }
        public partial class RowFields { public DateTimeField OrganogramLevelEDate; }


        [DisplayName("Organogram Level Is Editable"), Expression("jOrganogramLevel.[IsEditable]")]
        public Boolean? OrganogramLevelIsEditable { get { return Fields.OrganogramLevelIsEditable[this]; } set { Fields.OrganogramLevelIsEditable[this] = value; } }
        public partial class RowFields { public BooleanField OrganogramLevelIsEditable; }


        [DisplayName("Quota Name"), Expression("jQuota.[Name]")]
        public String QuotaName { get { return Fields.QuotaName[this]; } set { Fields.QuotaName[this] = value; } }
        public partial class RowFields { public StringField QuotaName; }


        [DisplayName("Quota Sort Order"), Expression("jQuota.[SortOrder]")]
        public Int32? QuotaSortOrder { get { return Fields.QuotaSortOrder[this]; } set { Fields.QuotaSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field QuotaSortOrder; }


        [DisplayName("Quota Remarks"), Expression("jQuota.[Remarks]")]
        public String QuotaRemarks { get { return Fields.QuotaRemarks[this]; } set { Fields.QuotaRemarks[this] = value; } }
        public partial class RowFields { public StringField QuotaRemarks; }


        [DisplayName("Quota I User"), Expression("jQuota.[IUser]")]
        public String QuotaIUser { get { return Fields.QuotaIUser[this]; } set { Fields.QuotaIUser[this] = value; } }
        public partial class RowFields { public StringField QuotaIUser; }


        [DisplayName("Quota I Date"), Expression("jQuota.[IDate]")]
        public DateTime? QuotaIDate { get { return Fields.QuotaIDate[this]; } set { Fields.QuotaIDate[this] = value; } }
        public partial class RowFields { public DateTimeField QuotaIDate; }


        [DisplayName("Quota E User"), Expression("jQuota.[EUser]")]
        public String QuotaEUser { get { return Fields.QuotaEUser[this]; } set { Fields.QuotaEUser[this] = value; } }
        public partial class RowFields { public StringField QuotaEUser; }


        [DisplayName("Quota E Date"), Expression("jQuota.[EDate]")]
        public DateTime? QuotaEDate { get { return Fields.QuotaEDate[this]; } set { Fields.QuotaEDate[this] = value; } }
        public partial class RowFields { public DateTimeField QuotaEDate; }


        [DisplayName("Employee Class Name"), Expression("jEmployeeClass.[Name]")]
        public String EmployeeClassName { get { return Fields.EmployeeClassName[this]; } set { Fields.EmployeeClassName[this] = value; } }
        public partial class RowFields { public StringField EmployeeClassName; }


        [DisplayName("Employee Class Sort Order"), Expression("jEmployeeClass.[SortOrder]")]
        public Int32? EmployeeClassSortOrder { get { return Fields.EmployeeClassSortOrder[this]; } set { Fields.EmployeeClassSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmployeeClassSortOrder; }


        [DisplayName("Employee Class Remarks"), Expression("jEmployeeClass.[Remarks]")]
        public String EmployeeClassRemarks { get { return Fields.EmployeeClassRemarks[this]; } set { Fields.EmployeeClassRemarks[this] = value; } }
        public partial class RowFields { public StringField EmployeeClassRemarks; }


        [DisplayName("Employee Class I User"), Expression("jEmployeeClass.[IUser]")]
        public String EmployeeClassIUser { get { return Fields.EmployeeClassIUser[this]; } set { Fields.EmployeeClassIUser[this] = value; } }
        public partial class RowFields { public StringField EmployeeClassIUser; }


        [DisplayName("Employee Class I Date"), Expression("jEmployeeClass.[IDate]")]
        public DateTime? EmployeeClassIDate { get { return Fields.EmployeeClassIDate[this]; } set { Fields.EmployeeClassIDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmployeeClassIDate; }


        [DisplayName("Employee Class E User"), Expression("jEmployeeClass.[EUser]")]
        public String EmployeeClassEUser { get { return Fields.EmployeeClassEUser[this]; } set { Fields.EmployeeClassEUser[this] = value; } }
        public partial class RowFields { public StringField EmployeeClassEUser; }


        [DisplayName("Employee Class E Date"), Expression("jEmployeeClass.[EDate]")]
        public DateTime? EmployeeClassEDate { get { return Fields.EmployeeClassEDate[this]; } set { Fields.EmployeeClassEDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmployeeClassEDate; }


        [DisplayName("Employment Process Name"), Expression("jEmploymentProcess.[Name]")]
        public String EmploymentProcessName { get { return Fields.EmploymentProcessName[this]; } set { Fields.EmploymentProcessName[this] = value; } }
        public partial class RowFields { public StringField EmploymentProcessName; }


        [DisplayName("Employment Process Sort Order"), Expression("jEmploymentProcess.[SortOrder]")]
        public Int32? EmploymentProcessSortOrder { get { return Fields.EmploymentProcessSortOrder[this]; } set { Fields.EmploymentProcessSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field EmploymentProcessSortOrder; }


        [DisplayName("Employment Process Remarks"), Expression("jEmploymentProcess.[Remarks]")]
        public String EmploymentProcessRemarks { get { return Fields.EmploymentProcessRemarks[this]; } set { Fields.EmploymentProcessRemarks[this] = value; } }
        public partial class RowFields { public StringField EmploymentProcessRemarks; }


        [DisplayName("Employment Process I User"), Expression("jEmploymentProcess.[IUser]")]
        public String EmploymentProcessIUser { get { return Fields.EmploymentProcessIUser[this]; } set { Fields.EmploymentProcessIUser[this] = value; } }
        public partial class RowFields { public StringField EmploymentProcessIUser; }


        [DisplayName("Employment Process I Date"), Expression("jEmploymentProcess.[IDate]")]
        public DateTime? EmploymentProcessIDate { get { return Fields.EmploymentProcessIDate[this]; } set { Fields.EmploymentProcessIDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmploymentProcessIDate; }


        [DisplayName("Employment Process E User"), Expression("jEmploymentProcess.[EUser]")]
        public String EmploymentProcessEUser { get { return Fields.EmploymentProcessEUser[this]; } set { Fields.EmploymentProcessEUser[this] = value; } }
        public partial class RowFields { public StringField EmploymentProcessEUser; }


        [DisplayName("Employment Process E Date"), Expression("jEmploymentProcess.[EDate]")]
        public DateTime? EmploymentProcessEDate { get { return Fields.EmploymentProcessEDate[this]; } set { Fields.EmploymentProcessEDate[this] = value; } }
        public partial class RowFields { public DateTimeField EmploymentProcessEDate; }


        [DisplayName("Zone Info Zone Name"), Expression("jZoneInfo.[ZoneName]")]
        public String ZoneInfoZoneName { get { return Fields.ZoneInfoZoneName[this]; } set { Fields.ZoneInfoZoneName[this] = value; } }
        public partial class RowFields { public StringField ZoneInfoZoneName; }


        [DisplayName("Zone Info Zone Name In Bengali"), Expression("jZoneInfo.[ZoneNameInBengali]")]
        public String ZoneInfoZoneNameInBengali { get { return Fields.ZoneInfoZoneNameInBengali[this]; } set { Fields.ZoneInfoZoneNameInBengali[this] = value; } }
        public partial class RowFields { public StringField ZoneInfoZoneNameInBengali; }


        [DisplayName("Zone Info Zone Code"), Expression("jZoneInfo.[ZoneCode]")]
        public String ZoneInfoZoneCode { get { return Fields.ZoneInfoZoneCode[this]; } set { Fields.ZoneInfoZoneCode[this] = value; } }
        public partial class RowFields { public StringField ZoneInfoZoneCode; }


        [DisplayName("Zone Info Sort Order"), Expression("jZoneInfo.[SortOrder]")]
        public Int32? ZoneInfoSortOrder { get { return Fields.ZoneInfoSortOrder[this]; } set { Fields.ZoneInfoSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field ZoneInfoSortOrder; }


        [DisplayName("Zone Info Organogram Category Type Id"), Expression("jZoneInfo.[OrganogramCategoryTypeId]")]
        public Int32? ZoneInfoOrganogramCategoryTypeId { get { return Fields.ZoneInfoOrganogramCategoryTypeId[this]; } set { Fields.ZoneInfoOrganogramCategoryTypeId[this] = value; } }
        public partial class RowFields { public Int32Field ZoneInfoOrganogramCategoryTypeId; }


        [DisplayName("Zone Info Zone Address"), Expression("jZoneInfo.[ZoneAddress]")]
        public String ZoneInfoZoneAddress { get { return Fields.ZoneInfoZoneAddress[this]; } set { Fields.ZoneInfoZoneAddress[this] = value; } }
        public partial class RowFields { public StringField ZoneInfoZoneAddress; }


        [DisplayName("Zone Info Zone Address In Bengali"), Expression("jZoneInfo.[ZoneAddressInBengali]")]
        public String ZoneInfoZoneAddressInBengali { get { return Fields.ZoneInfoZoneAddressInBengali[this]; } set { Fields.ZoneInfoZoneAddressInBengali[this] = value; } }
        public partial class RowFields { public StringField ZoneInfoZoneAddressInBengali; }


        [DisplayName("Zone Info Prefix"), Expression("jZoneInfo.[Prefix]")]
        public String ZoneInfoPrefix { get { return Fields.ZoneInfoPrefix[this]; } set { Fields.ZoneInfoPrefix[this] = value; } }
        public partial class RowFields { public StringField ZoneInfoPrefix; }


        [DisplayName("Zone Info Is Head Office"), Expression("jZoneInfo.[IsHeadOffice]")]
        public Boolean? ZoneInfoIsHeadOffice { get { return Fields.ZoneInfoIsHeadOffice[this]; } set { Fields.ZoneInfoIsHeadOffice[this] = value; } }
        public partial class RowFields { public BooleanField ZoneInfoIsHeadOffice; }


        [DisplayName("Tax Region Region Name"), Expression("jTaxRegion.[RegionName]")]
        public String TaxRegionRegionName { get { return Fields.TaxRegionRegionName[this]; } set { Fields.TaxRegionRegionName[this] = value; } }
        public partial class RowFields { public StringField TaxRegionRegionName; }


        [DisplayName("Tax Region Is Active"), Expression("jTaxRegion.[IsActive]")]
        public Boolean? TaxRegionIsActive { get { return Fields.TaxRegionIsActive[this]; } set { Fields.TaxRegionIsActive[this] = value; } }
        public partial class RowFields { public BooleanField TaxRegionIsActive; }


        [DisplayName("Tax Region I User"), Expression("jTaxRegion.[IUser]")]
        public String TaxRegionIUser { get { return Fields.TaxRegionIUser[this]; } set { Fields.TaxRegionIUser[this] = value; } }
        public partial class RowFields { public StringField TaxRegionIUser; }


        [DisplayName("Tax Region E User"), Expression("jTaxRegion.[EUser]")]
        public String TaxRegionEUser { get { return Fields.TaxRegionEUser[this]; } set { Fields.TaxRegionEUser[this] = value; } }
        public partial class RowFields { public StringField TaxRegionEUser; }


        [DisplayName("Tax Region I Date"), Expression("jTaxRegion.[IDate]")]
        public DateTime? TaxRegionIDate { get { return Fields.TaxRegionIDate[this]; } set { Fields.TaxRegionIDate[this] = value; } }
        public partial class RowFields { public DateTimeField TaxRegionIDate; }


        [DisplayName("Tax Region E Date"), Expression("jTaxRegion.[EDate]")]
        public DateTime? TaxRegionEDate { get { return Fields.TaxRegionEDate[this]; } set { Fields.TaxRegionEDate[this] = value; } }
        public partial class RowFields { public DateTimeField TaxRegionEDate; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.FullName; }
        }
        #endregion Id and Name fields

        #region Constructor
        public PrmEmploymentInfoRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public partial class RowFields : RowFieldsBase
        {
            public RowFields()
            : base("[dbo].[PRM_EmploymentInfo]")
            {
                LocalTextPrefix = "Configurations.PrmEmploymentInfo";
            }
        }
        #endregion RowFields
    }
}
