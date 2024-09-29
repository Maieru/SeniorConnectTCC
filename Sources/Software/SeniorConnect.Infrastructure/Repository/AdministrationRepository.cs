using SeniorConnect.Bussiness.Entities;
using SeniorConnect.Infrastructure.Context;

namespace SeniorConnect.Infrastructure.Repository
{
    public class AdministrationRepository : Repository<Administration>
    {
        public AdministrationRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
