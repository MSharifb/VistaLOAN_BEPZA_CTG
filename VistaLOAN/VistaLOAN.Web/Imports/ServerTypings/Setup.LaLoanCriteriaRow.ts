namespace VistaLOAN.Setup {
    export interface LaLoanCriteriaRow {
        Id?: number;
        SchemeName?: string;
        LoanTypeId?: number;
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
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanCriteriaRow {
        export const idProperty = 'Id';
        export const nameProperty = 'SchemeName';
        export const localTextPrefix = 'Setup.LaLoanCriteria';
        export const lookupKey = 'Setup.LaLoanCriteria';

        export function getLookup(): Q.Lookup<LaLoanCriteriaRow> {
            return Q.getLookup<LaLoanCriteriaRow>('Setup.LaLoanCriteria');
        }

        export declare const enum Fields {
            Id = "Id",
            SchemeName = "SchemeName",
            LoanTypeId = "LoanTypeId",
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
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

