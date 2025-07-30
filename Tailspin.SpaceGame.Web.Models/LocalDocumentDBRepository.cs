using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

namespace TailSpin.SpaceGame.Web.Models
{
    public class LocalDocumentDBRepository<T> : IDocumentDBRepository<T> where T : Modelto
    {
        private readonly List<T> _items;

        public LocalDocumentDBRepository(string fileName)
        {
            var fileContent = File.ReadAllText(fileName);
            _items = JsonSerializer.Deserialize<List<T>>(fileContent) ?? new List<T>();
        }

        public Task<T> GetItemAsync(string id)
        {
            var item = _items.SingleOrDefault(i => i.Id == id);
            return Task.FromResult(item);
        }

        public Task<IEnumerable<T>> GetItemsAsync(
            Func<T, bool> queryPredicate,
            Func<T, int> orderDescendingPredicate,
            int page = 1,
            int pageSize = 10
        )
        {
            var result = _items
                .Where(queryPredicate)
                .OrderByDescending(orderDescendingPredicate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return Task.FromResult(result);
        }

        public Task<int> CountItemsAsync(Func<T, bool> queryPredicate)
        {
            var count = _items.Count(queryPredicate);
            return Task.FromResult(count);
        }
    }
}
