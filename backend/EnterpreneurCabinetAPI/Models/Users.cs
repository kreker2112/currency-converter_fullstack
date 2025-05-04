using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EnterpreneurCabinetAPI.Models
{
    public class Receipt
    {
        [BsonElement("year")]
        public int Year { get; set; }

        [BsonElement("quarters")]
        public List<Quarter> Quarters { get; set; } = [];
    }

    public class Quarter
    {
        [BsonElement("quarter")]
        public string QuarterName { get; set; } = string.Empty;

        [BsonElement("receipts")]
        public List<string> Receipts { get; set; } = [];
    }

    public class IncomeTaxPaymentDetails
    {
        [BsonElement("IncomeTaxEDRPOU")]
        public string IncomeTaxEDRPOU { get; set; } = string.Empty;

        [BsonElement("IncomeTaxName")]
        public string IncomeTaxName { get; set; } = string.Empty;

        [BsonElement("IncomeTaxAccount")]
        public string IncomeTaxAccount { get; set; } = string.Empty;

        [BsonElement("IncomeTaxAccountName")]
        public string IncomeTaxAccountName { get; set; } = string.Empty;

    }

    public class MilFeePaymentDetails
    {
        [BsonElement("MilFeeEDRPOU")]
        public string MilFeeEDRPOU { get; set; } = string.Empty;

        [BsonElement("MilFeeName")]
        public string MilFeeName { get; set; } = string.Empty;

        [BsonElement("MilFeeAccount")]
        public string MilFeeAccount { get; set; } = string.Empty;

        [BsonElement("MilFeeAccountName")]
        public string MilFeeAccountName { get; set; } = string.Empty;

    }

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required string Id { get; set; } = ObjectId.GenerateNewId().ToString();

        [BsonElement("UserID")]
        public required string UserID { get; set; }

        [BsonElement("UserName")]
        public string? UserName { get; set; }

        [BsonElement("DepartmentName")]
        public string? DepartmentName { get; set; }

        [BsonElement("DateOfJoining")]
        public string? DateOfJoining { get; set; }

        [BsonElement("PhotoFileName")]
        public string? PhotoFileName { get; set; }

        [BsonElement("PersonalTaxId")]
        public string? PersonalTaxId { get; set; }

        [BsonElement("RegistrationAddress")]
        public string? RegistrationAddress { get; set; }

        [BsonElement("IncomeReceipts")]
        public List<Receipt> IncomeReceipts { get; set; } = new();

        [BsonElement("IncomeTaxPaymentDetails")]
        public IncomeTaxPaymentDetails? IncomeTaxPaymentDetails { get; set; }

        [BsonElement("MilFeePaymentDetails")]
        public MilFeePaymentDetails? MilFeePaymentDetails { get; set; }
    }
}
