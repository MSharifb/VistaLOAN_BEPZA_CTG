
namespace VistaLOAN.Task.Endpoints
{
    using Repositories;
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System.Data;
    using System.Web.Mvc;
    using MyRepository = Repositories.LaLoanApplicationRepository;
    using MyRow = Entities.LaLoanApplicationRow;

    [RoutePrefix("Services/Task/LaLoanApplication"), Route("{action}")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class LaLoanApplicationController : ServiceEndpoint
    {
        [HttpPost, AuthorizeCreate(typeof(MyRow))]
        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MyRepository().Create(uow, request);
        }

        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MyRepository().Update(uow, request);
        }
 
        [HttpPost, AuthorizeDelete(typeof(MyRow))]
        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request)
        {
            return new MyRepository().Delete(uow, request);
        }

        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request)
        {
            return new MyRepository().Retrieve(connection, request);
        }

        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyRepository().List(connection, request);
        }
        public GetCPFContributionResponse GetCPFContribution(IDbConnection connection, eCPFContributionRequest request)
        {
            return new MyRepository().GetCPFContribution(connection, request);
        }
        public GetCPFPolicyResponse GetCPFPolicy(IDbConnection connection, eCPFPolicyRequest request)
        {
            return new MyRepository().GetCPFPolicy(connection, request);
        }
        public GetForfeitedRuleResponse GetForfeitedRule(IDbConnection connection, eForfeitedRuleRequest request)
        {
            return new MyRepository().GetForfeitedRule(connection, request);
        }
    }
}
