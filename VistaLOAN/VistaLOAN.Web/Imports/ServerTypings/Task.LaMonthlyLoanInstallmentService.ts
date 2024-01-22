namespace VistaLOAN.Task {
    export namespace LaMonthlyLoanInstallmentService {
        export const baseUrl = 'Task/LaMonthlyLoanInstallment';

        export declare function Create(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<LaMonthlyLoanInstallmentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<LaMonthlyLoanInstallmentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<LaMonthlyLoanInstallmentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/LaMonthlyLoanInstallment/Create",
            Update = "Task/LaMonthlyLoanInstallment/Update",
            Delete = "Task/LaMonthlyLoanInstallment/Delete",
            Retrieve = "Task/LaMonthlyLoanInstallment/Retrieve",
            List = "Task/LaMonthlyLoanInstallment/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>LaMonthlyLoanInstallmentService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

