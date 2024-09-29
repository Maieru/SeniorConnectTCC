using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.Telemetry;

namespace SeniorConnect.Azure.Functions
{
    public class BigDataProcessingFunction
    {
        private readonly LogService _logger;
        private readonly TelemetryService _telemetryService;
        private readonly IStorageService _storageService;

        public BigDataProcessingFunction(LogService logService, TelemetryService telemetryService, IStorageService storageService)
        {
            _logger = logService;
            _telemetryService = telemetryService;
            _storageService = storageService;
        }

        [Function(nameof(BigDataProcessingFunction))]
        public async Task Run([BlobTrigger("iotmessages/{iothub}/{partition}/{year}/{mounth}/{day}/{hour}/{minute}")] Stream stream,
            string iotHub, string minute, string partition, string year, string mounth, string day, string hour)
        {
            using var blobStreamReader = new StreamReader(stream);
            var content = await blobStreamReader.ReadToEndAsync();
            var processedWithSuccess = true;

            if (content == null)
            {
                await _logger.LogInformation($"Blob triggered with empty message. {FormatBlobName(iotHub, partition, year, mounth, day, hour, minute)}");
                return;
            }

            var lines = content.Split(Environment.NewLine);


            foreach (var line in lines)
            {
                var processedLineWithSuccess = await ProcessLine(line);

                if (!processedLineWithSuccess)
                    processedWithSuccess = false;
            }

            if (processedWithSuccess)
                await _storageService.DeleteBlob("iotmessages", FormatBlobName(iotHub, partition, year, mounth, day, hour, minute));
        }

        private string FormatBlobName(string iotHub, string partition, string year, string mounth, string day, string hour, string minute)
        {
            return $"{iotHub}/{partition}/{year}/{mounth}/{day}/{hour}/{minute}";
        }

        private async Task<bool> ProcessLine(string line)
        {
            try
            {
                var message = JsonConvert.DeserializeObject<IoTHubMessage>(line);

                if (message == null)
                    throw new Exception("Error deserializing message");

                if (message.SystemProperties == null || string.IsNullOrEmpty(message.SystemProperties.ConnectionDeviceId))
                    throw new Exception("The system properties was null or the connection device id was null or empty");

                if (string.IsNullOrEmpty(message.Body))
                    throw new Exception("The message body was null or empty");

                var base64EncodedBytes = Convert.FromBase64String(message.Body);
                var telemetryMessageBody = Encoding.UTF8.GetString(base64EncodedBytes);
                var telemetryMessage = JsonConvert.DeserializeObject<TelemetryMessage>(telemetryMessageBody);

                if (telemetryMessage?.Type != "telemetry")
                    return false;

                await _telemetryService.SaveTelemetry(message.SystemProperties.ConnectionDeviceId, telemetryMessage);

                return true;
            }
            catch (Exception ex)
            {
                await _logger.LogException(ex, $"Error processing message: {line}");
                return false;
            }
        }
    }
}
