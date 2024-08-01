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
    internal class LogEntryFluent : IEntityTypeConfiguration<LogEntry>
    {
        public void Configure(EntityTypeBuilder<LogEntry> builder)
        {
            builder.ToTable("tbLog");

            builder.Property(d => d.Id).HasColumnName("Id").IsRequired();
            builder.Property(d => d.Message).HasColumnName("Mensagem").IsRequired();
            builder.Property(d => d.Category).HasColumnName("Categoria").IsRequired();
            builder.Property(d => d.Date).HasColumnName("Data").IsRequired();
            builder.Property(d => d.SerializedData).HasColumnName("DadosSerializados");
            builder.Property(d => d.Callstack).HasColumnName("Callstack");
        }
    }
}
