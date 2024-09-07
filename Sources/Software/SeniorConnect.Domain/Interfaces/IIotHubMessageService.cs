using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Interfaces
{
    public interface IIotHubMessageService
    {
        Task SendCloudToDeviceMessageAsync(string deviceId, string message);
    }
}
