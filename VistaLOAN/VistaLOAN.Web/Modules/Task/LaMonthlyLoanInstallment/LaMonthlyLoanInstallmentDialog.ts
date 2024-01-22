
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.panel()
    export class LaMonthlyLoanInstallmentDialog extends Serenity.EntityDialog<LaMonthlyLoanInstallmentRow, any> {
        protected getFormKey() { return LaMonthlyLoanInstallmentForm.formKey; }
        protected getIdProperty() { return LaMonthlyLoanInstallmentRow.idProperty; }
        protected getLocalTextPrefix() { return LaMonthlyLoanInstallmentRow.localTextPrefix; }
        protected getNameProperty() { return LaMonthlyLoanInstallmentRow.nameProperty; }
        protected getService() { return LaMonthlyLoanInstallmentService.baseUrl; }

        protected form = new LaMonthlyLoanInstallmentForm(this.idPrefix);

    }
}