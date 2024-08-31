using System;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace SeniorConnect.Azure.Functions
{
    public class TestFunction
    {
        private readonly ILogger _logger;

        public TestFunction(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<TestFunction>();
        }

        [Function("TestFunction")]
        public void Run([TimerTrigger("*/1 * * * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            
            if (myTimer.ScheduleStatus is not null)
            {
                _logger.LogInformation($"Next timer schedule at: {myTimer.ScheduleStatus.Next}");
            }
        }
    }
}
