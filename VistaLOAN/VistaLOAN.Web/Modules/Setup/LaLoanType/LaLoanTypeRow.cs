
namespace VistaLOAN.Setup.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Loan Type"), InstanceName("Loan Type"), TwoLevelCached]
    [ReadPermission("*")]
    [InsertPermission("Setup:LaLoanType:Insert")]
    [UpdatePermission("Setup:LaLoanType:Update")]
    [DeletePermission("Setup:LaLoanType:Delete")]
    [LookupScript("Setup.LaLoanType", Permission = "?")]
    public sealed class LaLoanTypeRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Loan Type Name
        [DisplayName("Loan Type Name"), Size(-1), NotNull, QuickSearch, LookupInclude]
        public String LoanTypeName { get { return Fields.LoanTypeName[this]; } set { Fields.LoanTypeName[this] = value; } }
        public partial class RowFields { public StringField LoanTypeName; }
        #endregion LoanTypeName

        #region Principal Head
        [DisplayName("Principal Head"), NotNull, ForeignKey("[dbo].[PRM_SalaryHead]", "Id"), LeftJoin("jPrincipalHead"), TextualField("PrincipalHeadHeadName")]
        [LookupEditor(typeof(Configurations.Entities.PrmSalaryHeadRow))]
        public Int32? PrincipalHeadId { get { return Fields.PrincipalHeadId[this]; } set { Fields.PrincipalHeadId[this] = value; } }
        public partial class RowFields { public Int32Field PrincipalHeadId; }
        #endregion PrincipalHeadId

        #region Interest Head
        [DisplayName("Interest Head"), ForeignKey("[dbo].[PRM_SalaryHead]", "Id"), LeftJoin("jInterestHead"), TextualField("InterestHeadHeadName")]
        [LookupEditor(typeof(Configurations.Entities.PrmSalaryHeadRow))]
        public Int32? InterestHeadId { get { return Fields.InterestHeadId[this]; } set { Fields.InterestHeadId[this] = value; } }
        public partial class RowFields { public Int32Field InterestHeadId; }
        #endregion InterestHeadId

        #region Is Welfare Loan
        [DisplayName("Is Welfare Loan"), NotNull]
        public Boolean? IsWelfareLoan { get { return Fields.IsWelfareLoan[this]; } set { Fields.IsWelfareLoan[this] = value; } }
        public partial class RowFields { public BooleanField IsWelfareLoan; }
        #endregion IsWelfareLoan

        #region Is Pf Loan
        [DisplayName("Is Pf Loan"), NotNull]
        public Boolean? IsPfLoan { get { return Fields.IsPfLoan[this]; } set { Fields.IsPfLoan[this] = value; } }
        public partial class RowFields { public BooleanField IsPfLoan; }
        #endregion IsPfLoan

        #region Is Interest Payment With Pricipal
        [DisplayName("Is Interest Payment With Pricipal"), NotNull]
        public Boolean? IsInterestPaymentWithPricipal { get { return Fields.IsInterestPaymentWithPricipal[this]; } set { Fields.IsInterestPaymentWithPricipal[this] = value; } }
        public partial class RowFields { public BooleanField IsInterestPaymentWithPricipal; }
        #endregion IsInterestPaymentWithPricipal

        #region Is Interest Calculate On Issue Date
        [DisplayName("Is Interest Calculate On Issue Date"), NotNull]
        public Boolean? IsInterestCalculateOnIssueDate { get { return Fields.IsInterestCalculateOnIssueDate[this]; } set { Fields.IsInterestCalculateOnIssueDate[this] = value; } }
        public partial class RowFields { public BooleanField IsInterestCalculateOnIssueDate; }
        #endregion IsInterestCalculateOnIssueDate

        #region Grace Period Month
        [DisplayName("Grace Period Month"), NotNull]
        public Int32? GracePeriodMonth { get { return Fields.GracePeriodMonth[this]; } set { Fields.GracePeriodMonth[this] = value; } }
        public partial class RowFields { public Int32Field GracePeriodMonth; }
        #endregion GracePeriodMonth

        #region Calculation Type
        [DisplayName("Calculation Type"), NotNull]
        public Int32? CalculationType { get { return Fields.CalculationType[this]; } set { Fields.CalculationType[this] = value; } }
        public partial class RowFields { public Int32Field CalculationType; }
        #endregion CalculationType

        #region Short Code
        [DisplayName("Short Code"), Size(-1),LookupInclude]
        public String ShortCode { get { return Fields.ShortCode[this]; } set { Fields.ShortCode[this] = value; } }
        public partial class RowFields { public StringField ShortCode; }
        #endregion ShortCode


        #region Foreign Fields

        [DisplayName("Principal Head Group Id"), Expression("jPrincipalHead.[GroupId]")]
        public Int32? PrincipalHeadGroupId { get { return Fields.PrincipalHeadGroupId[this]; } set { Fields.PrincipalHeadGroupId[this] = value; } }
        public partial class RowFields { public Int32Field PrincipalHeadGroupId; }


        [DisplayName("Principal Head Head Name"), Expression("jPrincipalHead.[HeadName]")]
        public String PrincipalHeadHeadName { get { return Fields.PrincipalHeadHeadName[this]; } set { Fields.PrincipalHeadHeadName[this] = value; } }
        public partial class RowFields { public StringField PrincipalHeadHeadName; }


        [DisplayName("Principal Head Is Active Head"), Expression("jPrincipalHead.[IsActiveHead]")]
        public Boolean? PrincipalHeadIsActiveHead { get { return Fields.PrincipalHeadIsActiveHead[this]; } set { Fields.PrincipalHeadIsActiveHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsActiveHead; }


        [DisplayName("Principal Head Short Name"), Expression("jPrincipalHead.[ShortName]")]
        public String PrincipalHeadShortName { get { return Fields.PrincipalHeadShortName[this]; } set { Fields.PrincipalHeadShortName[this] = value; } }
        public partial class RowFields { public StringField PrincipalHeadShortName; }


        [DisplayName("Principal Head Head Type"), Expression("jPrincipalHead.[HeadType]")]
        public String PrincipalHeadHeadType { get { return Fields.PrincipalHeadHeadType[this]; } set { Fields.PrincipalHeadHeadType[this] = value; } }
        public partial class RowFields { public StringField PrincipalHeadHeadType; }


        [DisplayName("Principal Head Amount Type"), Expression("jPrincipalHead.[AmountType]")]
        public String PrincipalHeadAmountType { get { return Fields.PrincipalHeadAmountType[this]; } set { Fields.PrincipalHeadAmountType[this] = value; } }
        public partial class RowFields { public StringField PrincipalHeadAmountType; }


        [DisplayName("Principal Head Account Head Id"), Expression("jPrincipalHead.[AccountHeadId]")]
        public Int32? PrincipalHeadAccountHeadId { get { return Fields.PrincipalHeadAccountHeadId[this]; } set { Fields.PrincipalHeadAccountHeadId[this] = value; } }
        public partial class RowFields { public Int32Field PrincipalHeadAccountHeadId; }


        [DisplayName("Principal Head Entity Name Id"), Expression("jPrincipalHead.[EntityNameId]")]
        public Int32? PrincipalHeadEntityNameId { get { return Fields.PrincipalHeadEntityNameId[this]; } set { Fields.PrincipalHeadEntityNameId[this] = value; } }
        public partial class RowFields { public Int32Field PrincipalHeadEntityNameId; }


        [DisplayName("Principal Head Is Basic Head"), Expression("jPrincipalHead.[IsBasicHead]")]
        public Boolean? PrincipalHeadIsBasicHead { get { return Fields.PrincipalHeadIsBasicHead[this]; } set { Fields.PrincipalHeadIsBasicHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsBasicHead; }


        [DisplayName("Principal Head Is Taxable"), Expression("jPrincipalHead.[IsTaxable]")]
        public Boolean? PrincipalHeadIsTaxable { get { return Fields.PrincipalHeadIsTaxable[this]; } set { Fields.PrincipalHeadIsTaxable[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsTaxable; }


        [DisplayName("Principal Head Is Gross Pay Head"), Expression("jPrincipalHead.[IsGrossPayHead]")]
        public Boolean? PrincipalHeadIsGrossPayHead { get { return Fields.PrincipalHeadIsGrossPayHead[this]; } set { Fields.PrincipalHeadIsGrossPayHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsGrossPayHead; }


        [DisplayName("Principal Head Sort Order"), Expression("jPrincipalHead.[SortOrder]")]
        public Int32? PrincipalHeadSortOrder { get { return Fields.PrincipalHeadSortOrder[this]; } set { Fields.PrincipalHeadSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field PrincipalHeadSortOrder; }


        [DisplayName("Principal Head Default Amount"), Expression("jPrincipalHead.[DefaultAmount]")]
        public Decimal? PrincipalHeadDefaultAmount { get { return Fields.PrincipalHeadDefaultAmount[this]; } set { Fields.PrincipalHeadDefaultAmount[this] = value; } }
        public partial class RowFields { public DecimalField PrincipalHeadDefaultAmount; }


        [DisplayName("Principal Head Is Other Addition"), Expression("jPrincipalHead.[IsOtherAddition]")]
        public Boolean? PrincipalHeadIsOtherAddition { get { return Fields.PrincipalHeadIsOtherAddition[this]; } set { Fields.PrincipalHeadIsOtherAddition[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsOtherAddition; }


        [DisplayName("Principal Head Is Other Deduction"), Expression("jPrincipalHead.[IsOtherDeduction]")]
        public Boolean? PrincipalHeadIsOtherDeduction { get { return Fields.PrincipalHeadIsOtherDeduction[this]; } set { Fields.PrincipalHeadIsOtherDeduction[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsOtherDeduction; }


        [DisplayName("Principal Head Is Income Tax Addition Head"), Expression("jPrincipalHead.[IsIncomeTaxAdditionHead]")]
        public Boolean? PrincipalHeadIsIncomeTaxAdditionHead { get { return Fields.PrincipalHeadIsIncomeTaxAdditionHead[this]; } set { Fields.PrincipalHeadIsIncomeTaxAdditionHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsIncomeTaxAdditionHead; }


        [DisplayName("Principal Head Is Income Tax Deduction Head"), Expression("jPrincipalHead.[IsIncomeTaxDeductionHead]")]
        public Boolean? PrincipalHeadIsIncomeTaxDeductionHead { get { return Fields.PrincipalHeadIsIncomeTaxDeductionHead[this]; } set { Fields.PrincipalHeadIsIncomeTaxDeductionHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsIncomeTaxDeductionHead; }


        [DisplayName("Principal Head Is Pf Own Contribution Head"), Expression("jPrincipalHead.[IsPFOwnContributionHead]")]
        public Boolean? PrincipalHeadIsPfOwnContributionHead { get { return Fields.PrincipalHeadIsPfOwnContributionHead[this]; } set { Fields.PrincipalHeadIsPfOwnContributionHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsPfOwnContributionHead; }


        [DisplayName("Principal Head Is Pf Company Contribution Head"), Expression("jPrincipalHead.[IsPFCompanyContributionHead]")]
        public Boolean? PrincipalHeadIsPfCompanyContributionHead { get { return Fields.PrincipalHeadIsPfCompanyContributionHead[this]; } set { Fields.PrincipalHeadIsPfCompanyContributionHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsPfCompanyContributionHead; }


        [DisplayName("Principal Head Is House Rent Head"), Expression("jPrincipalHead.[IsHouseRentHead]")]
        public Boolean? PrincipalHeadIsHouseRentHead { get { return Fields.PrincipalHeadIsHouseRentHead[this]; } set { Fields.PrincipalHeadIsHouseRentHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsHouseRentHead; }


        [DisplayName("Principal Head Is Medical Head"), Expression("jPrincipalHead.[IsMedicalHead]")]
        public Boolean? PrincipalHeadIsMedicalHead { get { return Fields.PrincipalHeadIsMedicalHead[this]; } set { Fields.PrincipalHeadIsMedicalHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsMedicalHead; }


        [DisplayName("Principal Head Is Conveyance Head"), Expression("jPrincipalHead.[IsConveyanceHead]")]
        public Boolean? PrincipalHeadIsConveyanceHead { get { return Fields.PrincipalHeadIsConveyanceHead[this]; } set { Fields.PrincipalHeadIsConveyanceHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsConveyanceHead; }


        [DisplayName("Principal Head Is Leave Without Pay Head"), Expression("jPrincipalHead.[IsLeaveWithoutPayHead]")]
        public Boolean? PrincipalHeadIsLeaveWithoutPayHead { get { return Fields.PrincipalHeadIsLeaveWithoutPayHead[this]; } set { Fields.PrincipalHeadIsLeaveWithoutPayHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsLeaveWithoutPayHead; }


        [DisplayName("Principal Head Is Pension Head"), Expression("jPrincipalHead.[IsPensionHead]")]
        public Boolean? PrincipalHeadIsPensionHead { get { return Fields.PrincipalHeadIsPensionHead[this]; } set { Fields.PrincipalHeadIsPensionHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsPensionHead; }


        [DisplayName("Principal Head Is Gpf Head"), Expression("jPrincipalHead.[IsGPFHead]")]
        public Boolean? PrincipalHeadIsGpfHead { get { return Fields.PrincipalHeadIsGpfHead[this]; } set { Fields.PrincipalHeadIsGpfHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsGpfHead; }


        [DisplayName("Principal Head Is Arrear Head"), Expression("jPrincipalHead.[IsArrearHead]")]
        public Boolean? PrincipalHeadIsArrearHead { get { return Fields.PrincipalHeadIsArrearHead[this]; } set { Fields.PrincipalHeadIsArrearHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsArrearHead; }


        [DisplayName("Principal Head Is Gratuity Head"), Expression("jPrincipalHead.[IsGratuityHead]")]
        public Boolean? PrincipalHeadIsGratuityHead { get { return Fields.PrincipalHeadIsGratuityHead[this]; } set { Fields.PrincipalHeadIsGratuityHead[this] = value; } }
        public partial class RowFields { public BooleanField PrincipalHeadIsGratuityHead; }


        [DisplayName("Principal Head I User"), Expression("jPrincipalHead.[IUser]")]
        public String PrincipalHeadIUser { get { return Fields.PrincipalHeadIUser[this]; } set { Fields.PrincipalHeadIUser[this] = value; } }
        public partial class RowFields { public StringField PrincipalHeadIUser; }


        [DisplayName("Principal Head E User"), Expression("jPrincipalHead.[EUser]")]
        public String PrincipalHeadEUser { get { return Fields.PrincipalHeadEUser[this]; } set { Fields.PrincipalHeadEUser[this] = value; } }
        public partial class RowFields { public StringField PrincipalHeadEUser; }


        [DisplayName("Principal Head I Date"), Expression("jPrincipalHead.[IDate]")]
        public DateTime? PrincipalHeadIDate { get { return Fields.PrincipalHeadIDate[this]; } set { Fields.PrincipalHeadIDate[this] = value; } }
        public partial class RowFields { public DateTimeField PrincipalHeadIDate; }


        [DisplayName("Principal Head E Date"), Expression("jPrincipalHead.[EDate]")]
        public DateTime? PrincipalHeadEDate { get { return Fields.PrincipalHeadEDate[this]; } set { Fields.PrincipalHeadEDate[this] = value; } }
        public partial class RowFields { public DateTimeField PrincipalHeadEDate; }


        [DisplayName("Interest Head Group Id"), Expression("jInterestHead.[GroupId]")]
        public Int32? InterestHeadGroupId { get { return Fields.InterestHeadGroupId[this]; } set { Fields.InterestHeadGroupId[this] = value; } }
        public partial class RowFields { public Int32Field InterestHeadGroupId; }


        [DisplayName("Interest Head Head Name"), Expression("jInterestHead.[HeadName]")]
        public String InterestHeadHeadName { get { return Fields.InterestHeadHeadName[this]; } set { Fields.InterestHeadHeadName[this] = value; } }
        public partial class RowFields { public StringField InterestHeadHeadName; }


        [DisplayName("Interest Head Is Active Head"), Expression("jInterestHead.[IsActiveHead]")]
        public Boolean? InterestHeadIsActiveHead { get { return Fields.InterestHeadIsActiveHead[this]; } set { Fields.InterestHeadIsActiveHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsActiveHead; }


        [DisplayName("Interest Head Short Name"), Expression("jInterestHead.[ShortName]")]
        public String InterestHeadShortName { get { return Fields.InterestHeadShortName[this]; } set { Fields.InterestHeadShortName[this] = value; } }
        public partial class RowFields { public StringField InterestHeadShortName; }


        [DisplayName("Interest Head Head Type"), Expression("jInterestHead.[HeadType]")]
        public String InterestHeadHeadType { get { return Fields.InterestHeadHeadType[this]; } set { Fields.InterestHeadHeadType[this] = value; } }
        public partial class RowFields { public StringField InterestHeadHeadType; }


        [DisplayName("Interest Head Amount Type"), Expression("jInterestHead.[AmountType]")]
        public String InterestHeadAmountType { get { return Fields.InterestHeadAmountType[this]; } set { Fields.InterestHeadAmountType[this] = value; } }
        public partial class RowFields { public StringField InterestHeadAmountType; }


        [DisplayName("Interest Head Account Head Id"), Expression("jInterestHead.[AccountHeadId]")]
        public Int32? InterestHeadAccountHeadId { get { return Fields.InterestHeadAccountHeadId[this]; } set { Fields.InterestHeadAccountHeadId[this] = value; } }
        public partial class RowFields { public Int32Field InterestHeadAccountHeadId; }


        [DisplayName("Interest Head Entity Name Id"), Expression("jInterestHead.[EntityNameId]")]
        public Int32? InterestHeadEntityNameId { get { return Fields.InterestHeadEntityNameId[this]; } set { Fields.InterestHeadEntityNameId[this] = value; } }
        public partial class RowFields { public Int32Field InterestHeadEntityNameId; }


        [DisplayName("Interest Head Is Basic Head"), Expression("jInterestHead.[IsBasicHead]")]
        public Boolean? InterestHeadIsBasicHead { get { return Fields.InterestHeadIsBasicHead[this]; } set { Fields.InterestHeadIsBasicHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsBasicHead; }


        [DisplayName("Interest Head Is Taxable"), Expression("jInterestHead.[IsTaxable]")]
        public Boolean? InterestHeadIsTaxable { get { return Fields.InterestHeadIsTaxable[this]; } set { Fields.InterestHeadIsTaxable[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsTaxable; }


        [DisplayName("Interest Head Is Gross Pay Head"), Expression("jInterestHead.[IsGrossPayHead]")]
        public Boolean? InterestHeadIsGrossPayHead { get { return Fields.InterestHeadIsGrossPayHead[this]; } set { Fields.InterestHeadIsGrossPayHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsGrossPayHead; }


        [DisplayName("Interest Head Sort Order"), Expression("jInterestHead.[SortOrder]")]
        public Int32? InterestHeadSortOrder { get { return Fields.InterestHeadSortOrder[this]; } set { Fields.InterestHeadSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field InterestHeadSortOrder; }


        [DisplayName("Interest Head Default Amount"), Expression("jInterestHead.[DefaultAmount]")]
        public Decimal? InterestHeadDefaultAmount { get { return Fields.InterestHeadDefaultAmount[this]; } set { Fields.InterestHeadDefaultAmount[this] = value; } }
        public partial class RowFields { public DecimalField InterestHeadDefaultAmount; }


        [DisplayName("Interest Head Is Other Addition"), Expression("jInterestHead.[IsOtherAddition]")]
        public Boolean? InterestHeadIsOtherAddition { get { return Fields.InterestHeadIsOtherAddition[this]; } set { Fields.InterestHeadIsOtherAddition[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsOtherAddition; }


        [DisplayName("Interest Head Is Other Deduction"), Expression("jInterestHead.[IsOtherDeduction]")]
        public Boolean? InterestHeadIsOtherDeduction { get { return Fields.InterestHeadIsOtherDeduction[this]; } set { Fields.InterestHeadIsOtherDeduction[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsOtherDeduction; }


        [DisplayName("Interest Head Is Income Tax Addition Head"), Expression("jInterestHead.[IsIncomeTaxAdditionHead]")]
        public Boolean? InterestHeadIsIncomeTaxAdditionHead { get { return Fields.InterestHeadIsIncomeTaxAdditionHead[this]; } set { Fields.InterestHeadIsIncomeTaxAdditionHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsIncomeTaxAdditionHead; }


        [DisplayName("Interest Head Is Income Tax Deduction Head"), Expression("jInterestHead.[IsIncomeTaxDeductionHead]")]
        public Boolean? InterestHeadIsIncomeTaxDeductionHead { get { return Fields.InterestHeadIsIncomeTaxDeductionHead[this]; } set { Fields.InterestHeadIsIncomeTaxDeductionHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsIncomeTaxDeductionHead; }


        [DisplayName("Interest Head Is Pf Own Contribution Head"), Expression("jInterestHead.[IsPFOwnContributionHead]")]
        public Boolean? InterestHeadIsPfOwnContributionHead { get { return Fields.InterestHeadIsPfOwnContributionHead[this]; } set { Fields.InterestHeadIsPfOwnContributionHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsPfOwnContributionHead; }


        [DisplayName("Interest Head Is Pf Company Contribution Head"), Expression("jInterestHead.[IsPFCompanyContributionHead]")]
        public Boolean? InterestHeadIsPfCompanyContributionHead { get { return Fields.InterestHeadIsPfCompanyContributionHead[this]; } set { Fields.InterestHeadIsPfCompanyContributionHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsPfCompanyContributionHead; }


        [DisplayName("Interest Head Is House Rent Head"), Expression("jInterestHead.[IsHouseRentHead]")]
        public Boolean? InterestHeadIsHouseRentHead { get { return Fields.InterestHeadIsHouseRentHead[this]; } set { Fields.InterestHeadIsHouseRentHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsHouseRentHead; }


        [DisplayName("Interest Head Is Medical Head"), Expression("jInterestHead.[IsMedicalHead]")]
        public Boolean? InterestHeadIsMedicalHead { get { return Fields.InterestHeadIsMedicalHead[this]; } set { Fields.InterestHeadIsMedicalHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsMedicalHead; }


        [DisplayName("Interest Head Is Conveyance Head"), Expression("jInterestHead.[IsConveyanceHead]")]
        public Boolean? InterestHeadIsConveyanceHead { get { return Fields.InterestHeadIsConveyanceHead[this]; } set { Fields.InterestHeadIsConveyanceHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsConveyanceHead; }


        [DisplayName("Interest Head Is Leave Without Pay Head"), Expression("jInterestHead.[IsLeaveWithoutPayHead]")]
        public Boolean? InterestHeadIsLeaveWithoutPayHead { get { return Fields.InterestHeadIsLeaveWithoutPayHead[this]; } set { Fields.InterestHeadIsLeaveWithoutPayHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsLeaveWithoutPayHead; }


        [DisplayName("Interest Head Is Pension Head"), Expression("jInterestHead.[IsPensionHead]")]
        public Boolean? InterestHeadIsPensionHead { get { return Fields.InterestHeadIsPensionHead[this]; } set { Fields.InterestHeadIsPensionHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsPensionHead; }


        [DisplayName("Interest Head Is Gpf Head"), Expression("jInterestHead.[IsGPFHead]")]
        public Boolean? InterestHeadIsGpfHead { get { return Fields.InterestHeadIsGpfHead[this]; } set { Fields.InterestHeadIsGpfHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsGpfHead; }


        [DisplayName("Interest Head Is Arrear Head"), Expression("jInterestHead.[IsArrearHead]")]
        public Boolean? InterestHeadIsArrearHead { get { return Fields.InterestHeadIsArrearHead[this]; } set { Fields.InterestHeadIsArrearHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsArrearHead; }


        [DisplayName("Interest Head Is Gratuity Head"), Expression("jInterestHead.[IsGratuityHead]")]
        public Boolean? InterestHeadIsGratuityHead { get { return Fields.InterestHeadIsGratuityHead[this]; } set { Fields.InterestHeadIsGratuityHead[this] = value; } }
        public partial class RowFields { public BooleanField InterestHeadIsGratuityHead; }


        [DisplayName("Interest Head I User"), Expression("jInterestHead.[IUser]")]
        public String InterestHeadIUser { get { return Fields.InterestHeadIUser[this]; } set { Fields.InterestHeadIUser[this] = value; } }
        public partial class RowFields { public StringField InterestHeadIUser; }


        [DisplayName("Interest Head E User"), Expression("jInterestHead.[EUser]")]
        public String InterestHeadEUser { get { return Fields.InterestHeadEUser[this]; } set { Fields.InterestHeadEUser[this] = value; } }
        public partial class RowFields { public StringField InterestHeadEUser; }


        [DisplayName("Interest Head I Date"), Expression("jInterestHead.[IDate]")]
        public DateTime? InterestHeadIDate { get { return Fields.InterestHeadIDate[this]; } set { Fields.InterestHeadIDate[this] = value; } }
        public partial class RowFields { public DateTimeField InterestHeadIDate; }


        [DisplayName("Interest Head E Date"), Expression("jInterestHead.[EDate]")]
        public DateTime? InterestHeadEDate { get { return Fields.InterestHeadEDate[this]; } set { Fields.InterestHeadEDate[this] = value; } }
        public partial class RowFields { public DateTimeField InterestHeadEDate; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.LoanTypeName; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaLoanTypeRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_LoanType]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_LoanType]")
            {
                LocalTextPrefix = "Setup.LaLoanType";
            }
        }
        #endregion RowFields
    }
}
