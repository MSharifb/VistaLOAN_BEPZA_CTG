namespace VistaLOAN.Configurations {
    export namespace ApvApprovalStatusService {
        export const baseUrl = 'Configurations/ApvApprovalStatus';

        export declare function Create(request: Serenity.SaveRequest<ApvApprovalStatusRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<ApvApprovalStatusRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<ApvApprovalStatusRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<ApvApprovalStatusRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Configurations/ApvApprovalStatus/Create",
            Update = "Configurations/ApvApprovalStatus/Update",
            Delete = "Configurations/ApvApprovalStatus/Delete",
            Retrieve = "Configurations/ApvApprovalStatus/Retrieve",
            List = "Configurations/ApvApprovalStatus/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>ApvApprovalStatusService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

