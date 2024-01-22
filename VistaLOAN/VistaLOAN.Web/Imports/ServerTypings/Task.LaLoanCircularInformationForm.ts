namespace VistaLOAN.Task {
    export interface LaLoanCircularInformationForm {
        LoanTypeId: Serenity.LookupEditor;
        FiscalYearId: Serenity.IntegerEditor;
        CircularDate: Serenity.DateEditor;
        ReferenceNo: Serenity.StringEditor;
        CircularDescription: Serenity.StringEditor;
        Attachment: Serenity.StringEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }

    export class LaLoanCircularInformationForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaLoanCircularInformation';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanCircularInformationForm.init)  {
                LaLoanCircularInformationForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.IntegerEditor;
                var w2 = s.DateEditor;
                var w3 = s.StringEditor;

                Q.initFormType(LaLoanCircularInformationForm, [
                    'LoanTypeId', w0,
                    'FiscalYearId', w1,
                    'CircularDate', w2,
                    'ReferenceNo', w3,
                    'CircularDescription', w3,
                    'Attachment', w3,
                    'IUser', w3,
                    'IDate', w2,
                    'EUser', w3,
                    'EDate', w2
                ]);
            }
        }
    }
}

