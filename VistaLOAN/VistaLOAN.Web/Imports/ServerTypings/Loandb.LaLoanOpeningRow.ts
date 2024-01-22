
namespace VistaLOAN.Loandb {
    export interface LaLoanOpeningRow {
        Id?: number;
        EmployeeId?: number;
        BalanceMonth?: number;
        BalanceYear?: number;
        PrincipalInstallmentNo?: number;
        PrincipalInstallmentAmount?: number;
        PrincipalPaidAmount?: number;
        PrincipalDueAmount?: number;
        InterestInstallmentNo?: number;
        InterestInstallmentAmount?: number;
        InterestPaidAmount?: number;
        InterestDueAmount?: number;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        LoanApplicationId?: number;
        LoanApplicationLoanNo?: string;
        LoanApplicationEmployeeId?: number;
        LoanApplicationSeniorityNo?: number;
        LoanApplicationApplyDate?: string;
        LoanApplicationLoanCriteriaId?: number;
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
        LoanApplicationIsRefundablePfLoan?: boolean;
        LoanApplicationIsReApply?: boolean;
        LoanApplicationIsIssue?: boolean;
        LoanApplicationResponsiblePersonId?: string;
    }

    export namespace LaLoanOpeningRow {
        export const idProperty = 'Id';
        export const nameProperty = 'IUser';
        export const localTextPrefix = 'Loandb.LaLoanOpening';

        export namespace Fields {
            export declare const Id;
            export declare const EmployeeId;
            export declare const BalanceMonth;
            export declare const BalanceYear;
            export declare const PrincipalInstallmentNo;
            export declare const PrincipalInstallmentAmount;
            export declare const PrincipalPaidAmount;
            export declare const PrincipalDueAmount;
            export declare const InterestInstallmentNo;
            export declare const InterestInstallmentAmount;
            export declare const InterestPaidAmount;
            export declare const InterestDueAmount;
            export declare const IUser;
            export declare const IDate;
            export declare const EUser;
            export declare const EDate;
            export declare const LoanApplicationId;
            export declare const LoanApplicationLoanNo: string;
            export declare const LoanApplicationEmployeeId: string;
            export declare const LoanApplicationSeniorityNo: string;
            export declare const LoanApplicationApplyDate: string;
            export declare const LoanApplicationLoanCriteriaId: string;
            export declare const LoanApplicationApplyLoanAmount: string;
            export declare const LoanApplicationApplyPrincipalInstallmentNo: string;
            export declare const LoanApplicationApplyInterestAmount: string;
            export declare const LoanApplicationApplyInterestInstallmentNo: string;
            export declare const LoanApplicationApplyInterestRate: string;
            export declare const LoanApplicationPurpose: string;
            export declare const LoanApplicationGrantedLoanAmount: string;
            export declare const LoanApplicationGrantedPrincipalInstallmentNo: string;
            export declare const LoanApplicationGrantedInterestAmount: string;
            export declare const LoanApplicationGrantedInterestInstallmentNo: string;
            export declare const LoanApplicationGrantedInterestRate: string;
            export declare const LoanApplicationNodeId: string;
            export declare const LoanApplicationApproverId: string;
            export declare const LoanApplicationAppStatusId: string;
            export declare const LoanApplicationIsDiscard: string;
            export declare const LoanApplicationIsApprovalProcess: string;
            export declare const LoanApplicationIsOffLine: string;
            export declare const LoanApplicationIUser: string;
            export declare const LoanApplicationIDate: string;
            export declare const LoanApplicationEUser: string;
            export declare const LoanApplicationEDate: string;
            export declare const LoanApplicationApprovedDate: string;
            export declare const LoanApplicationIsRefundablePfLoan: string;
            export declare const LoanApplicationIsReApply: string;
            export declare const LoanApplicationIsIssue: string;
            export declare const LoanApplicationResponsiblePersonId: string;
        }

        ['Id', 'EmployeeId', 'BalanceMonth', 'BalanceYear', 'PrincipalInstallmentNo', 'PrincipalInstallmentAmount', 'PrincipalPaidAmount', 'PrincipalDueAmount', 'InterestInstallmentNo', 'InterestInstallmentAmount', 'InterestPaidAmount', 'InterestDueAmount', 'IUser', 'IDate', 'EUser', 'EDate', 'LoanApplicationId', 'LoanApplicationLoanNo', 'LoanApplicationEmployeeId', 'LoanApplicationSeniorityNo', 'LoanApplicationApplyDate', 'LoanApplicationLoanCriteriaId', 'LoanApplicationApplyLoanAmount', 'LoanApplicationApplyPrincipalInstallmentNo', 'LoanApplicationApplyInterestAmount', 'LoanApplicationApplyInterestInstallmentNo', 'LoanApplicationApplyInterestRate', 'LoanApplicationPurpose', 'LoanApplicationGrantedLoanAmount', 'LoanApplicationGrantedPrincipalInstallmentNo', 'LoanApplicationGrantedInterestAmount', 'LoanApplicationGrantedInterestInstallmentNo', 'LoanApplicationGrantedInterestRate', 'LoanApplicationNodeId', 'LoanApplicationApproverId', 'LoanApplicationAppStatusId', 'LoanApplicationIsDiscard', 'LoanApplicationIsApprovalProcess', 'LoanApplicationIsOffLine', 'LoanApplicationIUser', 'LoanApplicationIDate', 'LoanApplicationEUser', 'LoanApplicationEDate', 'LoanApplicationApprovedDate', 'LoanApplicationIsRefundablePfLoan', 'LoanApplicationIsReApply', 'LoanApplicationIsIssue', 'LoanApplicationResponsiblePersonId'].forEach(x => (<any>Fields)[x] = x);
    }
}

