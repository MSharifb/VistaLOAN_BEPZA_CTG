
namespace VistaLOAN.Setup {
    
    @Serenity.Decorators.registerClass()
    export class LaLoanApplicationLastNumberGrid extends Serenity.EntityGrid<LaLoanApplicationLastNumberRow, any> {
        protected getColumnsKey() { return 'Setup.LaLoanApplicationLastNumber'; }
        protected getDialogType() { return LaLoanApplicationLastNumberDialog; }
        protected getIdProperty() { return LaLoanApplicationLastNumberRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanApplicationLastNumberRow.localTextPrefix; }
        protected getService() { return LaLoanApplicationLastNumberService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}