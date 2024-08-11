using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

ISecretManager secretManager = new LocalSecretManager();

if (!builder.Environment.IsDevelopment())
    secretManager = new SecretManager(builder.Configuration.GetValue<string>("KeyVaulUrl"));


var sqlServerConnectionString = await secretManager.GetSqlServerConnectionString();

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);

builder.Services.AddSingleton<ISecretManager>(secretManager);

builder.Services.AddScoped<IRepository<Device>, DeviceRepository>();
builder.Services.AddScoped<IRepository<Subscription>, SubscriptionRepository>();
builder.Services.AddScoped<IRepository<LogEntry>, LogRepository>();

builder.Services.AddScoped<LogService>();
builder.Services.AddScoped<SubscriptionService>();
builder.Services.AddScoped<DeviceService>();
builder.Services.AddScoped<DeviceProvisioningService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
