namespace VistaLOAN.Task {
    export interface LaCpfCashOrChequeCollectionRow {
        Id?: number;
        EmployeeId?: number;
        CollectionMonth?: string;
        CollectionYear?: string;
        CashorCheque?: string;
        Remarks?: string;
        CollectionType?: CollectionType;
        ApplicationId?: number;
        PrincipalInstallment?: number;
        InterestInstallment?: number;
        PfOwnContribution?: number;
        PFOwnInterest?: number;
        PFCompanyContribution?: number;
        PFCompanyInterest?: number;
        CollectionDate?: string;
        EmployeeEmpId?: string;
        EmployeeFullName?: string;
        EmployeeDesignationId?: number;
        EmployeeStatusDesignationId?: number;
        EmployeeDisciplineId?: number;
        EmployeeDivisionId?: number;
        EmployeeSectionId?: number;
        EmployeeSubSectionId?: number;
        ApplicationLoanNo?: string;
        ApplicationEmployeeId?: number;
        ApplicationSeniorityNo?: number;
        ApplicationApplyDate?: string;
        ApplicationLoanCriteriaId?: number;
        ApplicationApplyLoanAmount?: number;
        ApplicationApplyInterestAmount?: number;
        ApplicationPurpose?: string;
        ApplicationGrantedLoanAmount?: number;
        ApplicationGrantedInterestAmount?: number;
        ApplicationNodeId?: number;
        ApplicationApproverId?: string;
        ApplicationAppStatusId?: number;
        ApplicationIsDiscard?: boolean;
        ApplicationIsApprovalProcess?: boolean;
        ApplicationIsOffLine?: boolean;
        ApplicationApprovedDate?: string;
        ApplicationIsIssue?: boolean;
        ApplicationResponsiblePersonId?: string;
        ApplicationEmployeeWiseLoanId?: number;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaCpfCashOrChequeCollectionRow {
        export const idProperty = 'Id';
        export const nameProperty = 'CollectionMonth';
        export const localTextPrefix = 'Task.LaCpfCashOrChequeCollection';
        export const lookupKey = 'Task.LaCpfCashOrChequeCollection';

        export function getLookup(): Q.Lookup<LaCpfCashOrChequeCollectionRow> {
            return Q.getLookup<LaCpfCashOrChequeCollectionRow>('Task.LaCpfCashOrChequeCollection');
        }

        export declare const enum Fields {
            Id = "Id",
            EmployeeId = "EmployeeId",
            CollectionMonth = "CollectionMonth",
            CollectionYear = "CollectionYear",
            CashorCheque = "CashorCheque",
            Remarks = "Remarks",
            CollectionType = "CollectionType",
            ApplicationId = "ApplicationId",
            PrincipalInstallment = "PrincipalInstallment",
            InterestInstallment = "InterestInstallment",
            PfOwnContribution = "PfOwnContribution",
            PFOwnInterest = "PFOwnInterest",
            PFCompanyContribution = "PFCompanyContribution",
            PFCompanyInterest = "PFCompanyInterest",
            CollectionDate = "CollectionDate",
            EmployeeEmpId = "EmployeeEmpId",
            EmployeeFullName = "EmployeeFullName",
            EmployeeDesignationId = "EmployeeDesignationId",
            EmployeeStatusDesignationId = "EmployeeStatusDesignationId",
            EmployeeDisciplineId = "EmployeeDisciplineId",
            EmployeeDivisionId = "EmployeeDivisionId",
            EmployeeSectionId = "EmployeeSectionId",
            EmployeeSubSectionId = "EmployeeSubSectionId",
            ApplicationLoanNo = "ApplicationLoanNo",
            ApplicationEmployeeId = "ApplicationEmployeeId",
            ApplicationSeniorityNo = "ApplicationSeniorityNo",
            ApplicationApplyDate = "ApplicationApplyDate",
            ApplicationLoanCriteriaId = "ApplicationLoanCriteriaId",
            ApplicationApplyLoanAmount = "ApplicationApplyLoanAmount",
            ApplicationApplyInterestAmount = "ApplicationApplyInterestAmount",
            ApplicationPurpose = "ApplicationPurpose",
            ApplicationGrantedLoanAmount = "ApplicationGrantedLoanAmount",
            ApplicationGrantedInterestAmount = "ApplicationGrantedInterestAmount",
            ApplicationNodeId = "ApplicationNodeId",
            ApplicationApproverId = "ApplicationApproverId",
            ApplicationAppStatusId = "ApplicationAppStatusId",
            ApplicationIsDiscard = "ApplicationIsDiscard",
            ApplicationIsApprovalProcess = "ApplicationIsApprovalProcess",
            ApplicationIsOffLine = "ApplicationIsOffLine",
            ApplicationApprovedDate = "ApplicationApprovedDate",
            ApplicationIsIssue = "ApplicationIsIssue",
            ApplicationResponsiblePersonId = "ApplicationResponsiblePersonId",
            ApplicationEmployeeWiseLoanId = "ApplicationEmployeeWiseLoanId",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

