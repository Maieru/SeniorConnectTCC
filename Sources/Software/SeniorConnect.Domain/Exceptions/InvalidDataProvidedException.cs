﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Exceptions
{
    public class InvalidDataProvidedException : Exception
    {
        public InvalidDataProvidedException() { }
        public InvalidDataProvidedException(string message) : base(message) { }
    }
}
