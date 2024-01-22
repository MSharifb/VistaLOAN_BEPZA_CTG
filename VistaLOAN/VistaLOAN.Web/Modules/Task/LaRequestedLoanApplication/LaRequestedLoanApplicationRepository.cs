

namespace VistaLOAN.Task.Repositories
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.LaRequestedLoanApplicationRow;

    public class LaRequestedLoanApplicationRepository
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

        private class MySaveHandler : SaveRequestHandler<MyRow> {

            UserDefinition user = (UserDefinition)Authorization.UserDefinition;

            protected override void ExecuteSave()
            {
                base.ExecuteSave();
                int  applicationId = Connection
                                    .Query<Int32>("SELECT Id FROM APV_ApplicationInformation WHERE ApprovalProcessId = 4 AND ApplicationId=" + Row.Id, commandType: CommandType.Text)
                                    .FirstOrDefault();

                DynamicParameters param1 = new DynamicParameters();
                param1.Add("ApplicationId", applicationId);

                if (Row.AppStatusId == Convert.ToInt32(ApprovalStatus.Approved))
                    param1.Add("@ActionName", "Approved");

                else if (Row.AppStatusId == Convert.ToInt32(ApprovalStatus.Recommend))
                    param1.Add("@ActionName", "Recommend");

                else if (Row.AppStatusId == Convert.ToInt32(ApprovalStatus.Cancel))
                    param1.Add("@ActionName", "Cancel");


                param1.Add("Comments", string.Empty);
                param1.Add("NextApproverId", Row.ApproverId == null ? 0 : Convert.ToInt32(Row.ApproverId));
                param1.Add("LoggedOnUser", GetEmpID(user.EmpId));

                string _result = Connection
                                 .Query<string>("APV_ProceedToNextStep", param1, commandType: CommandType.StoredProcedure)
                                 .FirstOrDefault();

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
        private class MyListHandler : ListRequestHandler<MyRow> { }
    }
}