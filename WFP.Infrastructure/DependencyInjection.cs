using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WFP.Application.Common.Interfaces;
using WFP.Infrastructure.Data;
using WFP.Infrastructure.Services;

namespace WFP.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Add DbContext for FINDB
        services.AddDbContext<WfpDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("FINDB"),
                b => b.MigrationsAssembly(typeof(WfpDbContext).Assembly.FullName)));

        // Map IWfpDbContext to WfpDbContext
        services.AddScoped<IWfpDbContext>(provider => provider.GetRequiredService<WfpDbContext>());

        // Add Dapper / ADO.NET Connection Factory if needed
        // For AS400DB queries
        services.AddScoped<SqlConnectionFactory>(provider => 
            new SqlConnectionFactory(configuration.GetConnectionString("AS400DB") ?? ""));

        // Add File Storage Service
        services.AddScoped<IFileStorageService, LocalFileStorageService>();

        return services;
    }
}

public class SqlConnectionFactory
{
    private readonly string _connectionString;

    public SqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public string ConnectionString => _connectionString;
}
