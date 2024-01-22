namespace VistaLOAN.Task {
    export interface LaCpfCashOrChequeCollectionForm {
        EmployeeId: Serenity.LookupEditor;
        CollectionMonth: MonthListEditor;
        CollectionYear: Serenity.StringEditor;
        CashorCheque: CashOrChequeSelectEditor;
        CollectionDate: Serenity.DateEditor;
        Remarks: Serenity.TextAreaEditor;
        CollectionType: Serenity.RadioButtonEditor;
        ApplicationId: Serenity.LookupEditor;
        PrincipalInstallment: Serenity.DecimalEditor;
        InterestInstallment: Serenity.DecimalEditor;
        PfOwnContribution: Serenity.DecimalEditor;
        PFOwnInterest: Serenity.DecimalEditor;
        PFCompanyContribution: Serenity.DecimalEditor;
        PFCompanyInterest: Serenity.DecimalEditor;
    }

    export class LaCpfCashOrChequeCollectionForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaCpfCashOrChequeCollection';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaCpfCashOrChequeCollectionForm.init)  {
                LaCpfCashOrChequeCollectionForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = MonthListEditor;
                var w2 = s.StringEditor;
                var w3 = CashOrChequeSelectEditor;
                var w4 = s.DateEditor;
                var w5 = s.TextAreaEditor;
                var w6 = s.RadioButtonEditor;
                var w7 = s.DecimalEditor;

                Q.initFormType(LaCpfCashOrChequeCollectionForm, [
                    'EmployeeId', w0,
                    'CollectionMonth', w1,
                    'CollectionYear', w2,
                    'CashorCheque', w3,
                    'CollectionDate', w4,
                    'Remarks', w5,
                    'CollectionType', w6,
                    'ApplicationId', w0,
                    'PrincipalInstallment', w7,
                    'InterestInstallment', w7,
                    'PfOwnContribution', w7,
                    'PFOwnInterest', w7,
                    'PFCompanyContribution', w7,
                    'PFCompanyInterest', w7
                ]);
            }
        }
    }
}

