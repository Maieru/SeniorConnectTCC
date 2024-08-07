using Microsoft.EntityFrameworkCore;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Infrastructure.FluentApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DeviceFluent());
            modelBuilder.ApplyConfiguration(new LogEntryFluent());
            modelBuilder.ApplyConfiguration(new SubscriptionFluent());
            modelBuilder.ApplyConfiguration(new MedicineFluent());
            modelBuilder.ApplyConfiguration(new MedicineDeviceAssociationFluent());
            modelBuilder.ApplyConfiguration(new  SchedulingFluent());
        }
    }
}
