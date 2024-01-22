
namespace VistaLOAN.Configurations.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("LoanDB"), TableName(TableName)]
    [DisplayName("Acc Accounting Period Information"), InstanceName("Acc Accounting Period Information"), TwoLevelCached]
    [ReadPermission("Configurations:acc_Accounting_Period_Information:Read")]
    [InsertPermission("Configurations:acc_Accounting_Period_Information:Insert")]
    [UpdatePermission("Configurations:acc_Accounting_Period_Information:Update")]
    [DeletePermission("Configurations:acc_Accounting_Period_Information:Delete")]
    [LookupScript("Configurations.AccAccountingPeriodInformation")]
    public sealed class AccAccountingPeriodInformationRow : Row, IIdRow, INameRow
    {        
            #region Id
            [DisplayName("Id"), Column("id"), Identity]
            public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
            public partial class RowFields { public Int32Field Id; }
            #endregion Id
                
            #region Is Active
            [DisplayName("Is Active"), Column("isActive"), NotNull]
            public Boolean? IsActive { get { return Fields.IsActive[this]; } set { Fields.IsActive[this] = value; } }
            public partial class RowFields { public BooleanField IsActive; }
            #endregion IsActive
                
            #region Is Closed
            [DisplayName("Is Closed"), Column("isClosed"), NotNull]
            public Boolean? IsClosed { get { return Fields.IsClosed[this]; } set { Fields.IsClosed[this] = value; } }
            public partial class RowFields { public BooleanField IsClosed; }
            #endregion IsClosed
                
            #region Period End Date
            [DisplayName("Period End Date"), Column("periodEndDate"), NotNull]
            public DateTime? PeriodEndDate { get { return Fields.PeriodEndDate[this]; } set { Fields.PeriodEndDate[this] = value; } }
            public partial class RowFields { public DateTimeField PeriodEndDate; }
            #endregion PeriodEndDate
                
            #region Period Start Date
            [DisplayName("Period Start Date"), Column("periodStartDate"), NotNull]
            public DateTime? PeriodStartDate { get { return Fields.PeriodStartDate[this]; } set { Fields.PeriodStartDate[this] = value; } }
            public partial class RowFields { public DateTimeField PeriodStartDate; }
            #endregion PeriodStartDate
                
            #region Year Name
            [DisplayName("Year Name"), Column("yearName"), Size(10), NotNull, QuickSearch]
            public String YearName { get { return Fields.YearName[this]; } set { Fields.YearName[this] = value; } }
            public partial class RowFields { public StringField YearName; }
            #endregion YearName
                
            #region Fund Control Information
            [DisplayName("Fund Control Information"), Column("fundControlInformation_id"), NotNull, ForeignKey("[dbo].[acc_FundControlInformation]", "id"), LeftJoin("jFundControlInformation"), TextualField("FundControlInformationCode")]
            public Int32? FundControlInformationId { get { return Fields.FundControlInformationId[this]; } set { Fields.FundControlInformationId[this] = value; } }
            public partial class RowFields { public Int32Field FundControlInformationId; }
            #endregion FundControlInformationId
        

    #region Foreign Fields
            
                [DisplayName("Fund Control Information Code"), Expression("jFundControlInformation.[code]")]
                public String FundControlInformationCode { get { return Fields.FundControlInformationCode[this]; } set { Fields.FundControlInformationCode[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationCode; }

                        
                [DisplayName("Fund Control Information Fund Control Name"), Expression("jFundControlInformation.[fundControlName]")]
                public String FundControlInformationFundControlName { get { return Fields.FundControlInformationFundControlName[this]; } set { Fields.FundControlInformationFundControlName[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationFundControlName; }

                        
                [DisplayName("Fund Control Information Booking Date"), Expression("jFundControlInformation.[bookingDate]")]
                public DateTime? FundControlInformationBookingDate { get { return Fields.FundControlInformationBookingDate[this]; } set { Fields.FundControlInformationBookingDate[this] = value; } }
                public partial class RowFields { public DateTimeField FundControlInformationBookingDate; }

                        
                [DisplayName("Fund Control Information Currency Id"), Expression("jFundControlInformation.[currencyId]")]
                public Int32? FundControlInformationCurrencyId { get { return Fields.FundControlInformationCurrencyId[this]; } set { Fields.FundControlInformationCurrencyId[this] = value; } }
                public partial class RowFields { public Int32Field FundControlInformationCurrencyId; }

                        
                [DisplayName("Fund Control Information Address"), Expression("jFundControlInformation.[address]")]
                public String FundControlInformationAddress { get { return Fields.FundControlInformationAddress[this]; } set { Fields.FundControlInformationAddress[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationAddress; }

                        
                [DisplayName("Fund Control Information Phone"), Expression("jFundControlInformation.[phone]")]
                public String FundControlInformationPhone { get { return Fields.FundControlInformationPhone[this]; } set { Fields.FundControlInformationPhone[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationPhone; }

                        
                [DisplayName("Fund Control Information Mobile"), Expression("jFundControlInformation.[mobile]")]
                public String FundControlInformationMobile { get { return Fields.FundControlInformationMobile[this]; } set { Fields.FundControlInformationMobile[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationMobile; }

                        
                [DisplayName("Fund Control Information Fax"), Expression("jFundControlInformation.[fax]")]
                public String FundControlInformationFax { get { return Fields.FundControlInformationFax[this]; } set { Fields.FundControlInformationFax[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationFax; }

                        
                [DisplayName("Fund Control Information Email"), Expression("jFundControlInformation.[email]")]
                public String FundControlInformationEmail { get { return Fields.FundControlInformationEmail[this]; } set { Fields.FundControlInformationEmail[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationEmail; }

                        
                [DisplayName("Fund Control Information Web Url"), Expression("jFundControlInformation.[webUrl]")]
                public String FundControlInformationWebUrl { get { return Fields.FundControlInformationWebUrl[this]; } set { Fields.FundControlInformationWebUrl[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationWebUrl; }

                        
                [DisplayName("Fund Control Information Remarks"), Expression("jFundControlInformation.[remarks]")]
                public String FundControlInformationRemarks { get { return Fields.FundControlInformationRemarks[this]; } set { Fields.FundControlInformationRemarks[this] = value; } }
                public partial class RowFields { public StringField FundControlInformationRemarks; }

                        
                [DisplayName("Fund Control Information Zone Info Id"), Expression("jFundControlInformation.[ZoneInfoId]")]
                public Int32? FundControlInformationZoneInfoId { get { return Fields.FundControlInformationZoneInfoId[this]; } set { Fields.FundControlInformationZoneInfoId[this] = value; } }
                public partial class RowFields { public Int32Field FundControlInformationZoneInfoId; }

            
    #endregion Foreign Fields

    #region Id and Name fields
    IIdField IIdRow.IdField
    {
    get { return Fields.Id; }
    }
        
            StringField INameRow.NameField
            {
            get { return Fields.YearName; }
            }
            #endregion Id and Name fields

    #region Constructor
    public AccAccountingPeriodInformationRow()
    : base(Fields)
    {
    }
    #endregion Constructor

    #region RowFields
    public static readonly RowFields Fields = new RowFields().Init();

    public const string TableName = "[dbo].[acc_Accounting_Period_Information]";

    public partial class RowFields : RowFieldsBase
        {
    public RowFields()
    : base("[dbo].[acc_Accounting_Period_Information]")
    {
    LocalTextPrefix = "Configurations.AccAccountingPeriodInformation";
    }
    }
    #endregion RowFields
    }
    }
