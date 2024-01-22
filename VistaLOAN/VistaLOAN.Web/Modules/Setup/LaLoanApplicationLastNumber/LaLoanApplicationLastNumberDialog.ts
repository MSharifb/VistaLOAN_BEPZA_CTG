
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanApplicationLastNumberDialog extends Serenity.EntityDialog<LaLoanApplicationLastNumberRow, any> {
        protected getFormKey() { return LaLoanApplicationLastNumberForm.formKey; }
        protected getIdProperty() { return LaLoanApplicationLastNumberRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanApplicationLastNumberRow.localTextPrefix; }
        protected getService() { return LaLoanApplicationLastNumberService.baseUrl; }

        protected form = new LaLoanApplicationLastNumberForm(this.idPrefix);

    }
}