﻿

namespace VistaLOAN.Task.Repositories
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.LaLoanOpeningRow;

    public class LaLoanOpeningRepository
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

        private class MySaveHandler : SaveRequestHandler<MyRow> { }
        private class MyDeleteHandler : DeleteRequestHandler<MyRow> { }
        private class MyRetrieveHandler : RetrieveRequestHandler<MyRow> { }
        private class MyListHandler : ListRequestHandler<MyRow> {
            protected override void PrepareQuery(SqlQuery query)
            {
                base.PrepareQuery(query);

                var user = (UserDefinition)Authorization.UserDefinition;

                if (user.LoanTypeInformationId != 0)
                {
                    int loanCriteriaId = Connection.Query<int>("SELECT Id FROM LA_LoanCriteria WHERE LoanTypeId =" + user.LoanTypeInformationId, commandType: CommandType.Text).FirstOrDefault();
                    query.Where(fld.LoanApplicationLoanCriteriaId == loanCriteriaId);
                }
                else
                {
                    throw new Exception("Please Select Loan");
                }
            }
        }
    }
}