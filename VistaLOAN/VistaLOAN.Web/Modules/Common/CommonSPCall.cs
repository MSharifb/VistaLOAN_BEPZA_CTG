using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace VistaLOAN
{
    public class CommonSPCall
    {
        private readonly string connStr = ConfigurationManager.ConnectionStrings["LoanDB"].ConnectionString;

        #region Ctor
        public CommonSPCall()
        {
        }
        #endregion

        public DataTable GetDataTable(string spName,SqlParameter[] SqlParameter)
        {
            System.Data.DataTable dsResult = new System.Data.DataTable();
            try
            {
                using (var connection = new SqlConnection(connStr))
                {
                    SqlCommand command = new SqlCommand(spName, connection);
                    if (SqlParameter == null)
                        command.CommandType = CommandType.Text;
                    else
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        foreach (var item in SqlParameter)
                        {
                            command.Parameters.Add(item);
                        }
                    }

                    connection.Open();

                    foreach (SqlParameter sp in command.Parameters)
                    {
                        if (sp.Direction != ParameterDirection.Output)
                        {
                            if (sp.Value == null)
                            {
                                sp.Value = DBNull.Value;
                            }
                            else
                            {
                                if (sp.Value.ToString() == DateTime.MinValue.ToString())
                                    sp.Value = DBNull.Value;
                            }
                        }
                    }

                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    adapter.Fill(dsResult);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dsResult;
        }
    }
}