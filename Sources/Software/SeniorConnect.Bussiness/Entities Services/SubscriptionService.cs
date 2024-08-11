using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class SubscriptionService : IEntityServiceInterface<Subscription>
    {
        private readonly IRepository<Subscription> _repository;

        public SubscriptionService(IRepository<Subscription> subscriptionRepository)
        {
            _repository = subscriptionRepository;
        }

        public async Task<Subscription> GetSubscriptionById(int subscriptionId)
        {
            var subscription = await _repository.GetByIdAsync(subscriptionId);
            return subscription;
        }

        public async Task AddSubscription(Subscription subscription)
        {
            await _repository.AddAsync(subscription);
        }

        public async Task UpdateSubscription(Subscription subscription)
        {
            await _repository.UpdateAsync(subscription);
        }

        public async Task DeleteSubscription(int subscriptionId)
        {
            await _repository.DeleteByIdAsync(subscriptionId);
        }
    }
}
