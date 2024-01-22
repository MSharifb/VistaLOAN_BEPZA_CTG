namespace VistaLOAN.Task.Repositories {
    export interface eCPFContributionRequest extends Serenity.ListRequest {
        EmployeeId?: number;
        Year?: string;
        Month?: string;
    }
}

