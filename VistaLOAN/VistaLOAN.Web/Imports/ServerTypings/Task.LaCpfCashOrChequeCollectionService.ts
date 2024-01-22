namespace VistaLOAN.Task {
    export namespace LaCpfCashOrChequeCollectionService {
        export const baseUrl = 'Task/LaCpfCashOrChequeCollection';

        export declare function Create(request: Serenity.SaveRequest<LaCpfCashOrChequeCollectionRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaCpfCashOrChequeCollectionRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaCpfCashOrChequeCollectionRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaCpfCashOrChequeCollectionRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaCpfCashOrChequeCollection/Create",
            Update = "Task/LaCpfCashOrChequeCollection/Update",
            Delete = "Task/LaCpfCashOrChequeCollection/Delete",
            Retrieve = "Task/LaCpfCashOrChequeCollection/Retrieve",
            List = "Task/LaCpfCashOrChequeCollection/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaCpfCashOrChequeCollectionService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

