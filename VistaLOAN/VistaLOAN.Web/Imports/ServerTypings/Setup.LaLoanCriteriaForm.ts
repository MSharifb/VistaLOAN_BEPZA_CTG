namespace VistaLOAN.Setup {
    export interface LaLoanCriteriaForm {
        SchemeName: Serenity.StringEditor;
        LoanTypeId: Serenity.LookupEditor;
    }

    export class LaLoanCriteriaForm extends Serenity.PrefixedContext {
        static formKey = 'Setup.LaLoanCriteria';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanCriteriaForm.init)  {
                LaLoanCriteriaForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.LookupEditor;

                Q.initFormType(LaLoanCriteriaForm, [
                    'SchemeName', w0,
                    'LoanTypeId', w1
                ]);
            }
        }
    }
}

