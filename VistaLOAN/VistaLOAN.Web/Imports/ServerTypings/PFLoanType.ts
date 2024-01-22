namespace VistaLOAN {
    export enum PFLoanType {
        NonRefundable = 0,
        Refundable = 1
    }
    Serenity.Decorators.registerEnumType(PFLoanType, 'VistaLOAN.PFLoanType', 'PFLoanType');
}

