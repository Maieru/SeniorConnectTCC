using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Interfaces
{
    public interface IStorageService
    {
        Task<bool> CreateEntryInQueue(string message);
        Task<bool> DeleteBlob(string containerName, string blobName);
    }
}
