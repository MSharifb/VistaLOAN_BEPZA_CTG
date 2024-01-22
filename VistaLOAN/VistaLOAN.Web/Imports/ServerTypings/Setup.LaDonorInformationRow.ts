namespace VistaLOAN.Setup {
    export interface LaDonorInformationRow {
        Id?: number;
        DonorName?: string;
        Address?: string;
        PhoneNo?: string;
        FaxNo?: string;
        Email?: string;
        MobileNo?: string;
        ContactPersonName?: string;
        ContanctPersonMobileNo?: string;
        Remark?: string;
        __id?: number;
        IUser?: string;
        EUser?: string;
        IDate?: string;
        EDate?: string;
    }

    export namespace LaDonorInformationRow {
        export const idProperty = 'Id';
        export const nameProperty = 'DonorName';
        export const localTextPrefix = 'Setup.LaDonorInformation';
        export const lookupKey = 'Setup.LaDonorInformation';

        export function getLookup(): Q.Lookup<LaDonorInformationRow> {
            return Q.getLookup<LaDonorInformationRow>('Setup.LaDonorInformation');
        }

        export declare const enum Fields {
            Id = "Id",
            DonorName = "DonorName",
            Address = "Address",
            PhoneNo = "PhoneNo",
            FaxNo = "FaxNo",
            Email = "Email",
            MobileNo = "MobileNo",
            ContactPersonName = "ContactPersonName",
            ContanctPersonMobileNo = "ContanctPersonMobileNo",
            Remark = "Remark",
            __id = "__id",
            IUser = "IUser",
            EUser = "EUser",
            IDate = "IDate",
            EDate = "EDate"
        }
    }
}

