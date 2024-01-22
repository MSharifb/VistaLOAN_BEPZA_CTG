
namespace VistaLOAN.Task {
    
    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class LaMonthlyLoanInstallmentDetailEditorDialog extends _Ext.EditorDialogBase<LaMonthlyLoanInstallmentDetailRow> {
        protected getFormKey() { return LaMonthlyLoanInstallmentDetailForm.formKey; }
        protected getLocalTextPrefix() { return LaMonthlyLoanInstallmentDetailRow.localTextPrefix; }
        protected getNameProperty() { return LaMonthlyLoanInstallmentDetailRow.nameProperty; }
        protected form = new LaMonthlyLoanInstallmentDetailForm(this.idPrefix);
    }
}