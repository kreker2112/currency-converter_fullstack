using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EnterpreneurCabinetAPI.Models
{
    public class Currency
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public required string Id { get; set; }

        public required BsonDocument Currencies { get; set; }
    }
}
