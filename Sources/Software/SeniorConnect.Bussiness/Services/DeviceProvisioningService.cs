using Microsoft.Azure.Devices.Provisioning.Client;
using Microsoft.Azure.Devices.Provisioning.Client.Transport;
using Microsoft.Azure.Devices.Shared;
using SeniorConnect.Domain.Exceptions;
using SeniorConnect.Domain.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace SeniorConnect.Bussiness.Services
{
    public class DeviceProvisioningService
    {
        private const string GLOBAL_ENDPOINT = "global.azure-devices-provisioning.net";
        private const string DEVICE_NAME_TEMPLATE = "seniorConnect-{0}";

        private readonly ISecretManager _secretManager;

        public DeviceProvisioningService(ISecretManager secretManager)
        {
            _secretManager = secretManager;
        }

        public async Task<string> CreateDevice()
        {
            var guid = Guid.NewGuid();
            var deviceName = string.Format(DEVICE_NAME_TEMPLATE, guid);

            var deviceKey = ComputeDerivedSymmetricKey(Convert.FromBase64String(await _secretManager.GetDpsPrimaryKey()), deviceName);

            using var security = new SecurityProviderSymmetricKey(deviceName, deviceKey, null);
            using var transportHandler = GetTransportHandler();

            var provClient = ProvisioningDeviceClient.Create(GLOBAL_ENDPOINT, await _secretManager.GetDpsIdScope(), security, transportHandler);

            try
            {
                var result = await provClient.RegisterAsync();

                if (result.Status != ProvisioningRegistrationStatusType.Assigned)
                    throw new CouldNotProvisionNewDeviceException();

                return result.DeviceId;
            }
            catch
            {
                return null;
            }
        }

        private ProvisioningTransportHandler GetTransportHandler() => new ProvisioningTransportHandlerHttp();

        private string ComputeDerivedSymmetricKey(byte[] masterKey, string registrationId)
        {
            using (var hmac = new HMACSHA256(masterKey))
            {
                return Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationId)));
            }
        }
    }
}