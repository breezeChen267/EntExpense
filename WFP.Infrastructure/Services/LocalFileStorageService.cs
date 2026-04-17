using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WFP.Application.Common.Interfaces;

namespace WFP.Infrastructure.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly string _basePath;

    public LocalFileStorageService(IConfiguration configuration)
    {
        // Read from config or fall back to App_Data/Attachments
        _basePath = configuration["FileStorage:BasePath"]
            ?? Path.Combine(AppContext.BaseDirectory, "App_Data", "Attachments");

        Directory.CreateDirectory(_basePath);
    }

    public async Task<string> SaveFileAsync(Stream stream, string storedFileName)
    {
        var fullPath = Path.Combine(_basePath, storedFileName);
        using var fileStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write, FileShare.None);
        await stream.CopyToAsync(fileStream);
        return fullPath;
    }

    public string GenerateStoredFileName(string empNo, string originalFileName)
    {
        var datePart = DateTime.Now.ToString("yyyyMMdd");
        var randomPart = Guid.NewGuid().ToString("N")[..8].ToUpper(); // 8-char random hex
        var safeOriginalName = Path.GetFileName(originalFileName); // strip path traversal
        return $"{empNo}_{datePart}_{randomPart}_{safeOriginalName}";
    }
}
