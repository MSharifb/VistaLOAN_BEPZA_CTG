
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    export class LaLoanApplicationGrid extends EntityGridBaseNew<LaLoanApplicationRow, any> {
        protected getColumnsKey() { return 'Task.LaLoanApplication'; }
        protected getDialogType() { return LaLoanApplicationDialog; }
        protected getIdProperty() { return LaLoanApplicationRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanApplicationRow.localTextPrefix; }
        protected getService() { return LaLoanApplicationService.baseUrl; }

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

            request.Criteria = Serenity.Criteria.and(request.Criteria,
                [['EmployeeId'], '=', this.empInfo.Id], [['IsOffLine'], '=', '0']);
            return true;
        }

        protected addButtonClick() {
            console.log(this.userInfo);
            var empSignature = HRM.EmpPhotoRow.getLookup().items.filter(x => x.EmployeeId == this.userInfo.EmpId && x.IsPhoto == false)[0];
            console.log(empSignature);
            var sign = '';
            if (empSignature != undefined)
                sign = 'data:image/jpeg;base64,' + empSignature.PhotoSignature;

            this.editItem({
                EmpId: this.empInfo.LookupText,
                EmployeeName: this.empInfo.LookupText,
                EmployeeId: this.empInfo.Id,
                AppStatusId: 3,
                Signature: sign
            });
        }

    }
}