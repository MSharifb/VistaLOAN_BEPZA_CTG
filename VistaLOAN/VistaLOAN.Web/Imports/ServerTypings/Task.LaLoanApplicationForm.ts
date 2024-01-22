namespace VistaLOAN.Task {
    export interface LaLoanApplicationForm {
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
        AppStatusId: Serenity.LookupEditor;
        IsDiscard: Serenity.BooleanEditor;
        IsApprovalProcess: Serenity.BooleanEditor;
        IsOffLine: Serenity.BooleanEditor;
        IUser: Serenity.StringEditor;
        IDate: Serenity.DateEditor;
        EUser: Serenity.StringEditor;
        EDate: Serenity.DateEditor;
        ApprovedDate: Serenity.DateEditor;
        PFLoanType: PFLoanTypeEditor;
        IsReApply: Serenity.BooleanEditor;
        IsIssue: Serenity.BooleanEditor;
        ResponsiblePersonId: Serenity.StringEditor;
        EmployeeWiseLoanId: Serenity.IntegerEditor;
        NonRefundPFOwnLoanAmount: Serenity.DecimalEditor;
        NonRefundPFCompanyLoanAmount: Serenity.DecimalEditor;
        NonRefundOwnInterestLoanAmount: Serenity.DecimalEditor;
        NonRefundCompanyInterestLoanAmount: Serenity.DecimalEditor;
        EmpOwnContribution: Serenity.DecimalEditor;
        EmpOwnInterest: Serenity.DecimalEditor;
        CompanyContribution: Serenity.DecimalEditor;
        CompanyInterest: Serenity.DecimalEditor;
        Signature: Serenity.StringEditor;
        Sign: Serenity.StringEditor;
    }

    export class LaLoanApplicationForm extends Serenity.PrefixedContext {
        static formKey = 'Task.LaLoanApplication';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!LaLoanApplicationForm.init)  {
                LaLoanApplicationForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.LookupEditor;
                var w2 = s.IntegerEditor;
                var w3 = s.DateEditor;
                var w4 = s.DecimalEditor;
                var w5 = s.BooleanEditor;
                var w6 = PFLoanTypeEditor;

                Q.initFormType(LaLoanApplicationForm, [
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
                    'AppStatusId', w1,
                    'IsDiscard', w5,
                    'IsApprovalProcess', w5,
                    'IsOffLine', w5,
                    'IUser', w0,
                    'IDate', w3,
                    'EUser', w0,
                    'EDate', w3,
                    'ApprovedDate', w3,
                    'PFLoanType', w6,
                    'IsReApply', w5,
                    'IsIssue', w5,
                    'ResponsiblePersonId', w0,
                    'EmployeeWiseLoanId', w2,
                    'NonRefundPFOwnLoanAmount', w4,
                    'NonRefundPFCompanyLoanAmount', w4,
                    'NonRefundOwnInterestLoanAmount', w4,
                    'NonRefundCompanyInterestLoanAmount', w4,
                    'EmpOwnContribution', w4,
                    'EmpOwnInterest', w4,
                    'CompanyContribution', w4,
                    'CompanyInterest', w4,
                    'Signature', w0,
                    'Sign', w0
                ]);
            }
        }
    }
}

