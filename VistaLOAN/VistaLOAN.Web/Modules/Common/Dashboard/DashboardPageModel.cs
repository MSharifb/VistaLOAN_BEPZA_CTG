
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Serenity.ComponentModel;
using Serenity.Data;
using VistaLOAN.Configurations.Entities;

namespace VistaLOAN.Common
{
    public class DashboardPageModel
    {
        private SelectList _Zone;
        public SelectList Zone
        {
            get
            {
                List<PrmZoneInfoRow> items = new List<PrmZoneInfoRow>();

                using (var connection = SqlConnections.NewFor<PrmZoneInfoRow>())
                {
                    items = connection.List<PrmZoneInfoRow>();

                }
                this._Zone = new SelectList(items, "id", "ZoneName");

                return _Zone;
            }
            set { _Zone = value; }
        }


        public int CurrentZone { get; set; }

        public int IssuedCheque { get; set; }
        public int PreparedVoucher { get; set; }
        public int SubmittedVoucher { get; set; }
        public int ApprovedVoucher { get; set; }
        public int PostedVoucher { get; set; }

    }
}