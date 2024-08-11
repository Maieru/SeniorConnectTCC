using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.User
{
    public class CreateUserTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public bool CreateNewSubscription { get; set; }
        public string? SubscriptionInvite { get; set; }
    }
}
