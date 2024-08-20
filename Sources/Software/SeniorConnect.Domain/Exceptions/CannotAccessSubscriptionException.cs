using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Exceptions
{
    public class CannotAccessSubscriptionException : InvalidDataProvidedException
    {
        public CannotAccessSubscriptionException(int subscriptionId) : base($"Cannot access subscription {subscriptionId}")
        {
        }
    }
}
