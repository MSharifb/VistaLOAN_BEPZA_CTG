namespace VistaLOAN.Setup {
    export interface LaLoanEligibleInformationForm {
        LoanTypeId: Serenity.LookupEditor;
        EmployeeCategoryId: Serenity.LookupEditor;
        GradeFromId: Serenity.LookupEditor;
        GradeToId: Serenity.LookupEditor;
        ServiceDurationMin: Serenity.IntegerEditor;
        MaxNoLoanApply: Serenity.IntegerEditor;
    }

    export class LaLoanEligibleInformationForm extends Serenity.PrefixedContext {
        static formKey = 'Setup.LaLoanEligibleInformation';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanEligibleInformationForm.init)  {
                LaLoanEligibleInformationForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.IntegerEditor;

                Q.initFormType(LaLoanEligibleInformationForm, [
                    'LoanTypeId', w0,
                    'EmployeeCategoryId', w0,
                    'GradeFromId', w0,
                    'GradeToId', w0,
                    'ServiceDurationMin', w1,
                    'MaxNoLoanApply', w1
                ]);
            }
        }
    }
}

