
namespace VistaLOAN.Setup.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Setup.LaDonorInformation")]
    [BasedOnRow(typeof(Entities.LaDonorInformationRow))]
    public class LaDonorInformationColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
        public Int32 Id { get; set; }
        [EditLink]
        public String DonorName { get; set; }
        public String Address { get; set; }
        public String PhoneNo { get; set; }
        public String FaxNo { get; set; }
        public String Email { get; set; }
        public String MobileNo { get; set; }
        public String ContactPersonName { get; set; }
        public String ContanctPersonMobileNo { get; set; }
        public String Remark { get; set; }
        public String IUser { get; set; }
        public DateTime IDate { get; set; }
        public String EUser { get; set; }
        public DateTime EDate { get; set; }
    }
}