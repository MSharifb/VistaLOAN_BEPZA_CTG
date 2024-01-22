
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaLoanCircularInformationGrid extends EntityGridBaseNew<LaLoanCircularInformationRow, any> {
        protected getColumnsKey() { return 'Task.LaLoanCircularInformation'; }
        protected getDialogType() { return LaLoanCircularInformationDialog; }
        protected getIdProperty() { return LaLoanCircularInformationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanCircularInformationRow.localTextPrefix; }
        protected getService() { return LaLoanCircularInformationService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}