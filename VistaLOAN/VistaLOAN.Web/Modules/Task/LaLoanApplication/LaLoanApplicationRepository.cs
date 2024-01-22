

namespace VistaLOAN.Task.Repositories
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using Setup.Repositories;
    using System;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.LaLoanApplicationRow;

    public class LaLoanApplicationRepository
    {
        private static MyRow.RowFields fld { get { return MyRow.Fields; } }

        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MySaveHandler().Process(uow, request, SaveRequestType.Create);
        }

        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MySaveHandler().Process(uow, request, SaveRequestType.Update);
        }

        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request)
        {
            return new MyDeleteHandler().Process(uow, request);
        }

        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request)
        {
            return new MyRetrieveHandler().Process(connection, request);
        }

        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyListHandler().Process(connection, request);
        }

        public GetCPFContributionResponse GetCPFContribution(IDbConnection connection, eCPFContributionRequest request)
        {
            var strSql = String.Format("SELECT * FROM [dbo].[CPF_FN_GetCPFContribution] ({0}, '{1}', {2})", request.EmployeeId, request.Year, request.Month.Trim());
            var newCPFContribution = connection.Query<CPFContributionOutput>(strSql, commandType: CommandType.Text).FirstOrDefault();

            var response = new GetCPFContributionResponse();
            if (newCPFContribution != null)
            {
                response.EmpCoreContribution = newCPFContribution.EmpCoreContribution;
                response.EmpProfit = newCPFContribution.EmpProfit;
                response.ComCoreContribution = newCPFContribution.ComCoreContribution;
                response.ComProfit = newCPFContribution.ComProfit;
            }
            return response;
        }
        public GetCPFPolicyResponse GetCPFPolicy(IDbConnection connection, eCPFPolicyRequest request)
        {
            var strSql = String.Format("SELECT TOP 1 NRfApplicableFor, NRfLoanPercentage, NRfMinimumAge, RfApplicableFor, RfLoanPercentage, RfMinServiceYear FROM CPF_LoanPolicy where LoanPolicyFor = 'CPF' and " + request.ApplicationDate.ToSqlDate() + "between StartDate and EndDate");
            var newCPFPolicy = connection.Query<CPFPolicy>(strSql, commandType: CommandType.Text).FirstOrDefault();

            var response = new GetCPFPolicyResponse();
            if (newCPFPolicy != null)
            {
                response.NRfApplicableFor = newCPFPolicy.NRfApplicableFor;
                response.NRfLoanPercentage = newCPFPolicy.NRfLoanPercentage;
                response.NRfMinimumAge = newCPFPolicy.NRfMinimumAge;
                response.RfApplicableFor = newCPFPolicy.RfApplicableFor;
                response.RfLoanPercentage = newCPFPolicy.RfLoanPercentage;
                response.RfMinServiceYear = newCPFPolicy.RfMinServiceYear;
            }
            return response;
        }
        public GetForfeitedRuleResponse GetForfeitedRule(IDbConnection connection, eForfeitedRuleRequest request)
        {
            var strSql = String.Format("SELECT top 1 ForfeitedRate FROM CPF_ForfeitedRule WHERE " + request.ServiceLength + " Between FromServiceLength and ToServiceLength");
            var newForfeitedRule = connection.Query<ForfeitedRule>(strSql, commandType: CommandType.Text).FirstOrDefault();

            var response = new GetForfeitedRuleResponse();
            if (newForfeitedRule != null)
            {
                response.ForfeitedRate = newForfeitedRule.ForfeitedRate;
            }
            return response;
        }

        private class MySaveHandler : SaveRequestHandler<MyRow>
        {
            UserDefinition user = (UserDefinition)Authorization.UserDefinition;

            protected override void BeforeSave()
            {
                base.BeforeSave();

                if (Row.Id == null)
                {
                        var validationQuery = String.Format(@"SELECT 'loanexists' as IsLoanFound
                                      FROM LA_LoanApplication A
                                      INNER JOIN LA_LoanIssue LI ON A.Id = LI.LoanApplicationId
                                      WHERE EmployeeId = {0} AND LoanCriteriaId = {1} AND LI.IsClose = 0", Row.EmployeeId, Row.LoanCriteriaId);
                        var isApplicationExists = Connection.Query<string>(validationQuery).FirstOrDefault();
                        if (!String.IsNullOrEmpty(isApplicationExists))
                        {
                            throw new ValidationError("Previous loan is not closed yet! Please close previous loan and try again.");
                        }
                }


                if (Row.IsOffLine == true)
                {
                    if (Row.IsApprovalProcess == true)
                    {
                        Row.GrantedLoanAmount = Row.ApplyLoanAmount;
                        Row.GrantedInterestAmount = Row.ApplyInterestAmount;
                    }
                }
            }
            protected override void ExecuteSave()
            {
                base.ExecuteSave();

                DynamicParameters param = new DynamicParameters();

                param.Add("ApprovalProcessEnum", "Loan");
                param.Add("ApplicantId", GetEmpID(user.EmpId));
                param.Add("ApplicationId", Row.Id);
                param.Add("IsOnlineApplication", 1);
                //param.Add("ApprovalStepId", 0);
                param.Add("ApproverId", Row.ApproverId);
                param.Add("IUser", GetEmpID(user.EmpId));

                var list1 = Connection
                    .Query<String>("Apv_sp_InitializeApprovalProcess", param, commandType: CommandType.StoredProcedure)
                    .FirstOrDefault();

            }
            protected override void AfterSave()
            {
                base.AfterSave();
                int lastVoucherNumber = Connection.Query<int>("SELECT LastLoanNumber FROM LA_LoanApplicationLastNumber WHERE LoanCriteriaId=" + Row.LoanCriteriaId, commandType: CommandType.Text).FirstOrDefault();
                int lastVoucherNumberId = Connection.Query<int>("SELECT Id FROM LA_LoanApplicationLastNumber WHERE LoanCriteriaId=" + Row.LoanCriteriaId, commandType: CommandType.Text).FirstOrDefault();

                new LaLoanApplicationLastNumberRepository()
                .Update(UnitOfWork, new SaveRequest<Setup.Entities.LaLoanApplicationLastNumberRow>
                {
                    EntityId = lastVoucherNumberId,
                    Entity = new Setup.Entities.LaLoanApplicationLastNumberRow
                    {
                        LastLoanNumber = lastVoucherNumber + 1
                    }
                });
            }

            public string GetEmpID(int employeeId)
            {
                string _result = string.Empty;
                _result = Connection
                         .Query<string>("SELECT EmpID FROM PRM_EmploymentInfo WHERE Id=" + employeeId, commandType: CommandType.Text)
                         .FirstOrDefault();
                return _result;
            }
        }
        private class MyDeleteHandler : DeleteRequestHandler<MyRow> { }
        private class MyRetrieveHandler : RetrieveRequestHandler<MyRow> { }
        private class MyListHandler : ListRequestHandler<MyRow> {
            protected override void PrepareQuery(SqlQuery query)
            {
                base.PrepareQuery(query);

                var user = (UserDefinition)Authorization.UserDefinition;

                if (user.LoanTypeInformationId != 0)
                {
                    query.Where(fld.LoanCriteriaLoanTypeId == user.LoanTypeInformationId);
                }
                else
                {
                    throw new Exception("Please Select Loan");
                }
            }
        }

    }
    #region Others

    #region CPF Contribution
    public class CPFContributionOutput
    {
        public Int32 EmployeeId { get; set; }
        public String EmpID { get; set; }
        public String EmployeeName { get; set; }
        public Decimal EmpCoreContribution { get;set;}
        public Decimal EmpProfit { get;set;}
        public Decimal ComCoreContribution { get;set;}
        public Decimal ComProfit { get;set;}
    }
    public class eCPFContributionRequest : ListRequest
    {
        public int? EmployeeId { get; set; }
        public String Year { get; set; }
        public String Month { get; set; }
    }
    public class GetCPFContributionResponse : ServiceResponse
    {
        public Int32 EmployeeId { get; set; }
        public String EmpID { get; set; }
        public String EmployeeName { get; set; }
        public Decimal EmpCoreContribution { get; set; }
        public Decimal EmpProfit { get; set; }
        public Decimal ComCoreContribution { get; set; }
        public Decimal ComProfit { get; set; }
    }
    #endregion

    #region CPF Policy

    public class CPFPolicy
    {
        public String NRfApplicableFor { get; set; }
        public Decimal NRfLoanPercentage { get; set; }
        public Decimal NRfMinimumAge { get; set; }
        public String RfApplicableFor { get; set; }
        public Decimal RfLoanPercentage { get; set; }
        public Decimal RfMinServiceYear { get; set; }
    }
    public class eCPFPolicyRequest : ListRequest
    {
        public DateTime ApplicationDate { get; set; }
    }
    public class GetCPFPolicyResponse : ServiceResponse
    {
        public String NRfApplicableFor { get; set; }
        public Decimal NRfLoanPercentage { get; set; }
        public Decimal NRfMinimumAge { get; set; }
        public String RfApplicableFor { get; set; }
        public Decimal RfLoanPercentage { get; set; }
        public Decimal RfMinServiceYear { get; set; }
    }
    #endregion

    #region Forfeited Rule

    public class ForfeitedRule
    {
        public Decimal ForfeitedRate { get; set; }
    }
    public class eForfeitedRuleRequest : ListRequest
    {
        public Decimal ServiceLength { get; set; }
    }
    public class GetForfeitedRuleResponse : ServiceResponse
    {
        public Decimal ForfeitedRate { get; set; }
    }
    #endregion

    #endregion
}