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
    internal class SubscriptionFluent : IEntityTypeConfiguration<Subscription>
    {
        public void Configure(EntityTypeBuilder<Subscription> builder)
        {
            builder.ToTable("tbAssinatura");

            builder.Property(d => d.Id).HasColumnName("AssinaturaId").IsRequired();
            builder.Property(d => d.Description).HasColumnName("Descricao").IsRequired();
        }
    }
}
