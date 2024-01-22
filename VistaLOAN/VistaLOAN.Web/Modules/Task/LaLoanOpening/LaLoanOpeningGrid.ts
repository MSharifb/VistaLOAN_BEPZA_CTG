
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaLoanOpeningGrid extends EntityGridBaseNew<LaLoanOpeningRow, any> {
        protected getColumnsKey() { return 'Task.LaLoanOpening'; }
        protected getDialogType() { return LaLoanOpeningDialog; }
        protected getIdProperty() { return LaLoanOpeningRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanOpeningRow.localTextPrefix; }
        protected getService() { return LaLoanOpeningService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}