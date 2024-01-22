namespace VistaLOAN.Task {
    export interface LaLoanIssueDetailRow {
        Id?: number;
        LoanIssueId?: number;
        IssueDate?: string;
        LoanPaidAmount?: number;
        LoanIssueLoanApplicationId?: number;
        LoanIssueEffectiveMonth?: number;
        LoanIssueEffectiveYear?: number;
        LoanIssueLoanAmount?: number;
        LoanIssueIUser?: string;
        LoanIssuePrincipalInstallmentAmount?: number;
        LoanIssueInterestAmount?: number;
        LoanIssueInterestInstallmentAmount?: number;
        LoanIssueIsFullPaid?: boolean;
        LoanIssueIsClose?: boolean;
        LoanIssueFullPaidDate?: string;
        LoanIssueIsPosting?: boolean;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanIssueDetailRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanIssueIUser';
        export const localTextPrefix = 'Task.LaLoanIssueDetail';
        export const lookupKey = 'Task.LaLoanIssueDetail';

        export function getLookup(): Q.Lookup<LaLoanIssueDetailRow> {
            return Q.getLookup<LaLoanIssueDetailRow>('Task.LaLoanIssueDetail');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanIssueId = "LoanIssueId",
            IssueDate = "IssueDate",
            LoanPaidAmount = "LoanPaidAmount",
            LoanIssueLoanApplicationId = "LoanIssueLoanApplicationId",
            LoanIssueEffectiveMonth = "LoanIssueEffectiveMonth",
            LoanIssueEffectiveYear = "LoanIssueEffectiveYear",
            LoanIssueLoanAmount = "LoanIssueLoanAmount",
            LoanIssueIUser = "LoanIssueIUser",
            LoanIssuePrincipalInstallmentAmount = "LoanIssuePrincipalInstallmentAmount",
            LoanIssueInterestAmount = "LoanIssueInterestAmount",
            LoanIssueInterestInstallmentAmount = "LoanIssueInterestInstallmentAmount",
            LoanIssueIsFullPaid = "LoanIssueIsFullPaid",
            LoanIssueIsClose = "LoanIssueIsClose",
            LoanIssueFullPaidDate = "LoanIssueFullPaidDate",
            LoanIssueIsPosting = "LoanIssueIsPosting",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

