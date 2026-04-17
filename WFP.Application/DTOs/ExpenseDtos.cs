using System.Collections.Generic;

namespace WFP.Application.DTOs;

public class CreateExpenseRequest
{
    public decimal TotalAmount { get; set; }
    public string ExpType { get; set; } = "01"; // Default for general expense
    public string Description { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = "0";
    public string? CheckMethod { get; set; }
    public bool Toa10 { get; set; }
    public string? Toa10Reason { get; set; }
    
    public List<PayeeDto> Payees { get; set; } = new();
    public List<ExpenseDetailDto> Details { get; set; } = new();
    public List<AllocationDto> Allocations { get; set; } = new();
}

public class PayeeDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string? BankCode { get; set; }
    public string? AccountNo { get; set; }
}

public class ExpenseDetailDto
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}

public class AllocationDto
{
    public string DepartmentId { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}
