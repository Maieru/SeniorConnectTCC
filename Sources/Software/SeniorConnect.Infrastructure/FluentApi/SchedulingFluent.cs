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
            builder.Property(d => d.Data).HasColumnName("Horario").IsRequired();
            builder.Property(d => d.Active).HasColumnName("Ativo").IsRequired();
            builder.Property(d => d.Medicine).HasColumnName("RemedioId").IsRequired();
        }
    }
}
