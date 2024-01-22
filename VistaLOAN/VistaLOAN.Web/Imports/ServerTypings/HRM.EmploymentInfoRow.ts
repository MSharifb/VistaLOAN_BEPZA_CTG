namespace VistaLOAN.HRM {
    export interface EmploymentInfoRow {
        Id?: number;
        EmpId?: string;
        EmployeeInitial?: string;
        TitleId?: number;
        FirstName?: string;
        MiddleName?: string;
        LastName?: string;
        FullName?: string;
        DateofJoining?: string;
        ProvisionMonth?: number;
        DateofConfirmation?: string;
        DateofPosition?: string;
        DesignationId?: number;
        DisciplineId?: number;
        DivisionId?: number;
        SectionId?: number;
        SubSectionId?: number;
        JobLocationId?: number;
        ResourceLevelId?: number;
        StaffCategoryId?: number;
        ShiftId?: number;
        EmploymentTypeId?: number;
        ReligionId?: number;
        IsContractual?: boolean;
        IsConsultant?: boolean;
        IsOvertimeEligible?: boolean;
        OvertimeRate?: number;
        MobileNo?: string;
        EmialAddress?: string;
        BankId?: number;
        BankBranchId?: number;
        BankAccountNo?: string;
        EmploymentStatusId?: number;
        DateofInactive?: string;
        IsBonusEligible?: boolean;
        IsTaxPaidbyIwm?: boolean;
        SalaryScaleId?: number;
        JobGradeId?: number;
        Gender?: string;
        ContractExpireDate?: string;
        DateofBirth?: string;
        ContractDuration?: number;
        ContractType?: number;
        ActualRate?: number;
        BudgetRate?: number;
        OrganogramLevelId?: number;
        DateofAppointment?: string;
        OrderNo?: string;
        QuotaId?: number;
        EmployeeClassId?: number;
        EmploymentProcessId?: number;
        SeniorityPosition?: string;
        DateofSeniority?: string;
        PrlDate?: string;
        IsPensionEligible?: boolean;
        IsLeverageEligible?: boolean;
        CardNo?: string;
        FingerPrintIdentiyNo?: string;
        AttendanceEffectiveDate?: string;
        AttendanceStatus?: boolean;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        IsGeneralShifted?: boolean;
        RegionId?: number;
        TitleName?: string;
        LookupText?: string;
        TitleSortOrder?: number;
        DesignationGradeId?: number;
        DesignationName?: string;
        DesignationShortName?: string;
        DesignationNameB?: string;
        DesignationEmployeeClassId?: number;
        DesignationRank?: number;
        DesignationJobDescription?: string;
        DesignationSortingOrder?: number;
        DisciplineName?: string;
        DisciplineSortOrder?: number;
        DivisionName?: string;
        DivisionSortOrder?: number;
        SectionName?: string;
        SectionSortOrder?: number;
        SubSectionName?: string;
        SubSectionSortOrder?: number;
        JobLocationName?: string;
        JobLocationSortOrder?: number;
        ResourceLevelName?: string;
        ResourceLevelSortOrder?: number;
        StaffCategoryName?: string;
        StaffCategorySortOrder?: number;
        StaffCategoryRetirementAge?: number;
        ShiftName?: string;
        ShiftSortOrder?: number;
        EmploymentTypeName?: string;
        EmploymentTypeSortOrder?: number;
        ReligionName?: string;
        ReligionSortOrder?: number;
        BankName?: string;
        BankBranchBankId?: number;
        BankBranchName?: string;
        BankBranchAddress?: string;
        EmploymentStatusName?: string;
        EmploymentStatusSortOrder?: number;
        SalaryScaleSalaryScaleName?: string;
        SalaryScaleDateOfCirculation?: string;
        SalaryScaleDateOfEffective?: string;
        JobGradeSalaryScaleId?: number;
        JobGradeGradeName?: string;
        JobGradeGradeCode?: string;
        JobGradeNumberOfSteps?: number;
        JobGradeInitialBasic?: number;
        JobGradeLastBasic?: number;
        JobGradeYearlyIncrement?: number;
        JobGradeDateOfEffective?: string;
        JobGradeIsConsolidated?: boolean;
        JobGradePayScale?: string;
        OrganogramLevelOrganogramTypeId?: number;
        OrganogramLevelLevelName?: string;
        OrganogramLevelParentId?: number;
        OrganogramLevelCode?: string;
        OrganogramLevelPrefix?: string;
        OrganogramLevelPosition?: number;
        OrganogramLevelIsActive?: boolean;
        QuotaName?: string;
        QuotaSortOrder?: number;
        EmployeeClassName?: string;
        EmployeeClassSortOrder?: number;
        EmploymentProcessName?: string;
        EmploymentProcessSortOrder?: number;
        RegionName?: string;
        RegionSortOrder?: number;
    }

    export namespace EmploymentInfoRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LookupText';
        export const localTextPrefix = 'HRM.EmploymentInfo';
        export const lookupKey = 'HRM.EmploymentInfo';

        export function getLookup(): Q.Lookup<EmploymentInfoRow> {
            return Q.getLookup<EmploymentInfoRow>('HRM.EmploymentInfo');
        }

        export declare const enum Fields {
            Id = "Id",
            EmpId = "EmpId",
            EmployeeInitial = "EmployeeInitial",
            TitleId = "TitleId",
            FirstName = "FirstName",
            MiddleName = "MiddleName",
            LastName = "LastName",
            FullName = "FullName",
            DateofJoining = "DateofJoining",
            ProvisionMonth = "ProvisionMonth",
            DateofConfirmation = "DateofConfirmation",
            DateofPosition = "DateofPosition",
            DesignationId = "DesignationId",
            DisciplineId = "DisciplineId",
            DivisionId = "DivisionId",
            SectionId = "SectionId",
            SubSectionId = "SubSectionId",
            JobLocationId = "JobLocationId",
            ResourceLevelId = "ResourceLevelId",
            StaffCategoryId = "StaffCategoryId",
            ShiftId = "ShiftId",
            EmploymentTypeId = "EmploymentTypeId",
            ReligionId = "ReligionId",
            IsContractual = "IsContractual",
            IsConsultant = "IsConsultant",
            IsOvertimeEligible = "IsOvertimeEligible",
            OvertimeRate = "OvertimeRate",
            MobileNo = "MobileNo",
            EmialAddress = "EmialAddress",
            BankId = "BankId",
            BankBranchId = "BankBranchId",
            BankAccountNo = "BankAccountNo",
            EmploymentStatusId = "EmploymentStatusId",
            DateofInactive = "DateofInactive",
            IsBonusEligible = "IsBonusEligible",
            IsTaxPaidbyIwm = "IsTaxPaidbyIwm",
            SalaryScaleId = "SalaryScaleId",
            JobGradeId = "JobGradeId",
            Gender = "Gender",
            ContractExpireDate = "ContractExpireDate",
            DateofBirth = "DateofBirth",
            ContractDuration = "ContractDuration",
            ContractType = "ContractType",
            ActualRate = "ActualRate",
            BudgetRate = "BudgetRate",
            OrganogramLevelId = "OrganogramLevelId",
            DateofAppointment = "DateofAppointment",
            OrderNo = "OrderNo",
            QuotaId = "QuotaId",
            EmployeeClassId = "EmployeeClassId",
            EmploymentProcessId = "EmploymentProcessId",
            SeniorityPosition = "SeniorityPosition",
            DateofSeniority = "DateofSeniority",
            PrlDate = "PrlDate",
            IsPensionEligible = "IsPensionEligible",
            IsLeverageEligible = "IsLeverageEligible",
            CardNo = "CardNo",
            FingerPrintIdentiyNo = "FingerPrintIdentiyNo",
            AttendanceEffectiveDate = "AttendanceEffectiveDate",
            AttendanceStatus = "AttendanceStatus",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            IsGeneralShifted = "IsGeneralShifted",
            RegionId = "RegionId",
            TitleName = "TitleName",
            LookupText = "LookupText",
            TitleSortOrder = "TitleSortOrder",
            DesignationGradeId = "DesignationGradeId",
            DesignationName = "DesignationName",
            DesignationShortName = "DesignationShortName",
            DesignationNameB = "DesignationNameB",
            DesignationEmployeeClassId = "DesignationEmployeeClassId",
            DesignationRank = "DesignationRank",
            DesignationJobDescription = "DesignationJobDescription",
            DesignationSortingOrder = "DesignationSortingOrder",
            DisciplineName = "DisciplineName",
            DisciplineSortOrder = "DisciplineSortOrder",
            DivisionName = "DivisionName",
            DivisionSortOrder = "DivisionSortOrder",
            SectionName = "SectionName",
            SectionSortOrder = "SectionSortOrder",
            SubSectionName = "SubSectionName",
            SubSectionSortOrder = "SubSectionSortOrder",
            JobLocationName = "JobLocationName",
            JobLocationSortOrder = "JobLocationSortOrder",
            ResourceLevelName = "ResourceLevelName",
            ResourceLevelSortOrder = "ResourceLevelSortOrder",
            StaffCategoryName = "StaffCategoryName",
            StaffCategorySortOrder = "StaffCategorySortOrder",
            StaffCategoryRetirementAge = "StaffCategoryRetirementAge",
            ShiftName = "ShiftName",
            ShiftSortOrder = "ShiftSortOrder",
            EmploymentTypeName = "EmploymentTypeName",
            EmploymentTypeSortOrder = "EmploymentTypeSortOrder",
            ReligionName = "ReligionName",
            ReligionSortOrder = "ReligionSortOrder",
            BankName = "BankName",
            BankBranchBankId = "BankBranchBankId",
            BankBranchName = "BankBranchName",
            BankBranchAddress = "BankBranchAddress",
            EmploymentStatusName = "EmploymentStatusName",
            EmploymentStatusSortOrder = "EmploymentStatusSortOrder",
            SalaryScaleSalaryScaleName = "SalaryScaleSalaryScaleName",
            SalaryScaleDateOfCirculation = "SalaryScaleDateOfCirculation",
            SalaryScaleDateOfEffective = "SalaryScaleDateOfEffective",
            JobGradeSalaryScaleId = "JobGradeSalaryScaleId",
            JobGradeGradeName = "JobGradeGradeName",
            JobGradeGradeCode = "JobGradeGradeCode",
            JobGradeNumberOfSteps = "JobGradeNumberOfSteps",
            JobGradeInitialBasic = "JobGradeInitialBasic",
            JobGradeLastBasic = "JobGradeLastBasic",
            JobGradeYearlyIncrement = "JobGradeYearlyIncrement",
            JobGradeDateOfEffective = "JobGradeDateOfEffective",
            JobGradeIsConsolidated = "JobGradeIsConsolidated",
            JobGradePayScale = "JobGradePayScale",
            OrganogramLevelOrganogramTypeId = "OrganogramLevelOrganogramTypeId",
            OrganogramLevelLevelName = "OrganogramLevelLevelName",
            OrganogramLevelParentId = "OrganogramLevelParentId",
            OrganogramLevelCode = "OrganogramLevelCode",
            OrganogramLevelPrefix = "OrganogramLevelPrefix",
            OrganogramLevelPosition = "OrganogramLevelPosition",
            OrganogramLevelIsActive = "OrganogramLevelIsActive",
            QuotaName = "QuotaName",
            QuotaSortOrder = "QuotaSortOrder",
            EmployeeClassName = "EmployeeClassName",
            EmployeeClassSortOrder = "EmployeeClassSortOrder",
            EmploymentProcessName = "EmploymentProcessName",
            EmploymentProcessSortOrder = "EmploymentProcessSortOrder",
            RegionName = "RegionName",
            RegionSortOrder = "RegionSortOrder"
        }
    }
}

