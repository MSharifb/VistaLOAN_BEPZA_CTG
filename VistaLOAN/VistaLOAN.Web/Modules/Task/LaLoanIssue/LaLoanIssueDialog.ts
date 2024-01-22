
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaLoanIssueDialog extends Serenity.EntityDialog<LaLoanIssueRow, any> {
        protected getFormKey() { return LaLoanIssueForm.formKey; }
        protected getIdProperty() { return LaLoanIssueRow.idProperty; }
        protected getLocalTextPrefix() { return LaLoanIssueRow.localTextPrefix; }
        protected getNameProperty() { return LaLoanIssueRow.nameProperty; }
        protected getService() { return LaLoanIssueService.baseUrl; }

        protected form = new LaLoanIssueForm(this.idPrefix);

        //public loanApplicationRow: LaLoanApplicationRow[];
         
        constructor(container: JQuery) {
            super(container);
            this.form.LoanApplicationId.changeSelect2((e) => {
                var loanApplication;
                var loanTypeName;
                var EmpWiseLoanId;

                Task.LaLoanApplicationService.List({}, r => {

                    loanApplication = r.Entities.filter(x => x.Id == +this.form.LoanApplicationId.value)[0];

                    this.form.LoanAmount.value = loanApplication.GrantedLoanAmount;
                    this.form.InterestAmount.value = loanApplication.GrantedInterestAmount;
                });

            });
            this.form.EmployeeId.changeSelect2(e => {
                this.LoanApplication();
            });
        }

        protected LoanApplication() {
            var loanApplicationRow = LaLoanApplicationRow.getLookup().items.filter(x => x.EmployeeId == +this.form.EmployeeId.value && x.AppStatusId == 6 && x.IsIssue == false);
            this.form.LoanApplicationId.clearItems();
            for (var item of loanApplicationRow) {
                this.form.LoanApplicationId.addItem({
                    id: item.Id.toString(),
                    text: item.LoanNo,
                    source: null,
                    disabled: false
                });
            }
        }

        protected onDialogOpen(): void {
            if (this.isEditMode) {
                if (this.entity.LoanApplicationId != undefined)
                this.form.EmployeeId.value = LaLoanApplicationRow.getLookup().items.filter(x => x.Id == this.entity.LoanApplicationId)[0].EmployeeId.toString();
            }
            if (this.isNew()) {
                console.log("OK");
                $("div.field.LastPrincipalInstallmentAmount").hide();
                $("div.field.LastInterestInstallmentAmount").hide();
                $("div.field.CloseDate").hide();
            }
        }
    }
}