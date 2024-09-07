using Azure.Storage.Blobs;
using Azure.Storage.Queues;
using Microsoft.Azure.Devices;
using SeniorConnect.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class StorageService : IStorageService
    {
        private readonly string _connectionString;
        
        public StorageService(string connectionString)
        {
            _connectionString = connectionString;            
        }

        public async Task<bool> CreateEntryInQueue(string message)
        {
            try
            {
                var queueServiceClient = new QueueServiceClient(_connectionString);
                var queueClient = queueServiceClient.GetQueueClient("configurationchangequeue");
                await queueClient.CreateIfNotExistsAsync();
                return await queueClient.SendMessageAsync(message) != null;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteBlob(string containerName, string blobName)
        {
            try
            {
                var blobServiceClient = new BlobServiceClient(_connectionString);
                var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
                var blobClient = containerClient.GetBlobClient(blobName);
                return await blobClient.DeleteIfExistsAsync();
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
