
namespace VistaLOAN
{
    using Serenity.Services;

    public class GetNextNumberRequest : ServiceRequest
    {
        public string Prefix { get; set; }
        public int Length { get; set; }
    }

    public class GetNextNumberResponse : ServiceResponse
    {
        public long Number { get; set; }
        public string Serial { get; set; }
    }

    public class GetNextVoucherNumberRequest : ServiceRequest
    {
        public int TransactionTypeId { get; set; }
        public string Prefix { get; set; }
        public int Length { get; set; }
        public int StartingNumber { get; set; }
        public int ZoneID { get; set; }
        public int FundControlInformationId { get; set; }
    }
}