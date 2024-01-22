namespace VistaLOAN.Task {
    export interface LaMonthlyLoanInstallmentForm {
        ForMonth: MonthListEditor;
        ForYear: Serenity.StringEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        TotalPrincipalInstallmentAmount: Serenity.DecimalEditor;
        TotalInterestInstallmentAmount: Serenity.DecimalEditor;
        IsProcess: Serenity.BooleanEditor;
        LaMonthlyLoanInstallmentDetailList: LaMonthlyLoanInstallmentDetailEditor;
    }

    export class LaMonthlyLoanInstallmentForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaMonthlyLoanInstallment';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaMonthlyLoanInstallmentForm.init)  {
                LaMonthlyLoanInstallmentForm.init = true;

                var s = Serenity;
                var w0 = MonthListEditor;
                var w1 = s.StringEditor;
                var w2 = s.DateEditor;
                var w3 = s.DecimalEditor;
                var w4 = s.BooleanEditor;
                var w5 = LaMonthlyLoanInstallmentDetailEditor;

                Q.initFormType(LaMonthlyLoanInstallmentForm, [
                    'ForMonth', w0,
                    'ForYear', w1,
                    'IUser', w1,
                    'IDate', w2,
                    'EUser', w1,
                    'EDate', w2,
                    'TotalPrincipalInstallmentAmount', w3,
                    'TotalInterestInstallmentAmount', w3,
                    'IsProcess', w4,
                    'LaMonthlyLoanInstallmentDetailList', w5
                ]);
            }
        }
    }
}

