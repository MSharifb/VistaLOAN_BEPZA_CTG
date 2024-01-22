namespace VistaLOAN.Task {
    export namespace LaLoanIssueDetailService {
        export const baseUrl = 'Task/LaLoanIssueDetail';

        export declare function Create(request: Serenity.SaveRequest<LaLoanIssueDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaLoanIssueDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanIssueDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanIssueDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaLoanIssueDetail/Create",
            Update = "Task/LaLoanIssueDetail/Update",
            Delete = "Task/LaLoanIssueDetail/Delete",
            Retrieve = "Task/LaLoanIssueDetail/Retrieve",
            List = "Task/LaLoanIssueDetail/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaLoanIssueDetailService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

