using Microsoft.EntityFrameworkCore;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

ISecretManager secretManager = new LocalSecretManager();

if (!builder.Environment.IsDevelopment())
    secretManager = new SecretManager(builder.Configuration.GetValue<string>("KeyVaulUrl"));

var sqlServerConnectionString = await secretManager.GetSqlServerConnectionString();

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);

builder.Services.AddScoped<DeviceService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton<ISecretManager>(secretManager);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
