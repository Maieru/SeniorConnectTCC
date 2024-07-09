using Microsoft.EntityFrameworkCore;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Infrastructure.Repository
{
    internal class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        internal readonly DatabaseContext _context;
        internal readonly DbSet<TEntity> _dbSet;

        public Repository(DatabaseContext context)
        {
            _context = context ?? throw new ArgumentNullException("context was null");
            _dbSet = _context.Set<TEntity>();
        }

        public async Task AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<int> DeleteByIdAsync(int id)
        {
            var entityToDelete = await _dbSet.FindAsync(id);

            if (entityToDelete != null)
            {
                _dbSet.Remove(entityToDelete);
                return await SaveAsync();
            }

            return 0;
        }

        public async Task<TEntity> GetByIdAsync(int id) => await _dbSet.FindAsync(id); 

        public async Task<List<TEntity>> GetAllAsync(bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();
        
            return await query.ToListAsync();
        }

        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter, bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();

            return await query.Where(filter).ToListAsync();
        }

        public async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter, int take, int skip, bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();

            return await query.Where(filter).Skip(skip).Take(take).ToListAsync();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            _dbSet.Update(entity);
            await SaveAsync();
        }

        public async Task<int> SaveAsync() => await _context.SaveChangesAsync();
        
        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
