namespace VistaLOAN {
    export interface GetNextVoucherNumberRequest extends Serenity.ServiceRequest {
        TransactionTypeId?: number;
        Prefix?: string;
        Length?: number;
        StartingNumber?: number;
        ZoneID?: number;
        FundControlInformationId?: number;
    }
}

