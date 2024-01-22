using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using Serenity.Data;


namespace VistaLOAN
{
    public class CommonEnum
    {
    }

    [EnumKey("ApprovalStatus"), ScriptInclude]
    public enum ApprovalStatus
    {
        [Description("Draft")]
        Draft = 1,
        [Description("Cancel")]
        Cancel = 2,
        [Description("Submit")]
        Submit = 3,
        [Description("Regret")]
        Regret = 4,
        [Description("Recommend")]
        Recommend = 5,
        [Description("Approved")]
        Approved = 6
    }

    [EnumKey("MonthList"), ScriptInclude]
    public enum MonthList
    {
        January = 1,
        February = 2,
        March = 3,
        April = 4,
        May = 5,
        June = 6,
        July = 7,
        August = 8,
        September = 9,
        October = 10,
        November = 11,
        December = 12,
    }

    [EnumKey("EffectinCashFlow"), ScriptInclude]
    public enum EffectinCashFlow
    {
        [Description("Investing")]
        Investing,
        [Description("Operating")]
        Operating,
        [Description("Financing")]
        Financing
    }

    [EnumKey("PFLoanType"), ScriptInclude]
    public enum PFLoanType
    {
        [Description("Refundable")]
        Refundable = 1,
        [Description("Non-Refundable")]
        NonRefundable = 0
    }

    [EnumKey("CollectionType"), ScriptInclude]
    public enum CollectionType
    {
        [Description("Loan Installment")]
        Loan_Installment = 1,
        [Description("PF Contribution")]
        PF_Contribution = 2
    }

}