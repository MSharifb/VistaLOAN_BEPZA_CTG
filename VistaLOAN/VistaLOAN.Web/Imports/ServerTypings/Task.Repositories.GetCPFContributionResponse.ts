namespace VistaLOAN.Task.Repositories {
    export interface GetCPFContributionResponse extends Serenity.ServiceResponse {
        EmployeeId?: number;
        EmpID?: string;
        EmployeeName?: string;
        EmpCoreContribution?: number;
        EmpProfit?: number;
        ComCoreContribution?: number;
        ComProfit?: number;
    }
}

