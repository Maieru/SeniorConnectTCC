using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SeniorConnect.Bussiness.Entities;
using SeniorConnect.Bussiness.Entities_Services;
using SeniorConnect.Bussiness.Services;
using SeniorConnect.Domain.Entities;
using SeniorConnect.Domain.Interfaces;
using SeniorConnect.Infrastructure.Context;
using SeniorConnect.Infrastructure.Repository;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        var environment = Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT");
        ISecretManager secretManager = new LocalSecretManager();

        if (environment != "Development")
            secretManager = new SecretManager(Environment.GetEnvironmentVariable("KeyVaulUrl"));

        var sqlServerConnectionString = secretManager.GetSqlServerConnectionString().Result;
        var storageConnectionString = secretManager.GetStorageConnectionString().Result;
        var iotHubConnectionString = secretManager.GetIoTHubConnectionString().Result;

        services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(sqlServerConnectionString), ServiceLifetime.Scoped);
        services.AddScoped<IStorageService, StorageService>(secretManager => new StorageService(storageConnectionString));
        services.AddScoped<IConfigurationChangeRegisterService, ConfigurationChangeRegisterService>();

        services.AddScoped<IRepository<LogEntry>, LogRepository>();
        services.AddScoped<IRepository<Device>, DeviceRepository>();
        services.AddScoped<IRepository<User>, UserRepository>();
        services.AddScoped<IRepository<Subscription>, SubscriptionRepository>();
        services.AddScoped<IRepository<Medicine>, MedicineRepository>();
        services.AddScoped<IRepository<MedicineDeviceAssociation>, MedicineDeviceAssociationRepository>();
        services.AddScoped<IRepository<Scheduling>, SchedulingRepository>();
        services.AddScoped<IRepository<Administration>, AdministrationRepository>();
        services.AddScoped<IRepository<Telemetry>, TelemetryRepository>();

        services.AddScoped<LogService>();
        services.AddScoped<SubscriptionService>();
        services.AddScoped<DeviceService>();
        services.AddScoped<UserService>();
        services.AddScoped<MedicineService>();
        services.AddScoped<SchedulingService>();
        services.AddScoped<AdministrationService>();
        services.AddScoped<TelemetryService>();

        services.AddScoped<IIotHubMessageService, IoTHubMessageService>(iotHub => new IoTHubMessageService(iotHubConnectionString));
        services.AddScoped<IConfigurationChangeService, ConfigurationChangeService>();

        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
    })
    .Build();

host.Run();
