﻿using MongoDB.Driver;
using EnterpreneurCabinetAPI.Models;
using MongoDB.Bson;

namespace EnterpreneurCabinetAPI.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Transactions> _transactions;
        private readonly IMongoCollection<Currency> _currencies;

        public MongoDBService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("MongoDB"));
            var database = client.GetDatabase(config["DatabaseSettings:DatabaseName"]);
            _transactions = database.GetCollection<Transactions>("Transactions");
            _currencies = database.GetCollection<Currency>("Currencies");
        }

        public async Task<List<string>> GetTransactionDetailsAsync()
        {
            var projection = Builders<Transactions>.Projection.Expression(t => t.TransactionsDetail);
            var results = await _transactions.Find(transaction => true)
                                             .Project<string>(projection)
                                             .ToListAsync();
            return results;
        }

        public async Task<Transactions> PostAsync(Transactions transaction)
        {
            transaction.Id = ObjectId.GenerateNewId().ToString();
            await _transactions.InsertOneAsync(transaction);
            return transaction;
        }

        public async Task RemoveAllAsync()
        {
            await _transactions.DeleteManyAsync(transaction => true);
        }

        public async Task<List<Currency>> GetAllCurrenciesAsync()
        {
            return await _currencies.Find(_ => true).ToListAsync();
        }

        public async Task<Currency> GetLatestCurrencyAsync()
        {
            return await _currencies.Find(_ => true).SortByDescending(c => c.Id).Limit(1).FirstOrDefaultAsync();
        }

        public async Task SaveCurrencyAsync(BsonDocument currencyData)
        {
            var currency = new Currency { Currencies = currencyData };
            await _currencies.InsertOneAsync(currency);
        }

    }
}


