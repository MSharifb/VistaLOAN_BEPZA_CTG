
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanCircularInformationDialog extends Serenity.EntityDialog<LaLoanCircularInformationRow, any> {
        protected getFormKey() { return LaLoanCircularInformationForm.formKey; }
        protected getIdProperty() { return LaLoanCircularInformationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanCircularInformationRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanCircularInformationRow.nameProperty; }
        protected getService() { return LaLoanCircularInformationService.baseUrl; }

        protected form = new LaLoanCircularInformationForm(this.idPrefix);

    }
}