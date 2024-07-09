using SeniorConnect.Infrastructure.KeyVault;

namespace SeniorConnect.Bussiness.Services
{
    public class SecretManager
    {
        private readonly KeyVaultService keyVaultService;

        private const string SQL_SERVER_CONNECTION_STRING_KEY = "SqlServerDatabase";
        
        public SecretManager(string secretManagerUrl) => keyVaultService = new KeyVaultService(secretManagerUrl);
    
        public async Task<string?> GetSqlServerConnectionString() => await keyVaultService.GetSecret(SQL_SERVER_CONNECTION_STRING_KEY);
    }
}
