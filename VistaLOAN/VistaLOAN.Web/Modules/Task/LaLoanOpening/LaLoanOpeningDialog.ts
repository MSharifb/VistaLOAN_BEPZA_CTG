
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanOpeningDialog extends Serenity.EntityDialog<LaLoanOpeningRow, any> {
        protected getFormKey() { return LaLoanOpeningForm.formKey; }
        protected getIdProperty() { return LaLoanOpeningRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanOpeningRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanOpeningRow.nameProperty; }
        protected getService() { return LaLoanOpeningService.baseUrl; }

        protected form = new LaLoanOpeningForm(this.idPrefix);
        constructor() {
            super();

            var LoanApp;
            Task.LaLoanApplicationService.List({}, r => {
                LoanApp = r.Entities.filter(x => x.Id == +this.form.LoanApplicationId.value)[0];
                this.form.LoanAmount.value = LoanApp.GrantedLoanAmount;
                this.form.InterestAmount.value = LoanApp.GrantedInterestAmount;
            });
        }

        onDialogOpen(): void {
            super.onDialogOpen();

            this.form.LoanApplicationId.changeSelect2((e) => {
                var LoanApp;
                Task.LaLoanApplicationService.List({}, r => {
                    LoanApp = r.Entities.filter(x => x.Id == +this.form.LoanApplicationId.value)[0];
                    this.form.LoanAmount.value = LoanApp.GrantedLoanAmount;
                    this.form.InterestAmount.value = LoanApp.GrantedInterestAmount;
                });

            });

            this.form.PrincipalPaidAmount.change((e) => {
                this.form.PrincipalDueAmount.value = this.form.LoanAmount.value - this.form.PrincipalPaidAmount.value;
            });
            this.form.InterestPaidAmount.change((e) => {
                this.form.InterestDueAmount.value = this.form.InterestAmount.value - this.form.InterestPaidAmount.value;
            });
        }

    }
}