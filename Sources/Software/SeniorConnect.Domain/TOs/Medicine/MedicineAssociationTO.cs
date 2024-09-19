using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.TOs.Medicine
{
    public class MedicineAssociationTO
    {
        public int Id { get; set; }
        public int MedicineId { get; set; }
        public int SubscriptionId { get; set; }
        public required string Name { get; set; }
        public int Position { get; set; }
        public int DeviceId { get; set; }
    }
}
