using SeniorConnect.Domain.TOs.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Interfaces
{
    public interface IConfigurationChangeService
    {
        Task ProcessConfigurationChangeRequest(ConfigurationChangeRequest configurationChangeRequest);
    }
}
