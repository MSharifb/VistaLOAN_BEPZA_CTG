namespace VistaLOAN.Task {
    export interface LaMonthlyLoanInstallmentRow {
        Id?: number;
        ForMonth?: string;
        ForYear?: string;
        TotalPrincipalInstallmentAmount?: number;
        TotalInterestInstallmentAmount?: number;
        IsProcess?: boolean;
        LaMonthlyLoanInstallmentDetailList?: LaMonthlyLoanInstallmentDetailRow[];
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaMonthlyLoanInstallmentRow {
        export const idProperty = 'Id';
        export const nameProperty = 'ForYear';
        export const localTextPrefix = 'Task.LaMonthlyLoanInstallment';
        export const lookupKey = 'Task.LaMonthlyLoanInstallment';

        export function getLookup(): Q.Lookup<LaMonthlyLoanInstallmentRow> {
            return Q.getLookup<LaMonthlyLoanInstallmentRow>('Task.LaMonthlyLoanInstallment');
        }

        export declare const enum Fields {
            Id = "Id",
            ForMonth = "ForMonth",
            ForYear = "ForYear",
            TotalPrincipalInstallmentAmount = "TotalPrincipalInstallmentAmount",
            TotalInterestInstallmentAmount = "TotalInterestInstallmentAmount",
            IsProcess = "IsProcess",
            LaMonthlyLoanInstallmentDetailList = "LaMonthlyLoanInstallmentDetailList",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

