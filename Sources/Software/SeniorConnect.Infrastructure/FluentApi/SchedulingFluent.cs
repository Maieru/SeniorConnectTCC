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
    public class SchedulingFluent : IEntityTypeConfiguration<Scheduling>
    {
        public void Configure(EntityTypeBuilder<Scheduling> builder)
        {
            builder.ToTable("tbAgendamento");

            builder.Property(d => d.Id).HasColumnName("AgendamentoId").IsRequired();
            builder.Property(d => d.Hour).HasColumnName("Hora").IsRequired();
            builder.Property(d => d.Minute).HasColumnName("Minuto").IsRequired();
            builder.Property(d => d.DaysOfWeek).HasColumnName("DiasDaSemana").IsRequired().HasMaxLength(20);
            builder.Property(d => d.Active).HasColumnName("Ativo").IsRequired();
            builder.Property(d => d.MedicineId).HasColumnName("RemedioId").IsRequired();
            builder.Property(d => d.Creation).HasColumnName("DataCriacao").IsRequired();
            builder.Property(d => d.LastChange).HasColumnName("DataUltimaEdicao").IsRequired();
            builder.Property(d => d.LastAdministration).HasColumnName("UltimaAdministracao");
        }
    }
}
