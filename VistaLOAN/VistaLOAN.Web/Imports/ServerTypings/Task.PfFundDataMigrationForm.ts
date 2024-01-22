

namespace VistaLOAN.Task {
    export class PfFundDataMigrationForm extends Serenity.PrefixedContext {
        static formKey = 'Task.PfFundDataMigration';
    }

    export interface PfFundDataMigrationForm {
        Empid: Serenity.StringEditor;
        Pfid: Serenity.IntegerEditor;
        Basic: Serenity.DecimalEditor;
        Pfintrate: Serenity.DecimalEditor;
        Pfmonth: Serenity.DateEditor;
        Mrat: Serenity.DecimalEditor;
        Brat: Serenity.DecimalEditor;
        Mcont: Serenity.DecimalEditor;
        Mcontcas: Serenity.DecimalEditor;
        Bcont: Serenity.DecimalEditor;
        Lnid: Serenity.IntegerEditor;
        Lnrecovrsal: Serenity.DecimalEditor;
        Lnrecovrcas: Serenity.DecimalEditor;
        LnAmtRefund: Serenity.DecimalEditor;
        LnAmtNonref: Serenity.DecimalEditor;
        Mcontcum: Serenity.DecimalEditor;
        Bcontcum: Serenity.DecimalEditor;
        Intmcum: Serenity.DecimalEditor;
        Intbcum: Serenity.DecimalEditor;
        Dedowncont: Serenity.DecimalEditor;
        Dedbcont: Serenity.DecimalEditor;
        Dedownint: Serenity.DecimalEditor;
        Dedbint: Serenity.DecimalEditor;
        EmpName: Serenity.StringEditor;
    }

    [['Empid', () => Serenity.StringEditor], ['Pfid', () => Serenity.IntegerEditor], ['Basic', () => Serenity.DecimalEditor], ['Pfintrate', () => Serenity.DecimalEditor], ['Pfmonth', () => Serenity.DateEditor], ['Mrat', () => Serenity.DecimalEditor], ['Brat', () => Serenity.DecimalEditor], ['Mcont', () => Serenity.DecimalEditor], ['Mcontcas', () => Serenity.DecimalEditor], ['Bcont', () => Serenity.DecimalEditor], ['Lnid', () => Serenity.IntegerEditor], ['Lnrecovrsal', () => Serenity.DecimalEditor], ['Lnrecovrcas', () => Serenity.DecimalEditor], ['LnAmtRefund', () => Serenity.DecimalEditor], ['LnAmtNonref', () => Serenity.DecimalEditor], ['Mcontcum', () => Serenity.DecimalEditor], ['Bcontcum', () => Serenity.DecimalEditor], ['Intmcum', () => Serenity.DecimalEditor], ['Intbcum', () => Serenity.DecimalEditor], ['Dedowncont', () => Serenity.DecimalEditor], ['Dedbcont', () => Serenity.DecimalEditor], ['Dedownint', () => Serenity.DecimalEditor], ['Dedbint', () => Serenity.DecimalEditor], ['EmpName', () => Serenity.StringEditor]].forEach(x => Object.defineProperty(PfFundDataMigrationForm.prototype, <string>x[0], { get: function () { return this.w(x[0], (x[1] as any)()); }, enumerable: true, configurable: true }));
}