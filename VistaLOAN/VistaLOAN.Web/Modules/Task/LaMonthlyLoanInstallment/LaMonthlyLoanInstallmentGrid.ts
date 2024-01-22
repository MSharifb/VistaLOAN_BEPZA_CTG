
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaMonthlyLoanInstallmentGrid extends EntityGridBaseNew<LaMonthlyLoanInstallmentRow, any> {
        protected getColumnsKey() { return 'Task.LaMonthlyLoanInstallment'; }
        protected getDialogType() { return LaMonthlyLoanInstallmentDialog; }
        protected getIdProperty() { return LaMonthlyLoanInstallmentRow.idProperty; }
        protected getLocalTextPrefix() { return LaMonthlyLoanInstallmentRow.localTextPrefix; }
        protected getService() { return LaMonthlyLoanInstallmentService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }

        protected getButtons() {
            var buttons = super.getButtons();
            buttons.length = 0;
            return buttons;
        }
    }
}