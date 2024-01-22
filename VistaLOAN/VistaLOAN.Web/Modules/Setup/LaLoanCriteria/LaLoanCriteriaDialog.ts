
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanCriteriaDialog extends Serenity.EntityDialog<LaLoanCriteriaRow, any> {
        protected getFormKey() { return LaLoanCriteriaForm.formKey; }
        protected getIdProperty() { return LaLoanCriteriaRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanCriteriaRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanCriteriaRow.nameProperty; }
        protected getService() { return LaLoanCriteriaService.baseUrl; }

        protected form = new LaLoanCriteriaForm(this.idPrefix);

    }
}