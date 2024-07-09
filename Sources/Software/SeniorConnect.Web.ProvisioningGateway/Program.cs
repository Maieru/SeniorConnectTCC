using Microsoft.EntityFrameworkCore;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var sqlServerConnectionString = builder.Configuration.GetValue<string>("SqlServerDatabase");

if (!builder.Environment.IsDevelopment())
{
    var vaultHelper = new SecretManager(builder.Configuration.GetValue<string>("KeyVaulUrl"));

    sqlServerConnectionString = await vaultHelper.GetSqlServerConnectionString();
}

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);
builder.Services.AddScoped<DeviceRepository>();

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
