using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TailSpin.SpaceGame.Web.Models
{
    public interface IDocumentDBRepository<T> where T : Modelto
    {
        Task<T> GetItemAsync(string id);

        Task<IEnumerable<T>> GetItemsAsync(
            Func<T, bool> queryPredicate,
            Func<T, int> orderDescendingPredicate,
            int page = 1,
            int pageSize = 10
        );

        Task<int> CountItemsAsync(Func<T, bool> queryPredicate);
    }
}
