
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaRequestedLoanApplicationGrid extends EntityGridBaseNew<LaRequestedLoanApplicationRow, any> {
        protected getColumnsKey() { return 'Task.LaRequestedLoanApplication'; }
        protected getDialogType() { return LaRequestedLoanApplicationDialog; }
        protected getIdProperty() { return LaRequestedLoanApplicationRow.idProperty; }
        protected getLocalTextPrefix() { return LaRequestedLoanApplicationRow.localTextPrefix; }
        protected getService() { return LaRequestedLoanApplicationService.baseUrl; }
        public userInfo = Authorization.userDefinition;
        public empInfo = HRM.EmploymentInfoRow.getLookup().items.filter(x => x.Id == this.userInfo.EmpId)[0];

        constructor(container: JQuery) {
            super(container);
        }
        protected onViewSubmit() {

            if (!super.onViewSubmit()) {
                return false;
            }
            var request = this.view.params as Serenity.ListRequest;

            //var eq = request.EqualityFilter;
            //if (eq.hasOwnProperty('IntAppStatusId') && eq.IntAppStatusId == "")
            //    eq.IntAppStatusId = "6";

            request.Criteria = Serenity.Criteria.and(request.Criteria,
                [['ApproverId'], '=', this.empInfo.Id]);

            return true;
        }

        protected getButtons() {
            var buttons = super.getButtons();
            buttons.length = 0;
            return buttons;
        }
    }
}