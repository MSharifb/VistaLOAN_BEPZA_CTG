
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaLoanIssueGrid extends EntityGridBaseNew<LaLoanIssueRow, any> {
        protected getColumnsKey() { return 'Task.LaLoanIssue'; }
        protected getDialogType() { return LaLoanIssueDialog; }
        protected getIdProperty() { return LaLoanIssueRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanIssueRow.localTextPrefix; }
        protected getService() { return LaLoanIssueService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}