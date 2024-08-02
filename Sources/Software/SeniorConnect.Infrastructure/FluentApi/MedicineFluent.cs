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
    internal class MedicineFluent : IEntityTypeConfiguration<Medicine>
    {
        public void Configure(EntityTypeBuilder<Medicine> builder)
        {
            builder.ToTable("tbRemedio");

            builder.Property(d => d.Id).HasColumnName("Id").IsRequired();
            builder.Property(d => d.SubscriptionId).HasColumnName("AssinaturaId").IsRequired();
            builder.Property(d => d.Name).HasColumnName("Nome").IsRequired();
        }
    }
}
