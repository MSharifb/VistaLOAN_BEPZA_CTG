namespace VistaLOAN {
    export enum ApprovalStatus {
        Draft = 1,
        Cancel = 2,
        Submit = 3,
        Regret = 4,
        Recommend = 5,
        Approved = 6
    }
    Serenity.Decorators.registerEnumType(ApprovalStatus, 'VistaLOAN.ApprovalStatus', 'ApprovalStatus');
}

