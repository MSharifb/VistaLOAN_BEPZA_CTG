namespace VistaLOAN.Setup {
    export interface LaLoanTypeForm {
        LoanTypeName: Serenity.StringEditor;
        PrincipalHeadId: Serenity.LookupEditor;
        InterestHeadId: Serenity.LookupEditor;
        IsWelfareLoan: Serenity.BooleanEditor;
        IsPfLoan: Serenity.BooleanEditor;
        IsInterestPaymentWithPricipal: Serenity.BooleanEditor;
        IsInterestCalculateOnIssueDate: Serenity.BooleanEditor;
        GracePeriodMonth: Serenity.IntegerEditor;
        CalculationType: Serenity.IntegerEditor;
        ShortCode: Serenity.StringEditor;
    }

    export class LaLoanTypeForm extends Serenity.PrefixedContext {
        static formKey = 'Setup.LaLoanType';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanTypeForm.init)  {
                LaLoanTypeForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.LookupEditor;
                var w2 = s.BooleanEditor;
                var w3 = s.IntegerEditor;

                Q.initFormType(LaLoanTypeForm, [
                    'LoanTypeName', w0,
                    'PrincipalHeadId', w1,
                    'InterestHeadId', w1,
                    'IsWelfareLoan', w2,
                    'IsPfLoan', w2,
                    'IsInterestPaymentWithPricipal', w2,
                    'IsInterestCalculateOnIssueDate', w2,
                    'GracePeriodMonth', w3,
                    'CalculationType', w3,
                    'ShortCode', w0
                ]);
            }
        }
    }
}

