
namespace VistaLOAN.Setup {

    @Serenity.Decorators.registerClass()
    export class selectLoanTypeDialog extends Serenity.PropertyDialog<any, any> {
        protected getFormKey() { return SelectLoanTypeForm.formKey; }

        constructor() {
            super();

            var form = new SelectLoanTypeForm(this.idPrefix);

            this.dialogTitle = "Please select Loan Type";
            form.LoanTypeInformationId.value = Authorization.userDefinition.LoanTypeInformationId.toString();

            form.LoanTypeInformationId.changeSelect2(e => {  
                console.log(form.LoanTypeInformationId.value);                    
                var entity = LaLoanTypeRow.getLookup().items.filter(p => p.Id == +form.LoanTypeInformationId.value);
                console.log(entity);
                Authorization.userDefinition.LoanTypeInformationId = +form.LoanTypeInformationId.value;
                Authorization.userDefinition.LoanTypeName = entity[0].LoanTypeName;

                LaLoanTypeService.SetLoanType({ EntityId: form.LoanTypeInformationId.value }, p => {
                    Q.notifySuccess("You selected Loan: " + form.LoanTypeInformationId.text);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                });
            });

        }
    }
}