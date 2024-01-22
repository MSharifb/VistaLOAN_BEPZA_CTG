namespace VistaLOAN.Configurations {
    export interface ApvApprovalStatusRow {
        Id?: number;
        StatusName?: string;
        ActionType?: string;
        SortOrder?: number;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
    }

    export namespace ApvApprovalStatusRow {
        export const idProperty = 'Id';
        export const nameProperty = 'StatusName';
        export const localTextPrefix = 'Configurations.ApvApprovalStatus';
        export const lookupKey = 'Configurations.ApvApprovalStatus';

        export function getLookup(): Q.Lookup<ApvApprovalStatusRow> {
            return Q.getLookup<ApvApprovalStatusRow>('Configurations.ApvApprovalStatus');
        }

        export declare const enum Fields {
            Id = "Id",
            StatusName = "StatusName",
            ActionType = "ActionType",
            SortOrder = "SortOrder",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate"
        }
    }
}

