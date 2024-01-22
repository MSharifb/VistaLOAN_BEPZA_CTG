
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaDonorInformationDialog extends Serenity.EntityDialog<LaDonorInformationRow, any> {
        protected getFormKey() { return LaDonorInformationForm.formKey; }
        protected getIdProperty() { return LaDonorInformationRow.idProperty; }
        protected getLocalTextPrefix() { return LaDonorInformationRow.localTextPrefix; }
        protected getNameProperty() { return LaDonorInformationRow.nameProperty; }
        protected getService() { return LaDonorInformationService.baseUrl; }

        protected form = new LaDonorInformationForm(this.idPrefix);


    }
}