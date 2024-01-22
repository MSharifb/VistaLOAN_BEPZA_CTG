namespace VistaLOAN.Setup {
    export interface LaLoanTypeRow {
        Id?: number;
        LoanTypeName?: string;
        PrincipalHeadId?: number;
        InterestHeadId?: number;
        IsWelfareLoan?: boolean;
        IsPfLoan?: boolean;
        IsInterestPaymentWithPricipal?: boolean;
        IsInterestCalculateOnIssueDate?: boolean;
        GracePeriodMonth?: number;
        CalculationType?: number;
        ShortCode?: string;
        PrincipalHeadGroupId?: number;
        PrincipalHeadHeadName?: string;
        PrincipalHeadIsActiveHead?: boolean;
        PrincipalHeadShortName?: string;
        PrincipalHeadHeadType?: string;
        PrincipalHeadAmountType?: string;
        PrincipalHeadAccountHeadId?: number;
        PrincipalHeadEntityNameId?: number;
        PrincipalHeadIsBasicHead?: boolean;
        PrincipalHeadIsTaxable?: boolean;
        PrincipalHeadIsGrossPayHead?: boolean;
        PrincipalHeadSortOrder?: number;
        PrincipalHeadDefaultAmount?: number;
        PrincipalHeadIsOtherAddition?: boolean;
        PrincipalHeadIsOtherDeduction?: boolean;
        PrincipalHeadIsIncomeTaxAdditionHead?: boolean;
        PrincipalHeadIsIncomeTaxDeductionHead?: boolean;
        PrincipalHeadIsPfOwnContributionHead?: boolean;
        PrincipalHeadIsPfCompanyContributionHead?: boolean;
        PrincipalHeadIsHouseRentHead?: boolean;
        PrincipalHeadIsMedicalHead?: boolean;
        PrincipalHeadIsConveyanceHead?: boolean;
        PrincipalHeadIsLeaveWithoutPayHead?: boolean;
        PrincipalHeadIsPensionHead?: boolean;
        PrincipalHeadIsGpfHead?: boolean;
        PrincipalHeadIsArrearHead?: boolean;
        PrincipalHeadIsGratuityHead?: boolean;
        PrincipalHeadIUser?: string;
        PrincipalHeadEUser?: string;
        PrincipalHeadIDate?: string;
        PrincipalHeadEDate?: string;
        InterestHeadGroupId?: number;
        InterestHeadHeadName?: string;
        InterestHeadIsActiveHead?: boolean;
        InterestHeadShortName?: string;
        InterestHeadHeadType?: string;
        InterestHeadAmountType?: string;
        InterestHeadAccountHeadId?: number;
        InterestHeadEntityNameId?: number;
        InterestHeadIsBasicHead?: boolean;
        InterestHeadIsTaxable?: boolean;
        InterestHeadIsGrossPayHead?: boolean;
        InterestHeadSortOrder?: number;
        InterestHeadDefaultAmount?: number;
        InterestHeadIsOtherAddition?: boolean;
        InterestHeadIsOtherDeduction?: boolean;
        InterestHeadIsIncomeTaxAdditionHead?: boolean;
        InterestHeadIsIncomeTaxDeductionHead?: boolean;
        InterestHeadIsPfOwnContributionHead?: boolean;
        InterestHeadIsPfCompanyContributionHead?: boolean;
        InterestHeadIsHouseRentHead?: boolean;
        InterestHeadIsMedicalHead?: boolean;
        InterestHeadIsConveyanceHead?: boolean;
        InterestHeadIsLeaveWithoutPayHead?: boolean;
        InterestHeadIsPensionHead?: boolean;
        InterestHeadIsGpfHead?: boolean;
        InterestHeadIsArrearHead?: boolean;
        InterestHeadIsGratuityHead?: boolean;
        InterestHeadIUser?: string;
        InterestHeadEUser?: string;
        InterestHeadIDate?: string;
        InterestHeadEDate?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanTypeRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanTypeName';
        export const localTextPrefix = 'Setup.LaLoanType';
        export const lookupKey = 'Setup.LaLoanType';

        export function getLookup(): Q.Lookup<LaLoanTypeRow> {
            return Q.getLookup<LaLoanTypeRow>('Setup.LaLoanType');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanTypeName = "LoanTypeName",
            PrincipalHeadId = "PrincipalHeadId",
            InterestHeadId = "InterestHeadId",
            IsWelfareLoan = "IsWelfareLoan",
            IsPfLoan = "IsPfLoan",
            IsInterestPaymentWithPricipal = "IsInterestPaymentWithPricipal",
            IsInterestCalculateOnIssueDate = "IsInterestCalculateOnIssueDate",
            GracePeriodMonth = "GracePeriodMonth",
            CalculationType = "CalculationType",
            ShortCode = "ShortCode",
            PrincipalHeadGroupId = "PrincipalHeadGroupId",
            PrincipalHeadHeadName = "PrincipalHeadHeadName",
            PrincipalHeadIsActiveHead = "PrincipalHeadIsActiveHead",
            PrincipalHeadShortName = "PrincipalHeadShortName",
            PrincipalHeadHeadType = "PrincipalHeadHeadType",
            PrincipalHeadAmountType = "PrincipalHeadAmountType",
            PrincipalHeadAccountHeadId = "PrincipalHeadAccountHeadId",
            PrincipalHeadEntityNameId = "PrincipalHeadEntityNameId",
            PrincipalHeadIsBasicHead = "PrincipalHeadIsBasicHead",
            PrincipalHeadIsTaxable = "PrincipalHeadIsTaxable",
            PrincipalHeadIsGrossPayHead = "PrincipalHeadIsGrossPayHead",
            PrincipalHeadSortOrder = "PrincipalHeadSortOrder",
            PrincipalHeadDefaultAmount = "PrincipalHeadDefaultAmount",
            PrincipalHeadIsOtherAddition = "PrincipalHeadIsOtherAddition",
            PrincipalHeadIsOtherDeduction = "PrincipalHeadIsOtherDeduction",
            PrincipalHeadIsIncomeTaxAdditionHead = "PrincipalHeadIsIncomeTaxAdditionHead",
            PrincipalHeadIsIncomeTaxDeductionHead = "PrincipalHeadIsIncomeTaxDeductionHead",
            PrincipalHeadIsPfOwnContributionHead = "PrincipalHeadIsPfOwnContributionHead",
            PrincipalHeadIsPfCompanyContributionHead = "PrincipalHeadIsPfCompanyContributionHead",
            PrincipalHeadIsHouseRentHead = "PrincipalHeadIsHouseRentHead",
            PrincipalHeadIsMedicalHead = "PrincipalHeadIsMedicalHead",
            PrincipalHeadIsConveyanceHead = "PrincipalHeadIsConveyanceHead",
            PrincipalHeadIsLeaveWithoutPayHead = "PrincipalHeadIsLeaveWithoutPayHead",
            PrincipalHeadIsPensionHead = "PrincipalHeadIsPensionHead",
            PrincipalHeadIsGpfHead = "PrincipalHeadIsGpfHead",
            PrincipalHeadIsArrearHead = "PrincipalHeadIsArrearHead",
            PrincipalHeadIsGratuityHead = "PrincipalHeadIsGratuityHead",
            PrincipalHeadIUser = "PrincipalHeadIUser",
            PrincipalHeadEUser = "PrincipalHeadEUser",
            PrincipalHeadIDate = "PrincipalHeadIDate",
            PrincipalHeadEDate = "PrincipalHeadEDate",
            InterestHeadGroupId = "InterestHeadGroupId",
            InterestHeadHeadName = "InterestHeadHeadName",
            InterestHeadIsActiveHead = "InterestHeadIsActiveHead",
            InterestHeadShortName = "InterestHeadShortName",
            InterestHeadHeadType = "InterestHeadHeadType",
            InterestHeadAmountType = "InterestHeadAmountType",
            InterestHeadAccountHeadId = "InterestHeadAccountHeadId",
            InterestHeadEntityNameId = "InterestHeadEntityNameId",
            InterestHeadIsBasicHead = "InterestHeadIsBasicHead",
            InterestHeadIsTaxable = "InterestHeadIsTaxable",
            InterestHeadIsGrossPayHead = "InterestHeadIsGrossPayHead",
            InterestHeadSortOrder = "InterestHeadSortOrder",
            InterestHeadDefaultAmount = "InterestHeadDefaultAmount",
            InterestHeadIsOtherAddition = "InterestHeadIsOtherAddition",
            InterestHeadIsOtherDeduction = "InterestHeadIsOtherDeduction",
            InterestHeadIsIncomeTaxAdditionHead = "InterestHeadIsIncomeTaxAdditionHead",
            InterestHeadIsIncomeTaxDeductionHead = "InterestHeadIsIncomeTaxDeductionHead",
            InterestHeadIsPfOwnContributionHead = "InterestHeadIsPfOwnContributionHead",
            InterestHeadIsPfCompanyContributionHead = "InterestHeadIsPfCompanyContributionHead",
            InterestHeadIsHouseRentHead = "InterestHeadIsHouseRentHead",
            InterestHeadIsMedicalHead = "InterestHeadIsMedicalHead",
            InterestHeadIsConveyanceHead = "InterestHeadIsConveyanceHead",
            InterestHeadIsLeaveWithoutPayHead = "InterestHeadIsLeaveWithoutPayHead",
            InterestHeadIsPensionHead = "InterestHeadIsPensionHead",
            InterestHeadIsGpfHead = "InterestHeadIsGpfHead",
            InterestHeadIsArrearHead = "InterestHeadIsArrearHead",
            InterestHeadIsGratuityHead = "InterestHeadIsGratuityHead",
            InterestHeadIUser = "InterestHeadIUser",
            InterestHeadEUser = "InterestHeadEUser",
            InterestHeadIDate = "InterestHeadIDate",
            InterestHeadEDate = "InterestHeadEDate",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

