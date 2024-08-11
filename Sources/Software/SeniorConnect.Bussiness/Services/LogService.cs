using Newtonsoft.Json;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Enum;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Services
{
    public class LogService
    {
        private readonly IRepository<LogEntry> logRepository;

        public LogService(IRepository<LogEntry> logRepository) => this.logRepository = logRepository;

        public async Task LogInformation(string message) => await Log(EnumLogCategory.Information, message);
        public async Task LogException(Exception exception, object data = null) => await Log(EnumLogCategory.Exception, exception.Message, data, exception?.StackTrace);
        public async Task LogAudit(string message) => await Log(EnumLogCategory.Audit, message);

        private async Task Log(EnumLogCategory category, string message, object data = null, string callstack = null)
        {
            var logEntry = new LogEntry
            {
                Category = category,
                Message = message,
                Date = DateTime.UtcNow,
                Callstack = callstack,
            };

            if (data != null)
                logEntry.SerializedData = JsonConvert.SerializeObject(data);

            await logRepository.AddAsync(logEntry);
        }
    }
}
