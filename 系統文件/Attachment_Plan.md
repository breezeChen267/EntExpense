# 附件上傳實體功能實作計畫 (Attachment Upload Implementation)

本計畫擬定實作「費用申請單」的附件上傳功能，包含後端檔案儲存邏輯、資料庫記錄 (`WFPINVOICE`) 以及前端拖曳上傳介面。

## User Review Required
> [!IMPORTANT]
> **檔案儲存路徑**: 預設將儲存在後端專案目錄下的 `App_Data/Attachments` 資料夾中。若有特定網路路徑需求請告知。

> [!WARNING]
> **傳輸方式**: 考量到單檔上限 100MB，我們將採用 `multipart/form-data` 串流上傳。前端將在表單送出時，連同主單資料與檔案一併發送。

## Proposed Changes

---

### 1. 後端架構層 (Backend)
#### [NEW] `WFPINVOICE.cs`
建立 `WFPINVOICE` 實體，對應 `IDGNO`, `APLNO`, `FILEONAME`, `FILEO` 等欄位。

#### [NEW] `IFileStorageService.cs` & `LocalFileStorageService.cs`
實作檔案儲存介面：
- `SaveFileAsync(Stream file, string fileName)`: 負責將內容寫入磁碟並回傳儲存後的路徑/檔名。

#### [MODIFY] `WfpDbContext.cs`
註冊 `WFPINVOICE` 實體。

#### [MODIFY] `ExpensesController.cs` & `ExpenseService.cs`
修改 `Create` 方法以支援 `IFormFile` 集合。
- 儲存檔案至實體路徑。
- 在同一 Transaction 中寫入 `WFPINVOICE` 紀錄。

---

### 2. 前端介面 (Frontend)
#### [MODIFY] `attachment-uploader.component.ts` & `.html`
- 實作 `Drag & Drop` 邏輯，取得 `File` 物件清單。
- 顯示待上傳檔案清單（含檔名、大小）。
- 設定與 `ExpenseStateService` 的同步邏輯。

#### [MODIFY] `expense-state.service.ts`
- 修改 `saveExpense()`，改用 `FormData` 物件包裝 JSON 資料與實體檔案。

---

## Open Questions
> [!NOTE]
> 1. **檔案命名原則**: 為了避免檔名衝突，推薦使用 `APLNO_GUID_原始檔名`。您有特定命名偏好嗎？
> 2. **預覽功能**: 目前第一階段僅實作上傳與儲存，是否需要實作「點擊下載/預覽」功能？

## Verification Plan
### Automated Tests
1. 使用 Postman 發送 `form-data` 到 API，檢查磁碟目錄是否有檔案產生。
2. 檢查 `FINDB.dbo.WFPINVOICE` 是否有正確紀錄 `APLNO` 與檔名。

### Manual Verification
1. 在 Angular 頁面拖入測試檔案（如 png 或 pdf）。
2. 點擊「送出申請」。
3. 驗證 Alert 回傳成功，並在電腦資料夾確認檔案存在。
