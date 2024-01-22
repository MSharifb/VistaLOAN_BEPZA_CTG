using FluentMigrator;
using System;

namespace VistaLOAN.Migrations
{
	public static class Utils
	{
		public static string[] AllExceptOracle =
		{
			"SqlServer",
			"SqlServer2000",
			"SqlServer2008",
			"SqlServerCe",
			"Postgres",
			"MySql",
			"Jet",
			"Sqlite",
			"SAP HANA"
		};

		public static void AddOracleIdentity(MigrationBase migration,
			string table, string id)
		{
			var seq = table.Replace(" ", "_").Replace("\"", "");
			//seq = seq.Substring(0, Math.Min(28, seq.Length));
			string trg = seq + "_T";
			seq = seq + "_S";

			migration.IfDatabase("Oracle")
				.Execute.Sql($"CREATE SEQUENCE {seq} START WITH 1000 INCREMENT BY 1");

			migration.IfDatabase("Oracle")
				.Execute.Sql($@"
CREATE OR REPLACE TRIGGER {trg}
BEFORE INSERT ON {table}
FOR EACH ROW
BEGIN
	IF :new.{id} IS NULL THEN
		SELECT {seq}.nextval INTO :new.{id} FROM DUAL;
	END IF;
END;");

			migration.IfDatabase("Oracle")
				.Execute.Sql(@"ALTER TRIGGER " + trg + " ENABLE");
		}

		public static void AddOracleIdentityWithMasterTable(MigrationBase migration,
			string table, string id, string masterTable, string masterTableIdInThisTable)
		{
			var seq = table.Replace(" ", "_").Replace("\"", "");
			//seq = seq.Substring(0, Math.Min(28, seq.Length));
			string trg = seq + "_T";
			seq = seq + "_S";

			migration.IfDatabase("Oracle")
					.Execute.Sql($"CREATE SEQUENCE {seq} START WITH 1000 INCREMENT BY 1");

			migration.IfDatabase("Oracle")
			.Execute.Sql($@"
CREATE OR REPLACE
TRIGGER {trg}
BEFORE INSERT ON {table}
FOR EACH ROW
BEGIN
	IF :new.{id} IS NULL THEN
		SELECT {seq}.nextval INTO :new.{id} FROM DUAL;
	
	  IF :new.{masterTableIdInThisTable} = 0 THEN
		SELECT {masterTable}_S.currval INTO :new.{masterTableIdInThisTable} FROM DUAL;    
	  END IF;
	END IF;
END;");

			migration.IfDatabase("Oracle")
				.Execute.Sql(@"ALTER TRIGGER " + trg + " ENABLE");
		}
	}
}
