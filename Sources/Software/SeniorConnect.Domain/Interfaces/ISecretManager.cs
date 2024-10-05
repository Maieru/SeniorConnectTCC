using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Interfaces
{
    public interface ISecretManager
    {
        Task<string?> GetSqlServerConnectionString();
        Task<string?> GetDpsPrimaryKey();
        Task<string?> GetDpsIdScope();
        Task<string?> GetEncryptionSalt();
        Task<int> GetWorkFactor();
        Task<string?> GetTokenSignignKey();
        Task<string?> GetStorageConnectionString();
        Task<string?> GetIoTHubConnectionString();
        Task<string?> GetIoTHubRegistryConnectionString();
    }
}
