using Serenity;
using Serenity.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Serenity.ComponentModel;
using VistaLOAN.Configurations.Entities;
using VistaLOAN.HRM.Entities;
using VistaLOAN.Setup.Entities;
using VistaLOAN.Task.Entities;

namespace VistaLOAN.Modules.Reports
{
    public class ReportSearchViewModel
    {
        #region Ctor
        public ReportSearchViewModel()
        {
        }
        #endregion

        #region common serarch parameters

        [DisplayName("Zone")]
        public string ZoneInfoList { get; set; }

        public string EmpId { get; set; }

        public string LoanNo { get; set; }

        public Int32 LoanApplicationId { get; set; }

        public string ReportType { get; set; }

        public int LoanTypeId { get; set; }

        public int FinancialYearId { get; set; }

        public string AmountType { get; set; }

        public string LoanType { get; set; }

        public string RangeType { get; set; }

        public string LoanPresent { get; set; }

        public bool IsRunning { get; set; }

        [DisplayName("Department")]
        public int DepartmentId { get; set; }

        [DisplayName("From Date")]
        public DateTime? FromDate { get; set; }

        [DisplayName("To Date")]
        public DateTime? ToDate { get; set; }

        public string Year { get; set; }
        public string Month { get; set; }
        public string InstallmentTypeFrom { get; set; }
        public string InstallmentTypeTo { get; set; }

        [DisplayName("Interest Rate")]
        public decimal? InterestRate { get; set; }

        public decimal TotalInterestAmount { get; set; }

        #endregion

        public bool IsAddYear { get; set; }

        #region Other Parameters
        [DisplayName("With Opening")]
        public bool IsWithOpening { get; set; }

        [DisplayName("With Cash/Cheque Amount")]
        public bool IsWithCashChequeAmount { get; set; }

        [DisplayName("Is Yearly")]
        public bool IsYearly { get; set; }

        #endregion

        #region report Parameters
        public string pZoneName { get; set; }
        public string pEntityName { get; set; }
        public string pFinancialYear { get; set; }
        public string pAccountHead { get; set; }
        public string pAccountCode { get; set; }
        public string pBankAccountNo { get; set; }
        public string pCostCenter { get; set; }
        public String pReportTitle { get; set; }
        #endregion

        private SelectList _EmployeeListByEmpId;
        public SelectList EmployeeListByEmpId
        {
            get
            {
                List<PrmEmploymentInfoRow> items = new List<PrmEmploymentInfoRow>();
                using (var connection = SqlConnections.NewFor<PrmEmploymentInfoRow>())
                {
                    var e = PrmEmploymentInfoRow.Fields.As("e");
                    var eQuery = new SqlQuery()
                        .Select(e.Id)
                        .Select(e.EmpId)
                        .Select(e.FullName)
                        //.Select(e.DesignationShortName)
                        .From(e);

                    items = connection.Query<PrmEmploymentInfoRow>(eQuery).ToList();


                    //items = connection.List<PrmEmploymentInfoRow>();
                }

                this._EmployeeListByEmpId = new SelectList((from s in items.ToList()
                                                            select new
                                                            {
                                                                EmpId = s.EmpId,
                                                                FullName = "[ " + s.EmpId + " ] " + s.FullName //+ " ("+ s.DesignationShortName +")"
                                                            }),
                                                            "EmpId",
                                                            "FullName",
                                                            null);

                return _EmployeeListByEmpId;
            }
            set { _EmployeeListByEmpId = value; }
        }

        public SelectList _LoanTypeList;
        public SelectList LoanTypeList
        {
            get
            {
                var items = new List<LaLoanTypeRow>();
                using (var connection = SqlConnections.NewFor<LaLoanTypeRow>())
                {
                    items = connection.List<LaLoanTypeRow>();
                }
                this._LoanTypeList = new SelectList(items, "Id", "LoanTypeName");
                return _LoanTypeList;
            }
            set { _LoanTypeList = value; }
        }

        public SelectList _FinancialYearList;
        public SelectList FinancialYearList
        {
            get
            {
                var items = new List<AccAccountingPeriodInformationRow>();
                using (var connection = SqlConnections.NewFor<AccAccountingPeriodInformationRow>())
                {
                    items = connection.List<AccAccountingPeriodInformationRow>();
                }
                this._FinancialYearList = new SelectList(items, "Id", "YearName");
                return _FinancialYearList;
            }
            set { _FinancialYearList = value; }
        }

        public SelectList _LoanAppNoList;
        public SelectList LoanAppNoList
        {
            get
            {
                var items = new List<LaLoanApplicationRow>();
                using (var connection = SqlConnections.NewFor<LaLoanApplicationRow>())
                {
                    items = connection.List<LaLoanApplicationRow>();
                }
                this._LoanAppNoList = new SelectList(items, "Id", "LoanNo");

                return _LoanAppNoList;
            }
            set { _LoanAppNoList = value; }
        }


