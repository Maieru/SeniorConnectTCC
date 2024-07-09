using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task AddAsync(TEntity entity);
        Task<int> DeleteByIdAsync(int id);
        Task<List<TEntity>> GetAllAsync(bool tracked = true);
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter, bool tracked = true);
        Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter, int take, int skip, bool tracked = true);
        Task UpdateAsync(TEntity entity);
        Task<TEntity> GetByIdAsync(int id);
        Task<int> SaveAsync();
    }
}
