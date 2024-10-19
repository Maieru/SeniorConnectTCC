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
    public class TelemetryFluent : IEntityTypeConfiguration<Telemetry>
    {
        public void Configure(EntityTypeBuilder<Telemetry> builder)
        {
            builder.ToTable("tbTelemetria");

            builder.Property(d => d.Id).HasColumnName("TelemetriaId").IsRequired();
            builder.Property(d => d.DeviceId).HasColumnName("DispositivoId").IsRequired();
            builder.Property(d => d.Year).HasColumnName("Ano").IsRequired();
            builder.Property(d => d.Month).HasColumnName("Mes").IsRequired();
            builder.Property(d => d.Day).HasColumnName("Dia").IsRequired();
            builder.Property(d => d.Hour).HasColumnName("Hora").IsRequired();
            builder.Property(d => d.Minute).HasColumnName("Minuto").IsRequired();
            builder.Property(d => d.Second).HasColumnName("Segundo").IsRequired();
            builder.Property(d => d.Millis).HasColumnName("Milis").IsRequired();
            builder.Property(d => d.SensorDataJson).HasColumnName("Status").IsRequired();          
            builder.Property(d => d.UndueOpening).HasColumnName("AberturaIndevida").IsRequired();
        }
    }
}
