namespace VistaLOAN.HRM {
    export interface EmpPhotoRow {
        Id?: number;
        EmployeeId?: number;
        PhotoSignature?: number[];
        IsPhoto?: boolean;
        EmployeeEmpId?: string;
        EmployeeEmployeeInitial?: string;
        EmployeeTitleId?: number;
        EmployeeFirstName?: string;
        EmployeeMiddleName?: string;
        EmployeeLastName?: string;
        EmployeeFullName?: string;
        EmployeeFullNameBangla?: string;
        EmployeeDateofJoining?: string;
        EmployeeProvisionMonth?: number;
        EmployeeDateofConfirmation?: string;
        EmployeeDateofPosition?: string;
        EmployeeDesignationId?: number;
        EmployeeStatusDesignationId?: number;
        EmployeeDisciplineId?: number;
        EmployeeDivisionId?: number;
        EmployeeSectionId?: number;
        EmployeeSubSectionId?: number;
        EmployeeJobLocationId?: number;
        EmployeeResourceLevelId?: number;
        EmployeeStaffCategoryId?: number;
        EmployeeEmploymentTypeId?: number;
        EmployeeReligionId?: number;
        EmployeeIsContractual?: boolean;
        EmployeeOvertimeRate?: number;
        EmployeeMobileNo?: string;
        EmployeeEmialAddress?: string;
        EmployeeBankId?: number;
        EmployeeBankBranchId?: number;
        EmployeeBankAccountNo?: string;
        EmployeeEmploymentStatusId?: number;
        EmployeeDateofInactive?: string;
        EmployeeIsConsultant?: boolean;
        EmployeeIsOvertimeEligible?: boolean;
        EmployeeIsRefreshmentEligible?: boolean;
        EmployeeIsBonusEligible?: boolean;
        EmployeeIsEligibleForCpf?: boolean;
        EmployeeIsGpfEligible?: boolean;
        EmployeeIsPensionEligible?: boolean;
        EmployeeIsLeverageEligible?: boolean;
        EmployeeIsGeneralShifted?: boolean;
        EmployeeSalaryScaleId?: number;
        EmployeeJobGradeId?: number;
        EmployeeGender?: string;
        EmployeeContractExpireDate?: string;
        EmployeeDateofBirth?: string;
        EmployeeContractDuration?: number;
        EmployeeContractType?: number;
        EmployeeOrganogramLevelId?: number;
        EmployeeDateofAppointment?: string;
        EmployeeOrderNo?: string;
        EmployeeQuotaId?: number;
        EmployeeEmployeeClassId?: number;
        EmployeeEmploymentProcessId?: number;
        EmployeeSeniorityPosition?: string;
        EmployeeDateofSeniority?: string;
        EmployeePrlDate?: string;
        EmployeeCardNo?: string;
        EmployeeFingerPrintIdentiyNo?: string;
        EmployeeAttendanceEffectiveDate?: string;
        EmployeeAttendanceStatus?: boolean;
        EmployeeZoneInfoId?: number;
        EmployeeTelephoneOffice?: string;
        EmployeeIntercom?: string;
        EmployeeHonoraryDegree?: string;
        EmployeeTaxRegionId?: number;
        EmployeeTaxAssesseeType?: number;
        EmployeeHavingChildWithDisability?: boolean;
        EmployeeDateofRetirement?: string;
        EmployeeSalaryWithdrawFromZoneId?: number;
        EmployeeRegionId?: number;
        EmployeeEtin?: string;
        EmployeeIUser?: string;
        EmployeeIDate?: string;
        EmployeeEUser?: string;
        EmployeeEDate?: string;
    }

    export namespace EmpPhotoRow {
        export const idProperty = 'Id';
        export const localTextPrefix = 'HRM.EmpPhoto';
        export const lookupKey = 'HRM.EmpPhoto';

        export function getLookup(): Q.Lookup<EmpPhotoRow> {
            return Q.getLookup<EmpPhotoRow>('HRM.EmpPhoto');
        }

