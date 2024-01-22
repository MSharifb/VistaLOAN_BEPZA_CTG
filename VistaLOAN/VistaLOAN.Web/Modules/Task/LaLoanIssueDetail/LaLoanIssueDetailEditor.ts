

namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    export class LaLoanIssueDetailEditor extends GridEditorBase<LaLoanIssueDetailRow> {
        protected getColumnsKey() { return 'Task.LaLoanIssueDetail'; }
        protected getDialogType() { return LaLoanIssueDetailEditorDialog; }
                protected getLocalTextPrefix() { return LaLoanIssueDetailRow.localTextPrefix; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}