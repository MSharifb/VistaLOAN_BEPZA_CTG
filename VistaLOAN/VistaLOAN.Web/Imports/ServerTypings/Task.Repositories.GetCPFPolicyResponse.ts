namespace VistaLOAN.Task.Repositories {
    export interface GetCPFPolicyResponse extends Serenity.ServiceResponse {
        NRfApplicableFor?: string;
        NRfLoanPercentage?: number;
        NRfMinimumAge?: number;
        RfApplicableFor?: string;
        RfLoanPercentage?: number;
        RfMinServiceYear?: number;
    }
}

