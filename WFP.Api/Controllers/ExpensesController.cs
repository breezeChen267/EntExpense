using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WFP.Application.DTOs;
using WFP.Application.Services;

namespace WFP.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly IExpenseService _expenseService;

    public ExpensesController(IExpenseService expenseService)
    {
        _expenseService = expenseService;
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] string requestJson, [FromForm] IFormFileCollection attachments)
    {
        try
        {
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var request = JsonSerializer.Deserialize<CreateExpenseRequest>(requestJson, options);
            
            if (request == null) return BadRequest(new { Success = false, Message = "Invalid request JSON" });

            var attachmentModels = attachments?.Select(f => new AttachmentUploadModel
            {
                FileName = f.FileName,
                Stream = f.OpenReadStream()
            }).ToList();

            var aplNo = await _expenseService.CreateExpenseAsync(request, attachmentModels);
            return Ok(new { Success = true, AplNo = aplNo });
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { Success = false, Message = ex.Message });
        }
    }
}
