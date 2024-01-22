namespace VistaLOAN.Task {
    export interface LaMonthlyLoanInstallmentDetailRow {
        Id?: number;
        MonthlyLoanInstallmentId?: number;
        LoanIssueId?: number;
        EmployeeId?: number;
        PrincipalInstallmentAmount?: number;
        InterestInstallmentAmount?: number;
        TotalInstallmentAmount?: number;
        MonthlyLoanInstallmentForMonth?: string;
        MonthlyLoanInstallmentForYear?: string;
        MonthlyLoanInstallmentIUser?: string;
        MonthlyLoanInstallmentIDate?: string;
        MonthlyLoanInstallmentEUser?: string;
        MonthlyLoanInstallmentEDate?: string;
        MonthlyLoanInstallmentTotalPrincipalInstallmentAmount?: number;
        MonthlyLoanInstallmentTotalInterestInstallmentAmount?: number;
        MonthlyLoanInstallmentIsProcess?: boolean;
        LoanIssueLoanApplicationId?: number;
        LoanNo?: string;
        LoanIssueEffectiveMonth?: number;
        LoanIssueEffectiveYear?: number;
        LoanIssueLoanAmount?: number;
        LoanIssuePrincipalInstallmentAmount?: number;
        LoanIssueInterestAmount?: number;
        LoanIssueInterestInstallmentAmount?: number;
        LoanIssueLastPrincipalInstallmentAmount?: number;
        LoanIssueLastInterestInstallmentAmount?: number;
        LoanIssueIUser?: string;
        LoanIssueIDate?: string;
        LoanIssueEUser?: string;
        LoanIssueEDate?: string;
        LoanIssueIsFullPaid?: boolean;
        LoanIssueIsReschedule?: boolean;
        LoanIssueIsClose?: boolean;
        LoanIssueFullPaidDate?: string;
        LoanIssueIsPosting?: boolean;
        EmpId?: string;
        EmployeeName?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaMonthlyLoanInstallmentDetailRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanIssueIUser';
        export const localTextPrefix = 'Task.LaMonthlyLoanInstallmentDetail';
        export const lookupKey = 'Task.LaMonthlyLoanInstallmentDetail';

        export function getLookup(): Q.Lookup<LaMonthlyLoanInstallmentDetailRow> {
            return Q.getLookup<LaMonthlyLoanInstallmentDetailRow>('Task.LaMonthlyLoanInstallmentDetail');
        }

        export declare const enum Fields {
            Id = "Id",
            MonthlyLoanInstallmentId = "MonthlyLoanInstallmentId",
            LoanIssueId = "LoanIssueId",
            EmployeeId = "EmployeeId",
            PrincipalInstallmentAmount = "PrincipalInstallmentAmount",
            InterestInstallmentAmount = "InterestInstallmentAmount",
            TotalInstallmentAmount = "TotalInstallmentAmount",
            MonthlyLoanInstallmentForMonth = "MonthlyLoanInstallmentForMonth",
            MonthlyLoanInstallmentForYear = "MonthlyLoanInstallmentForYear",
            MonthlyLoanInstallmentIUser = "MonthlyLoanInstallmentIUser",
            MonthlyLoanInstallmentIDate = "MonthlyLoanInstallmentIDate",
            MonthlyLoanInstallmentEUser = "MonthlyLoanInstallmentEUser",
            MonthlyLoanInstallmentEDate = "MonthlyLoanInstallmentEDate",
            MonthlyLoanInstallmentTotalPrincipalInstallmentAmount = "MonthlyLoanInstallmentTotalPrincipalInstallmentAmount",
            MonthlyLoanInstallmentTotalInterestInstallmentAmount = "MonthlyLoanInstallmentTotalInterestInstallmentAmount",
            MonthlyLoanInstallmentIsProcess = "MonthlyLoanInstallmentIsProcess",
            LoanIssueLoanApplicationId = "LoanIssueLoanApplicationId",
            LoanNo = "LoanNo",
            LoanIssueEffectiveMonth = "LoanIssueEffectiveMonth",
            LoanIssueEffectiveYear = "LoanIssueEffectiveYear",
            LoanIssueLoanAmount = "LoanIssueLoanAmount",
            LoanIssuePrincipalInstallmentAmount = "LoanIssuePrincipalInstallmentAmount",
            LoanIssueInterestAmount = "LoanIssueInterestAmount",
            LoanIssueInterestInstallmentAmount = "LoanIssueInterestInstallmentAmount",
            LoanIssueLastPrincipalInstallmentAmount = "LoanIssueLastPrincipalInstallmentAmount",
            LoanIssueLastInterestInstallmentAmount = "LoanIssueLastInterestInstallmentAmount",
            LoanIssueIUser = "LoanIssueIUser",
            LoanIssueIDate = "LoanIssueIDate",
            LoanIssueEUser = "LoanIssueEUser",
            LoanIssueEDate = "LoanIssueEDate",
            LoanIssueIsFullPaid = "LoanIssueIsFullPaid",
            LoanIssueIsReschedule = "LoanIssueIsReschedule",
            LoanIssueIsClose = "LoanIssueIsClose",
            LoanIssueFullPaidDate = "LoanIssueFullPaidDate",
            LoanIssueIsPosting = "LoanIssueIsPosting",
            EmpId = "EmpId",
            EmployeeName = "EmployeeName",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

