# 實作支出申請儲存功能 (Expense Saving Implementation)

本計畫擬定完成「前端填寫 -> API 接收 -> 資料庫儲存」的完整環節。我們將在後端建立必要的明細表實體與服務，並在前端串接 HTTP 請求。

## User Review Required
> [!IMPORTANT]
> **申請單號 (APLNO) 產生機制**: 目前 DDL 中包含一個 `WFPPAYEZ` 控制表。本計畫初步將採用簡單的 UUID 或模擬序號，正式開發時可能需要實作資料庫序號取號邏輯。

> [!WARNING]
> 本次將實作 **Transactional Save**。若主檔、受款人明細、費用明細中任一環節失敗，整筆交易將會回滾 (Rollback)，確保資料一致性。

## Proposed Changes

---

### 1. 領域層與基礎建設層 (Domain & Infrastructure)
#### [NEW] `WFPPAYEA.cs`, `WFPPAYEH.cs`
建立受款人明細與費用明細的 Entity。

#### [MODIFY] `WfpDbContext.cs`
註冊新實體，並設定主從關係 (One-to-Many Mapping)。

---

### 2. 應用層 (WFP.Application)
#### [NEW] `DTOs/CreateExpenseRequest.cs`
定義與前端 Angular State 結構一致的資料傳輸物件。

#### [NEW] `Interfaces/IExpenseService.cs` & `Services/ExpenseService.cs`
實作核心儲存邏輯：
1. **呼叫 Validation**: 使用現有的 `ExpenseValidationService` 檢查 Triple Check。
2. **對應與轉換**: 將 DTO 轉為實體物件，處理日期格式與預設值。
3. **資料庫讀寫**: 使用 `WfpDbContext` 執行 Persistence。

---

### 3. API 層 (WFP.Api)
#### [NEW] `Controllers/ExpensesController.cs`
建立 `POST` 端點接收申請單，並處理成功/失敗的回應 (HTTP 201 Created 或 400 Bad Request)。

---

### 4. 前端整合 (WFP.Web)
#### [MODIFY] `app.config.ts`
載入 `provideHttpClient` 以支援網路請求。

#### [MODIFY] `expense-state.service.ts`
新增 `saveExpense()` 方法，將目前的 Signals 狀態組合後發送至後端。

#### [MODIFY] `expense-form.component.ts`
將「送出申請」按鈕綁定至儲存功能，並加入簡單的讀取中 (Loading) 狀態。

---

## Open Questions
> [!NOTE]
> 1. **單號產生**: 您希望由後端自動產生「單號」，還是前端在建稿時就決定？
> 2. **Mock 資料**: 目前登入使用者 (APLEMPNO, APLEMPNAME) 尚未有認證系統。我是否先在程式碼中 Hard-code 一個預設測試人員帳號？

## Verification Plan
### Automated Tests
1. 使用 Swagger (WFP.Api) 直接發送 JSON 測試資料，驗證資料庫 `WFPPAYE` 等表是否有寫入。
2. 執行 `dotnet build` 確保所有層級無衝突。

### Manual Verification
1. 開啟 Angular 頁面，填寫總金額、受款人與明細。
2. 點擊「送出申請」。
3. 觀察瀏覽器 Network 狀態與後端資料庫，確認達成真正儲存。
