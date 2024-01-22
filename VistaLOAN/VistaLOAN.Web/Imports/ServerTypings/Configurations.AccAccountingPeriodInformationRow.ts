namespace VistaLOAN.Configurations {
    export interface AccAccountingPeriodInformationRow {
        Id?: number;
        IsActive?: boolean;
        IsClosed?: boolean;
        PeriodEndDate?: string;
        PeriodStartDate?: string;
        YearName?: string;
        FundControlInformationId?: number;
        FundControlInformationCode?: string;
        FundControlInformationFundControlName?: string;
        FundControlInformationBookingDate?: string;
        FundControlInformationCurrencyId?: number;
        FundControlInformationAddress?: string;
        FundControlInformationPhone?: string;
        FundControlInformationMobile?: string;
        FundControlInformationFax?: string;
        FundControlInformationEmail?: string;
        FundControlInformationWebUrl?: string;
        FundControlInformationRemarks?: string;
        FundControlInformationZoneInfoId?: number;
    }

    export namespace AccAccountingPeriodInformationRow {
        export const idProperty = 'Id';
        export const nameProperty = 'YearName';
        export const localTextPrefix = 'Configurations.AccAccountingPeriodInformation';
        export const lookupKey = 'Configurations.AccAccountingPeriodInformation';

        export function getLookup(): Q.Lookup<AccAccountingPeriodInformationRow> {
            return Q.getLookup<AccAccountingPeriodInformationRow>('Configurations.AccAccountingPeriodInformation');
        }

        export declare const enum Fields {
            Id = "Id",
            IsActive = "IsActive",
            IsClosed = "IsClosed",
            PeriodEndDate = "PeriodEndDate",
            PeriodStartDate = "PeriodStartDate",
            YearName = "YearName",
            FundControlInformationId = "FundControlInformationId",
            FundControlInformationCode = "FundControlInformationCode",
            FundControlInformationFundControlName = "FundControlInformationFundControlName",
            FundControlInformationBookingDate = "FundControlInformationBookingDate",
            FundControlInformationCurrencyId = "FundControlInformationCurrencyId",
            FundControlInformationAddress = "FundControlInformationAddress",
            FundControlInformationPhone = "FundControlInformationPhone",
            FundControlInformationMobile = "FundControlInformationMobile",
            FundControlInformationFax = "FundControlInformationFax",
            FundControlInformationEmail = "FundControlInformationEmail",
            FundControlInformationWebUrl = "FundControlInformationWebUrl",
            FundControlInformationRemarks = "FundControlInformationRemarks",
            FundControlInformationZoneInfoId = "FundControlInformationZoneInfoId"
        }
    }
}

