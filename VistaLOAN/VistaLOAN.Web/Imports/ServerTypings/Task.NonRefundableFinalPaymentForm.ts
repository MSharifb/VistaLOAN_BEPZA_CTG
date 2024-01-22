namespace VistaLOAN.Task {
    export interface NonRefundableFinalPaymentForm {
        EmployeeId: Serenity.LookupEditor;
        SeniorityNo: Serenity.IntegerEditor;
        LoanCriteriaId: Serenity.LookupEditor;
        PFLoanType: PFPaymentTypeEditor;
        ApplyDate: Serenity.DateEditor;
        LoanNo: Serenity.StringEditor;
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
        NonRefundPFOwnLoanAmount: Serenity.DecimalEditor;
        NonRefundPFCompanyLoanAmount: Serenity.DecimalEditor;
        NonRefundOwnInterestLoanAmount: Serenity.DecimalEditor;
        NonRefundCompanyInterestLoanAmount: Serenity.DecimalEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmpOwnContribution: Serenity.DecimalEditor;
        EmpOwnInterest: Serenity.DecimalEditor;
        CompanyContribution: Serenity.DecimalEditor;
        CompanyInterest: Serenity.DecimalEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
    }

    export class NonRefundableFinalPaymentForm extends Serenity.PrefixedContext {
        static formKey = 'Task.NonRefundableFinalPayment';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!NonRefundableFinalPaymentForm.init)  {
                NonRefundableFinalPaymentForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.IntegerEditor;
                var w2 = PFPaymentTypeEditor;
                var w3 = s.DateEditor;
                var w4 = s.StringEditor;
                var w5 = s.DecimalEditor;
                var w6 = s.BooleanEditor;

                Q.initFormType(NonRefundableFinalPaymentForm, [
                    'EmployeeId', w0,
                    'SeniorityNo', w1,
                    'LoanCriteriaId', w0,
                    'PFLoanType', w2,
                    'ApplyDate', w3,
                    'LoanNo', w4,
                    'ApplyLoanAmount', w5,
                    'ApplyPrincipalInstallmentNo', w1,
                    'ApplyInterestAmount', w5,
                    'ApplyInterestInstallmentNo', w1,
                    'ApplyInterestRate', w5,
                    'Purpose', w4,
                    'GrantedLoanAmount', w5,
                    'GrantedPrincipalInstallmentNo', w1,
                    'GrantedInterestAmount', w5,
                    'GrantedInterestInstallmentNo', w1,
                    'GrantedInterestRate', w5,
                    'NodeId', w1,
                    'ApproverId', w0,
                    'AppStatusId', w0,
                    'IsDiscard', w6,
                    'IsApprovalProcess', w6,
                    'IsOffLine', w6,
                    'ApprovedDate', w3,
                    'NonRefundPFOwnLoanAmount', w5,
                    'NonRefundPFCompanyLoanAmount', w5,
                    'NonRefundOwnInterestLoanAmount', w5,
                    'NonRefundCompanyInterestLoanAmount', w5,
                    'IsReApply', w6,
                    'IsIssue', w6,
                    'ResponsiblePersonId', w4,
                    'EmpOwnContribution', w5,
                    'EmpOwnInterest', w5,
                    'CompanyContribution', w5,
                    'CompanyInterest', w5,
                    'EmployeeWiseLoanId', w1,
                    'IUser', w4,
                    'IDate', w3,
                    'EUser', w4,
                    'EDate', w3
                ]);
            }
        }
    }
}

