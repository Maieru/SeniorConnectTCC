using Microsoft.EntityFrameworkCore;
using SeniorConnect.Bussiness.Entities;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Infrastructure.FluentApi;

namespace SeniorConnect.Infrastructure.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Device> Devices { get; set; }

        public DbSet<LogEntry> LogEntries { get; set; }

        public DbSet<Subscription> Subscriptions { get; set; }

        public DbSet<Medicine> Medicines { get; set; }

        public DbSet<MedicineDeviceAssociation> MedicineDeviceAssociations { get; set; }

        public DbSet<Scheduling> Scheduling { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Telemetry> Telemetry { get; set; }

        public DbSet<Administration> Administrations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DeviceFluent());
            modelBuilder.ApplyConfiguration(new LogEntryFluent());
            modelBuilder.ApplyConfiguration(new SubscriptionFluent());
            modelBuilder.ApplyConfiguration(new MedicineFluent());
            modelBuilder.ApplyConfiguration(new MedicineDeviceAssociationFluent());
            modelBuilder.ApplyConfiguration(new SchedulingFluent());
            modelBuilder.ApplyConfiguration(new UserFluent());
            modelBuilder.ApplyConfiguration(new TelemetryFluent());
            modelBuilder.ApplyConfiguration(new AdministrationFluent());
        }
    }
}
