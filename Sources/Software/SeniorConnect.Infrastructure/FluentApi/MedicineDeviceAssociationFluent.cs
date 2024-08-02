]using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeniorConnect.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeniorConnect.Infrastructure.FluentApi
{
    internal class MedicineDeviceAssociationFluent : IEntityTypeConfiguration<MedicineDeviceAssociation>
    {
        public void Configure(EntityTypeBuilder<MedicineDeviceAssociation> builder)
        {
            builder.ToTable("tbDispositivoRemedio");

            builder.Property(d => d.Id).HasColumnName("DispositivoRemedioId").IsRequired();
            builder.Property(d => d.MedicineId).HasColumnName("DispositivoId").IsRequired();
            builder.Property(d => d.DeviceId).HasColumnName("RemedioId").IsRequired();
            builder.Property(d => d.Position).HasColumnName("Posicao").IsRequired();
        }
    }
}
