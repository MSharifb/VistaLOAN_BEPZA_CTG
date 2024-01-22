namespace VistaLOAN.Setup {
    export interface SelectLoanTypeForm {
        LoanTypeInformationId: Serenity.LookupEditor;
    }

    export class SelectLoanTypeForm extends Serenity.PrefixedContext {
        static formKey = 'Setup.SelectLoanTypeForm';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!SelectLoanTypeForm.init)  {
                SelectLoanTypeForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;

                Q.initFormType(SelectLoanTypeForm, [
                    'LoanTypeInformationId', w0
                ]);
            }
        }
    }
}

