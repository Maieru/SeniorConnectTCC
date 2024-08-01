using SeniorConnect.Infrastructure.KeyVault;

namespace SeniorConnect.Bussiness.Services
{
    public class SecretManager
    {
        private readonly KeyVaultService keyVaultService;

        private const string SQL_SERVER_CONNECTION_STRING_KEY = "SqlServerDatabase";
        private const string DPS_PRIMARY_KEY_KEY = "DpsPrimaryKey";
        private const string DPS_ID_SCOPE_KEY = "DPSIdScope";

        public SecretManager(string secretManagerUrl) => keyVaultService = new KeyVaultService(secretManagerUrl);

        public async Task<string?> GetSqlServerConnectionString() => await keyVaultService.GetSecret(SQL_SERVER_CONNECTION_STRING_KEY);
        public async Task<string?> GetDpsPrimaryKey() => await keyVaultService.GetSecret(DPS_PRIMARY_KEY_KEY);
        public async Task<string?> GetDpsIdScope() => await keyVaultService.GetSecret(DPS_ID_SCOPE_KEY);
    }
}
