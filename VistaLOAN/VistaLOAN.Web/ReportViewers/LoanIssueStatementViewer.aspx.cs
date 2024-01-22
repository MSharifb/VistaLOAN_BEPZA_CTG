using Dapper;
using Microsoft.Reporting.WebForms;
using Serenity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using VistaLOAN.Modules.Reports;
using VistaLOAN.Views.Shared;

namespace VistaLOAN.ReportViewers
{
    public partial class LoanIssueStatementViewer : System.Web.UI.Page
    {
        #region Fields
        public SqlConnection con;
        #endregion

        #region Ctor
        public LoanIssueStatementViewer()
        {
            string constr = ConfigurationManager.ConnectionStrings["LOANDB"].ToString();
            con = new SqlConnection(constr);
        }
        #endregion

        protected void Page_Init(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                GetDate();
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            //
        }

        private void GetDate()
        {
            if (Session["dt"] != null)
            {
                var model = Session["model"] as ReportSearchViewModel;
                ReportViewer1.Reset();
                ReportViewer1.ProcessingMode = ProcessingMode.Local;
                ReportViewer1.LocalReport.ReportPath = Server.MapPath(Session["rpath"].ToString());
                ReportViewer1.LocalReport.Refresh();
                ReportViewer1.LocalReport.DataSources.Clear();

                #region report Title

                //ReportParameter p10 = new ReportParameter("pZoneName", model.pZoneName);
                ReportParameter p11 = new ReportParameter("param", model.pReportTitle);
                var p12 = new ReportParameter();
                var p13 = new ReportParameter();
                var p14 = new ReportParameter();

                string startDate = "";
                string endDate = "";
                string fYear = "";

                var ci = new CultureInfo("en-US");
                if (model.FromDate != null)
                {
                    startDate = model.FromDate.Value.ToString("dd-MMM-yyyy", ci);
                    endDate = model.ToDate.Value.ToString("dd-MMM-yyyy", ci);
                    fYear = model.Year;
                    p12 = new ReportParameter("startDate", startDate);
                    p13 = new ReportParameter("endDate", endDate);
                    p14 = new ReportParameter("fYear", fYear);
                }

                try
                {
                    ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { p11, p12, p13, p14 });
                }
                catch { }

                #endregion

                var param = new DynamicParameters();
                param.Add("@ZoneId", ((UserDefinition)Authorization.UserDefinition).ZoneID);
                con.Open();
                var data = con.Query<ZoneInfoViewModel>("SP_PRM_GetReportHeaderByZoneID", param, commandType: CommandType.StoredProcedure).ToList();
                con.Close();

                var dt = Session["dt"];
                var ds = Session["ds"];

                var rdc = new ReportDataSource(ds.ToString(), dt);
                var rdc1 = new ReportDataSource("ZoneInfo", data);

                ReportViewer1.LocalReport.DataSources.Add(rdc);
                ReportViewer1.LocalReport.DataSources.Add(rdc1);

                this.ReportViewer1.LocalReport.SubreportProcessing +=
                    new SubreportProcessingEventHandler(localReport_SubreportProcessing);
                ReportViewer1.DataBind();


                //ExportToPDF
                String fileName = "LoanReport_" + Guid.NewGuid() + ".pdf";
                ExportToPDFUtil.ExportToPDF(ReportViewer1, fileName);
            }
        }

        void localReport_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            var dsName = string.Empty;

            var param = new DynamicParameters();
            param.Add("@ZoneId", ((UserDefinition)Authorization.UserDefinition).ZoneID);
            con.Open();
            dsName = "ZoneInfo";
            var data = con.Query<ZoneInfoViewModel>("SP_PRM_GetReportHeaderByZoneID", param, commandType: CommandType.StoredProcedure).ToList();
            con.Close();
            e.DataSources.Add(new ReportDataSource(dsName, data));


            switch (e.ReportPath)
            {
                case "_ReportHeader":

                    break;
                default:
                    break;
            }
        }
    }
}