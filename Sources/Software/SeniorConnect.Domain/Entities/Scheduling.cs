using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Entities
{
    public class Scheduling
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public bool Active { get; set; }
        public int Medicine { get; set; }
    }
}
