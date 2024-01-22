namespace VistaLOAN.Task {
    export namespace NonRefundableFinalPaymentService {
        export const baseUrl = 'Task/NonRefundableFinalPayment';

        export declare function Create(request: Serenity.SaveRequest<NonRefundableFinalPaymentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<NonRefundableFinalPaymentRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<NonRefundableFinalPaymentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<NonRefundableFinalPaymentRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Task/NonRefundableFinalPayment/Create",
            Update = "Task/NonRefundableFinalPayment/Update",
            Delete = "Task/NonRefundableFinalPayment/Delete",
            Retrieve = "Task/NonRefundableFinalPayment/Retrieve",
            List = "Task/NonRefundableFinalPayment/List"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List'
        ].forEach(x => {
            (<any>NonRefundableFinalPaymentService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

