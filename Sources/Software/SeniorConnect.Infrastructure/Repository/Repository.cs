using Microsoft.EntityFrameworkCore;
using SeniorConnect.Domain.Exceptions;
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
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        internal readonly DatabaseContext _context;
        internal readonly DbSet<TEntity> _dbSet;

        public Repository(DatabaseContext context)
        {
            _context = context ?? throw new ArgumentNullException("context was null");
            _dbSet = _context.Set<TEntity>();
        }

        public virtual async Task AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            await SaveAsync();
        }

        public virtual async Task<int> DeleteByIdAsync(int id)
        {
            var entityToDelete = await _dbSet.FindAsync(id);

            if (entityToDelete == null)
                throw new EntityNotFoundException($"No entity of type {typeof(TEntity).Name} with {id} found");

            _dbSet.Remove(entityToDelete);
            return await SaveAsync();
        }

        public virtual async Task<TEntity> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual async Task<List<TEntity>> GetAllAsync(bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();

            return await query.ToListAsync();
        }

        public virtual async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter, bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();

            return await query.Where(filter).ToListAsync();
        }

        public virtual async Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filter, int take, int skip, bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();

            return await query.Where(filter).Skip(skip).Take(take).ToListAsync();
        }

        public virtual async Task<TEntity> GetFirst(Expression<Func<TEntity, bool>> filter, bool tracked = true)
        {
            IQueryable<TEntity> query = _dbSet;

            if (!tracked)
                query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync(filter);
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            _dbSet.Update(entity);
            await SaveAsync();
        }

        public async Task<int> SaveAsync() => await _context.SaveChangesAsync();
    }
}
