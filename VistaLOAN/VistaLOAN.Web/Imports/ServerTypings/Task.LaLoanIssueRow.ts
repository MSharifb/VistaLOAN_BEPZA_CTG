namespace VistaLOAN.Task {
    export interface LaLoanIssueRow {
        Id?: number;
        LoanApplicationId?: number;
        EffectiveMonth?: number;
        EffectiveYear?: number;
        LoanAmount?: number;
        PrincipalInstallmentAmount?: number;
        InterestAmount?: number;
        InterestInstallmentAmount?: number;
        LastPrincipalInstallmentAmount?: number;
        LastInterestInstallmentAmount?: number;
        IsFullPaid?: boolean;
        IsReschedule?: boolean;
        IsClose?: boolean;
        FullPaidDate?: string;
        IsPosting?: boolean;
        CloseDate?: string;
        InterestConfirmDate?: string;
        LoanApplicationLoanNo?: string;
        LoanApplicationEmployeeId?: number;
        EmpId?: string;
        EmpFullName?: string;
        LoanApplicationSeniorityNo?: number;
        LoanApplicationApplyDate?: string;
        LoanApplicationLoanCriteriaId?: number;
        LoanApplicationApplyLoanAmount?: number;
        LoanApplicationApplyInterestAmount?: number;
        LoanApplicationApplyInterestRate?: number;
        LoanApplicationGrantedLoanAmount?: number;
        LoanApplicationGrantedInterestAmount?: number;
        LoanApplicationGrantedInterestRate?: number;
        LoanApplicationApproverId?: string;
        LoanApplicationAppStatusId?: number;
        LoanApplicationIsDiscard?: boolean;
        LoanApplicationIsApprovalProcess?: boolean;
        LoanApplicationApprovedDate?: string;
        LoanApplicationPFLoanType?: string;
        LoanApplicationIsIssue?: boolean;
        LoanApplicationResponsiblePersonId?: string;
        EmployeeId?: number;
        LaLoanIssueDetail?: LaLoanIssueDetailRow[];
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanIssueRow {
        export const idProperty = 'Id';
        export const nameProperty = 'LoanApplicationLoanNo';
        export const localTextPrefix = 'Task.LaLoanIssue';
        export const lookupKey = 'Task.LaLoanIssue';

        export function getLookup(): Q.Lookup<LaLoanIssueRow> {
            return Q.getLookup<LaLoanIssueRow>('Task.LaLoanIssue');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanApplicationId = "LoanApplicationId",
            EffectiveMonth = "EffectiveMonth",
            EffectiveYear = "EffectiveYear",
            LoanAmount = "LoanAmount",
            PrincipalInstallmentAmount = "PrincipalInstallmentAmount",
            InterestAmount = "InterestAmount",
            InterestInstallmentAmount = "InterestInstallmentAmount",
            LastPrincipalInstallmentAmount = "LastPrincipalInstallmentAmount",
            LastInterestInstallmentAmount = "LastInterestInstallmentAmount",
            IsFullPaid = "IsFullPaid",
            IsReschedule = "IsReschedule",
            IsClose = "IsClose",
            FullPaidDate = "FullPaidDate",
            IsPosting = "IsPosting",
            CloseDate = "CloseDate",
            InterestConfirmDate = "InterestConfirmDate",
            LoanApplicationLoanNo = "LoanApplicationLoanNo",
            LoanApplicationEmployeeId = "LoanApplicationEmployeeId",
            EmpId = "EmpId",
            EmpFullName = "EmpFullName",
            LoanApplicationSeniorityNo = "LoanApplicationSeniorityNo",
            LoanApplicationApplyDate = "LoanApplicationApplyDate",
            LoanApplicationLoanCriteriaId = "LoanApplicationLoanCriteriaId",
            LoanApplicationApplyLoanAmount = "LoanApplicationApplyLoanAmount",
            LoanApplicationApplyInterestAmount = "LoanApplicationApplyInterestAmount",
            LoanApplicationApplyInterestRate = "LoanApplicationApplyInterestRate",
            LoanApplicationGrantedLoanAmount = "LoanApplicationGrantedLoanAmount",
            LoanApplicationGrantedInterestAmount = "LoanApplicationGrantedInterestAmount",
            LoanApplicationGrantedInterestRate = "LoanApplicationGrantedInterestRate",
            LoanApplicationApproverId = "LoanApplicationApproverId",
            LoanApplicationAppStatusId = "LoanApplicationAppStatusId",
            LoanApplicationIsDiscard = "LoanApplicationIsDiscard",
            LoanApplicationIsApprovalProcess = "LoanApplicationIsApprovalProcess",
            LoanApplicationApprovedDate = "LoanApplicationApprovedDate",
            LoanApplicationPFLoanType = "LoanApplicationPFLoanType",
            LoanApplicationIsIssue = "LoanApplicationIsIssue",
            LoanApplicationResponsiblePersonId = "LoanApplicationResponsiblePersonId",
            EmployeeId = "EmployeeId",
            LaLoanIssueDetail = "LaLoanIssueDetail",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

