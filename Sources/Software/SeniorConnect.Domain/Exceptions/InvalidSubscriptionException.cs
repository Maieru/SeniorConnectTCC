using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Exceptions
{
    public class InvalidSubscriptionException : InvalidDataProvidedException
    {
        public InvalidSubscriptionException(string message) : base(message) { }
    }
}
