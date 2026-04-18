# 附件上傳功能實作 (Attachment Upload) - Task Tracker

- `[x]` 階段 1：後端實體與儲存服務
    - `[x]` 建立 `WFPINVOICE` 實體與 Context 更新
    - `[x]` 實作 `LocalFileStorageService` (EMPNO + YYYYMMDD + Random 命名邏輯)
- `[x]` 階段 2：API 與 應用層整合
    - `[x]` 更新 `IExpenseService` 支援檔案輸入
    - `[x]` 更新 `ExpensesController` 接收 `FromForm` 資料
- `[x]` 階段 3：前端傳輸邏輯
    - `[x]` 實作 `AttachmentUploaderComponent` 檔案拖放與清單管理
    - `[x]` 更新 `ExpenseStateService` 使用 `FormData` 發送請求
- `[x]` 階段 4：驗證
    - `[x]` 執行 `dotnet build`
    - `[x]` 測試端對端上傳功能，驗證磁碟檔案與 DB 紀錄。
