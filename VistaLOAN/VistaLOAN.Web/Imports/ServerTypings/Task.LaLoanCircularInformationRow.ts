namespace VistaLOAN.Task {
    export interface LaLoanCircularInformationRow {
        Id?: number;
        LoanTypeId?: number;
        FiscalYearId?: number;
        CircularDate?: string;
        ReferenceNo?: string;
        CircularDescription?: string;
        Attachment?: number[];
        LoanTypeLoanTypeName?: string;
        LoanTypePrincipalHeadId?: number;
        LoanTypeInterestHeadId?: number;
        LoanTypeIsWelfareLoan?: boolean;
        LoanTypeIsPfLoan?: boolean;
        LoanTypeIsInterestPaymentWithPricipal?: boolean;
        LoanTypeIsInterestCalculateOnIssueDate?: boolean;
        LoanTypeGracePeriodMonth?: number;
        LoanTypeCalculationType?: number;
        LoanTypeShortCode?: string;
        LoanTypeIUser?: string;
        LoanTypeIDate?: string;
        LoanTypeEUser?: string;
        LoanTypeEDate?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaLoanCircularInformationRow {
        export const idProperty = 'Id';
        export const nameProperty = 'ReferenceNo';
        export const localTextPrefix = 'Task.LaLoanCircularInformation';
        export const lookupKey = 'Task.LaLoanCircularInformation';

        export function getLookup(): Q.Lookup<LaLoanCircularInformationRow> {
            return Q.getLookup<LaLoanCircularInformationRow>('Task.LaLoanCircularInformation');
        }

        export declare const enum Fields {
            Id = "Id",
            LoanTypeId = "LoanTypeId",
            FiscalYearId = "FiscalYearId",
            CircularDate = "CircularDate",
            ReferenceNo = "ReferenceNo",
            CircularDescription = "CircularDescription",
            Attachment = "Attachment",
            LoanTypeLoanTypeName = "LoanTypeLoanTypeName",
            LoanTypePrincipalHeadId = "LoanTypePrincipalHeadId",
            LoanTypeInterestHeadId = "LoanTypeInterestHeadId",
            LoanTypeIsWelfareLoan = "LoanTypeIsWelfareLoan",
            LoanTypeIsPfLoan = "LoanTypeIsPfLoan",
            LoanTypeIsInterestPaymentWithPricipal = "LoanTypeIsInterestPaymentWithPricipal",
            LoanTypeIsInterestCalculateOnIssueDate = "LoanTypeIsInterestCalculateOnIssueDate",
            LoanTypeGracePeriodMonth = "LoanTypeGracePeriodMonth",
            LoanTypeCalculationType = "LoanTypeCalculationType",
            LoanTypeShortCode = "LoanTypeShortCode",
            LoanTypeIUser = "LoanTypeIUser",
            LoanTypeIDate = "LoanTypeIDate",
            LoanTypeEUser = "LoanTypeEUser",
            LoanTypeEDate = "LoanTypeEDate",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

