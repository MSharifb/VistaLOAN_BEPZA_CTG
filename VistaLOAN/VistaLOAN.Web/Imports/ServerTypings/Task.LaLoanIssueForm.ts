namespace VistaLOAN.Task {
    export interface LaLoanIssueForm {
        EmployeeId: Serenity.LookupEditor;
        LoanApplicationId: Serenity.LookupEditor;
        EffectiveMonth: Serenity.IntegerEditor;
        EffectiveYear: Serenity.IntegerEditor;
        LoanAmount: Serenity.DecimalEditor;
        PrincipalInstallmentAmount: Serenity.DecimalEditor;
        InterestAmount: Serenity.DecimalEditor;
        InterestInstallmentAmount: Serenity.DecimalEditor;
        IsFullPaid: Serenity.BooleanEditor;
        IsReschedule: Serenity.BooleanEditor;
        IsClose: Serenity.BooleanEditor;
        FullPaidDate: Serenity.DateEditor;
        LastPrincipalInstallmentAmount: Serenity.DecimalEditor;
        LastInterestInstallmentAmount: Serenity.DecimalEditor;
        IsPosting: Serenity.BooleanEditor;
        CloseDate: Serenity.DateEditor;
        LaLoanIssueDetail: LaLoanIssueDetailEditor;
    }

    export class LaLoanIssueForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaLoanIssue';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanIssueForm.init)  {
                LaLoanIssueForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.IntegerEditor;
                var w2 = s.DecimalEditor;
                var w3 = s.BooleanEditor;
                var w4 = s.DateEditor;
                var w5 = LaLoanIssueDetailEditor;

                Q.initFormType(LaLoanIssueForm, [
                    'EmployeeId', w0,
                    'LoanApplicationId', w0,
                    'EffectiveMonth', w1,
                    'EffectiveYear', w1,
                    'LoanAmount', w2,
                    'PrincipalInstallmentAmount', w2,
                    'InterestAmount', w2,
                    'InterestInstallmentAmount', w2,
                    'IsFullPaid', w3,
                    'IsReschedule', w3,
                    'IsClose', w3,
                    'FullPaidDate', w4,
                    'LastPrincipalInstallmentAmount', w2,
                    'LastInterestInstallmentAmount', w2,
                    'IsPosting', w3,
                    'CloseDate', w4,
                    'LaLoanIssueDetail', w5
                ]);
            }
        }
    }
}

