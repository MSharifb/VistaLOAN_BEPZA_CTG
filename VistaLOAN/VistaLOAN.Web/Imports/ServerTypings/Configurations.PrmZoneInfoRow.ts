namespace VistaLOAN.Configurations {
    export interface PrmZoneInfoRow {
        Id?: number;
        ZoneName?: string;
        ZoneNameInBengali?: string;
        ZoneCode?: string;
        SortOrder?: number;
        OrganogramCategoryTypeId?: number;
        ZoneAddress?: string;
        ZoneAddressInBengali?: string;
        Prefix?: string;
        IsHeadOffice?: boolean;
        OrganogramCategoryTypeName?: string;
        OrganogramCategoryTypeSortOrder?: number;
        OrganogramCategoryTypeRemarks?: string;
        OrganogramCategoryTypeIUser?: string;
        OrganogramCategoryTypeEUser?: string;
        OrganogramCategoryTypeIDate?: string;
        OrganogramCategoryTypeEDate?: string;
    }

    export namespace PrmZoneInfoRow {
        export const idProperty = 'Id';
        export const nameProperty = 'ZoneName';
        export const localTextPrefix = 'Configurations.PrmZoneInfo';
        export const lookupKey = 'Configurations.PrmZoneInfoRow';

        export function getLookup(): Q.Lookup<PrmZoneInfoRow> {
            return Q.getLookup<PrmZoneInfoRow>('Configurations.PrmZoneInfoRow');
        }

        export declare const enum Fields {
            Id = "Id",
            ZoneName = "ZoneName",
            ZoneNameInBengali = "ZoneNameInBengali",
            ZoneCode = "ZoneCode",
            SortOrder = "SortOrder",
            OrganogramCategoryTypeId = "OrganogramCategoryTypeId",
            ZoneAddress = "ZoneAddress",
            ZoneAddressInBengali = "ZoneAddressInBengali",
            Prefix = "Prefix",
            IsHeadOffice = "IsHeadOffice",
            OrganogramCategoryTypeName = "OrganogramCategoryTypeName",
            OrganogramCategoryTypeSortOrder = "OrganogramCategoryTypeSortOrder",
            OrganogramCategoryTypeRemarks = "OrganogramCategoryTypeRemarks",
            OrganogramCategoryTypeIUser = "OrganogramCategoryTypeIUser",
            OrganogramCategoryTypeEUser = "OrganogramCategoryTypeEUser",
            OrganogramCategoryTypeIDate = "OrganogramCategoryTypeIDate",
            OrganogramCategoryTypeEDate = "OrganogramCategoryTypeEDate"
        }
    }
}

