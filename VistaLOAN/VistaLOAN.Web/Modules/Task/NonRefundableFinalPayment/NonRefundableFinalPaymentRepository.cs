

namespace VistaLOAN.Task.Repositories
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using Setup.Repositories;
    using System;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.NonRefundableFinalPaymentRow;

    public class NonRefundableFinalPaymentRepository
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

        private class MySaveHandler : SaveRequestHandler<MyRow>
        {
            UserDefinition user = (UserDefinition)Authorization.UserDefinition;

            protected override void BeforeSave()
            {
                base.BeforeSave();

                Row.IUser = user.UserId.ToString();
                Row.IDate = DateTime.Now;

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
                param.Add("ApproverId", Row.ApproverId);
                param.Add("IUser", GetEmpID(user.EmpId));

                var list1 = Connection
                    .Query<String>("Apv_sp_InitializeApprovalProcess", param, commandType: CommandType.StoredProcedure)
                    .FirstOrDefault();

            }
            protected override void AfterSave()
            {
                base.AfterSave();
                int lastVoucherNumber = Connection.Query<int>("SELECT LastLoanNumber FROM LA_LoanApplicationLastNumber WHERE PFPaymentType=" + "\'" + Row.PfLoanType + "\'", commandType: CommandType.Text).FirstOrDefault();
                int lastVoucherNumberId = Connection.Query<int>("SELECT Id FROM LA_LoanApplicationLastNumber WHERE PFPaymentType=" + "\'" + Row.PfLoanType+ "\'", commandType: CommandType.Text).FirstOrDefault();

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
}