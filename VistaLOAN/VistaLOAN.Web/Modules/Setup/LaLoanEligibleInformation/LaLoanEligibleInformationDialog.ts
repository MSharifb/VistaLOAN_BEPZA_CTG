
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanEligibleInformationDialog extends Serenity.EntityDialog<LaLoanEligibleInformationRow, any> {
        protected getFormKey() { return LaLoanEligibleInformationForm.formKey; }
        protected getIdProperty() { return LaLoanEligibleInformationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanEligibleInformationRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanEligibleInformationRow.nameProperty; }
        protected getService() { return LaLoanEligibleInformationService.baseUrl; }

        protected form = new LaLoanEligibleInformationForm(this.idPrefix);

    }
}