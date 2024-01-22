
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    export class LaLoanTypeGrid extends EntityGridBaseNew<LaLoanTypeRow, any> {
        protected getColumnsKey() { return 'Setup.LaLoanType'; }
        protected getDialogType() { return LaLoanTypeDialog; }
        protected getIdProperty() { return LaLoanTypeRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanTypeRow.localTextPrefix; }
        protected getService() { return LaLoanTypeService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}