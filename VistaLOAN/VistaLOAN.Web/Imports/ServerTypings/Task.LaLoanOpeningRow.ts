namespace VistaLOAN.Task {
    export interface LaLoanOpeningRow {
        Id?: number;
        EmployeeId?: number;
        BalanceMonth?: string;
        BalanceYear?: string;
        PrincipalInstallmentNo?: number;
        PrincipalInstallmentAmount?: number;
        PrincipalPaidAmount?: number;
        PrincipalDueAmount?: number;
        InterestInstallmentNo?: number;
        InterestInstallmentAmount?: number;
        InterestPaidAmount?: number;
        InterestDueAmount?: number;
        LoanApplicationId?: number;
        LoanApplicationLoanNo?: string;
        LoanApplicationEmployeeId?: number;
        LoanApplicationSeniorityNo?: number;
        LoanApplicationApplyDate?: string;
        LoanApplicationLoanCriteriaId?: number;
        LoanCriteriaSchemeName?: string;
        LoanApplicationApplyLoanAmount?: number;
        LoanApplicationApplyPrincipalInstallmentNo?: number;
        LoanApplicationApplyInterestAmount?: number;
        LoanApplicationApplyInterestInstallmentNo?: number;
        LoanApplicationApplyInterestRate?: number;
        LoanApplicationPurpose?: string;
        LoanApplicationGrantedLoanAmount?: number;
        LoanApplicationGrantedPrincipalInstallmentNo?: number;
        LoanApplicationGrantedInterestAmount?: number;
        LoanApplicationGrantedInterestInstallmentNo?: number;
        LoanApplicationGrantedInterestRate?: number;
        LoanApplicationNodeId?: number;
        LoanApplicationApproverId?: string;
        LoanApplicationAppStatusId?: number;
        LoanApplicationIsDiscard?: boolean;
        LoanApplicationIsApprovalProcess?: boolean;
        LoanApplicationIsOffLine?: boolean;
        LoanApplicationIUser?: string;
        LoanApplicationIDate?: string;
        LoanApplicationEUser?: string;
        LoanApplicationEDate?: string;
        LoanApplicationApprovedDate?: string;
        LoanApplicationPFLoanType?: string;
        LoanApplicationIsReApply?: boolean;
        LoanApplicationIsIssue?: boolean;
        LoanApplicationResponsiblePersonId?: string;
        EmpId?: string;
        EmployeeName?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanOpeningRow {
        export const idProperty = 'Id';
        export const nameProperty = 'IUser';
        export const localTextPrefix = 'Task.LaLoanOpening';
        export const lookupKey = 'Task.LaLoanOpening';

        export function getLookup(): Q.Lookup<LaLoanOpeningRow> {
            return Q.getLookup<LaLoanOpeningRow>('Task.LaLoanOpening');
        }

        export declare const enum Fields {
            Id = "Id",
            EmployeeId = "EmployeeId",
            BalanceMonth = "BalanceMonth",
            BalanceYear = "BalanceYear",
            PrincipalInstallmentNo = "PrincipalInstallmentNo",
            PrincipalInstallmentAmount = "PrincipalInstallmentAmount",
            PrincipalPaidAmount = "PrincipalPaidAmount",
            PrincipalDueAmount = "PrincipalDueAmount",
            InterestInstallmentNo = "InterestInstallmentNo",
            InterestInstallmentAmount = "InterestInstallmentAmount",
            InterestPaidAmount = "InterestPaidAmount",
            InterestDueAmount = "InterestDueAmount",
            LoanApplicationId = "LoanApplicationId",
            LoanApplicationLoanNo = "LoanApplicationLoanNo",
            LoanApplicationEmployeeId = "LoanApplicationEmployeeId",
            LoanApplicationSeniorityNo = "LoanApplicationSeniorityNo",
            LoanApplicationApplyDate = "LoanApplicationApplyDate",
            LoanApplicationLoanCriteriaId = "LoanApplicationLoanCriteriaId",
            LoanCriteriaSchemeName = "LoanCriteriaSchemeName",
            LoanApplicationApplyLoanAmount = "LoanApplicationApplyLoanAmount",
            LoanApplicationApplyPrincipalInstallmentNo = "LoanApplicationApplyPrincipalInstallmentNo",
            LoanApplicationApplyInterestAmount = "LoanApplicationApplyInterestAmount",
            LoanApplicationApplyInterestInstallmentNo = "LoanApplicationApplyInterestInstallmentNo",
            LoanApplicationApplyInterestRate = "LoanApplicationApplyInterestRate",
            LoanApplicationPurpose = "LoanApplicationPurpose",
            LoanApplicationGrantedLoanAmount = "LoanApplicationGrantedLoanAmount",
            LoanApplicationGrantedPrincipalInstallmentNo = "LoanApplicationGrantedPrincipalInstallmentNo",
            LoanApplicationGrantedInterestAmount = "LoanApplicationGrantedInterestAmount",
            LoanApplicationGrantedInterestInstallmentNo = "LoanApplicationGrantedInterestInstallmentNo",
            LoanApplicationGrantedInterestRate = "LoanApplicationGrantedInterestRate",
            LoanApplicationNodeId = "LoanApplicationNodeId",
            LoanApplicationApproverId = "LoanApplicationApproverId",
            LoanApplicationAppStatusId = "LoanApplicationAppStatusId",
            LoanApplicationIsDiscard = "LoanApplicationIsDiscard",
            LoanApplicationIsApprovalProcess = "LoanApplicationIsApprovalProcess",
            LoanApplicationIsOffLine = "LoanApplicationIsOffLine",
            LoanApplicationIUser = "LoanApplicationIUser",
            LoanApplicationIDate = "LoanApplicationIDate",
            LoanApplicationEUser = "LoanApplicationEUser",
            LoanApplicationEDate = "LoanApplicationEDate",
            LoanApplicationApprovedDate = "LoanApplicationApprovedDate",
            LoanApplicationPFLoanType = "LoanApplicationPFLoanType",
            LoanApplicationIsReApply = "LoanApplicationIsReApply",
            LoanApplicationIsIssue = "LoanApplicationIsIssue",
            LoanApplicationResponsiblePersonId = "LoanApplicationResponsiblePersonId",
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

