
namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    export class NonRefundableFinalPaymentGrid extends EntityGridBaseNew<NonRefundableFinalPaymentRow, any> {
        protected getColumnsKey() { return 'Task.NonRefundableFinalPayment'; }
        protected getDialogType() { return NonRefundableFinalPaymentDialog; }
        protected getIdProperty() { return NonRefundableFinalPaymentRow.idProperty; }
        protected getLocalTextPrefix() { return NonRefundableFinalPaymentRow.localTextPrefix; }
        protected getService() { return NonRefundableFinalPaymentService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }

        protected onViewSubmit() {

            if (!super.onViewSubmit()) {
                return false;
            }
            var request = this.view.params as Serenity.ListRequest;

            request.Criteria = Serenity.Criteria.and(request.Criteria,
                [['PFLoanType'], '!=', 'Refundable']);
            return true;
        }
        protected addButtonClick() {
            this.editItem({
                AppStatusId: 3
            });
        }

    }
}