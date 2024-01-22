
namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    export class LaLoanIssueDetailGrid extends Serenity.EntityGrid<LaLoanIssueDetailRow, any> {
        protected getColumnsKey() { return 'Task.LaLoanIssueDetail'; }
        protected getDialogType() { return LaLoanIssueDetailDialog; }
        protected getIdProperty() { return LaLoanIssueDetailRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanIssueDetailRow.localTextPrefix; }
        protected getService() { return LaLoanIssueDetailService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}