namespace VistaLOAN.Configurations {
    export interface PrmSalaryHeadRow {
        Id?: number;
        GroupId?: number;
        HeadName?: string;
        IsActiveHead?: boolean;
        ShortName?: string;
        HeadType?: string;
        AmountType?: string;
        AccountHeadId?: number;
        EntityNameId?: number;
        IsBasicHead?: boolean;
        IsTaxable?: boolean;
        IsGrossPayHead?: boolean;
        SortOrder?: number;
        DefaultAmount?: number;
        IsOtherAddition?: boolean;
        IsOtherDeduction?: boolean;
        IsIncomeTaxAdditionHead?: boolean;
        IsIncomeTaxDeductionHead?: boolean;
        IsPfOwnContributionHead?: boolean;
        IsPfCompanyContributionHead?: boolean;
        IsHouseRentHead?: boolean;
        IsMedicalHead?: boolean;
        IsConveyanceHead?: boolean;
        IsLeaveWithoutPayHead?: boolean;
        IsPensionHead?: boolean;
        IsGpfHead?: boolean;
        IsArrearHead?: boolean;
        IsGratuityHead?: boolean;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
        GroupName?: string;
        GroupHeadType?: string;
        GroupRemarks?: string;
        GroupSortOrder?: number;
        GroupIUser?: string;
        GroupEUser?: string;
        GroupIDate?: string;
        GroupEDate?: string;
    }

    export namespace PrmSalaryHeadRow {
        export const idProperty = 'Id';
        export const nameProperty = 'HeadName';
        export const localTextPrefix = 'Configurations.PrmSalaryHead';
        export const lookupKey = 'Configurations.PrmSalaryHead';

        export function getLookup(): Q.Lookup<PrmSalaryHeadRow> {
            return Q.getLookup<PrmSalaryHeadRow>('Configurations.PrmSalaryHead');
        }

        export declare const enum Fields {
            Id = "Id",
            GroupId = "GroupId",
            HeadName = "HeadName",
            IsActiveHead = "IsActiveHead",
            ShortName = "ShortName",
            HeadType = "HeadType",
            AmountType = "AmountType",
            AccountHeadId = "AccountHeadId",
            EntityNameId = "EntityNameId",
            IsBasicHead = "IsBasicHead",
            IsTaxable = "IsTaxable",
            IsGrossPayHead = "IsGrossPayHead",
            SortOrder = "SortOrder",
            DefaultAmount = "DefaultAmount",
            IsOtherAddition = "IsOtherAddition",
            IsOtherDeduction = "IsOtherDeduction",
            IsIncomeTaxAdditionHead = "IsIncomeTaxAdditionHead",
            IsIncomeTaxDeductionHead = "IsIncomeTaxDeductionHead",
            IsPfOwnContributionHead = "IsPfOwnContributionHead",
            IsPfCompanyContributionHead = "IsPfCompanyContributionHead",
            IsHouseRentHead = "IsHouseRentHead",
            IsMedicalHead = "IsMedicalHead",
            IsConveyanceHead = "IsConveyanceHead",
            IsLeaveWithoutPayHead = "IsLeaveWithoutPayHead",
            IsPensionHead = "IsPensionHead",
            IsGpfHead = "IsGpfHead",
            IsArrearHead = "IsArrearHead",
            IsGratuityHead = "IsGratuityHead",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate",
            GroupName = "GroupName",
            GroupHeadType = "GroupHeadType",
            GroupRemarks = "GroupRemarks",
            GroupSortOrder = "GroupSortOrder",
            GroupIUser = "GroupIUser",
            GroupEUser = "GroupEUser",
            GroupIDate = "GroupIDate",
            GroupEDate = "GroupEDate"
        }
    }
}

