
namespace VistaLOAN.HRM {
    
    @Serenity.Decorators.registerClass()
    export class EmploymentInfoGrid extends Serenity.EntityGrid<EmploymentInfoRow, any> {
        protected getColumnsKey() { return 'HRM.EmploymentInfo'; }
        protected getDialogType() { return EmploymentInfoDialog; }
        protected getIdProperty() { return EmploymentInfoRow.idProperty; }
        protected getLocalTextPrefix() { return EmploymentInfoRow.localTextPrefix; }
        protected getService() { return EmploymentInfoService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}