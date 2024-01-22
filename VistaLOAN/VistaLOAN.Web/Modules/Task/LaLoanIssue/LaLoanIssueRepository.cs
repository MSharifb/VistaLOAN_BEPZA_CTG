

namespace VistaLOAN.Task.Repositories
{
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System;
    using System.Data;
    using System.Linq;
    using MyRow = Entities.LaLoanIssueRow;

    public class LaLoanIssueRepository
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
            protected override void BeforeSave()
            {
                base.BeforeSave();

                if (Row.CloseDate != null)
                {
                    var lastDay = DateTime.DaysInMonth(Convert.ToDateTime(Row.CloseDate).Year, Convert.ToDateTime(Row.CloseDate).Month);
                    if (Convert.ToDateTime(Row.CloseDate).Day != lastDay)
                    {
                        throw new ValidationError("Loan close date should be last date of month!");
                    }
                }

                if(!Convert.ToBoolean(Row.IsClose))
                {
                    Row.CloseDate = null;
                }
            }

            protected override void ExecuteSave()
            {
                base.ExecuteSave();

                #region Updating Loan Application.
                if (Row.IsFullPaid != null)
                {
                    if (Row.IsFullPaid == true)
                    {
                        new LaLoanApplicationRepository()
                            .Update(UnitOfWork, new SaveRequest<Entities.LaLoanApplicationRow>
                            {
                                EntityId = Row.LoanApplicationId,
                                Entity = new Entities.LaLoanApplicationRow()
                                {
                                    IsIssue = true
                                }
                            });
                    }
                    else
                    {
                        new LaLoanApplicationRepository()
                            .Update(UnitOfWork, new SaveRequest<Entities.LaLoanApplicationRow>
                            {
                                EntityId = Row.LoanApplicationId,
                                Entity = new Entities.LaLoanApplicationRow()
                                {
                                    IsIssue = false
                                }
                            });
                    }
                }
                #endregion
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