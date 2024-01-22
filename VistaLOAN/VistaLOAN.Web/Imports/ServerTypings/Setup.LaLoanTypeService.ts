namespace VistaLOAN.Setup {
    export namespace LaLoanTypeService {
        export const baseUrl = 'Setup/LaLoanType';

        export declare function Create(request: Serenity.SaveRequest<LaLoanTypeRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaLoanTypeRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanTypeRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaLoanTypeRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function SetLoanType(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaLoanTypeRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Setup/LaLoanType/Create",
            Update = "Setup/LaLoanType/Update",
            Delete = "Setup/LaLoanType/Delete",
            Retrieve = "Setup/LaLoanType/Retrieve",
            List = "Setup/LaLoanType/List",
            SetLoanType = "Setup/LaLoanType/SetLoanType"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List', 
            'SetLoanType'
        ].forEach(x => {
            (<any>LaLoanTypeService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

