using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.KeyVault;

namespace SeniorConnect.Bussiness.Services
{
    public class SecretManager : ISecretManager
    {
        private readonly KeyVaultService keyVaultService;

        private const string SQL_SERVER_CONNECTION_STRING_KEY = "SqlServerDatabase";
        private const string DPS_PRIMARY_KEY_KEY = "DpsPrimaryKey";
        private const string DPS_ID_SCOPE_KEY = "DPSIdScope";
        private const string ENCRYPTION_SALT = "EncryptionSalt";
        private const string WORK_FACTOR = "WorkFactor";
        private const string TOKEN_SIGNING_KEY = "TokenSigningKey";

        private string? _cachedEncryptionSalt;
        private int? _cachedWorkFactor;

        public SecretManager(string secretManagerUrl) => keyVaultService = new KeyVaultService(secretManagerUrl);

        public async Task<string?> GetSqlServerConnectionString() => await keyVaultService.GetSecret(SQL_SERVER_CONNECTION_STRING_KEY);
        public async Task<string?> GetDpsPrimaryKey() => await keyVaultService.GetSecret(DPS_PRIMARY_KEY_KEY);
        public async Task<string?> GetDpsIdScope() => await keyVaultService.GetSecret(DPS_ID_SCOPE_KEY);
        public async Task<string?> GetTokenSignignKey() => await keyVaultService.GetSecret(TOKEN_SIGNING_KEY);

        public async Task<string?> GetEncryptionSalt()
        {
            if (string.IsNullOrEmpty(_cachedEncryptionSalt))
                _cachedEncryptionSalt = await keyVaultService.GetSecret(ENCRYPTION_SALT);

            return _cachedEncryptionSalt;
        }

        public async Task<int> GetWorkFactor()
        {
            if (!_cachedWorkFactor.HasValue)
                if (int.TryParse(await keyVaultService.GetSecret(WORK_FACTOR), out var workFactor))
                    _cachedWorkFactor = workFactor;
                else
                    throw new Exception("Invalid work factor");

            return _cachedWorkFactor.Value;
        }
    }
}
