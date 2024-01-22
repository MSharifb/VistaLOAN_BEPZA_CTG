
namespace VistaLOAN.HRM.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), TableName(TableName)]
    [DisplayName("Emp Photo"), InstanceName("Emp Photo"), TwoLevelCached]
    [ModifyPermission("*")]
    [ReadPermission("*")]
    [LookupScript("HRM.EmpPhoto", Permission = "?")]
    public sealed class EmpPhotoRow : Row, IIdRow
    {        
            #region Id
            [DisplayName("Id"), Identity]
            public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
            public partial class RowFields { public Int32Field Id; }
            #endregion Id
                
            #region Employee
            [DisplayName("Employee"), NotNull, ForeignKey("[dbo].[PRM_EmploymentInfo]", "Id"), LeftJoin("jEmployee"), TextualField("EmployeeEmpId"), LookupInclude]
            public Int32? EmployeeId { get { return Fields.EmployeeId[this]; } set { Fields.EmployeeId[this] = value; } }
            public partial class RowFields { public Int32Field EmployeeId; }
            #endregion EmployeeId
                
            #region Photo Signature
            [DisplayName("Photo Signature"), Size(-1), NotNull,LookupInclude]
            public byte[] PhotoSignature { get { return Fields.PhotoSignature[this]; } set { Fields.PhotoSignature[this] = value; } }
            public partial class RowFields { public ByteArrayField PhotoSignature; }
            #endregion PhotoSignature
                
            #region Is Photo
            [DisplayName("Is Photo"), NotNull, LookupInclude]
            public Boolean? IsPhoto { get { return Fields.IsPhoto[this]; } set { Fields.IsPhoto[this] = value; } }
            public partial class RowFields { public BooleanField IsPhoto; }
            #endregion IsPhoto
        

    #region Foreign Fields
            
                [DisplayName("Employee Emp Id"), Expression("jEmployee.[EmpID]")]
                public String EmployeeEmpId { get { return Fields.EmployeeEmpId[this]; } set { Fields.EmployeeEmpId[this] = value; } }
                public partial class RowFields { public StringField EmployeeEmpId; }

                        
                [DisplayName("Employee Employee Initial"), Expression("jEmployee.[EmployeeInitial]")]
                public String EmployeeEmployeeInitial { get { return Fields.EmployeeEmployeeInitial[this]; } set { Fields.EmployeeEmployeeInitial[this] = value; } }
                public partial class RowFields { public StringField EmployeeEmployeeInitial; }

                        
                [DisplayName("Employee Title Id"), Expression("jEmployee.[TitleId]")]
                public Int32? EmployeeTitleId { get { return Fields.EmployeeTitleId[this]; } set { Fields.EmployeeTitleId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeTitleId; }

                        
                [DisplayName("Employee First Name"), Expression("jEmployee.[FirstName]")]
                public String EmployeeFirstName { get { return Fields.EmployeeFirstName[this]; } set { Fields.EmployeeFirstName[this] = value; } }
                public partial class RowFields { public StringField EmployeeFirstName; }

                        
                [DisplayName("Employee Middle Name"), Expression("jEmployee.[MiddleName]")]
                public String EmployeeMiddleName { get { return Fields.EmployeeMiddleName[this]; } set { Fields.EmployeeMiddleName[this] = value; } }
                public partial class RowFields { public StringField EmployeeMiddleName; }

                        
                [DisplayName("Employee Last Name"), Expression("jEmployee.[LastName]")]
                public String EmployeeLastName { get { return Fields.EmployeeLastName[this]; } set { Fields.EmployeeLastName[this] = value; } }
                public partial class RowFields { public StringField EmployeeLastName; }

                        
                [DisplayName("Employee Full Name"), Expression("jEmployee.[FullName]")]
                public String EmployeeFullName { get { return Fields.EmployeeFullName[this]; } set { Fields.EmployeeFullName[this] = value; } }
                public partial class RowFields { public StringField EmployeeFullName; }

                        
                [DisplayName("Employee Full Name Bangla"), Expression("jEmployee.[FullNameBangla]")]
                public String EmployeeFullNameBangla { get { return Fields.EmployeeFullNameBangla[this]; } set { Fields.EmployeeFullNameBangla[this] = value; } }
                public partial class RowFields { public StringField EmployeeFullNameBangla; }

                        
                [DisplayName("Employee Dateof Joining"), Expression("jEmployee.[DateofJoining]")]
                public DateTime? EmployeeDateofJoining { get { return Fields.EmployeeDateofJoining[this]; } set { Fields.EmployeeDateofJoining[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofJoining; }

                        
                [DisplayName("Employee Provision Month"), Expression("jEmployee.[ProvisionMonth]")]
                public Int32? EmployeeProvisionMonth { get { return Fields.EmployeeProvisionMonth[this]; } set { Fields.EmployeeProvisionMonth[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeProvisionMonth; }

                        
                [DisplayName("Employee Dateof Confirmation"), Expression("jEmployee.[DateofConfirmation]")]
                public DateTime? EmployeeDateofConfirmation { get { return Fields.EmployeeDateofConfirmation[this]; } set { Fields.EmployeeDateofConfirmation[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofConfirmation; }

                        
                [DisplayName("Employee Dateof Position"), Expression("jEmployee.[DateofPosition]")]
                public DateTime? EmployeeDateofPosition { get { return Fields.EmployeeDateofPosition[this]; } set { Fields.EmployeeDateofPosition[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofPosition; }

                        
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

                        
                [DisplayName("Employee Job Location Id"), Expression("jEmployee.[JobLocationId]")]
                public Int32? EmployeeJobLocationId { get { return Fields.EmployeeJobLocationId[this]; } set { Fields.EmployeeJobLocationId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeJobLocationId; }

                        
                [DisplayName("Employee Resource Level Id"), Expression("jEmployee.[ResourceLevelId]")]
                public Int32? EmployeeResourceLevelId { get { return Fields.EmployeeResourceLevelId[this]; } set { Fields.EmployeeResourceLevelId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeResourceLevelId; }

                        
                [DisplayName("Employee Staff Category Id"), Expression("jEmployee.[StaffCategoryId]")]
                public Int32? EmployeeStaffCategoryId { get { return Fields.EmployeeStaffCategoryId[this]; } set { Fields.EmployeeStaffCategoryId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeStaffCategoryId; }

                        
                [DisplayName("Employee Employment Type Id"), Expression("jEmployee.[EmploymentTypeId]")]
                public Int32? EmployeeEmploymentTypeId { get { return Fields.EmployeeEmploymentTypeId[this]; } set { Fields.EmployeeEmploymentTypeId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeEmploymentTypeId; }

                        
                [DisplayName("Employee Religion Id"), Expression("jEmployee.[ReligionId]")]
                public Int32? EmployeeReligionId { get { return Fields.EmployeeReligionId[this]; } set { Fields.EmployeeReligionId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeReligionId; }

                        
                [DisplayName("Employee Is Contractual"), Expression("jEmployee.[IsContractual]")]
                public Boolean? EmployeeIsContractual { get { return Fields.EmployeeIsContractual[this]; } set { Fields.EmployeeIsContractual[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsContractual; }

                        
                [DisplayName("Employee Overtime Rate"), Expression("jEmployee.[OvertimeRate]")]
                public Decimal? EmployeeOvertimeRate { get { return Fields.EmployeeOvertimeRate[this]; } set { Fields.EmployeeOvertimeRate[this] = value; } }
                public partial class RowFields { public DecimalField EmployeeOvertimeRate; }

                        
                [DisplayName("Employee Mobile No"), Expression("jEmployee.[MobileNo]")]
                public String EmployeeMobileNo { get { return Fields.EmployeeMobileNo[this]; } set { Fields.EmployeeMobileNo[this] = value; } }
                public partial class RowFields { public StringField EmployeeMobileNo; }

                        
                [DisplayName("Employee Emial Address"), Expression("jEmployee.[EmialAddress]")]
                public String EmployeeEmialAddress { get { return Fields.EmployeeEmialAddress[this]; } set { Fields.EmployeeEmialAddress[this] = value; } }
                public partial class RowFields { public StringField EmployeeEmialAddress; }

                        
                [DisplayName("Employee Bank Id"), Expression("jEmployee.[BankId]")]
                public Int32? EmployeeBankId { get { return Fields.EmployeeBankId[this]; } set { Fields.EmployeeBankId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeBankId; }

                        
                [DisplayName("Employee Bank Branch Id"), Expression("jEmployee.[BankBranchId]")]
                public Int32? EmployeeBankBranchId { get { return Fields.EmployeeBankBranchId[this]; } set { Fields.EmployeeBankBranchId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeBankBranchId; }

                        
                [DisplayName("Employee Bank Account No"), Expression("jEmployee.[BankAccountNo]")]
                public String EmployeeBankAccountNo { get { return Fields.EmployeeBankAccountNo[this]; } set { Fields.EmployeeBankAccountNo[this] = value; } }
                public partial class RowFields { public StringField EmployeeBankAccountNo; }

                        
                [DisplayName("Employee Employment Status Id"), Expression("jEmployee.[EmploymentStatusId]")]
                public Int32? EmployeeEmploymentStatusId { get { return Fields.EmployeeEmploymentStatusId[this]; } set { Fields.EmployeeEmploymentStatusId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeEmploymentStatusId; }

                        
                [DisplayName("Employee Dateof Inactive"), Expression("jEmployee.[DateofInactive]")]
                public DateTime? EmployeeDateofInactive { get { return Fields.EmployeeDateofInactive[this]; } set { Fields.EmployeeDateofInactive[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofInactive; }

                        
                [DisplayName("Employee Is Consultant"), Expression("jEmployee.[IsConsultant]")]
                public Boolean? EmployeeIsConsultant { get { return Fields.EmployeeIsConsultant[this]; } set { Fields.EmployeeIsConsultant[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsConsultant; }

                        
                [DisplayName("Employee Is Overtime Eligible"), Expression("jEmployee.[IsOvertimeEligible]")]
                public Boolean? EmployeeIsOvertimeEligible { get { return Fields.EmployeeIsOvertimeEligible[this]; } set { Fields.EmployeeIsOvertimeEligible[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsOvertimeEligible; }

                        
                [DisplayName("Employee Is Refreshment Eligible"), Expression("jEmployee.[IsRefreshmentEligible]")]
                public Boolean? EmployeeIsRefreshmentEligible { get { return Fields.EmployeeIsRefreshmentEligible[this]; } set { Fields.EmployeeIsRefreshmentEligible[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsRefreshmentEligible; }

                        
                [DisplayName("Employee Is Bonus Eligible"), Expression("jEmployee.[IsBonusEligible]")]
                public Boolean? EmployeeIsBonusEligible { get { return Fields.EmployeeIsBonusEligible[this]; } set { Fields.EmployeeIsBonusEligible[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsBonusEligible; }

                        
                [DisplayName("Employee Is Eligible For Cpf"), Expression("jEmployee.[IsEligibleForCpf]")]
                public Boolean? EmployeeIsEligibleForCpf { get { return Fields.EmployeeIsEligibleForCpf[this]; } set { Fields.EmployeeIsEligibleForCpf[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsEligibleForCpf; }

                        
                [DisplayName("Employee Is Gpf Eligible"), Expression("jEmployee.[IsGPFEligible]")]
                public Boolean? EmployeeIsGpfEligible { get { return Fields.EmployeeIsGpfEligible[this]; } set { Fields.EmployeeIsGpfEligible[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsGpfEligible; }

                        
                [DisplayName("Employee Is Pension Eligible"), Expression("jEmployee.[IsPensionEligible]")]
                public Boolean? EmployeeIsPensionEligible { get { return Fields.EmployeeIsPensionEligible[this]; } set { Fields.EmployeeIsPensionEligible[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsPensionEligible; }

                        
                [DisplayName("Employee Is Leverage Eligible"), Expression("jEmployee.[IsLeverageEligible]")]
                public Boolean? EmployeeIsLeverageEligible { get { return Fields.EmployeeIsLeverageEligible[this]; } set { Fields.EmployeeIsLeverageEligible[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsLeverageEligible; }

                        
                [DisplayName("Employee Is General Shifted"), Expression("jEmployee.[IsGeneralShifted]")]
                public Boolean? EmployeeIsGeneralShifted { get { return Fields.EmployeeIsGeneralShifted[this]; } set { Fields.EmployeeIsGeneralShifted[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeIsGeneralShifted; }

                        
                [DisplayName("Employee Salary Scale Id"), Expression("jEmployee.[SalaryScaleId]")]
                public Int32? EmployeeSalaryScaleId { get { return Fields.EmployeeSalaryScaleId[this]; } set { Fields.EmployeeSalaryScaleId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeSalaryScaleId; }

                        
                [DisplayName("Employee Job Grade Id"), Expression("jEmployee.[JobGradeId]")]
                public Int32? EmployeeJobGradeId { get { return Fields.EmployeeJobGradeId[this]; } set { Fields.EmployeeJobGradeId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeJobGradeId; }

                        
                [DisplayName("Employee Gender"), Expression("jEmployee.[Gender]")]
                public String EmployeeGender { get { return Fields.EmployeeGender[this]; } set { Fields.EmployeeGender[this] = value; } }
                public partial class RowFields { public StringField EmployeeGender; }

                        
                [DisplayName("Employee Contract Expire Date"), Expression("jEmployee.[ContractExpireDate]")]
                public DateTime? EmployeeContractExpireDate { get { return Fields.EmployeeContractExpireDate[this]; } set { Fields.EmployeeContractExpireDate[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeContractExpireDate; }

                        
                [DisplayName("Employee Dateof Birth"), Expression("jEmployee.[DateofBirth]")]
                public DateTime? EmployeeDateofBirth { get { return Fields.EmployeeDateofBirth[this]; } set { Fields.EmployeeDateofBirth[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofBirth; }

                        
                [DisplayName("Employee Contract Duration"), Expression("jEmployee.[ContractDuration]")]
                public Decimal? EmployeeContractDuration { get { return Fields.EmployeeContractDuration[this]; } set { Fields.EmployeeContractDuration[this] = value; } }
                public partial class RowFields { public DecimalField EmployeeContractDuration; }

                        
                [DisplayName("Employee Contract Type"), Expression("jEmployee.[ContractType]")]
                public Int32? EmployeeContractType { get { return Fields.EmployeeContractType[this]; } set { Fields.EmployeeContractType[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeContractType; }

                        
                [DisplayName("Employee Organogram Level Id"), Expression("jEmployee.[OrganogramLevelId]")]
                public Int32? EmployeeOrganogramLevelId { get { return Fields.EmployeeOrganogramLevelId[this]; } set { Fields.EmployeeOrganogramLevelId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeOrganogramLevelId; }

                        
                [DisplayName("Employee Dateof Appointment"), Expression("jEmployee.[DateofAppointment]")]
                public DateTime? EmployeeDateofAppointment { get { return Fields.EmployeeDateofAppointment[this]; } set { Fields.EmployeeDateofAppointment[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofAppointment; }

                        
                [DisplayName("Employee Order No"), Expression("jEmployee.[OrderNo]")]
                public String EmployeeOrderNo { get { return Fields.EmployeeOrderNo[this]; } set { Fields.EmployeeOrderNo[this] = value; } }
                public partial class RowFields { public StringField EmployeeOrderNo; }

                        
                [DisplayName("Employee Quota Id"), Expression("jEmployee.[QuotaId]")]
                public Int32? EmployeeQuotaId { get { return Fields.EmployeeQuotaId[this]; } set { Fields.EmployeeQuotaId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeQuotaId; }

                        
                [DisplayName("Employee Employee Class Id"), Expression("jEmployee.[EmployeeClassId]")]
                public Int32? EmployeeEmployeeClassId { get { return Fields.EmployeeEmployeeClassId[this]; } set { Fields.EmployeeEmployeeClassId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeEmployeeClassId; }

                        
                [DisplayName("Employee Employment Process Id"), Expression("jEmployee.[EmploymentProcessId]")]
                public Int32? EmployeeEmploymentProcessId { get { return Fields.EmployeeEmploymentProcessId[this]; } set { Fields.EmployeeEmploymentProcessId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeEmploymentProcessId; }

                        
                [DisplayName("Employee Seniority Position"), Expression("jEmployee.[SeniorityPosition]")]
                public String EmployeeSeniorityPosition { get { return Fields.EmployeeSeniorityPosition[this]; } set { Fields.EmployeeSeniorityPosition[this] = value; } }
                public partial class RowFields { public StringField EmployeeSeniorityPosition; }

                        
                [DisplayName("Employee Dateof Seniority"), Expression("jEmployee.[DateofSeniority]")]
                public DateTime? EmployeeDateofSeniority { get { return Fields.EmployeeDateofSeniority[this]; } set { Fields.EmployeeDateofSeniority[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofSeniority; }

                        
                [DisplayName("Employee Prl Date"), Expression("jEmployee.[PRLDate]")]
                public DateTime? EmployeePrlDate { get { return Fields.EmployeePrlDate[this]; } set { Fields.EmployeePrlDate[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeePrlDate; }

                        
                [DisplayName("Employee Card No"), Expression("jEmployee.[CardNo]")]
                public String EmployeeCardNo { get { return Fields.EmployeeCardNo[this]; } set { Fields.EmployeeCardNo[this] = value; } }
                public partial class RowFields { public StringField EmployeeCardNo; }

                        
                [DisplayName("Employee Finger Print Identiy No"), Expression("jEmployee.[FingerPrintIdentiyNo]")]
                public String EmployeeFingerPrintIdentiyNo { get { return Fields.EmployeeFingerPrintIdentiyNo[this]; } set { Fields.EmployeeFingerPrintIdentiyNo[this] = value; } }
                public partial class RowFields { public StringField EmployeeFingerPrintIdentiyNo; }

                        
                [DisplayName("Employee Attendance Effective Date"), Expression("jEmployee.[AttendanceEffectiveDate]")]
                public DateTime? EmployeeAttendanceEffectiveDate { get { return Fields.EmployeeAttendanceEffectiveDate[this]; } set { Fields.EmployeeAttendanceEffectiveDate[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeAttendanceEffectiveDate; }

                        
                [DisplayName("Employee Attendance Status"), Expression("jEmployee.[AttendanceStatus]")]
                public Boolean? EmployeeAttendanceStatus { get { return Fields.EmployeeAttendanceStatus[this]; } set { Fields.EmployeeAttendanceStatus[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeAttendanceStatus; }

                        
                [DisplayName("Employee Zone Info Id"), Expression("jEmployee.[ZoneInfoId]")]
                public Int32? EmployeeZoneInfoId { get { return Fields.EmployeeZoneInfoId[this]; } set { Fields.EmployeeZoneInfoId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeZoneInfoId; }

                        
                [DisplayName("Employee Telephone Office"), Expression("jEmployee.[TelephoneOffice]")]
                public String EmployeeTelephoneOffice { get { return Fields.EmployeeTelephoneOffice[this]; } set { Fields.EmployeeTelephoneOffice[this] = value; } }
                public partial class RowFields { public StringField EmployeeTelephoneOffice; }

                        
                [DisplayName("Employee Intercom"), Expression("jEmployee.[Intercom]")]
                public String EmployeeIntercom { get { return Fields.EmployeeIntercom[this]; } set { Fields.EmployeeIntercom[this] = value; } }
                public partial class RowFields { public StringField EmployeeIntercom; }

                        
                [DisplayName("Employee Honorary Degree"), Expression("jEmployee.[HonoraryDegree]")]
                public String EmployeeHonoraryDegree { get { return Fields.EmployeeHonoraryDegree[this]; } set { Fields.EmployeeHonoraryDegree[this] = value; } }
                public partial class RowFields { public StringField EmployeeHonoraryDegree; }

                        
                [DisplayName("Employee Tax Region Id"), Expression("jEmployee.[TaxRegionId]")]
                public Int32? EmployeeTaxRegionId { get { return Fields.EmployeeTaxRegionId[this]; } set { Fields.EmployeeTaxRegionId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeTaxRegionId; }

                        
                [DisplayName("Employee Tax Assessee Type"), Expression("jEmployee.[TaxAssesseeType]")]
                public Int16? EmployeeTaxAssesseeType { get { return Fields.EmployeeTaxAssesseeType[this]; } set { Fields.EmployeeTaxAssesseeType[this] = value; } }
                public partial class RowFields { public Int16Field EmployeeTaxAssesseeType; }

                        
                [DisplayName("Employee Having Child With Disability"), Expression("jEmployee.[HavingChildWithDisability]")]
                public Boolean? EmployeeHavingChildWithDisability { get { return Fields.EmployeeHavingChildWithDisability[this]; } set { Fields.EmployeeHavingChildWithDisability[this] = value; } }
                public partial class RowFields { public BooleanField EmployeeHavingChildWithDisability; }

                        
                [DisplayName("Employee Dateof Retirement"), Expression("jEmployee.[DateofRetirement]")]
                public DateTime? EmployeeDateofRetirement { get { return Fields.EmployeeDateofRetirement[this]; } set { Fields.EmployeeDateofRetirement[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeDateofRetirement; }

                        
                [DisplayName("Employee Salary Withdraw From Zone Id"), Expression("jEmployee.[SalaryWithdrawFromZoneId]")]
                public Int32? EmployeeSalaryWithdrawFromZoneId { get { return Fields.EmployeeSalaryWithdrawFromZoneId[this]; } set { Fields.EmployeeSalaryWithdrawFromZoneId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeSalaryWithdrawFromZoneId; }

                        
                [DisplayName("Employee Region Id"), Expression("jEmployee.[RegionId]")]
                public Int32? EmployeeRegionId { get { return Fields.EmployeeRegionId[this]; } set { Fields.EmployeeRegionId[this] = value; } }
                public partial class RowFields { public Int32Field EmployeeRegionId; }

                        
                [DisplayName("Employee Etin"), Expression("jEmployee.[ETIN]")]
                public String EmployeeEtin { get { return Fields.EmployeeEtin[this]; } set { Fields.EmployeeEtin[this] = value; } }
                public partial class RowFields { public StringField EmployeeEtin; }

                        
                [DisplayName("Employee I User"), Expression("jEmployee.[IUser]")]
                public String EmployeeIUser { get { return Fields.EmployeeIUser[this]; } set { Fields.EmployeeIUser[this] = value; } }
                public partial class RowFields { public StringField EmployeeIUser; }

                        
                [DisplayName("Employee I Date"), Expression("jEmployee.[IDate]")]
                public DateTime? EmployeeIDate { get { return Fields.EmployeeIDate[this]; } set { Fields.EmployeeIDate[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeIDate; }

                        
                [DisplayName("Employee E User"), Expression("jEmployee.[EUser]")]
                public String EmployeeEUser { get { return Fields.EmployeeEUser[this]; } set { Fields.EmployeeEUser[this] = value; } }
                public partial class RowFields { public StringField EmployeeEUser; }

                        
                [DisplayName("Employee E Date"), Expression("jEmployee.[EDate]")]
                public DateTime? EmployeeEDate { get { return Fields.EmployeeEDate[this]; } set { Fields.EmployeeEDate[this] = value; } }
                public partial class RowFields { public DateTimeField EmployeeEDate; }

            
    #endregion Foreign Fields

    #region Id and Name fields
    IIdField IIdRow.IdField
    {
    get { return Fields.Id; }
    }
    #endregion Id and Name fields

    #region Constructor
    public EmpPhotoRow()
    : base(Fields)
    {
    }
    #endregion Constructor

    #region RowFields
    public static readonly RowFields Fields = new RowFields().Init();

    public const string TableName = "[dbo].[PRM_EmpPhoto]";

    public partial class RowFields : RowFieldsBase
    {
    public RowFields()
    : base("[dbo].[PRM_EmpPhoto]")
    {
    LocalTextPrefix = "HRM.EmpPhoto";
    }
    }
    #endregion RowFields
    }
    }
