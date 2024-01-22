
namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    export class LaMonthlyLoanInstallmentDetailGrid extends Serenity.EntityGrid<LaMonthlyLoanInstallmentDetailRow, any> {
        protected getColumnsKey() { return 'Task.LaMonthlyLoanInstallmentDetail'; }
        protected getDialogType() { return LaMonthlyLoanInstallmentDetailDialog; }
        protected getIdProperty() { return LaMonthlyLoanInstallmentDetailRow.idProperty; }
        protected getLocalTextPrefix() { return LaMonthlyLoanInstallmentDetailRow.localTextPrefix; }
        protected getService() { return LaMonthlyLoanInstallmentDetailService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}