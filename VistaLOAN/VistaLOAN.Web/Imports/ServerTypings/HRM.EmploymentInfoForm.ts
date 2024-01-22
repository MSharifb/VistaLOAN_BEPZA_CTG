namespace VistaLOAN.HRM {
    export interface EmploymentInfoForm {
        EmpId: Serenity.StringEditor;
        EmployeeInitial: Serenity.StringEditor;
        TitleId: Serenity.IntegerEditor;
        FirstName: Serenity.StringEditor;
        MiddleName: Serenity.StringEditor;
        LastName: Serenity.StringEditor;
        FullName: Serenity.StringEditor;
        DateofJoining: Serenity.DateEditor;
        ProvisionMonth: Serenity.IntegerEditor;
        DateofConfirmation: Serenity.DateEditor;
        DateofPosition: Serenity.DateEditor;
        DesignationId: Serenity.IntegerEditor;
        DisciplineId: Serenity.IntegerEditor;
        DivisionId: Serenity.IntegerEditor;
        SectionId: Serenity.IntegerEditor;
        SubSectionId: Serenity.IntegerEditor;
        JobLocationId: Serenity.IntegerEditor;
        ResourceLevelId: Serenity.IntegerEditor;
        StaffCategoryId: Serenity.IntegerEditor;
        ShiftId: Serenity.IntegerEditor;
        EmploymentTypeId: Serenity.IntegerEditor;
        ReligionId: Serenity.IntegerEditor;
        IsContractual: Serenity.BooleanEditor;
        IsConsultant: Serenity.BooleanEditor;
        IsOvertimeEligible: Serenity.BooleanEditor;
        OvertimeRate: Serenity.DecimalEditor;
        MobileNo: Serenity.StringEditor;
        EmialAddress: Serenity.StringEditor;
        BankId: Serenity.IntegerEditor;
        BankBranchId: Serenity.IntegerEditor;
        BankAccountNo: Serenity.StringEditor;
        EmploymentStatusId: Serenity.IntegerEditor;
        DateofInactive: Serenity.DateEditor;
        IsBonusEligible: Serenity.BooleanEditor;
        IsTaxPaidbyIwm: Serenity.BooleanEditor;
        SalaryScaleId: Serenity.IntegerEditor;
        JobGradeId: Serenity.IntegerEditor;
        Gender: Serenity.StringEditor;
        ContractExpireDate: Serenity.DateEditor;
        DateofBirth: Serenity.DateEditor;
        ContractDuration: Serenity.DecimalEditor;
        ContractType: Serenity.IntegerEditor;
        ActualRate: Serenity.DecimalEditor;
        BudgetRate: Serenity.DecimalEditor;
        OrganogramLevelId: Serenity.IntegerEditor;
        DateofAppointment: Serenity.DateEditor;
        OrderNo: Serenity.StringEditor;
        QuotaId: Serenity.IntegerEditor;
        EmployeeClassId: Serenity.IntegerEditor;
        EmploymentProcessId: Serenity.IntegerEditor;
        SeniorityPosition: Serenity.StringEditor;
        DateofSeniority: Serenity.DateEditor;
        PrlDate: Serenity.DateEditor;
        IsPensionEligible: Serenity.BooleanEditor;
        IsLeverageEligible: Serenity.BooleanEditor;
        CardNo: Serenity.StringEditor;
        FingerPrintIdentiyNo: Serenity.StringEditor;
        AttendanceEffectiveDate: Serenity.DateEditor;
        AttendanceStatus: Serenity.BooleanEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        IsGeneralShifted: Serenity.BooleanEditor;
        RegionId: Serenity.IntegerEditor;
    }

    export class EmploymentInfoForm extends Serenity.PrefixedContext {
        static formKey = 'HRM.EmploymentInfo';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!EmploymentInfoForm.init)  {
                EmploymentInfoForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.IntegerEditor;
                var w2 = s.DateEditor;
                var w3 = s.BooleanEditor;
                var w4 = s.DecimalEditor;

                Q.initFormType(EmploymentInfoForm, [
                    'EmpId', w0,
                    'EmployeeInitial', w0,
                    'TitleId', w1,
                    'FirstName', w0,
                    'MiddleName', w0,
                    'LastName', w0,
                    'FullName', w0,
                    'DateofJoining', w2,
                    'ProvisionMonth', w1,
                    'DateofConfirmation', w2,
                    'DateofPosition', w2,
                    'DesignationId', w1,
                    'DisciplineId', w1,
                    'DivisionId', w1,
                    'SectionId', w1,
                    'SubSectionId', w1,
                    'JobLocationId', w1,
                    'ResourceLevelId', w1,
                    'StaffCategoryId', w1,
                    'ShiftId', w1,
                    'EmploymentTypeId', w1,
                    'ReligionId', w1,
                    'IsContractual', w3,
                    'IsConsultant', w3,
                    'IsOvertimeEligible', w3,
                    'OvertimeRate', w4,
                    'MobileNo', w0,
                    'EmialAddress', w0,
                    'BankId', w1,
                    'BankBranchId', w1,
                    'BankAccountNo', w0,
                    'EmploymentStatusId', w1,
                    'DateofInactive', w2,
                    'IsBonusEligible', w3,
                    'IsTaxPaidbyIwm', w3,
                    'SalaryScaleId', w1,
                    'JobGradeId', w1,
                    'Gender', w0,
                    'ContractExpireDate', w2,
                    'DateofBirth', w2,
                    'ContractDuration', w4,
                    'ContractType', w1,
                    'ActualRate', w4,
                    'BudgetRate', w4,
                    'OrganogramLevelId', w1,
                    'DateofAppointment', w2,
                    'OrderNo', w0,
                    'QuotaId', w1,
                    'EmployeeClassId', w1,
                    'EmploymentProcessId', w1,
                    'SeniorityPosition', w0,
                    'DateofSeniority', w2,
                    'PrlDate', w2,
                    'IsPensionEligible', w3,
                    'IsLeverageEligible', w3,
                    'CardNo', w0,
                    'FingerPrintIdentiyNo', w0,
                    'AttendanceEffectiveDate', w2,
                    'AttendanceStatus', w3,
                    'IUser', w0,
                    'IDate', w2,
                    'EUser', w0,
                    'EDate', w2,
                    'IsGeneralShifted', w3,
                    'RegionId', w1
                ]);
            }
        }
    }
}

