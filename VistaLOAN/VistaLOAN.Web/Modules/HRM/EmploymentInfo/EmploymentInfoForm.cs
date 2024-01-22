
namespace VistaLOAN.HRM.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("HRM.EmploymentInfo")]
    [BasedOnRow(typeof(Entities.EmploymentInfoRow))]
    public class EmploymentInfoForm
    {
        public String EmpId { get; set; }
        public String EmployeeInitial { get; set; }
        public Int32 TitleId { get; set; }
        public String FirstName { get; set; }
        public String MiddleName { get; set; }
        public String LastName { get; set; }
        public String FullName { get; set; }
        public DateTime DateofJoining { get; set; }
        public Int32 ProvisionMonth { get; set; }
        public DateTime DateofConfirmation { get; set; }
        public DateTime DateofPosition { get; set; }
        public Int32 DesignationId { get; set; }
        public Int32 DisciplineId { get; set; }
        public Int32 DivisionId { get; set; }
        public Int32 SectionId { get; set; }
        public Int32 SubSectionId { get; set; }
        public Int32 JobLocationId { get; set; }
        public Int32 ResourceLevelId { get; set; }
        public Int32 StaffCategoryId { get; set; }
        public Int32 ShiftId { get; set; }
        public Int32 EmploymentTypeId { get; set; }
        public Int32 ReligionId { get; set; }
        public Boolean IsContractual { get; set; }
        public Boolean IsConsultant { get; set; }
        public Boolean IsOvertimeEligible { get; set; }
        public Decimal OvertimeRate { get; set; }
        public String MobileNo { get; set; }
        public String EmialAddress { get; set; }
        public Int32 BankId { get; set; }
        public Int32 BankBranchId { get; set; }
        public String BankAccountNo { get; set; }
        public Int32 EmploymentStatusId { get; set; }
        public DateTime DateofInactive { get; set; }
        public Boolean IsBonusEligible { get; set; }
        public Boolean IsTaxPaidbyIwm { get; set; }
        public Int32 SalaryScaleId { get; set; }
        public Int32 JobGradeId { get; set; }
        public String Gender { get; set; }
        public DateTime ContractExpireDate { get; set; }
        public DateTime DateofBirth { get; set; }
        public Decimal ContractDuration { get; set; }
        public Int32 ContractType { get; set; }
        public Decimal ActualRate { get; set; }
        public Decimal BudgetRate { get; set; }
        public Int32 OrganogramLevelId { get; set; }
        public DateTime DateofAppointment { get; set; }
        public String OrderNo { get; set; }
        public Int32 QuotaId { get; set; }
        public Int32 EmployeeClassId { get; set; }
        public Int32 EmploymentProcessId { get; set; }
        public String SeniorityPosition { get; set; }
        public DateTime DateofSeniority { get; set; }
        public DateTime PrlDate { get; set; }
        public Boolean IsPensionEligible { get; set; }
        public Boolean IsLeverageEligible { get; set; }
        public String CardNo { get; set; }
        public String FingerPrintIdentiyNo { get; set; }
        public DateTime AttendanceEffectiveDate { get; set; }
        public Boolean AttendanceStatus { get; set; }
        public String IUser { get; set; }
        public DateTime IDate { get; set; }
        public String EUser { get; set; }
        public DateTime EDate { get; set; }
        public Boolean IsGeneralShifted { get; set; }
        public Int32 RegionId { get; set; }
    }
}