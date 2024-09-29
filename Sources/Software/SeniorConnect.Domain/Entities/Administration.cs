using SeniorConnect.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Bussiness.Entities
{
    public class Administration
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int SubscriptionId { get; set; }
        public int MedicineId { get; set; }
        public int SchedulingId { get; set; }
        public int? DeviceId { get; set; }
        public EnumAdministrationReason Reason { get; set; }
    }
}
