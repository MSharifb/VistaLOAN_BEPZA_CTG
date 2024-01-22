
namespace VistaLOAN.Setup {
    
    @Serenity.Decorators.registerClass()
    export class LaDonorInformationGrid extends Serenity.EntityGrid<LaDonorInformationRow, any> {
        protected getColumnsKey() { return 'Setup.LaDonorInformation'; }
        protected getDialogType() { return LaDonorInformationDialog; }
        protected getIdProperty() { return LaDonorInformationRow.idProperty; }
        protected getLocalTextPrefix() { return LaDonorInformationRow.localTextPrefix; }
        protected getService() { return LaDonorInformationService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}