using MongoDB.Driver;
using EnterpreneurCabinetAPI.Models;
using MongoDB.Bson;

namespace EnterpreneurCabinetAPI.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Transactions> _transactions;

        public MongoDBService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase(config["DatabaseSettings:DatabaseName"]);
            _transactions = database.GetCollection<Transactions>("Transactions");
        }

        public List<string> GetTransactionDetails()
        {
            return _transactions.Find(transaction => true)
                                .Project(transaction => transaction.TransactionsDetail)
                                .ToList();
        }

        public Transactions Post(Transactions transaction)
        {
            transaction.Id = ObjectId.GenerateNewId().ToString();
            _transactions.InsertOne(transaction);
            return transaction;
        }

        // Удаление всех транзакций

        public void RemoveAll()
        {
            _transactions.DeleteMany(transaction => true);
        }

    }
}


