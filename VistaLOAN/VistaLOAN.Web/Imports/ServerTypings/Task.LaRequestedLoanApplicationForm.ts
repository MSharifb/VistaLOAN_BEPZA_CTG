namespace VistaLOAN.Task {
    export interface LaRequestedLoanApplicationForm {
        EmployeeName: Serenity.StringEditor;
        EmployeeId: Serenity.LookupEditor;
        SeniorityNo: Serenity.IntegerEditor;
        LoanCriteriaId: Serenity.LookupEditor;
        LoanNo: Serenity.StringEditor;
        ApplyDate: Serenity.DateEditor;
        ApplyLoanAmount: Serenity.DecimalEditor;
        ApplyPrincipalInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestAmount: Serenity.DecimalEditor;
        ApplyInterestInstallmentNo: Serenity.IntegerEditor;
        ApplyInterestRate: Serenity.DecimalEditor;
        Purpose: Serenity.StringEditor;
        GrantedLoanAmount: Serenity.DecimalEditor;
        GrantedPrincipalInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestAmount: Serenity.DecimalEditor;
        GrantedInterestInstallmentNo: Serenity.IntegerEditor;
        GrantedInterestRate: Serenity.DecimalEditor;
        NodeId: Serenity.IntegerEditor;
        ApproverId: Serenity.LookupEditor;
        NextApproverId: Serenity.LookupEditor;
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        ApprovedDate: Serenity.DateEditor;
        PFLoanType: Serenity.RadioButtonEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
    }

    export class LaRequestedLoanApplicationForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaRequestedLoanApplication';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaRequestedLoanApplicationForm.init)  {
                LaRequestedLoanApplicationForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.LookupEditor;
                var w2 = s.IntegerEditor;
                var w3 = s.DateEditor;
                var w4 = s.DecimalEditor;
                var w5 = s.BooleanEditor;
                var w6 = s.RadioButtonEditor;

                Q.initFormType(LaRequestedLoanApplicationForm, [
                    'EmployeeName', w0,
                    'EmployeeId', w1,
                    'SeniorityNo', w2,
                    'LoanCriteriaId', w1,
                    'LoanNo', w0,
                    'ApplyDate', w3,
                    'ApplyLoanAmount', w4,
                    'ApplyPrincipalInstallmentNo', w2,
                    'ApplyInterestAmount', w4,
                    'ApplyInterestInstallmentNo', w2,
                    'ApplyInterestRate', w4,
                    'Purpose', w0,
                    'GrantedLoanAmount', w4,
                    'GrantedPrincipalInstallmentNo', w2,
                    'GrantedInterestAmount', w4,
                    'GrantedInterestInstallmentNo', w2,
                    'GrantedInterestRate', w4,
                    'NodeId', w2,
                    'ApproverId', w1,
                    'NextApproverId', w1,
                    'AppStatusId', w1,
                    'IsDiscard', w5,
                    'IsApprovalProcess', w5,
                    'IsOffLine', w5,
                    'ApprovedDate', w3,
                    'PFLoanType', w6,
                    'IsReApply', w5,
                    'IsIssue', w5,
                    'ResponsiblePersonId', w0,
                    'EmployeeWiseLoanId', w2
                ]);
            }
        }
    }
}

