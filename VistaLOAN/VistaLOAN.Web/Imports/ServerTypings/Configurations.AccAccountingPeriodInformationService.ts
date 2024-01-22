namespace VistaLOAN.Configurations {
    export namespace AccAccountingPeriodInformationService {
        export const baseUrl = 'Configurations/AccAccountingPeriodInformation';

        export declare function Create(request: Serenity.SaveRequest<AccAccountingPeriodInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<AccAccountingPeriodInformationRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<AccAccountingPeriodInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<AccAccountingPeriodInformationRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Configurations/AccAccountingPeriodInformation/Create",
            Update = "Configurations/AccAccountingPeriodInformation/Update",
            Delete = "Configurations/AccAccountingPeriodInformation/Delete",
            Retrieve = "Configurations/AccAccountingPeriodInformation/Retrieve",
            List = "Configurations/AccAccountingPeriodInformation/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>AccAccountingPeriodInformationService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

