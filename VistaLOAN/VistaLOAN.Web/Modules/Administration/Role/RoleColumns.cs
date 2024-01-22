
namespace VistaLOAN.Administration.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("Administration.Role")]
    [BasedOnRow(typeof(Entities.RoleRow))]
    public class RoleColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId")/*, AlignCenter*/]
        public Int32 RoleId { get; set; }
        [EditLink, Width(300)]
        public String RoleName { get; set; }
    }
}