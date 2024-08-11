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
    public class UserFluent : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("tbUsuario");

            builder.Property(d => d.Id).HasColumnName("UsuarioId").IsRequired();
            builder.Property(d => d.Name).HasColumnName("Nome").HasMaxLength(200).IsRequired();
            builder.Property(d => d.Email).HasColumnName("Email").HasMaxLength(200).IsRequired();
            builder.Property(d => d.Username).HasColumnName("Usuario").HasMaxLength(200).IsRequired();
            builder.Property(d => d.Password).HasColumnName("Senha").HasMaxLength(200).IsRequired();
            builder.Property(d => d.SubscriptionId).HasColumnName("AssinaturaId").IsRequired();
        }
    }
}
