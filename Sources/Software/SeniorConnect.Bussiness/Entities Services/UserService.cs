using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.User;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Entities_Services
{
    public class UserService : IEntityServiceInterface<User>
    {
        private readonly SubscriptionService _subscriptionService;
        private readonly IRepository<User> _userRepository;
        private readonly ISecretManager _secretManager;
        private readonly BearerTokenService _bearerTokenService;

        public UserService(IRepository<User> userRepository, SubscriptionService subscriptionService, ISecretManager secretManager, BearerTokenService bearerTokenService)
        {
            _userRepository = userRepository;
            _subscriptionService = subscriptionService;
            _secretManager = secretManager;
            _bearerTokenService = bearerTokenService;
        }

        public async Task<User> CreateUser(CreateUserTO userTO)
        {
            int subscriptionId;

            if (userTO == null)
                throw new ArgumentNullException(nameof(userTO));

            if (string.IsNullOrEmpty(userTO.Username))
                throw new ArgumentNullException(nameof(userTO.Username));

            if (string.IsNullOrEmpty(userTO.Password))
                throw new ArgumentNullException(nameof(userTO.Password));

            if (string.IsNullOrEmpty(userTO.Name))
                throw new ArgumentNullException(nameof(userTO.Email));

            if (await _userRepository.GetFirst(u => u.Username == userTO.Username) != null)
                throw new EntityAlreadyExistsException($"User {userTO.Username} already exists");

            Subscription subscription;

            if (userTO.CreateNewSubscription)
            {
                subscription = new Subscription();
                subscription.Description = "Default created for user " + userTO.Username;
                await _subscriptionService.AddSubscription(subscription);
                subscriptionId = subscription.Id;
            }
            else
            {
                throw new NotImplementedException("Subscription invite not implemented yet");
            }

            if (subscriptionId == 0)
                throw new InvalidSubscriptionException("Subscription id was not set");

            var encryptionService = new EncryptionService(await _secretManager.GetEncryptionSalt(), await _secretManager.GetWorkFactor());
            var encryptedPassword = await encryptionService.Encrypt(userTO.Password);

            var user = new User();
            user.Name = userTO.Name;
            user.Email = userTO.Email;
            user.Username = userTO.Username;
            user.SubscriptionId = subscriptionId;
            user.Password = encryptedPassword;

            await _userRepository.AddAsync(user);

            return user;
        }

        public async Task<User> GetUser(string username, string password)
        {
            if (string.IsNullOrEmpty(username))
                throw new ArgumentNullException(nameof(username));

            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(nameof(password));

            var user = await _userRepository.GetFirst(u => u.Username == username);

            if (user == null)
                throw new UserNotFoundException($"User {username} not found");

            var encryptionService = new EncryptionService(await _secretManager.GetEncryptionSalt(), await _secretManager.GetWorkFactor());
            var isPasswordMatch = await encryptionService.VerifyMatch(password, user.Password);

            if (!isPasswordMatch)
                throw new InvalidPasswordException("Invalid password");

            return user;
        }

        public async Task<BearerTokenTO> GetToken(string username, string password)
        {
            var user = await GetUser(username, password);
            return _bearerTokenService.CreateAccessToken(user);
        }

        public async Task DeleteUser(int userId)
        {
            await _userRepository.DeleteByIdAsync(userId);
        }

    }
}
