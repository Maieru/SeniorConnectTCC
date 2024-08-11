using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Exceptions
{
    public class EntryAlreadyExistsException : InvalidDataProvidedException
    {
        public EntryAlreadyExistsException(string message) : base(message) { }
    }
}
