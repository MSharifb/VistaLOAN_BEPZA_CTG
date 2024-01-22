namespace VistaLOAN.Task {
    export interface LaLoanApplicationOfflineForm {
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
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        ApprovedDate: Serenity.DateEditor;
        PFLoanType: PFLoanTypeEditor;
        NonRefundPFOwnLoanAmount: Serenity.DecimalEditor;
        NonRefundPFCompanyLoanAmount: Serenity.DecimalEditor;
        NonRefundOwnInterestLoanAmount: Serenity.DecimalEditor;
        NonRefundCompanyInterestLoanAmount: Serenity.DecimalEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
        EmpOwnContribution: Serenity.DecimalEditor;
        EmpOwnInterest: Serenity.DecimalEditor;
        CompanyContribution: Serenity.DecimalEditor;
        CompanyInterest: Serenity.DecimalEditor;
    }

    export class LaLoanApplicationOfflineForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaLoanApplicationOffline';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanApplicationOfflineForm.init)  {
                LaLoanApplicationOfflineForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.IntegerEditor;
                var w2 = s.StringEditor;
                var w3 = s.DateEditor;
                var w4 = s.DecimalEditor;
                var w5 = s.BooleanEditor;
                var w6 = PFLoanTypeEditor;

                Q.initFormType(LaLoanApplicationOfflineForm, [
                    'EmployeeId', w0,
                    'SeniorityNo', w1,
                    'LoanCriteriaId', w0,
                    'LoanNo', w2,
                    'ApplyDate', w3,
                    'ApplyLoanAmount', w4,
                    'ApplyPrincipalInstallmentNo', w1,
                    'ApplyInterestAmount', w4,
                    'ApplyInterestInstallmentNo', w1,
                    'ApplyInterestRate', w4,
                    'Purpose', w2,
                    'GrantedLoanAmount', w4,
                    'GrantedPrincipalInstallmentNo', w1,
                    'GrantedInterestAmount', w4,
                    'GrantedInterestInstallmentNo', w1,
                    'GrantedInterestRate', w4,
                    'NodeId', w1,
                    'ApproverId', w0,
                    'AppStatusId', w0,
                    'IsDiscard', w5,
                    'IsApprovalProcess', w5,
                    'IsOffLine', w5,
                    'ApprovedDate', w3,
                    'PFLoanType', w6,
                    'NonRefundPFOwnLoanAmount', w4,
                    'NonRefundPFCompanyLoanAmount', w4,
                    'NonRefundOwnInterestLoanAmount', w4,
                    'NonRefundCompanyInterestLoanAmount', w4,
                    'IsReApply', w5,
                    'IsIssue', w5,
                    'ResponsiblePersonId', w2,
                    'EmployeeWiseLoanId', w1,
                    'EmpOwnContribution', w4,
                    'EmpOwnInterest', w4,
                    'CompanyContribution', w4,
                    'CompanyInterest', w4
                ]);
            }
        }
    }
}

