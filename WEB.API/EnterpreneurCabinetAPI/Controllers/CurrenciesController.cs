using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Bson;
using EnterpreneurCabinetAPI.Services;

namespace EnterpreneurCabinetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrenciesController(MongoDBService mongoDBService, IMemoryCache cache) : ControllerBase
    {
        private readonly MongoDBService _mongoDBService = mongoDBService;
        private readonly IMemoryCache _cache = cache;

        [HttpGet]
        public async Task<IActionResult> GetCurrencies()
        {
            // Попытка получить кешированные данные
            if (_cache.TryGetValue("CurrenciesCache", out BsonDocument? cachedCurrencies))
            {
                return Ok(cachedCurrencies);
            }

            // Если кэш пуст, загружаем данные из базы
            var currencies = await _mongoDBService.GetLatestCurrencyAsync();
            if (currencies == null)
            {
                return NotFound("No currency data available.");
            }

            // Кэширование данных на 5 минут
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(5));
            _cache.Set("CurrenciesCache", currencies.Currencies, cacheEntryOptions);

            return Ok(currencies.Currencies);
        }

        [HttpPost]
        public async Task<IActionResult> SaveCurrencies([FromBody] BsonDocument currencyData)
        {
            if (currencyData == null)
            {
                return BadRequest("Invalid currency data.");
            }

            // Сохраняем данные в базу
            await _mongoDBService.SaveCurrencyAsync(currencyData);

            // Обновляем кэш
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(5));
            _cache.Set("CurrenciesCache", currencyData, cacheEntryOptions);

            return Ok();
        }
    }
}
