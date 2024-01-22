namespace VistaLOAN.Task {
    export interface LaLoanApplicationRow {
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
        NodeId?: number;
        ApproverId?: string;
        AppStatusId?: number;
        IsDiscard?: boolean;
        IsApprovalProcess?: boolean;
        IsOffLine?: boolean;
        ApprovedDate?: string;
        IsReApply?: boolean;
        IsIssue?: boolean;
        ResponsiblePersonId?: string;
        EmployeeWiseLoanId?: number;
        PFLoanType?: string;
        NonRefundPFOwnLoanAmount?: number;
        NonRefundPFCompanyLoanAmount?: number;
        NonRefundOwnInterestLoanAmount?: number;
        NonRefundCompanyInterestLoanAmount?: number;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        EmployeeName?: string;
        EmpId?: string;
        StatusName?: string;
        Signature?: string;
        Sign?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanApplicationRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanNo';
        export const localTextPrefix = 'Task.LaLoanApplication';
        export const lookupKey = 'Task.LaLoanApplication';

        export function getLookup(): Q.Lookup<LaLoanApplicationRow> {
            return Q.getLookup<LaLoanApplicationRow>('Task.LaLoanApplication');
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
            NodeId = "NodeId",
            ApproverId = "ApproverId",
            AppStatusId = "AppStatusId",
            IsDiscard = "IsDiscard",
            IsApprovalProcess = "IsApprovalProcess",
            IsOffLine = "IsOffLine",
            ApprovedDate = "ApprovedDate",
            IsReApply = "IsReApply",
            IsIssue = "IsIssue",
            ResponsiblePersonId = "ResponsiblePersonId",
            EmployeeWiseLoanId = "EmployeeWiseLoanId",
            PFLoanType = "PFLoanType",
            NonRefundPFOwnLoanAmount = "NonRefundPFOwnLoanAmount",
            NonRefundPFCompanyLoanAmount = "NonRefundPFCompanyLoanAmount",
            NonRefundOwnInterestLoanAmount = "NonRefundOwnInterestLoanAmount",
            NonRefundCompanyInterestLoanAmount = "NonRefundCompanyInterestLoanAmount",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            EmployeeName = "EmployeeName",
            EmpId = "EmpId",
            StatusName = "StatusName",
            Signature = "Signature",
            Sign = "Sign",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

