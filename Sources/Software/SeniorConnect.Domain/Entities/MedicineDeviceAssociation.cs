using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Domain.Entities
{
    public class MedicineDeviceAssociation
    {
        public int Id { get; set; }
        public int MedicineId { get; set; }
        public int DeviceId { get; set; }
        public int Position { get; set; }
    }
}
