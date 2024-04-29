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

        // Получение всех транзакций
        [HttpGet]
        public IActionResult Get()
        {
            var dbList = _mongoClient.GetDatabase("mypetprojectsdb").GetCollection<Transactions>("Transactions").AsQueryable();
            return new JsonResult(dbList);
        }

        // Добавление новой транзакции с новым Bson id в массив транзакций
        [HttpPost]
        public IActionResult Post(Transactions transaction)
        {
            _mongoClient.GetDatabase("mypetprojectsdb").GetCollection<Transactions>("Transactions").InsertOne(transaction);
            return new JsonResult("AddedSuccessfully");
        }

        // Удаление всех транзакций
        [HttpDelete]
        public IActionResult Delete()
        {
            _mongoClient.GetDatabase("mypetprojectsdb").GetCollection<Transactions>("Transactions").DeleteMany(transaction => true);
            return new JsonResult("DeletedSuccessfully");
        }
    }
}

