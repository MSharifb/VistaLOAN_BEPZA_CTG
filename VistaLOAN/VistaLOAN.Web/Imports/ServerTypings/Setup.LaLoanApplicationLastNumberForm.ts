namespace VistaLOAN.Setup {
    export interface LaLoanApplicationLastNumberForm {
        LoanCriteriaId: Serenity.LookupEditor;
        LastLoanNumber: Serenity.IntegerEditor;
    }

    export class LaLoanApplicationLastNumberForm extends Serenity.PrefixedContext {
        static formKey = 'Setup.LaLoanApplicationLastNumber';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanApplicationLastNumberForm.init)  {
                LaLoanApplicationLastNumberForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.IntegerEditor;

                Q.initFormType(LaLoanApplicationLastNumberForm, [
                    'LoanCriteriaId', w0,
                    'LastLoanNumber', w1
                ]);
            }
        }
    }
}

