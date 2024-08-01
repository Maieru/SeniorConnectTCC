using SeniorConnect.Domain.Enum;

namespace SeniorConnect.Domain.Entities
{
    public class LogEntry
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public EnumLogCategory Category { get; set; }
        public string SerializedData { get; set; }
        public string Callstack { get; set; }
    }
}
