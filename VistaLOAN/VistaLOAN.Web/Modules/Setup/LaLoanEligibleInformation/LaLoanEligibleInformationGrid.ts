
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    export class LaLoanEligibleInformationGrid extends EntityGridBaseNew<LaLoanEligibleInformationRow, any> {
        protected getColumnsKey() { return 'Setup.LaLoanEligibleInformation'; }
        protected getDialogType() { return LaLoanEligibleInformationDialog; }
        protected getIdProperty() { return LaLoanEligibleInformationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanEligibleInformationRow.localTextPrefix; }
        protected getService() { return LaLoanEligibleInformationService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}