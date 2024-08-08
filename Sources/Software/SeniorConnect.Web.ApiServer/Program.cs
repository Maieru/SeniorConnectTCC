using Microsoft.EntityFrameworkCore;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var sqlServerConnectionString = builder.Configuration.GetValue<string>("SqlServerDatabase");

if (!builder.Environment.IsDevelopment())
{
    var vaultHelper = new SecretManager(builder.Configuration.GetValue<string>("KeyVaulUrl"));
    sqlServerConnectionString = await vaultHelper.GetSqlServerConnectionString();
}

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);
builder.Services.AddScoped<DeviceService>();

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
