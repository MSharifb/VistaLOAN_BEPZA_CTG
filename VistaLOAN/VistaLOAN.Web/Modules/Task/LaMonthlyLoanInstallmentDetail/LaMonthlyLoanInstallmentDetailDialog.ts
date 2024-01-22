
namespace VistaLOAN.Task {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaMonthlyLoanInstallmentDetailDialog extends Serenity.EntityDialog<LaMonthlyLoanInstallmentDetailRow, any> {
        protected getFormKey() { return LaMonthlyLoanInstallmentDetailForm.formKey; }
        protected getIdProperty() { return LaMonthlyLoanInstallmentDetailRow.idProperty; }
        protected getLocalTextPrefix() { return LaMonthlyLoanInstallmentDetailRow.localTextPrefix; }
        protected getNameProperty() { return LaMonthlyLoanInstallmentDetailRow.nameProperty; }
        protected getService() { return LaMonthlyLoanInstallmentDetailService.baseUrl; }

        protected form = new LaMonthlyLoanInstallmentDetailForm(this.idPrefix);

    }
}