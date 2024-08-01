using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var sqlServerConnectionString = builder.Configuration.GetValue<string>("SqlServerDatabase");
var dpsPrimaryKey = builder.Configuration.GetValue<string>("DpsPrimaryKey");
var dpsIdScope = builder.Configuration.GetValue<string>("IdScope");

if (!builder.Environment.IsDevelopment())
{
    var vaultHelper = new SecretManager(builder.Configuration.GetValue<string>("KeyVaulUrl"));

    sqlServerConnectionString = await vaultHelper.GetSqlServerConnectionString();
    dpsPrimaryKey = await vaultHelper.GetDpsPrimaryKey();
    dpsIdScope = await vaultHelper.GetDpsIdScope();
}

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);
builder.Services.AddScoped<DeviceRepository>();
builder.Services.AddScoped<LogRepository>();
builder.Services.AddScoped<LogService>();
builder.Services.AddScoped(sp => new DeviceProvisioningService(dpsPrimaryKey, dpsIdScope));

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
