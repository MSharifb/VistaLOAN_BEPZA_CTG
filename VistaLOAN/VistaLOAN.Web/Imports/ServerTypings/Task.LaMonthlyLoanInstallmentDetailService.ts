namespace VistaLOAN.Task {
    export namespace LaMonthlyLoanInstallmentDetailService {
        export const baseUrl = 'Task/LaMonthlyLoanInstallmentDetail';

        export declare function Create(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentDetailRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaMonthlyLoanInstallmentDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaMonthlyLoanInstallmentDetailRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaMonthlyLoanInstallmentDetail/Create",
            Update = "Task/LaMonthlyLoanInstallmentDetail/Update",
            Delete = "Task/LaMonthlyLoanInstallmentDetail/Delete",
            Retrieve = "Task/LaMonthlyLoanInstallmentDetail/Retrieve",
            List = "Task/LaMonthlyLoanInstallmentDetail/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaMonthlyLoanInstallmentDetailService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

