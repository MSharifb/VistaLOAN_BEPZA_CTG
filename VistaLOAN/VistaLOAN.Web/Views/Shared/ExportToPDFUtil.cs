using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Microsoft.Reporting.WebForms;

namespace VistaLOAN.Views.Shared
{
    public static class ExportToPDFUtil
    {
        public static bool ExportToPDF(ReportViewer viewer, string fileName)
        {
            String newFilePath = String.Empty;

            try
            {
                String filePath = "~/Content/TempFiles/";
                String filePathInWeb = "../Content/TempFiles/";

                // Check if TempFiles directory not exists
                String physicalDirectoryPath = HttpContext.Current.Server.MapPath(filePath);
                if (!Directory.Exists(physicalDirectoryPath))
                {
                    Directory.CreateDirectory(physicalDirectoryPath);
                }

                newFilePath = filePath + fileName;
                FileInfo fileInfo = new FileInfo(HttpContext.Current.Server.MapPath(newFilePath));
                var file = new FileStream(HttpContext.Current.Server.MapPath(newFilePath), FileMode.Create);

                Warning[] warnings;
                string[] streamids;
                string mimeType;
                string encoding;
                string filenameExtension;

                byte[] bytes = viewer.LocalReport.Render(
                    "PDF", null, out mimeType, out encoding, out filenameExtension,
                    out streamids, out warnings);

                using (FileStream fs = file)
                {
                    fs.Write(bytes, 0, bytes.Length);
                }


                HttpContext.Current.Response.Write(string.Format("<script>window.open('{0}','_blank');</script>",
                    filePathInWeb + fileName));

            }
            catch (Exception ex) { System.Diagnostics.Debug.WriteLine(ex.Message); }

            return true;
        }
    }
}