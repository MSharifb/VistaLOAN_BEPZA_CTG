namespace VistaLOAN.Task {
    export interface LaRequestedLoanApplicationRow {
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
        PFLoanType?: string;
        IsReApply?: boolean;
        IsIssue?: boolean;
        ResponsiblePersonId?: string;
        EmployeeWiseLoanId?: number;
        NextApproverId?: string;
        LoanCriteriaSchemeName?: string;
        LoanCriteriaLoanTypeId?: number;
        LoanCriteriaIUser?: string;
        LoanCriteriaIDate?: string;
        LoanCriteriaEUser?: string;
        LoanCriteriaEDate?: string;
        EmployeeName?: string;
        StatusName?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaRequestedLoanApplicationRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanNo';
        export const localTextPrefix = 'Task.LaRequestedLoanApplication';
        export const lookupKey = 'Task.LaRequestedLoanApplication';

        export function getLookup(): Q.Lookup<LaRequestedLoanApplicationRow> {
            return Q.getLookup<LaRequestedLoanApplicationRow>('Task.LaRequestedLoanApplication');
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
            PFLoanType = "PFLoanType",
            IsReApply = "IsReApply",
            IsIssue = "IsIssue",
            ResponsiblePersonId = "ResponsiblePersonId",
            EmployeeWiseLoanId = "EmployeeWiseLoanId",
            NextApproverId = "NextApproverId",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanCriteriaLoanTypeId = "LoanCriteriaLoanTypeId",
            LoanCriteriaIUser = "LoanCriteriaIUser",
            LoanCriteriaIDate = "LoanCriteriaIDate",
            LoanCriteriaEUser = "LoanCriteriaEUser",
            LoanCriteriaEDate = "LoanCriteriaEDate",
            EmployeeName = "EmployeeName",
            StatusName = "StatusName",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

