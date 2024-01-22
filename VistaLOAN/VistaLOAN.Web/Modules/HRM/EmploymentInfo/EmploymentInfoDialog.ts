
namespace VistaLOAN.HRM {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class EmploymentInfoDialog extends Serenity.EntityDialog<EmploymentInfoRow, any> {
        protected getFormKey() { return EmploymentInfoForm.formKey; }
        protected getIdProperty() { return EmploymentInfoRow.idProperty; }
        protected getLocalTextPrefix() { return EmploymentInfoRow.localTextPrefix; }
        protected getNameProperty() { return EmploymentInfoRow.nameProperty; }
        protected getService() { return EmploymentInfoService.baseUrl; }

        protected form = new EmploymentInfoForm(this.idPrefix);

    }
}