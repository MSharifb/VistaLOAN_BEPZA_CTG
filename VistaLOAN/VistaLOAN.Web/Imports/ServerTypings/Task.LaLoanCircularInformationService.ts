namespace VistaLOAN.Task {
    export namespace LaLoanCircularInformationService {
        export const baseUrl = 'Task/LaLoanCircularInformation';

        export declare function Create(request: Serenity.SaveRequest<LaLoanCircularInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaLoanCircularInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanCircularInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanCircularInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaLoanCircularInformation/Create",
            Update = "Task/LaLoanCircularInformation/Update",
            Delete = "Task/LaLoanCircularInformation/Delete",
            Retrieve = "Task/LaLoanCircularInformation/Retrieve",
            List = "Task/LaLoanCircularInformation/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaLoanCircularInformationService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

