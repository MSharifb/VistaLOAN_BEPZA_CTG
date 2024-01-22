
namespace VistaLOAN.Task.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("Monthly Loan Installment"), InstanceName("Monthly Loan Installment"), TwoLevelCached]
    [ReadPermission("Task:LaMonthlyLoanInstallment:Read")]
    [InsertPermission("Task:LaMonthlyLoanInstallment:Insert")]
    [UpdatePermission("Task:LaMonthlyLoanInstallment:Update")]
    [DeletePermission("Task:LaMonthlyLoanInstallment:Delete")]
    [LookupScript("Task.LaMonthlyLoanInstallment")]
    public sealed class LaMonthlyLoanInstallmentRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region For Month
        [DisplayName("For Month"), NotNull, QuickSearch]
        public String ForMonth { get { return Fields.ForYear[this]; } set { Fields.ForYear[this] = value; } }
        public partial class RowFields { public StringField ForMonth; }
        #endregion ForMonth

        #region For Year
        [DisplayName("For Year"), Size(-1), NotNull]
        public String ForYear { get { return Fields.ForYear[this]; } set { Fields.ForYear[this] = value; } }
        public partial class RowFields { public StringField ForYear; }
        #endregion ForYear

        #region Total Principal Installment Amount
        [DisplayName("Total Principal Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? TotalPrincipalInstallmentAmount { get { return Fields.TotalPrincipalInstallmentAmount[this]; } set { Fields.TotalPrincipalInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField TotalPrincipalInstallmentAmount; }
        #endregion TotalPrincipalInstallmentAmount

        #region Total Interest Installment Amount
        [DisplayName("Total Interest Installment Amount"), Size(18), Scale(2), NotNull]
        public Decimal? TotalInterestInstallmentAmount { get { return Fields.TotalInterestInstallmentAmount[this]; } set { Fields.TotalInterestInstallmentAmount[this] = value; } }
        public partial class RowFields { public DecimalField TotalInterestInstallmentAmount; }
        #endregion TotalInterestInstallmentAmount

        #region Is Process
        [DisplayName("Is Process"), NotNull]
        public Boolean? IsProcess { get { return Fields.IsProcess[this]; } set { Fields.IsProcess[this] = value; } }
        public partial class RowFields { public BooleanField IsProcess; }
        #endregion IsProcess

        #region Loan Issue Detail
        [DisplayName("Detail Information"), MasterDetailRelation(foreignKey: "MonthlyLoanInstallmentId"), NotMapped]
        public List<LaMonthlyLoanInstallmentDetailRow> LaMonthlyLoanInstallmentDetailList
        {
            get { return Fields.LaMonthlyLoanInstallmentDetailList[this]; }
            set { Fields.LaMonthlyLoanInstallmentDetailList[this] = value; }
        }
        public partial class RowFields { public RowListField<LaMonthlyLoanInstallmentDetailRow> LaMonthlyLoanInstallmentDetailList; }
        #endregion


        #region Foreign Fields

        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.ForYear; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaMonthlyLoanInstallmentRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_MonthlyLoanInstallment]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_MonthlyLoanInstallment]")
            {
                LocalTextPrefix = "Task.LaMonthlyLoanInstallment";
            }
        }
        #endregion RowFields
    }
}
