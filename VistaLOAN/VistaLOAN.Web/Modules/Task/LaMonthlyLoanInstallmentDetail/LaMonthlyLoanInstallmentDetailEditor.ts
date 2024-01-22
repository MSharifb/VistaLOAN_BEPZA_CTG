
namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    export class LaMonthlyLoanInstallmentDetailEditor extends _Ext.GridEditorBase<LaMonthlyLoanInstallmentDetailRow> {
        protected getColumnsKey() { return 'Task.LaMonthlyLoanInstallmentDetail'; }
        protected getDialogType() { return LaMonthlyLoanInstallmentDetailEditorDialog; }
                protected getLocalTextPrefix() { return LaMonthlyLoanInstallmentDetailRow.localTextPrefix; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}