        export declare const enum Fields {
            Id = "Id",
            EmployeeId = "EmployeeId",
            PhotoSignature = "PhotoSignature",
            IsPhoto = "IsPhoto",
            EmployeeEmpId = "EmployeeEmpId",
            EmployeeEmployeeInitial = "EmployeeEmployeeInitial",
            EmployeeTitleId = "EmployeeTitleId",
            EmployeeFirstName = "EmployeeFirstName",
            EmployeeMiddleName = "EmployeeMiddleName",
            EmployeeLastName = "EmployeeLastName",
            EmployeeFullName = "EmployeeFullName",
            EmployeeFullNameBangla = "EmployeeFullNameBangla",
            EmployeeDateofJoining = "EmployeeDateofJoining",
            EmployeeProvisionMonth = "EmployeeProvisionMonth",
            EmployeeDateofConfirmation = "EmployeeDateofConfirmation",
            EmployeeDateofPosition = "EmployeeDateofPosition",
            EmployeeDesignationId = "EmployeeDesignationId",
            EmployeeStatusDesignationId = "EmployeeStatusDesignationId",
            EmployeeDisciplineId = "EmployeeDisciplineId",
            EmployeeDivisionId = "EmployeeDivisionId",
            EmployeeSectionId = "EmployeeSectionId",
            EmployeeSubSectionId = "EmployeeSubSectionId",
            EmployeeJobLocationId = "EmployeeJobLocationId",
            EmployeeResourceLevelId = "EmployeeResourceLevelId",
            EmployeeStaffCategoryId = "EmployeeStaffCategoryId",
            EmployeeEmploymentTypeId = "EmployeeEmploymentTypeId",
            EmployeeReligionId = "EmployeeReligionId",
            EmployeeIsContractual = "EmployeeIsContractual",
            EmployeeOvertimeRate = "EmployeeOvertimeRate",
            EmployeeMobileNo = "EmployeeMobileNo",
            EmployeeEmialAddress = "EmployeeEmialAddress",
            EmployeeBankId = "EmployeeBankId",
            EmployeeBankBranchId = "EmployeeBankBranchId",
            EmployeeBankAccountNo = "EmployeeBankAccountNo",
            EmployeeEmploymentStatusId = "EmployeeEmploymentStatusId",
            EmployeeDateofInactive = "EmployeeDateofInactive",
            EmployeeIsConsultant = "EmployeeIsConsultant",
            EmployeeIsOvertimeEligible = "EmployeeIsOvertimeEligible",
            EmployeeIsRefreshmentEligible = "EmployeeIsRefreshmentEligible",
            EmployeeIsBonusEligible = "EmployeeIsBonusEligible",
            EmployeeIsEligibleForCpf = "EmployeeIsEligibleForCpf",
            EmployeeIsGpfEligible = "EmployeeIsGpfEligible",
            EmployeeIsPensionEligible = "EmployeeIsPensionEligible",
            EmployeeIsLeverageEligible = "EmployeeIsLeverageEligible",
            EmployeeIsGeneralShifted = "EmployeeIsGeneralShifted",
            EmployeeSalaryScaleId = "EmployeeSalaryScaleId",
            EmployeeJobGradeId = "EmployeeJobGradeId",
            EmployeeGender = "EmployeeGender",
            EmployeeContractExpireDate = "EmployeeContractExpireDate",
            EmployeeDateofBirth = "EmployeeDateofBirth",
            EmployeeContractDuration = "EmployeeContractDuration",
            EmployeeContractType = "EmployeeContractType",
            EmployeeOrganogramLevelId = "EmployeeOrganogramLevelId",
            EmployeeDateofAppointment = "EmployeeDateofAppointment",
            EmployeeOrderNo = "EmployeeOrderNo",
            EmployeeQuotaId = "EmployeeQuotaId",
            EmployeeEmployeeClassId = "EmployeeEmployeeClassId",
            EmployeeEmploymentProcessId = "EmployeeEmploymentProcessId",
            EmployeeSeniorityPosition = "EmployeeSeniorityPosition",
            EmployeeDateofSeniority = "EmployeeDateofSeniority",
            EmployeePrlDate = "EmployeePrlDate",
            EmployeeCardNo = "EmployeeCardNo",
            EmployeeFingerPrintIdentiyNo = "EmployeeFingerPrintIdentiyNo",
            EmployeeAttendanceEffectiveDate = "EmployeeAttendanceEffectiveDate",
            EmployeeAttendanceStatus = "EmployeeAttendanceStatus",
            EmployeeZoneInfoId = "EmployeeZoneInfoId",
            EmployeeTelephoneOffice = "EmployeeTelephoneOffice",
            EmployeeIntercom = "EmployeeIntercom",
            EmployeeHonoraryDegree = "EmployeeHonoraryDegree",
            EmployeeTaxRegionId = "EmployeeTaxRegionId",
            EmployeeTaxAssesseeType = "EmployeeTaxAssesseeType",
            EmployeeHavingChildWithDisability = "EmployeeHavingChildWithDisability",
            EmployeeDateofRetirement = "EmployeeDateofRetirement",
            EmployeeSalaryWithdrawFromZoneId = "EmployeeSalaryWithdrawFromZoneId",
            EmployeeRegionId = "EmployeeRegionId",
            EmployeeEtin = "EmployeeEtin",
            EmployeeIUser = "EmployeeIUser",
            EmployeeIDate = "EmployeeIDate",
            EmployeeEUser = "EmployeeEUser",
            EmployeeEDate = "EmployeeEDate"
        }
    }
}

