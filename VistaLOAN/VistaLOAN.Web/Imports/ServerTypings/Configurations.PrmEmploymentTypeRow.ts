namespace VistaLOAN.Configurations {
    export interface PrmEmploymentTypeRow {
        Id?: number;
        Name?: string;
        SortOrder?: number;
        Remarks?: string;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace PrmEmploymentTypeRow {
        export const idProperty = 'Id';
        export const nameProperty = 'Name';
        export const localTextPrefix = 'Configurations.PrmEmploymentType';
        export const lookupKey = 'Configurations.PrmEmploymentType';

        export function getLookup(): Q.Lookup<PrmEmploymentTypeRow> {
            return Q.getLookup<PrmEmploymentTypeRow>('Configurations.PrmEmploymentType');
        }

        export declare const enum Fields {
            Id = "Id",
            Name = "Name",
            SortOrder = "SortOrder",
            Remarks = "Remarks",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

