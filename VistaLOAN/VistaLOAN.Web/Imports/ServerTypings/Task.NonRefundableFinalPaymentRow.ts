namespace VistaLOAN.Task {
    export interface NonRefundableFinalPaymentRow {
        Id?: number;
        LoanNo?: string;
        EmployeeId?: number;
        SeniorityNo?: number;
        ApplyDate?: string;
        LoanCriteriaId?: number;
        ApplyLoanAmount?: number;
        ApplyPrincipalInstallmentNo?: number;
        ApplyInterestAmount?: number;
        ApplyInterestInstallmentNo?: number;
        ApplyInterestRate?: number;
        Purpose?: string;
        GrantedLoanAmount?: number;
        GrantedPrincipalInstallmentNo?: number;
        GrantedInterestAmount?: number;
        GrantedInterestInstallmentNo?: number;
        GrantedInterestRate?: number;
        IsIssue?: boolean;
        IsApprovalProcess?: boolean;
        ApproverId?: string;
        ApprovedDate?: string;
        AppStatusId?: number;
        IsDiscard?: boolean;
        IsOffLine?: boolean;
        IsReApply?: boolean;
        ResponsiblePersonId?: string;
        EmployeeWiseLoanId?: number;
        NodeId?: number;
        PfLoanType?: string;
        NonRefundPfOwnLoanAmount?: number;
        NonRefundPfCompanyLoanAmount?: number;
        NonRefundOwnInterestLoanAmount?: number;
        NonRefundCompanyInterestLoanAmount?: number;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        LoanCriteriaIUser?: string;
        LoanCriteriaIDate?: string;
        LoanCriteriaEUser?: string;
        LoanCriteriaEDate?: string;
        EmployeeName?: string;
        EmpId?: string;
        StatusName?: string;
    }

    export namespace NonRefundableFinalPaymentRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanNo';
        export const localTextPrefix = 'Task.NonRefundableFinalPayment';
        export const lookupKey = 'Task.NonRefundableFinalPayment';

        export function getLookup(): Q.Lookup<NonRefundableFinalPaymentRow> {
            return Q.getLookup<NonRefundableFinalPaymentRow>('Task.NonRefundableFinalPayment');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanNo = "LoanNo",
            EmployeeId = "EmployeeId",
            SeniorityNo = "SeniorityNo",
            ApplyDate = "ApplyDate",
            LoanCriteriaId = "LoanCriteriaId",
            ApplyLoanAmount = "ApplyLoanAmount",
            ApplyPrincipalInstallmentNo = "ApplyPrincipalInstallmentNo",
            ApplyInterestAmount = "ApplyInterestAmount",
            ApplyInterestInstallmentNo = "ApplyInterestInstallmentNo",
            ApplyInterestRate = "ApplyInterestRate",
            Purpose = "Purpose",
            GrantedLoanAmount = "GrantedLoanAmount",
            GrantedPrincipalInstallmentNo = "GrantedPrincipalInstallmentNo",
            GrantedInterestAmount = "GrantedInterestAmount",
            GrantedInterestInstallmentNo = "GrantedInterestInstallmentNo",
            GrantedInterestRate = "GrantedInterestRate",
            IsIssue = "IsIssue",
            IsApprovalProcess = "IsApprovalProcess",
            ApproverId = "ApproverId",
            ApprovedDate = "ApprovedDate",
            AppStatusId = "AppStatusId",
            IsDiscard = "IsDiscard",
            IsOffLine = "IsOffLine",
            IsReApply = "IsReApply",
            ResponsiblePersonId = "ResponsiblePersonId",
            EmployeeWiseLoanId = "EmployeeWiseLoanId",
            NodeId = "NodeId",
            PfLoanType = "PfLoanType",
            NonRefundPfOwnLoanAmount = "NonRefundPfOwnLoanAmount",
            NonRefundPfCompanyLoanAmount = "NonRefundPfCompanyLoanAmount",
            NonRefundOwnInterestLoanAmount = "NonRefundOwnInterestLoanAmount",
            NonRefundCompanyInterestLoanAmount = "NonRefundCompanyInterestLoanAmount",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            LoanCriteriaIUser = "LoanCriteriaIUser",
            LoanCriteriaIDate = "LoanCriteriaIDate",
            LoanCriteriaEUser = "LoanCriteriaEUser",
            LoanCriteriaEDate = "LoanCriteriaEDate",
            EmployeeName = "EmployeeName",
            EmpId = "EmpId",
            StatusName = "StatusName"
        }
    }
}

