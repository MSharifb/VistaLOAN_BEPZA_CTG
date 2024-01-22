
namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanIssueDetailEditorDialog extends GridEditorDialog<LaLoanIssueDetailRow> {
        protected getFormKey() { return LaLoanIssueDetailForm.formKey; }
        protected getLocalTextPrefix() { return LaLoanIssueDetailRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanIssueDetailRow.nameProperty; }
        protected form = new LaLoanIssueDetailForm(this.idPrefix);
    }
}