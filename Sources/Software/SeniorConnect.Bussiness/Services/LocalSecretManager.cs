using SeniorConnect.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class LocalSecretManager : ISecretManager
    {
        public async Task<string?> GetDpsIdScope() => Environment.GetEnvironmentVariable("IdScope");

        public async Task<string?> GetDpsPrimaryKey() => Environment.GetEnvironmentVariable("DpsPrimaryKey");

        public async Task<string?> GetEncryptionSalt() => "EncryptionSalt";

        public async Task<string?> GetSqlServerConnectionString() => Environment.GetEnvironmentVariable("SqlServerDatabase");

        public async Task<int> GetWorkFactor() => 4;

        public async Task<string?> GetTokenSignignKey() => "TokenSignignKey94af5112-fd21-4a80-a405-9631c1d10846";

        public async Task<string?> GetStorageConnectionString() => Environment.GetEnvironmentVariable("AzureWebJobsStorage");

        public async Task<string?> GetIoTHubConnectionString() => Environment.GetEnvironmentVariable("IotHubConnectionString");
        
        public async Task<string?> GetIoTHubRegistryConnectionString() => Environment.GetEnvironmentVariable("IotHubRegistryConnectionString");
    }
}
