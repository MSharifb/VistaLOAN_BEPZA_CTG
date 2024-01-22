namespace VistaLOAN {
    export interface ScriptUserDefinition {
        Username?: string;
        DisplayName?: string;
        IsAdmin?: boolean;
        FundControlInformationId?: number;
        BaseCurrencyId?: number;
        BaseCurrency?: string;
        ZoneID?: number;
        FundControlName?: string;
        ZoneName?: string;
        FinancialYearName?: string;
        EmpId?: number;
        Permissions?: { [key: string]: boolean };
        DesignationName?: string;
        LoanTypeInformationId?: number;
        LoanTypeName?: string;
    }
}

