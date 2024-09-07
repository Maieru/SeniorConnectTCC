using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Devices;
using SeniorConnect.Domain.Interfaces;

namespace SeniorConnect.Bussiness.Services
{
    public class IoTHubMessageService : IIotHubMessageService
    {
        private readonly string _iotHubConnectionString;

        public IoTHubMessageService(string iotHubConnectionString)
        {
            _iotHubConnectionString = iotHubConnectionString;
        }

        public async Task SendCloudToDeviceMessageAsync(string targetDeviceName, string message)
        {
            var serviceClient = ServiceClient.CreateFromConnectionString(_iotHubConnectionString);
            var commandMessage = new Message(Encoding.ASCII.GetBytes(message));
            await serviceClient.SendAsync(targetDeviceName, commandMessage);
        }
    }
}
