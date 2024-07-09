using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeniorConnect.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Infrastructure.FluentApi
{
    internal class DeviceFluent : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder.ToTable("tbDispositivo");

            builder.Property(d => d.Id).HasColumnName("DispositivoId").IsRequired();
            builder.Property(d => d.DeviceName).HasColumnName("NomeDispositivo").IsRequired().HasMaxLength(50);
            builder.Property(d => d.SubscriptionId).HasColumnName("AssinaturaId").IsRequired();
            builder.Property(d => d.ModificationDate).HasColumnName("DataAlteracao").IsRequired();
        }
    }
}
