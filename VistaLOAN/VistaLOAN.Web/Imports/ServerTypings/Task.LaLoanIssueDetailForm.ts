namespace VistaLOAN.Task {
    export interface LaLoanIssueDetailForm {
        LoanIssueId: Serenity.IntegerEditor;
        IssueDate: Serenity.DateEditor;
        LoanPaidAmount: Serenity.DecimalEditor;
    }

    export class LaLoanIssueDetailForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaLoanIssueDetail';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanIssueDetailForm.init)  {
                LaLoanIssueDetailForm.init = true;

                var s = Serenity;
                var w0 = s.IntegerEditor;
                var w1 = s.DateEditor;
                var w2 = s.DecimalEditor;

                Q.initFormType(LaLoanIssueDetailForm, [
                    'LoanIssueId', w0,
                    'IssueDate', w1,
                    'LoanPaidAmount', w2
                ]);
            }
        }
    }
}

