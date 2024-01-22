
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaCpfCashOrChequeCollectionDialog extends Serenity.EntityDialog<LaCpfCashOrChequeCollectionRow, any> {
        protected getFormKey() { return LaCpfCashOrChequeCollectionForm.formKey; }
        protected getIdProperty() { return LaCpfCashOrChequeCollectionRow.idProperty; }
        protected getLocalTextPrefix() { return LaCpfCashOrChequeCollectionRow.localTextPrefix; }
        protected getNameProperty() { return LaCpfCashOrChequeCollectionRow.nameProperty; }
        protected getService() { return LaCpfCashOrChequeCollectionService.baseUrl; }

        protected form = new LaCpfCashOrChequeCollectionForm(this.idPrefix);

        constructor() {
            super();

            this.form.ApplicationId.element.closest('.category').toggle(false);
            this.form.PfOwnContribution.element.closest('.category').toggle(false);
            this.form.ApplicationId.getGridField().toggle(false);
            this.form.PrincipalInstallment.element.toggle(false);
            this.form.InterestInstallment.element.toggle(false);
            this.form.PfOwnContribution.element.toggle(false);
        }

        protected onDialogOpen(): void {

            this.ShowHideCollectionType();
            if (this.isEditMode()) {
                if (this.form.CollectionType.value == "1") {
                    this.element.find("label:contains('PF Contribution')").css("display", "none");
                }
                else {
                    this.element.find("label:contains('Loan Installment')").css("display", "none");
                }
            }

            this.form.CollectionType.change(e => {
                this.ShowHideCollectionType();
            });

        }

        public ShowHideCollectionType() {
            this.form.ApplicationId.element.closest('.category').toggle(false);
            this.form.PfOwnContribution.element.closest('.category').toggle(false);
            this.form.ApplicationId.getGridField().toggle(false);
            this.form.PrincipalInstallment.element.closest('.caption').toggle(false);
            this.form.PrincipalInstallment.element.toggle(false);
            this.form.InterestInstallment.element.closest('.caption').toggle(false);
            this.form.InterestInstallment.element.toggle(false);
            this.form.PfOwnContribution.element.closest('.caption').toggle(false);
            this.form.PfOwnContribution.element.toggle(false);

            if (this.form.CollectionType.value == "1") {
                this.form.ApplicationId.element.closest('.category').toggle(true);

                this.form.ApplicationId.getGridField().toggle(true);
                this.form.PrincipalInstallment.element.toggle(true);
                this.form.InterestInstallment.element.toggle(true);
            }
            else {
                this.form.PfOwnContribution.element.closest('.category').toggle(true);
                this.form.PfOwnContribution.element.toggle(true);
            }
        }
    }
}