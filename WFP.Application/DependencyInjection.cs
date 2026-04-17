using Microsoft.Extensions.DependencyInjection;
using WFP.Application.Services;
using WFP.Application.Validators;

namespace WFP.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ExpenseValidationService>();
        services.AddScoped<IExpenseService, ExpenseService>();
        
        return services;
    }
}
