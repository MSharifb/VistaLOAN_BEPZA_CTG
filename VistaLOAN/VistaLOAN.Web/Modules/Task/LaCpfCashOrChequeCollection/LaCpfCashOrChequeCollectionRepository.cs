

namespace VistaLOAN.Task.Repositories
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.LaCpfCashOrChequeCollectionRow;

    public class LaCpfCashOrChequeCollectionRepository
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

            protected override void BeforeSave()
            {
                base.BeforeSave();

                if (IsCreate)
                {
                    var flds = MyRow.Fields;

                    var checkForDuplicate =
                        Connection
                        .List<MyRow>(x => x.SelectTableFields()
                                    .Where(flds.EmployeeId == (Row.EmployeeId ?? 0)
                                            && flds.CollectionMonth == Row.CollectionMonth
                                            && flds.CollectionYear == Row.CollectionYear
                                            && flds.CashorCheque == Row.CashorCheque));


                    if (checkForDuplicate != null)
                    {
                        if (checkForDuplicate.Find(f => f.CollectionType == Row.CollectionType && f.ApplicationId==Row.ApplicationId) != null)
                        {
                            throw new ValidationError("Sorry, This information is already exist!");
                        }
                    }
                }
            }

        }
        private class MyDeleteHandler : DeleteRequestHandler<MyRow> { }
        private class MyRetrieveHandler : RetrieveRequestHandler<MyRow> { }
        private class MyListHandler : ListRequestHandler<MyRow>
        {
            protected override void PrepareQuery(SqlQuery query)
            {
                base.PrepareQuery(query);

                var user = (UserDefinition)Authorization.UserDefinition;
                var loanType = string.Empty;
                int? loanCriteriaId = 0;
                
                var fldv = Setup.Entities.LaLoanTypeRow.Fields.As("fldv");
                var queryV = new SqlQuery()
                    .Select(fldv.ShortCode)
                    .From(fldv)
                    .Where(fldv.Id == user.LoanTypeInformationId);

                loanType = Connection.Query<Setup.Entities.LaLoanTypeRow>(queryV).FirstOrDefault().ShortCode;

                var fldLC = Setup.Entities.LaLoanCriteriaRow.Fields.As("fldLC");
                var queryLC = new SqlQuery()
                    .Select(fldLC.Id)
                    .From(fldLC)
                    .Where(fldLC.LoanTypeId == user.LoanTypeInformationId);

                loanCriteriaId = Connection.Query<Setup.Entities.LaLoanCriteriaRow>(queryLC).FirstOrDefault().Id;


                if (loanType == "PFL")
                {
                    query.Where(fld.ApplicationId.IsNull() || fld.ApplicationLoanCriteriaId == Convert.ToInt32(loanCriteriaId));
                }
                else
                {
                    query.Where(fld.ApplicationId != 0 && fld.ApplicationLoanCriteriaId ==Convert.ToInt32(loanCriteriaId));
                }
                //else
                //{
                //    throw new Exception("Please Select Loan");
                //}
            }
        }
    }
}