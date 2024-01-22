
namespace VistaLOAN.Setup.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), DisplayName("La Loan Application Last Number"), InstanceName("La Loan Application Last Number"), TwoLevelCached]
    [ReadPermission("*")]
    [InsertPermission("*")]
    [UpdatePermission("*")]
    [DeletePermission("Setup:LaLoanApplicationLastNumber:Delete")]
    [LookupScript("Setup.LaLoanApplicationLastNumber", Permission = "?", Expiration = -1)]
    public sealed class LaLoanApplicationLastNumberRow : Row, IIdRow
    {        
            #region Id
            [DisplayName("Id"), Identity]
            public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
            public partial class RowFields { public Int32Field Id; }
            #endregion Id
                
            #region Loan Criteria
            [DisplayName("Loan Criteria"), ForeignKey("[dbo].[LA_LoanCriteria]", "Id"), LeftJoin("jLoanCriteria"), TextualField("LoanCriteriaSchemeName")]
            [LookupEditor(typeof(Setup.Entities.LaLoanCriteriaRow), InplaceAdd = true),LookupInclude]
            public Int32? LoanCriteriaId { get { return Fields.LoanCriteriaId[this]; } set { Fields.LoanCriteriaId[this] = value; } }
            public partial class RowFields { public Int32Field LoanCriteriaId; }
            #endregion LoanCriteriaId
                
            #region Last Loan Number
            [DisplayName("Last Loan Number"), NotNull,LookupInclude]
            public Int32? LastLoanNumber { get { return Fields.LastLoanNumber[this]; } set { Fields.LastLoanNumber[this] = value; } }
            public partial class RowFields { public Int32Field LastLoanNumber; }
            #endregion LastLoanNumber

        
            [DisplayName("Loan Criteria Scheme Name")]
            public String PFPaymentType { get { return Fields.PFPaymentType[this]; } set { Fields.PFPaymentType[this] = value; } }
            public partial class RowFields { public StringField PFPaymentType; }

        #region Foreign Fields

        [DisplayName("Loan Criteria Scheme Name"), Expression("jLoanCriteria.[SchemeName]")]
                public String LoanCriteriaSchemeName { get { return Fields.LoanCriteriaSchemeName[this]; } set { Fields.LoanCriteriaSchemeName[this] = value; } }
                public partial class RowFields { public StringField LoanCriteriaSchemeName; }

                        
                [DisplayName("Loan Criteria Loan Type Id"), Expression("jLoanCriteria.[LoanTypeId]")]
                public Int32? LoanCriteriaLoanTypeId { get { return Fields.LoanCriteriaLoanTypeId[this]; } set { Fields.LoanCriteriaLoanTypeId[this] = value; } }
                public partial class RowFields { public Int32Field LoanCriteriaLoanTypeId; }

                        
                [DisplayName("Loan Criteria I User"), Expression("jLoanCriteria.[IUser]")]
                public String LoanCriteriaIUser { get { return Fields.LoanCriteriaIUser[this]; } set { Fields.LoanCriteriaIUser[this] = value; } }
                public partial class RowFields { public StringField LoanCriteriaIUser; }

                        
                [DisplayName("Loan Criteria I Date"), Expression("jLoanCriteria.[IDate]")]
                public DateTime? LoanCriteriaIDate { get { return Fields.LoanCriteriaIDate[this]; } set { Fields.LoanCriteriaIDate[this] = value; } }
                public partial class RowFields { public DateTimeField LoanCriteriaIDate; }

                        
                [DisplayName("Loan Criteria E User"), Expression("jLoanCriteria.[EUser]")]
                public String LoanCriteriaEUser { get { return Fields.LoanCriteriaEUser[this]; } set { Fields.LoanCriteriaEUser[this] = value; } }
                public partial class RowFields { public StringField LoanCriteriaEUser; }

                        
                [DisplayName("Loan Criteria E Date"), Expression("jLoanCriteria.[EDate]")]
                public DateTime? LoanCriteriaEDate { get { return Fields.LoanCriteriaEDate[this]; } set { Fields.LoanCriteriaEDate[this] = value; } }
                public partial class RowFields { public DateTimeField LoanCriteriaEDate; }

            
    #endregion Foreign Fields

    #region Id and Name fields
    IIdField IIdRow.IdField
    {
    get { return Fields.Id; }
    }
    #endregion Id and Name fields

    #region Constructor
    public LaLoanApplicationLastNumberRow()
    : base(Fields)
    {
    }
    #endregion Constructor

    #region RowFields
    public static readonly RowFields Fields = new RowFields().Init();

    public const string TableName = "[dbo].[LA_LoanApplicationLastNumber]";

    public partial class RowFields : RowFieldsBase
    {
    public RowFields()
    : base("[dbo].[LA_LoanApplicationLastNumber]")
    {
    LocalTextPrefix = "Setup.LaLoanApplicationLastNumber";
    }
    }
    #endregion RowFields
    }
    }
