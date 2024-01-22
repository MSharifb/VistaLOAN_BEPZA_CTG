

namespace VistaLOAN.Loandb {
    export class LaLoanOpeningForm extends Serenity.PrefixedContext {
        static formKey = 'Loandb.LaLoanOpening';
    }

    export interface LaLoanOpeningForm {
        EmployeeId: Serenity.IntegerEditor;
        BalanceMonth: Serenity.IntegerEditor;
        BalanceYear: Serenity.IntegerEditor;
        PrincipalInstallmentNo: Serenity.IntegerEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        PrincipalPaidAmount: Serenity.DecimalEditor;
        PrincipalDueAmount: Serenity.DecimalEditor;
        InterestInstallmentNo: Serenity.IntegerEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        InterestPaidAmount: Serenity.DecimalEditor;
        InterestDueAmount: Serenity.DecimalEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        LoanApplicationId: Serenity.IntegerEditor;
    }

    [['EmployeeId', () => Serenity.IntegerEditor], ['BalanceMonth', () => Serenity.IntegerEditor], ['BalanceYear', () => Serenity.IntegerEditor], ['PrincipalInstallmentNo', () => Serenity.IntegerEditor], ['PrincipalInstallmentAmount', () => Serenity.DecimalEditor], ['PrincipalPaidAmount', () => Serenity.DecimalEditor], ['PrincipalDueAmount', () => Serenity.DecimalEditor], ['InterestInstallmentNo', () => Serenity.IntegerEditor], ['InterestInstallmentAmount', () => Serenity.DecimalEditor], ['InterestPaidAmount', () => Serenity.DecimalEditor], ['InterestDueAmount', () => Serenity.DecimalEditor], ['IUser', () => Serenity.StringEditor], ['IDate', () => Serenity.DateEditor], ['EUser', () => Serenity.StringEditor], ['EDate', () => Serenity.DateEditor], ['LoanApplicationId', () => Serenity.IntegerEditor]].forEach(x => Object.defineProperty(LaLoanOpeningForm.prototype, <string>x[0], { get: function () { return this.w(x[0], (x[1] as any)()); }, enumerable: true, configurable: true }));
}