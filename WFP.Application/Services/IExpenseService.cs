using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WFP.Application.DTOs;

namespace WFP.Application.Services;

public class AttachmentUploadModel
{
    public string FileName { get; set; } = string.Empty;
    public Stream Stream { get; set; } = Stream.Null;
}

public interface IExpenseService
{
    Task<string> CreateExpenseAsync(CreateExpenseRequest request, List<AttachmentUploadModel>? attachments = null);
}
