
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaCpfCashOrChequeCollectionGrid extends EntityGridBaseNew<LaCpfCashOrChequeCollectionRow, any> {
        protected getColumnsKey() { return 'Task.LaCpfCashOrChequeCollection'; }
        protected getDialogType() { return LaCpfCashOrChequeCollectionDialog; }
        protected getIdProperty() { return LaCpfCashOrChequeCollectionRow.idProperty; }
        protected getLocalTextPrefix() { return LaCpfCashOrChequeCollectionRow.localTextPrefix; }
        protected getService() { return LaCpfCashOrChequeCollectionService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}