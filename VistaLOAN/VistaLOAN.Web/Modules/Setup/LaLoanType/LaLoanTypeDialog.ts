
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanTypeDialog extends Serenity.EntityDialog<LaLoanTypeRow, any> {
        protected getFormKey() { return LaLoanTypeForm.formKey; }
        protected getIdProperty() { return LaLoanTypeRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanTypeRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanTypeRow.nameProperty; }
        protected getService() { return LaLoanTypeService.baseUrl; }

        protected form = new LaLoanTypeForm(this.idPrefix);

    }
}