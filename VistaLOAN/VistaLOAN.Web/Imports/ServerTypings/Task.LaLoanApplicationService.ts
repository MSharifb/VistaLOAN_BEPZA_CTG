namespace VistaLOAN.Task {
    export namespace LaLoanApplicationService {
        export const baseUrl = 'Task/LaLoanApplication';

        export declare function Create(request: Serenity.SaveRequest<LaLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function GetCPFContribution(request: Task.Repositories.eCPFContributionRequest, onSuccess?: (response: Task.Repositories.GetCPFContributionResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function GetCPFPolicy(request: Task.Repositories.eCPFPolicyRequest, onSuccess?: (response: Task.Repositories.GetCPFPolicyResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function GetForfeitedRule(request: Task.Repositories.eForfeitedRuleRequest, onSuccess?: (response: Task.Repositories.GetForfeitedRuleResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaLoanApplication/Create",
            Update = "Task/LaLoanApplication/Update",
            Delete = "Task/LaLoanApplication/Delete",
            Retrieve = "Task/LaLoanApplication/Retrieve",
            List = "Task/LaLoanApplication/List",
            GetCPFContribution = "Task/LaLoanApplication/GetCPFContribution",
            GetCPFPolicy = "Task/LaLoanApplication/GetCPFPolicy",
            GetForfeitedRule = "Task/LaLoanApplication/GetForfeitedRule"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List', 
            'GetCPFContribution', 
            'GetCPFPolicy', 
            'GetForfeitedRule'
        ].forEach(x => {
            (<any>LaLoanApplicationService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

