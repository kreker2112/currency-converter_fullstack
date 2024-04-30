using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using EnterpreneurCabinetAPI.Models;


namespace EnterpreneurCabinetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController(IMongoClient mongoClient) : ControllerBase
    {
        private readonly IMongoClient _mongoClient = mongoClient;

        // Getting all transactions details from the database 

        [HttpGet]
        public IActionResult Get()
        {
            var collection = _mongoClient.GetDatabase("mypetprojectsdb").GetCollection<Transactions>("Transactions");
            var details = collection.Find(Builders<Transactions>.Filter.Empty)
                                    .Project(t => t.TransactionsDetail)
                                    .ToList();
            return new JsonResult(details);
        }

        // Adding a new transaction to the database

        [HttpPost]
        public IActionResult Post(Transactions transaction)
        {
            _mongoClient.GetDatabase("mypetprojectsdb").GetCollection<Transactions>("Transactions").InsertOne(transaction);
            return new JsonResult("AddedSuccessfully");
        }

        // Delete all transactions from the database

        [HttpDelete]
        public IActionResult Delete()
        {
            _mongoClient.GetDatabase("mypetprojectsdb").GetCollection<Transactions>("Transactions").DeleteMany(transaction => true);
            return new JsonResult("DeletedSuccessfully");
        }
    }
}

