
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    export class LaLoanCriteriaGrid extends EntityGridBaseNew<LaLoanCriteriaRow, any> {
        protected getColumnsKey() { return 'Setup.LaLoanCriteria'; }
        protected getDialogType() { return LaLoanCriteriaDialog; }
        protected getIdProperty() { return LaLoanCriteriaRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanCriteriaRow.localTextPrefix; }
        protected getService() { return LaLoanCriteriaService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}