        #region PF Fund data migration
        class clsEmpId
        {
            public string EMPID { get; set; }
            public string EMPName { get; set; }
        }
        public string PFEmpId { get; set; }
        private SelectList _EmpListByEmpId;
        public SelectList EmpListByEmpId
        {
            get
            {
                var EmpList = new List<clsEmpId>();
                using (var connection = SqlConnections.NewFor<PrmEmploymentInfoRow>())
                {
                    EmpList = connection.Query<clsEmpId>("SELECT DISTINCT EMPID, EMPName FROM CPF_PFFundDataMigration").ToList();
                }

                this._EmpListByEmpId = new SelectList(EmpList, "EMPID", "EMPName");

                return _EmpListByEmpId;
            }
            set { _EmpListByEmpId = value; }
        }

        #endregion


        #region Zone List
        class clsZoneIds
        {
            public int? ZoneId { get; set; }
        }
        private IList<SelectListItem> _Zone;
        public IList<SelectListItem> Zone
        {
            get
            {
                var user = (UserDefinition)Authorization.UserDefinition;

                var sortZoneList = new List<PrmZoneInfoRow>();
                var userZoneList = new List<clsZoneIds>();
                using (var connection = SqlConnections.NewFor<PrmZoneInfoRow>())
                {
                    userZoneList = connection.Query<clsZoneIds>("SELECT ZoneId FROM TblUserZone WHERE EmpId = '" + user.Username + "'").ToList();
                    sortZoneList = connection.List<PrmZoneInfoRow>().Where(x => userZoneList.Select(s => s.ZoneId).Contains(x.Id)).OrderBy(s => s.SortOrder).ToList();
                }

                var resultList = new List<SelectListItem>();
                foreach (var item in sortZoneList)
                {
                    if (sortZoneList.Count == 1)
                    {
                        resultList.Add(new SelectListItem()
                        {
                            Text = item.ZoneName,
                            Value = item.Id.ToString(),
                            Selected = true
                        });
                    }
                    else
                    {
                        resultList.Add(new SelectListItem()
                        {
                            Text = item.ZoneName,
                            Value = item.Id.ToString()
                        });
                    }

                }

                this._Zone = resultList;
                return _Zone;
            }
            set { _Zone = value; }
        }
        #endregion

        #region Year List
        public IList<SelectListItem> _YearList;
        public IList<SelectListItem> YearList
        {
            get
            {
                if (_YearList == null || !_YearList.Any())
                {
                    _YearList = new List<SelectListItem>();
                    for (int i = DateTime.Now.Year; i >= 1970; i--)
                    {
                        _YearList.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });
                    }
                }
                return _YearList;
            }
            set { _YearList = value; }
        }
        #endregion

        #region Month List
        public IList<SelectListItem> _monthList;
        public  IList<SelectListItem> MonthList
        {
            get
            {
                if (_monthList == null || !_monthList.Any())
                {
                    _monthList = new List<SelectListItem>();
                    _monthList.Add(new SelectListItem() { Text = "January", Value = "January", });
                    _monthList.Add(new SelectListItem() { Text = "February", Value = "February", });
                    _monthList.Add(new SelectListItem() { Text = "March", Value = "March", });
                    _monthList.Add(new SelectListItem() { Text = "April", Value = "April", });
                    _monthList.Add(new SelectListItem() { Text = "May", Value = "May", });
                    _monthList.Add(new SelectListItem() { Text = "June", Value = "June", });
                    _monthList.Add(new SelectListItem() { Text = "July", Value = "July", });
                    _monthList.Add(new SelectListItem() { Text = "August", Value = "August", });
                    _monthList.Add(new SelectListItem() { Text = "September", Value = "September", });
                    _monthList.Add(new SelectListItem() { Text = "October", Value = "October", });
                    _monthList.Add(new SelectListItem() { Text = "November", Value = "November", });
                    _monthList.Add(new SelectListItem() { Text = "December", Value = "December", });
                }
                return _monthList;
            }
            set
            {
                _monthList = value;
            }
        }
        #endregion

        #region Installment Type List
        public IList<SelectListItem> _InstallmentTypeList;
        public IList<SelectListItem> InstallmentTypeList
        {
            get
            {
                if (_InstallmentTypeList == null || !_InstallmentTypeList.Any())
                {
                    _InstallmentTypeList = new List<SelectListItem>();
                    _InstallmentTypeList.Add(new SelectListItem() { Text = "Principle", Value = "P", });
                    _InstallmentTypeList.Add(new SelectListItem() { Text = "Interest", Value = "I", });
                }
                return _InstallmentTypeList;
            }
            set
            {
                _InstallmentTypeList = value;
            }
        }
        #endregion

    }
}