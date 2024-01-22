namespace VistaLOAN.Setup {
    export namespace LaLoanApplicationLastNumberService {
        export const baseUrl = 'Setup/LaLoanApplicationLastNumber';

        export declare function Create(request: Serenity.SaveRequest<LaLoanApplicationLastNumberRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaLoanApplicationLastNumberRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanApplicationLastNumberRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanApplicationLastNumberRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Setup/LaLoanApplicationLastNumber/Create",
            Update = "Setup/LaLoanApplicationLastNumber/Update",
            Delete = "Setup/LaLoanApplicationLastNumber/Delete",
            Retrieve = "Setup/LaLoanApplicationLastNumber/Retrieve",
            List = "Setup/LaLoanApplicationLastNumber/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaLoanApplicationLastNumberService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

