namespace VistaLOAN.Configurations {
    export interface PrmJobGradeRow {
        Id?: number;
        SalaryScaleId?: number;
        GradeName?: string;
        GradeCode?: string;
        NumberOfSteps?: number;
        InitialBasic?: number;
        LastBasic?: number;
        YearlyIncrement?: number;
        DateOfEffective?: string;
        IsConsolidated?: boolean;
        IUser?: string;
        IDate?: string;
        EUser?: string;
        EDate?: string;
        PayScale?: string;
        SalaryScaleSalaryScaleName?: string;
        SalaryScaleDateOfCirculation?: string;
        SalaryScaleDateOfEffective?: string;
        SalaryScaleIUser?: string;
        SalaryScaleIDate?: string;
        SalaryScaleEUser?: string;
        SalaryScaleEDate?: string;
    }

    export namespace PrmJobGradeRow {
        export const idProperty = 'Id';
        export const nameProperty = 'GradeName';
        export const localTextPrefix = 'Configurations.PrmJobGrade';
        export const lookupKey = 'Configurations.PrmJobGrade';

        export function getLookup(): Q.Lookup<PrmJobGradeRow> {
            return Q.getLookup<PrmJobGradeRow>('Configurations.PrmJobGrade');
        }

        export declare const enum Fields {
            Id = "Id",
            SalaryScaleId = "SalaryScaleId",
            GradeName = "GradeName",
            GradeCode = "GradeCode",
            NumberOfSteps = "NumberOfSteps",
            InitialBasic = "InitialBasic",
            LastBasic = "LastBasic",
            YearlyIncrement = "YearlyIncrement",
            DateOfEffective = "DateOfEffective",
            IsConsolidated = "IsConsolidated",
            IUser = "IUser",
            IDate = "IDate",
            EUser = "EUser",
            EDate = "EDate",
            PayScale = "PayScale",
            SalaryScaleSalaryScaleName = "SalaryScaleSalaryScaleName",
            SalaryScaleDateOfCirculation = "SalaryScaleDateOfCirculation",
            SalaryScaleDateOfEffective = "SalaryScaleDateOfEffective",
            SalaryScaleIUser = "SalaryScaleIUser",
            SalaryScaleIDate = "SalaryScaleIDate",
            SalaryScaleEUser = "SalaryScaleEUser",
            SalaryScaleEDate = "SalaryScaleEDate"
        }
    }
}

