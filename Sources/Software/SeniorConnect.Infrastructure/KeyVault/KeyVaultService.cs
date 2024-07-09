using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Infrastructure.KeyVault
{
    public class KeyVaultService
    {
        private SecretClient _secretClient;
        private readonly string _vaultUrl;

        private SecretClient SecretClient
        {
            get
            {
                if (_secretClient == null)
                    _secretClient = new SecretClient(new Uri(_vaultUrl), new DefaultAzureCredential());

                return _secretClient;
            }
        }

        public KeyVaultService(string vaultUrl)
        {
            _vaultUrl = vaultUrl ?? throw new ArgumentNullException("vaultUrl was null");
        }

        public async Task<string?> GetSecret(string secretName)
        {
            var secret = await SecretClient.GetSecretAsync(secretName);
            return secret.Value.Value;
        }
    }
}
