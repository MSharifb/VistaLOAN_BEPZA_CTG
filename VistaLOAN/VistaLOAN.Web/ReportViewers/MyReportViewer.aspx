<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyReportViewer.aspx.cs" Inherits="VistaLOAN.ReportViewers.MyReportViewer" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<form runat="server" id="nnn">
    <div>
        <asp:scriptmanager id="ScriptManager1" runat="server" scriptmode="Release"></asp:scriptmanager>

        <rsweb:ReportViewer ID="ReportViewer1" runat="server" ShowPrintButton="true" AsyncRendering="false" SizeToReportContent="true" ClientIDMode="Static">
        </rsweb:ReportViewer>

    </div>

    <style type="text/css">
        /*table[title="Refresh"] {
            display:none!important;
        }*/

        table[title="Print"] {
            overflow: visible !important;
            display: block;
        }

        #1_ReportViewer1_ctl05_ctl04_ctl00 {
            overflow: visible !important;
        }

        #1_ReportViewer1_ctl05_ctl05_ctl00 {
            overflow: visible !important;
        }

        #1_ReportViewer1_ctl05_ctl06_ctl00 {
            overflow: visible !important;
        }

        #1_ReportViewer1_ctl05_ctl07_ctl00 {
            overflow: visible !important;
        }

        #1_ReportViewer1_ctl05_ctl08_ctl00 {
            overflow: visible !important;
        }
    </style>

</form>

