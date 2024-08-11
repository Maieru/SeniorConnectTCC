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
        public async Task<string?> GetDpsIdScope() => "DPSIdScope";

        public async Task<string?> GetDpsPrimaryKey() => "DpsPrimaryKey";

        public async Task<string?> GetEncryptionSalt() => "EncryptionSalt";

        public async Task<string?> GetSqlServerConnectionString() => Environment.GetEnvironmentVariable("SqlServerDatabase");

        public async Task<int> GetWorkFactor() => 4;
    }
}
