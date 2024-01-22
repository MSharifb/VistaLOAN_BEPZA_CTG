namespace VistaLOAN.Setup {
    export interface LaLoanApplicationLastNumberRow {
        Id?: number;
        LoanCriteriaId?: number;
        LastLoanNumber?: number;
        PFPaymentType?: string;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        LoanCriteriaIUser?: string;
        LoanCriteriaIDate?: string;
        LoanCriteriaEUser?: string;
        LoanCriteriaEDate?: string;
    }

    export namespace LaLoanApplicationLastNumberRow {
        export const idProperty = 'Id';
        export const localTextPrefix = 'Setup.LaLoanApplicationLastNumber';
        export const lookupKey = 'Setup.LaLoanApplicationLastNumber';

        export function getLookup(): Q.Lookup<LaLoanApplicationLastNumberRow> {
            return Q.getLookup<LaLoanApplicationLastNumberRow>('Setup.LaLoanApplicationLastNumber');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanCriteriaId = "LoanCriteriaId",
            LastLoanNumber = "LastLoanNumber",
            PFPaymentType = "PFPaymentType",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            LoanCriteriaIUser = "LoanCriteriaIUser",
            LoanCriteriaIDate = "LoanCriteriaIDate",
            LoanCriteriaEUser = "LoanCriteriaEUser",
            LoanCriteriaEDate = "LoanCriteriaEDate"
        }
    }
}

