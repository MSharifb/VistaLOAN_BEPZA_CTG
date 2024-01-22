namespace VistaLOAN.Configurations {
    export namespace PrmEmploymentInfoService {
        export const baseUrl = 'Configurations/PrmEmploymentInfo';

        export declare function Create(request: Serenity.SaveRequest<PrmEmploymentInfoRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<PrmEmploymentInfoRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<PrmEmploymentInfoRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<PrmEmploymentInfoRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Configurations/PrmEmploymentInfo/Create",
            Update = "Configurations/PrmEmploymentInfo/Update",
            Delete = "Configurations/PrmEmploymentInfo/Delete",
            Retrieve = "Configurations/PrmEmploymentInfo/Retrieve",
            List = "Configurations/PrmEmploymentInfo/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>PrmEmploymentInfoService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

