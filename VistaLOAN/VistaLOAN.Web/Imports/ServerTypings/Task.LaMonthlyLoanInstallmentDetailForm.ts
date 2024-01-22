namespace VistaLOAN.Task {
    export interface LaMonthlyLoanInstallmentDetailForm {
        MonthlyLoanInstallmentId: Serenity.LookupEditor;
        LoanIssueId: Serenity.LookupEditor;
        EmployeeId: Serenity.LookupEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        TotalInstallmentAmount: Serenity.DecimalEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }

    export class LaMonthlyLoanInstallmentDetailForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaMonthlyLoanInstallmentDetail';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaMonthlyLoanInstallmentDetailForm.init)  {
                LaMonthlyLoanInstallmentDetailForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.DecimalEditor;
                var w2 = s.StringEditor;
                var w3 = s.DateEditor;

                Q.initFormType(LaMonthlyLoanInstallmentDetailForm, [
                    'MonthlyLoanInstallmentId', w0,
                    'LoanIssueId', w0,
                    'EmployeeId', w0,
                    'PrincipalInstallmentAmount', w1,
                    'InterestInstallmentAmount', w1,
                    'TotalInstallmentAmount', w1,
                    'IUser', w2,
                    'IDate', w3,
                    'EUser', w2,
                    'EDate', w3
                ]);
            }
        }
    }
}

