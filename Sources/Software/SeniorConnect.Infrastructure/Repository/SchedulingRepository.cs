using SeniorConnect.Domain.Entities;
using SeniorConnect.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Infrastructure.Repository
{
    public class SchedulingRepository : Repository<Scheduling>
    {
        public SchedulingRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
