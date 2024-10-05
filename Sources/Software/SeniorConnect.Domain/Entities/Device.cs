namespace SeniorConnect.Domain.Entities
{
    public class Device
    {
        public int Id { get; set; }
        public required string DeviceName { get; set; }
        public required string DevicePrimaryKey { get; set; }
        public int SubscriptionId { get; set; }
        public DateTime ModificationDate { get; set; }
    }
}
