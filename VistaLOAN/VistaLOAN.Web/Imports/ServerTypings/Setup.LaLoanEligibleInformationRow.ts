namespace VistaLOAN.Setup {
    export interface LaLoanEligibleInformationRow {
        Id?: number;
        LoanTypeId?: number;
        EmployeeCategoryId?: number;
        GradeFromId?: number;
        GradeToId?: number;
        ServiceDurationMin?: number;
        MaxNoLoanApply?: number;
        LoanTypeLoanTypeName?: string;
        LoanTypePrincipalHeadId?: number;
        LoanTypeInterestHeadId?: number;
        LoanTypeIsWelfareLoan?: boolean;
        LoanTypeIsPfLoan?: boolean;
        LoanTypeIsInterestPaymentWithPricipal?: boolean;
        LoanTypeIsInterestCalculateOnIssueDate?: boolean;
        LoanTypeGracePeriodMonth?: number;
        LoanTypeCalculationType?: number;
        LoanTypeShortCode?: string;
        LoanTypeIUser?: string;
        LoanTypeIDate?: string;
        LoanTypeEUser?: string;
        LoanTypeEDate?: string;
        EmployeeCategoryName?: string;
        EmployeeCategorySortOrder?: number;
        EmployeeCategoryRemarks?: string;
        EmployeeCategoryIUser?: string;
        EmployeeCategoryEUser?: string;
        EmployeeCategoryIDate?: string;
        EmployeeCategoryEDate?: string;
        GradeFromSalaryScaleId?: number;
        GradeFromGradeName?: string;
        GradeFromGradeCode?: string;
        GradeFromNumberOfSteps?: number;
        GradeFromInitialBasic?: number;
        GradeFromLastBasic?: number;
        GradeFromYearlyIncrement?: number;
        GradeFromDateOfEffective?: string;
        GradeFromIsConsolidated?: boolean;
        GradeFromIUser?: string;
        GradeFromIDate?: string;
        GradeFromEUser?: string;
        GradeFromEDate?: string;
        GradeFromPayScale?: string;
        GradeToSalaryScaleId?: number;
        GradeToGradeName?: string;
        GradeToGradeCode?: string;
        GradeToNumberOfSteps?: number;
        GradeToInitialBasic?: number;
        GradeToLastBasic?: number;
        GradeToYearlyIncrement?: number;
        GradeToDateOfEffective?: string;
        GradeToIsConsolidated?: boolean;
        GradeToIUser?: string;
        GradeToIDate?: string;
        GradeToEUser?: string;
        GradeToEDate?: string;
        GradeToPayScale?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanEligibleInformationRow {
        export const idProperty = 'Id';
        export const nameProperty = 'IUser';
        export const localTextPrefix = 'Setup.LaLoanEligibleInformation';
        export const lookupKey = 'Setup.LaLoanEligibleInformation';

        export function getLookup(): Q.Lookup<LaLoanEligibleInformationRow> {
            return Q.getLookup<LaLoanEligibleInformationRow>('Setup.LaLoanEligibleInformation');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanTypeId = "LoanTypeId",
            EmployeeCategoryId = "EmployeeCategoryId",
            GradeFromId = "GradeFromId",
            GradeToId = "GradeToId",
            ServiceDurationMin = "ServiceDurationMin",
            MaxNoLoanApply = "MaxNoLoanApply",
            LoanTypeLoanTypeName = "LoanTypeLoanTypeName",
            LoanTypePrincipalHeadId = "LoanTypePrincipalHeadId",
            LoanTypeInterestHeadId = "LoanTypeInterestHeadId",
            LoanTypeIsWelfareLoan = "LoanTypeIsWelfareLoan",
            LoanTypeIsPfLoan = "LoanTypeIsPfLoan",
            LoanTypeIsInterestPaymentWithPricipal = "LoanTypeIsInterestPaymentWithPricipal",
            LoanTypeIsInterestCalculateOnIssueDate = "LoanTypeIsInterestCalculateOnIssueDate",
            LoanTypeGracePeriodMonth = "LoanTypeGracePeriodMonth",
            LoanTypeCalculationType = "LoanTypeCalculationType",
            LoanTypeShortCode = "LoanTypeShortCode",
            LoanTypeIUser = "LoanTypeIUser",
            LoanTypeIDate = "LoanTypeIDate",
            LoanTypeEUser = "LoanTypeEUser",
            LoanTypeEDate = "LoanTypeEDate",
            EmployeeCategoryName = "EmployeeCategoryName",
            EmployeeCategorySortOrder = "EmployeeCategorySortOrder",
            EmployeeCategoryRemarks = "EmployeeCategoryRemarks",
            EmployeeCategoryIUser = "EmployeeCategoryIUser",
            EmployeeCategoryEUser = "EmployeeCategoryEUser",
            EmployeeCategoryIDate = "EmployeeCategoryIDate",
            EmployeeCategoryEDate = "EmployeeCategoryEDate",
            GradeFromSalaryScaleId = "GradeFromSalaryScaleId",
            GradeFromGradeName = "GradeFromGradeName",
            GradeFromGradeCode = "GradeFromGradeCode",
            GradeFromNumberOfSteps = "GradeFromNumberOfSteps",
            GradeFromInitialBasic = "GradeFromInitialBasic",
            GradeFromLastBasic = "GradeFromLastBasic",
            GradeFromYearlyIncrement = "GradeFromYearlyIncrement",
            GradeFromDateOfEffective = "GradeFromDateOfEffective",
            GradeFromIsConsolidated = "GradeFromIsConsolidated",
            GradeFromIUser = "GradeFromIUser",
            GradeFromIDate = "GradeFromIDate",
            GradeFromEUser = "GradeFromEUser",
            GradeFromEDate = "GradeFromEDate",
            GradeFromPayScale = "GradeFromPayScale",
            GradeToSalaryScaleId = "GradeToSalaryScaleId",
            GradeToGradeName = "GradeToGradeName",
            GradeToGradeCode = "GradeToGradeCode",
            GradeToNumberOfSteps = "GradeToNumberOfSteps",
            GradeToInitialBasic = "GradeToInitialBasic",
            GradeToLastBasic = "GradeToLastBasic",
            GradeToYearlyIncrement = "GradeToYearlyIncrement",
            GradeToDateOfEffective = "GradeToDateOfEffective",
            GradeToIsConsolidated = "GradeToIsConsolidated",
            GradeToIUser = "GradeToIUser",
            GradeToIDate = "GradeToIDate",
            GradeToEUser = "GradeToEUser",
            GradeToEDate = "GradeToEDate",
            GradeToPayScale = "GradeToPayScale",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

