using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class StorageService
    {
        private readonly string _connectionString;

        public StorageService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> DeleteBlob(string containerName, string blobName)
        {
            var blobServiceClient = new BlobServiceClient(_connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
            var blobClient = containerClient.GetBlobClient(blobName);
            return await blobClient.DeleteIfExistsAsync();
        }
    }
}
