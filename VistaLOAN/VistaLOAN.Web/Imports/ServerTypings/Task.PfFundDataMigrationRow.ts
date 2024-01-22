
namespace VistaLOAN.Task {
    export interface PfFundDataMigrationRow {
        Empid?: string;
        Pfid?: number;
        Basic?: number;
        Pfintrate?: number;
        Pfmonth?: string;
        Mrat?: number;
        Brat?: number;
        Mcont?: number;
        Mcontcas?: number;
        Bcont?: number;
        Lnid?: number;
        Lnrecovrsal?: number;
        Lnrecovrcas?: number;
        LnAmtRefund?: number;
        LnAmtNonref?: number;
        Mcontcum?: number;
        Bcontcum?: number;
        Intmcum?: number;
        Intbcum?: number;
        Dedowncont?: number;
        Dedbcont?: number;
        Dedownint?: number;
        Dedbint?: number;
        EmpName?: string;
    }

    export namespace PfFundDataMigrationRow {
        export const nameProperty = 'Empid';
        export const localTextPrefix = 'Task.PfFundDataMigration';

        export namespace Fields {
            export declare const Empid;
            export declare const Pfid;
            export declare const Basic;
            export declare const Pfintrate;
            export declare const Pfmonth;
            export declare const Mrat;
            export declare const Brat;
            export declare const Mcont;
            export declare const Mcontcas;
            export declare const Bcont;
            export declare const Lnid;
            export declare const Lnrecovrsal;
            export declare const Lnrecovrcas;
            export declare const LnAmtRefund;
            export declare const LnAmtNonref;
            export declare const Mcontcum;
            export declare const Bcontcum;
            export declare const Intmcum;
            export declare const Intbcum;
            export declare const Dedowncont;
            export declare const Dedbcont;
            export declare const Dedownint;
            export declare const Dedbint;
            export declare const EmpName;
        }

        ['Empid', 'Pfid', 'Basic', 'Pfintrate', 'Pfmonth', 'Mrat', 'Brat', 'Mcont', 'Mcontcas', 'Bcont', 'Lnid', 'Lnrecovrsal', 'Lnrecovrcas', 'LnAmtRefund', 'LnAmtNonref', 'Mcontcum', 'Bcontcum', 'Intmcum', 'Intbcum', 'Dedowncont', 'Dedbcont', 'Dedownint', 'Dedbint', 'EmpName'].forEach(x => (<any>Fields)[x] = x);
    }
}

