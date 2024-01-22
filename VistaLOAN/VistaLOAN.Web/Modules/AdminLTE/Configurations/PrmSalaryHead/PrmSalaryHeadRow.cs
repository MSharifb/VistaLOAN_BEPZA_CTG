
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Salary Head"), InstanceName("Salary Head"), TwoLevelCached]
    [ReadPermission("Configurations:PRM_SalaryHead:Read")]
    [InsertPermission("Configurations:PRM_SalaryHead:Insert")]
    [UpdatePermission("Configurations:PRM_SalaryHead:Update")]
    [DeletePermission("Configurations:PRM_SalaryHead:Delete")]
    [LookupScript("Configurations.PrmSalaryHead", Permission ="?")]
    public sealed class PrmSalaryHeadRow : Row, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Group
        [DisplayName("Group"), NotNull]
        public Int32? GroupId { get { return Fields.GroupId[this]; } set { Fields.GroupId[this] = value; } }
        public partial class RowFields { public Int32Field GroupId; }
        #endregion GroupId

        #region Head Name
        [DisplayName("Head Name"), Size(50), NotNull, QuickSearch]
        public String HeadName { get { return Fields.HeadName[this]; } set { Fields.HeadName[this] = value; } }
        public partial class RowFields { public StringField HeadName; }
        #endregion HeadName

        #region Is Active Head
        [DisplayName("Is Active Head"), NotNull]
        public Boolean? IsActiveHead { get { return Fields.IsActiveHead[this]; } set { Fields.IsActiveHead[this] = value; } }
        public partial class RowFields { public BooleanField IsActiveHead; }
        #endregion IsActiveHead

        #region Short Name
        [DisplayName("Short Name"), Size(20), NotNull]
        public String ShortName { get { return Fields.ShortName[this]; } set { Fields.ShortName[this] = value; } }
        public partial class RowFields { public StringField ShortName; }
        #endregion ShortName

        #region Head Type
        [DisplayName("Head Type"), Size(20), NotNull]
        public String HeadType { get { return Fields.HeadType[this]; } set { Fields.HeadType[this] = value; } }
        public partial class RowFields { public StringField HeadType; }
        #endregion HeadType

        #region Amount Type
        [DisplayName("Amount Type"), Size(10), NotNull]
        public String AmountType { get { return Fields.AmountType[this]; } set { Fields.AmountType[this] = value; } }
        public partial class RowFields { public StringField AmountType; }
        #endregion AmountType

        #region Account Head Id
        [DisplayName("Account Head Id")]
        public Int32? AccountHeadId { get { return Fields.AccountHeadId[this]; } set { Fields.AccountHeadId[this] = value; } }
        public partial class RowFields { public Int32Field AccountHeadId; }
        #endregion AccountHeadId

        #region Entity Name Id
        [DisplayName("Entity Name Id")]
        public Int32? EntityNameId { get { return Fields.EntityNameId[this]; } set { Fields.EntityNameId[this] = value; } }
        public partial class RowFields { public Int32Field EntityNameId; }
        #endregion EntityNameId

        #region Is Basic Head
        [DisplayName("Is Basic Head"), NotNull]
        public Boolean? IsBasicHead { get { return Fields.IsBasicHead[this]; } set { Fields.IsBasicHead[this] = value; } }
        public partial class RowFields { public BooleanField IsBasicHead; }
        #endregion IsBasicHead

        #region Is Taxable
        [DisplayName("Is Taxable"), NotNull]
        public Boolean? IsTaxable { get { return Fields.IsTaxable[this]; } set { Fields.IsTaxable[this] = value; } }
        public partial class RowFields { public BooleanField IsTaxable; }
        #endregion IsTaxable

        #region Is Gross Pay Head
        [DisplayName("Is Gross Pay Head"), NotNull]
        public Boolean? IsGrossPayHead { get { return Fields.IsGrossPayHead[this]; } set { Fields.IsGrossPayHead[this] = value; } }
        public partial class RowFields { public BooleanField IsGrossPayHead; }
        #endregion IsGrossPayHead

        #region Sort Order
        [DisplayName("Sort Order"), NotNull]
        public Int32? SortOrder { get { return Fields.SortOrder[this]; } set { Fields.SortOrder[this] = value; } }
        public partial class RowFields { public Int32Field SortOrder; }
        #endregion SortOrder

        #region Default Amount
        [DisplayName("Default Amount"), Size(9), Scale(2)]
        public Decimal? DefaultAmount { get { return Fields.DefaultAmount[this]; } set { Fields.DefaultAmount[this] = value; } }
        public partial class RowFields { public DecimalField DefaultAmount; }
        #endregion DefaultAmount

        #region Is Other Addition
        [DisplayName("Is Other Addition")]
        public Boolean? IsOtherAddition { get { return Fields.IsOtherAddition[this]; } set { Fields.IsOtherAddition[this] = value; } }
        public partial class RowFields { public BooleanField IsOtherAddition; }
        #endregion IsOtherAddition

        #region Is Other Deduction
        [DisplayName("Is Other Deduction")]
        public Boolean? IsOtherDeduction { get { return Fields.IsOtherDeduction[this]; } set { Fields.IsOtherDeduction[this] = value; } }
        public partial class RowFields { public BooleanField IsOtherDeduction; }
        #endregion IsOtherDeduction

        #region Is Income Tax Addition Head
        [DisplayName("Is Income Tax Addition Head")]
        public Boolean? IsIncomeTaxAdditionHead { get { return Fields.IsIncomeTaxAdditionHead[this]; } set { Fields.IsIncomeTaxAdditionHead[this] = value; } }
        public partial class RowFields { public BooleanField IsIncomeTaxAdditionHead; }
        #endregion IsIncomeTaxAdditionHead

        #region Is Income Tax Deduction Head
        [DisplayName("Is Income Tax Deduction Head")]
        public Boolean? IsIncomeTaxDeductionHead { get { return Fields.IsIncomeTaxDeductionHead[this]; } set { Fields.IsIncomeTaxDeductionHead[this] = value; } }
        public partial class RowFields { public BooleanField IsIncomeTaxDeductionHead; }
        #endregion IsIncomeTaxDeductionHead

        #region Is Pf Own Contribution Head
        [DisplayName("Is Pf Own Contribution Head"), Column("IsPFOwnContributionHead")]
        public Boolean? IsPfOwnContributionHead { get { return Fields.IsPfOwnContributionHead[this]; } set { Fields.IsPfOwnContributionHead[this] = value; } }
        public partial class RowFields { public BooleanField IsPfOwnContributionHead; }
        #endregion IsPfOwnContributionHead

        #region Is Pf Company Contribution Head
        [DisplayName("Is Pf Company Contribution Head"), Column("IsPFCompanyContributionHead")]
        public Boolean? IsPfCompanyContributionHead { get { return Fields.IsPfCompanyContributionHead[this]; } set { Fields.IsPfCompanyContributionHead[this] = value; } }
        public partial class RowFields { public BooleanField IsPfCompanyContributionHead; }
        #endregion IsPfCompanyContributionHead

        #region Is House Rent Head
        [DisplayName("Is House Rent Head")]
        public Boolean? IsHouseRentHead { get { return Fields.IsHouseRentHead[this]; } set { Fields.IsHouseRentHead[this] = value; } }
        public partial class RowFields { public BooleanField IsHouseRentHead; }
        #endregion IsHouseRentHead

        #region Is Medical Head
        [DisplayName("Is Medical Head")]
        public Boolean? IsMedicalHead { get { return Fields.IsMedicalHead[this]; } set { Fields.IsMedicalHead[this] = value; } }
        public partial class RowFields { public BooleanField IsMedicalHead; }
        #endregion IsMedicalHead

        #region Is Conveyance Head
        [DisplayName("Is Conveyance Head")]
        public Boolean? IsConveyanceHead { get { return Fields.IsConveyanceHead[this]; } set { Fields.IsConveyanceHead[this] = value; } }
        public partial class RowFields { public BooleanField IsConveyanceHead; }
        #endregion IsConveyanceHead

        #region Is Leave Without Pay Head
        [DisplayName("Is Leave Without Pay Head")]
        public Boolean? IsLeaveWithoutPayHead { get { return Fields.IsLeaveWithoutPayHead[this]; } set { Fields.IsLeaveWithoutPayHead[this] = value; } }
        public partial class RowFields { public BooleanField IsLeaveWithoutPayHead; }
        #endregion IsLeaveWithoutPayHead

        #region Is Pension Head
        [DisplayName("Is Pension Head")]
        public Boolean? IsPensionHead { get { return Fields.IsPensionHead[this]; } set { Fields.IsPensionHead[this] = value; } }
        public partial class RowFields { public BooleanField IsPensionHead; }
        #endregion IsPensionHead

        #region Is Gpf Head
        [DisplayName("Is Gpf Head"), Column("IsGPFHead")]
        public Boolean? IsGpfHead { get { return Fields.IsGpfHead[this]; } set { Fields.IsGpfHead[this] = value; } }
        public partial class RowFields { public BooleanField IsGpfHead; }
        #endregion IsGpfHead

        #region Is Arrear Head
        [DisplayName("Is Arrear Head")]
        public Boolean? IsArrearHead { get { return Fields.IsArrearHead[this]; } set { Fields.IsArrearHead[this] = value; } }
        public partial class RowFields { public BooleanField IsArrearHead; }
        #endregion IsArrearHead

        #region Is Gratuity Head
        [DisplayName("Is Gratuity Head")]
        public Boolean? IsGratuityHead { get { return Fields.IsGratuityHead[this]; } set { Fields.IsGratuityHead[this] = value; } }
        public partial class RowFields { public BooleanField IsGratuityHead; }
        #endregion IsGratuityHead

        #region I User
        [DisplayName("I User"), Size(50), NotNull]
        public String IUser { get { return Fields.IUser[this]; } set { Fields.IUser[this] = value; } }
        public partial class RowFields { public StringField IUser; }
        #endregion IUser

        #region E User
        [DisplayName("E User"), Size(50)]
        public String EUser { get { return Fields.EUser[this]; } set { Fields.EUser[this] = value; } }
        public partial class RowFields { public StringField EUser; }
        #endregion EUser

        #region I Date
        [DisplayName("I Date"), NotNull]
        public DateTime? IDate { get { return Fields.IDate[this]; } set { Fields.IDate[this] = value; } }
        public partial class RowFields { public DateTimeField IDate; }
        #endregion IDate

        #region E Date
        [DisplayName("E Date")]
        public DateTime? EDate { get { return Fields.EDate[this]; } set { Fields.EDate[this] = value; } }
        public partial class RowFields { public DateTimeField EDate; }
        #endregion EDate


        #region Foreign Fields

        [DisplayName("Group Name"), Expression("jGroup.[Name]")]
        public String GroupName { get { return Fields.GroupName[this]; } set { Fields.GroupName[this] = value; } }
        public partial class RowFields { public StringField GroupName; }


        [DisplayName("Group Head Type"), Expression("jGroup.[HeadType]")]
        public String GroupHeadType { get { return Fields.GroupHeadType[this]; } set { Fields.GroupHeadType[this] = value; } }
        public partial class RowFields { public StringField GroupHeadType; }


        [DisplayName("Group Remarks"), Expression("jGroup.[Remarks]")]
        public String GroupRemarks { get { return Fields.GroupRemarks[this]; } set { Fields.GroupRemarks[this] = value; } }
        public partial class RowFields { public StringField GroupRemarks; }


        [DisplayName("Group Sort Order"), Expression("jGroup.[SortOrder]")]
        public Int32? GroupSortOrder { get { return Fields.GroupSortOrder[this]; } set { Fields.GroupSortOrder[this] = value; } }
        public partial class RowFields { public Int32Field GroupSortOrder; }


        [DisplayName("Group I User"), Expression("jGroup.[IUser]")]
        public String GroupIUser { get { return Fields.GroupIUser[this]; } set { Fields.GroupIUser[this] = value; } }
        public partial class RowFields { public StringField GroupIUser; }


        [DisplayName("Group E User"), Expression("jGroup.[EUser]")]
        public String GroupEUser { get { return Fields.GroupEUser[this]; } set { Fields.GroupEUser[this] = value; } }
        public partial class RowFields { public StringField GroupEUser; }


        [DisplayName("Group I Date"), Expression("jGroup.[IDate]")]
        public DateTime? GroupIDate { get { return Fields.GroupIDate[this]; } set { Fields.GroupIDate[this] = value; } }
        public partial class RowFields { public DateTimeField GroupIDate; }


        [DisplayName("Group E Date"), Expression("jGroup.[EDate]")]
        public DateTime? GroupEDate { get { return Fields.GroupEDate[this]; } set { Fields.GroupEDate[this] = value; } }
        public partial class RowFields { public DateTimeField GroupEDate; }


        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.HeadName; }
        }
        #endregion Id and Name fields

        #region Constructor
        public PrmSalaryHeadRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[PRM_SalaryHead]";

        public partial class RowFields : RowFieldsBase
        {
            public RowFields()
            : base("[dbo].[PRM_SalaryHead]")
            {
                LocalTextPrefix = "Configurations.PrmSalaryHead";
            }
        }
        #endregion RowFields
    }
}
