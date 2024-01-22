namespace VistaLOAN.Configurations {
    export interface PrmSalaryScaleRow {
        Id?: number;
        SalaryScaleName?: string;
        DateOfCirculation?: string;
        DateOfEffective?: string;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
    }

    export namespace PrmSalaryScaleRow {
        export const idProperty = 'Id';
        export const nameProperty = 'SalaryScaleName';
        export const localTextPrefix = 'Configurations.PrmSalaryScale';
        export const lookupKey = 'Configurations.PrmSalaryScale';

        export function getLookup(): Q.Lookup<PrmSalaryScaleRow> {
            return Q.getLookup<PrmSalaryScaleRow>('Configurations.PrmSalaryScale');
        }

        export declare const enum Fields {
            Id = "Id",
            SalaryScaleName = "SalaryScaleName",
            DateOfCirculation = "DateOfCirculation",
            DateOfEffective = "DateOfEffective",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate"
        }
    }
}

