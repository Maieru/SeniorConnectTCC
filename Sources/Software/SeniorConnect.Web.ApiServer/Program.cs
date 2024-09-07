using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Domain.TOs.User;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;
using System.Text;

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
var tokenSigningKey = await secretManager.GetTokenSignignKey();
var storageConnectionString = secretManager.GetStorageConnectionString().Result;

builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);
builder.Services.AddScoped<IStorageService, StorageService>(secretManager => new StorageService(storageConnectionString));
builder.Services.AddScoped<IConfigurationChangeRegisterService, ConfigurationChangeRegisterService>();

builder.Services.AddScoped<IRepository<LogEntry>, LogRepository>();
builder.Services.AddScoped<IRepository<Device>, DeviceRepository>();
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<IRepository<Subscription>, SubscriptionRepository>();
builder.Services.AddScoped<IRepository<Medicine>, MedicineRepository>();
builder.Services.AddScoped<IRepository<MedicineDeviceAssociation>, MedicineDeviceAssociationRepository>();
builder.Services.AddScoped<IRepository<Scheduling>, SchedulingRepository>();

builder.Services.AddScoped<LogService>();
builder.Services.AddScoped<SubscriptionService>();
builder.Services.AddScoped<DeviceService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<BearerTokenService>();
builder.Services.AddScoped<MedicineService>();
builder.Services.AddScoped<SchedulingService>();

builder.Services.AddSingleton<ISecretManager>(secretManager);
builder.Services.AddSingleton<JwtTokenConfigurationOptions>(_ => new JwtTokenConfigurationOptions()
{
    Audience = "SeniorConnectApiServer",
    Issuer = "SeniorConnectApiServer",
    SigningKey = tokenSigningKey,
    ExpirationSeconds = 3600
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opts =>
{
    var signingKeyBytes = Encoding.UTF8.GetBytes(tokenSigningKey);

    opts.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "SeniorConnectApiServer",
        ValidAudience = "SeniorConnectApiServer",
        IssuerSigningKey = new SymmetricSecurityKey(signingKeyBytes)
    };
});

builder.Services.AddAuthentication().AddCookie();
builder.Services.AddAuthorization();

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
