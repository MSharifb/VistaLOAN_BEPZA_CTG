
namespace VistaLOAN.Task {
    import fld = LaLoanApplicationRow.Fields;

    @Serenity.Decorators.registerClass()
    export class LaLoanApplicationOfflineGrid extends EntityGridBaseNew<LaLoanApplicationRow, any> {
        protected getColumnsKey() { return 'Task.LaLoanApplicationOffline'; }
        protected getDialogType() { return LaLoanApplicationOfflineDialog; }
        protected getIdProperty() { return LaLoanApplicationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanApplicationRow.localTextPrefix; }
        protected getService() { return LaLoanApplicationService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }

        //protected getColumns(): Slick.Column[] {
        //    var columns = super.getColumns();         
        //    // It is using to change backcolor of approved voucher.
        //    Q.first(columns, x => x.field == fld.I).cssClass += " col-Approve-Status";

        //    return columns;
        //}

        protected onViewSubmit() {

            if (!super.onViewSubmit()) {
                return false;
            }
            var request = this.view.params as Serenity.ListRequest;

            request.Criteria = Serenity.Criteria.and(request.Criteria,
                [['IsOffLine'], '=', '1']);
            return true;
        }
        protected addButtonClick() {

            this.editItem({
                AppStatusId: 3
            });
        }
    }
}