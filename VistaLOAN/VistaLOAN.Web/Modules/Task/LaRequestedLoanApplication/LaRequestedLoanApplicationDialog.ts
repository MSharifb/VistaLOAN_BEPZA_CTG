
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.panel()
    export class LaRequestedLoanApplicationDialog extends Serenity.EntityDialog<LaRequestedLoanApplicationRow, any> {
        protected getFormKey() { return LaRequestedLoanApplicationForm.formKey; }
        protected getIdProperty() { return LaRequestedLoanApplicationRow.idProperty; }
        protected getLocalTextPrefix() { return LaRequestedLoanApplicationRow.localTextPrefix; }
        protected getNameProperty() { return LaRequestedLoanApplicationRow.nameProperty; }
        protected getService() { return LaRequestedLoanApplicationService.baseUrl; }

        protected form = new LaRequestedLoanApplicationForm(this.idPrefix);

        protected onDialogOpen(): void {
            $(".PFLoanType").hide();
            if (this.isEditMode) {
                var loanTypeId = Setup.LaLoanCriteriaRow.getLookup().items.filter(x => x.Id == +this.form.LoanCriteriaId.value)[0].LoanTypeId;
                var loanSortName = Setup.LaLoanTypeRow.getLookup().items.filter(x => x.Id == loanTypeId)[0].ShortCode;
                if (loanSortName == "PFL") {
                    $(".PFLoanType").show();
                }
                else {
                    $(".PFLoanType").hide();
                }
            }

            this.saveAndCloseButton.hide();
            this.applyChangesButton.hide();
            this.deleteButton.hide();
        }

        protected getToolbarButtons() {
            var buttons = super.getToolbarButtons();
            buttons.push({
                title: "Recommend", cssClass: "send-button",

                onClick: (x) => {
                    let message = "Are you sure you want to Recommend this application ?";

                    Q.confirm(message, () => {
                        if (this.form.NextApproverId.value == "") {
                            Q.alert("Please select Recommender!");
                            return;
                        }
                        this.form.AppStatusId.value = ApprovalStatus.Recommend.toString();
                        this.form.ApproverId.value = this.form.NextApproverId.value;
                        this.save(p => { Q.notifySuccess("Application is recommended successfully."); this.dialogClose(); });
                    }
                    );
                }
            });

            buttons.push({
                title: "Approve", cssClass: "send-button",

                onClick: (x) => {
                    let message = "Are you sure you want to Approve this application ?";

                    Q.confirm(message, () => {
                        this.form.AppStatusId.value = ApprovalStatus.Approved.toString();
                        this.save(p => { Q.notifySuccess("Application is approved successfully."); this.dialogClose(); });
                    }
                    );
                }
            });

            buttons.push({
                title: "Cancel", cssClass: "send-button",

                onClick: (x) => {
                    let message = "Are you sure you want to Reject this application ?";

                    Q.confirm(message, () => {
                        this.form.AppStatusId.value = ApprovalStatus.Cancel.toString();
                        this.save(p => { Q.notifySuccess("Application is Canceled successfully."); this.dialogClose(); });
                    }
                    );
                }
            });
            return buttons;
        }

    }
}