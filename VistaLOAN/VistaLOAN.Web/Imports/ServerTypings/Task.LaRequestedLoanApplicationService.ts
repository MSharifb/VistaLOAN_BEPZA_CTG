namespace VistaLOAN.Task {
    export namespace LaRequestedLoanApplicationService {
        export const baseUrl = 'Task/LaRequestedLoanApplication';

        export declare function Create(request: Serenity.SaveRequest<LaRequestedLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaRequestedLoanApplicationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaRequestedLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaRequestedLoanApplicationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaRequestedLoanApplication/Create",
            Update = "Task/LaRequestedLoanApplication/Update",
            Delete = "Task/LaRequestedLoanApplication/Delete",
            Retrieve = "Task/LaRequestedLoanApplication/Retrieve",
            List = "Task/LaRequestedLoanApplication/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaRequestedLoanApplicationService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

