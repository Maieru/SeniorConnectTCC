using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Entities
{
    public class Medicine
    {
        public int Id { get; set; }
        public int SubscriptionId { get; set; }
        public required string Name { get; set; }
    }
}
