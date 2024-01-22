
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanIssueDetailDialog extends Serenity.EntityDialog<LaLoanIssueDetailRow, any> {
        protected getFormKey() { return LaLoanIssueDetailForm.formKey; }
        protected getIdProperty() { return LaLoanIssueDetailRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanIssueDetailRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanIssueDetailRow.nameProperty; }
        protected getService() { return LaLoanIssueDetailService.baseUrl; }

        protected form = new LaLoanIssueDetailForm(this.idPrefix);

    }
}