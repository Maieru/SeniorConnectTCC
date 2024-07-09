﻿using SeniorConnect.Domain.Entities;
using SeniorConnect.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Infrastructure.Repository
{
    public class DeviceRepository : Repository<Device>
    {
        public DeviceRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
