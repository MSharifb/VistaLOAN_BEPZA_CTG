namespace VistaLOAN {

    @Serenity.Decorators.registerEditor()
    export class TrueFalseEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {

        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions) {
            super(hidden, opt);

            super.addItem({ id: "true", text: "Yes", disabled: false, source: "common" });
            super.addItem({ id: "false", text: "No", disabled: false, source: "common" });
        }
    }

    @Serenity.Decorators.registerEditor()
    export class ApprovalStatusEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {

        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions) {
            super(hidden, opt);

            super.addItem({ id: "1", text: "Draft", disabled: false, source: "common" });
            super.addItem({ id: "2", text: "Cancel", disabled: false, source: "common" });
            super.addItem({ id: "3", text: "Submit", disabled: false, source: "common" });
            super.addItem({ id: "4", text: "Regret", disabled: false, source: "common" });
            super.addItem({ id: "5", text: "Recommend", disabled: false, source: "common" });
            super.addItem({ id: "6", text: "Approved", disabled: false, source: "common" });
        }
    }

    @Serenity.Decorators.registerEditor()
    export class MonthListEditor extends Serenity.Select2Editor<any, any> {

        constructor(container: JQuery) {
            super(container, null);

            this.addItem({ id: "January", text: "January" });
            this.addItem({ id: "February", text: "February" });
            this.addItem({ id: "March", text: "March" });
            this.addItem({ id: "April", text: "April" });
            this.addItem({ id: "May", text: "May" });
            this.addItem({ id: "June", text: "June" });
            this.addItem({ id: "July", text: "July" });
            this.addItem({ id: "August", text: "August" });
            this.addItem({ id: "September", text: "September" });
            this.addItem({ id: "October", text: "October" });
            this.addItem({ id: "November", text: "November" });
            this.addItem({ id: "December", text: "December" });
        }
    }

    @Serenity.Decorators.registerEditor()
    export class CashOrChequeSelectEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {

        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions) {
            super(hidden, opt);

            super.addItem({ id: "Cash", text: "Cash", disabled: false, source: "common" });
            super.addItem({ id: "Cheque", text: "Cheque", disabled: false, source: "common" });
            super.addItem({ id: "JV", text: "JV", disabled: false, source: "common" });
        }
    }

    @Serenity.Decorators.registerEditor()
    export class PFLoanTypeEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {

        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions) {
            super(hidden, opt);

            super.addItem({ id: "Refundable", text: "Refundable", disabled: false, source: "common" });
            super.addItem({ id: "Non-Refundable", text: "Non-Refundable", disabled: false, source: "common" });
            super.addItem({ id: "FinalPayment", text: "Final Payment", disabled: false, source: "common" });
        }
    }

    @Serenity.Decorators.registerEditor()
    export class PFPaymentTypeEditor extends Serenity.Select2Editor<Serenity.SelectEditorOptions, Serenity.Select2Item> {

        constructor(hidden: JQuery, opt: Serenity.SelectEditorOptions) {
            super(hidden, opt);

            super.addItem({ id: "Non-Refundable", text: "Non-Refundable", disabled: false, source: "common" });
            super.addItem({ id: "FinalPayment", text: "Final Payment", disabled: false, source: "common" });
        }
    }
}