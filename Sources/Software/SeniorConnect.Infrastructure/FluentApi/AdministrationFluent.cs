using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SeniorConnect.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeniorConnect.Bussiness.Entities;

namespace SeniorConnect.Infrastructure.FluentApi
{
    public class AdministrationFluent : IEntityTypeConfiguration<Administration>
    {
        public void Configure(EntityTypeBuilder<Administration> builder)
        {
            builder.ToTable("tbAdministracoes");

            builder.Property(d => d.Id).HasColumnName("Id").IsRequired();
            builder.Property(d => d.Date).HasColumnName("Data").IsRequired();
            builder.Property(d => d.SubscriptionId).HasColumnName("AssinaturaId").IsRequired();
            builder.Property(d => d.MedicineId).HasColumnName("MedicamentoId").IsRequired();
            builder.Property(d => d.SchedulingId).HasColumnName("AgendamentoId").IsRequired();
            builder.Property(d => d.DeviceId).HasColumnName("DispositivoId");
            builder.Property(d => d.Reason).HasColumnName("Motivo").IsRequired();
        }
    }
}
