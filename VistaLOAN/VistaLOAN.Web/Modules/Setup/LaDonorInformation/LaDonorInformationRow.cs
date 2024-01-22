
namespace VistaLOAN.Setup.Entities
{
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;

    [ConnectionKey("LoanDB"), DisplayName("Donor Information"), InstanceName("Donor Information"), TwoLevelCached]
    [ReadPermission("Setup:LaDonorInformation:Read")]
    [InsertPermission("Setup:LaDonorInformation:Insert")]
    [UpdatePermission("Setup:LaDonorInformation:Update")]
    [DeletePermission("Setup:LaDonorInformation:Delete")]
    [LookupScript("Setup.LaDonorInformation")]
    public sealed class LaDonorInformationRow : NRow, IIdRow, INameRow
    {
        #region Id
        [DisplayName("Id"), Identity]
        public Int32? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int32Field Id; }
        #endregion Id

        #region Donor Name
        [DisplayName("Donor Name"), Size(-1), NotNull, QuickSearch]
        public String DonorName { get { return Fields.DonorName[this]; } set { Fields.DonorName[this] = value; } }
        public partial class RowFields { public StringField DonorName; }
        #endregion DonorName

        #region Address
        [DisplayName("Address"), Size(-1)]
        public String Address { get { return Fields.Address[this]; } set { Fields.Address[this] = value; } }
        public partial class RowFields { public StringField Address; }
        #endregion Address

        #region Phone No
        [DisplayName("Phone No"), Size(-1)]
        public String PhoneNo { get { return Fields.PhoneNo[this]; } set { Fields.PhoneNo[this] = value; } }
        public partial class RowFields { public StringField PhoneNo; }
        #endregion PhoneNo

        #region Fax No
        [DisplayName("Fax No"), Size(-1)]
        public String FaxNo { get { return Fields.FaxNo[this]; } set { Fields.FaxNo[this] = value; } }
        public partial class RowFields { public StringField FaxNo; }
        #endregion FaxNo

        #region Email
        [DisplayName("Email"), Size(-1)]
        public String Email { get { return Fields.Email[this]; } set { Fields.Email[this] = value; } }
        public partial class RowFields { public StringField Email; }
        #endregion Email

        #region Mobile No
        [DisplayName("Mobile No"), Size(-1)]
        public String MobileNo { get { return Fields.MobileNo[this]; } set { Fields.MobileNo[this] = value; } }
        public partial class RowFields { public StringField MobileNo; }
        #endregion MobileNo

        #region Contact Person Name
        [DisplayName("Contact Person Name"), Size(-1)]
        public String ContactPersonName { get { return Fields.ContactPersonName[this]; } set { Fields.ContactPersonName[this] = value; } }
        public partial class RowFields { public StringField ContactPersonName; }
        #endregion ContactPersonName

        #region Contanct Person Mobile No
        [DisplayName("Contanct Person Mobile No"), Size(-1)]
        public String ContanctPersonMobileNo { get { return Fields.ContanctPersonMobileNo[this]; } set { Fields.ContanctPersonMobileNo[this] = value; } }
        public partial class RowFields { public StringField ContanctPersonMobileNo; }
        #endregion ContanctPersonMobileNo

        #region Remark
        [DisplayName("Remark"), Size(-1)]
        public String Remark { get { return Fields.Remark[this]; } set { Fields.Remark[this] = value; } }
        public partial class RowFields { public StringField Remark; }
        #endregion Remark

        #region Foreign Fields

        #endregion Foreign Fields

        #region Id and Name fields
        IIdField IIdRow.IdField
        {
            get { return Fields.Id; }
        }

        StringField INameRow.NameField
        {
            get { return Fields.DonorName; }
        }
        #endregion Id and Name fields

        #region Constructor
        public LaDonorInformationRow()
        : base(Fields)
        {
        }
        #endregion Constructor

        #region RowFields
        public static readonly RowFields Fields = new RowFields().Init();

        public const string TableName = "[dbo].[LA_DonorInformation]";

        public partial class RowFields : NRowFields
        {
            public RowFields()
            : base("[dbo].[LA_DonorInformation]")
            {
                LocalTextPrefix = "Setup.LaDonorInformation";
            }
        }
        #endregion RowFields
    }
}
