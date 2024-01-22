namespace VistaLOAN.Task {
    export interface LaLoanOpeningForm {
        EmployeeId: Serenity.LookupEditor;
        LoanApplicationId: Serenity.LookupEditor;
        BalanceMonth: MonthListEditor;
        BalanceYear: Serenity.StringEditor;
        PrincipalInstallmentNo: Serenity.IntegerEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        LoanAmount: Serenity.DecimalEditor;
        InterestAmount: Serenity.DecimalEditor;
        PrincipalPaidAmount: Serenity.DecimalEditor;
        PrincipalDueAmount: Serenity.DecimalEditor;
        InterestInstallmentNo: Serenity.IntegerEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        InterestPaidAmount: Serenity.DecimalEditor;
        InterestDueAmount: Serenity.DecimalEditor;
    }

    export class LaLoanOpeningForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaLoanOpening';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanOpeningForm.init)  {
                LaLoanOpeningForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = MonthListEditor;
                var w2 = s.StringEditor;
                var w3 = s.IntegerEditor;
                var w4 = s.DecimalEditor;

                Q.initFormType(LaLoanOpeningForm, [
                    'EmployeeId', w0,
                    'LoanApplicationId', w0,
                    'BalanceMonth', w1,
                    'BalanceYear', w2,
                    'PrincipalInstallmentNo', w3,
                    'PrincipalInstallmentAmount', w4,
                    'LoanAmount', w4,
                    'InterestAmount', w4,
                    'PrincipalPaidAmount', w4,
                    'PrincipalDueAmount', w4,
                    'InterestInstallmentNo', w3,
                    'InterestInstallmentAmount', w4,
                    'InterestPaidAmount', w4,
                    'InterestDueAmount', w4
                ]);
            }
        }
    }
}

