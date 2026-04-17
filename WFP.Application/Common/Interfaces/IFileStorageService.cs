using System.IO;
using System.Threading.Tasks;

namespace WFP.Application.Common.Interfaces;

public interface IFileStorageService
{
    /// <summary>
    /// 儲存檔案並回傳儲存後的路徑 (FILEO 欄位)
    /// </summary>
    Task<string> SaveFileAsync(Stream stream, string storedFileName);

    /// <summary>
    /// 依據命名規則產生存檔名稱: EMPNO_YYYYMMDD_隨機碼_原始檔名
    /// </summary>
    string GenerateStoredFileName(string empNo, string originalFileName);
}
