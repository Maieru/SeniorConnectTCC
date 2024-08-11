using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.User
{
    public class BearerTokenTO
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
