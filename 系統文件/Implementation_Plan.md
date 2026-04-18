# 建立前端 Angular 費用申請介面 (Expense Application UI)

本計畫旨在建立「台幣費用申請管理系統」的前端 Angular 介面，由於使用最新的 Angular 17+ 架構，我們將以 Standalone Component 與 Signals 作為核心技術，並導入 Tailwind CSS 設計出現代化、動態且極具質感的 UI。

## User Review Required
> [!IMPORTANT]
> 執行此計畫前，必須先在 `WFP.Web` 專案中安裝 `tailwindcss`, `postcss`, 與 `autoprefixer`。這會修改您的 `package.json` 並產生 Tailwind 設定檔。

> [!WARNING]
> 本次將專注於「一般費用申請單」的介面架構，預設會使用模擬資料 (Mock Data) 填充下拉選單（如部門、費用明細編號），直到 API 端點建設完畢。

## Proposed Changes

---

### UI 架構與樣式 (Tailwind CSS)
安裝 Tailwind CSS，建立全域 Design System（配色、字體與微動畫）：
#### [NEW] `tailwind.config.js`
#### [MODIFY] `WFP.Web/src/app.css` (或 styles.css)
設定主要色調（Primary Colors）、質感背景（Glassmorphism 或淺色柔和漸層背景），以及 hover 與 transition 動畫效果。

---

### 共用服務 (Core & Services)
#### [NEW] `WFP.Web/src/app/core/services/expense-state.service.ts`
使用 **Angular Signals** 管理表單狀態 (State Management)，集中處理：
- **Triple Check**：即時計算受款平衡、請款平衡與分攤平衡。
- **動態金額轉換**：將總金額自動轉為「新台幣大寫」。
- **狀態控制 (APLSTAT)**：根據表單目前狀態鎖定/解鎖特定區塊的編輯權限。

---

### 表單與功能元件 (Features)
我們將打散複雜的申請表單，採用元件化 (Component-based) 模式：

#### [NEW] `WFP.Web/src/app/features/expense/expense-form.component.ts`
作為一般費用申請的父層容器 (Smart Component)，整合下列所有子元件。

#### [NEW] `WFP.Web/src/app/features/expense/components/payee-section/payee-section.component.ts`
**受款人區塊**：
- 支援查詢與輸入。
- 動態顯示金額與新台幣大寫。

#### [NEW] `WFP.Web/src/app/features/expense/components/expense-details/expense-details.component.ts`
**請款明細區塊**：
- 支援新增多筆請款明細。
- 表單連動 (`PAYMHD = '1'` 時顯示支票必填欄位)。

#### [NEW] `WFP.Web/src/app/features/expense/components/expense-allocation/expense-allocation.component.ts`
**費用分攤區塊**：
- 根據部門與專案進行分攤填寫與加總。

#### [NEW] `WFP.Web/src/app/features/expense/components/attachment-uploader/attachment-uploader.component.ts`
**附件上傳區塊**：
- 拖曳上傳支援 (Drag and Drop UI)。
- 驗證單檔上限 100MB 與數量上限 20 個。

---

## Open Questions
> [!NOTE]
> 1. 您對於系統的「品牌主色調」(Primary Color) 有偏好嗎？如果沒有，我將為您設計一套現代化（如藍灰色調配上微漸層）的高質感調色盤。
> 2. 目前專案中並未看見 `@angular/material` 或其他 UI 庫。請問您希望我純手工打造 Tailwind CSS UI，還是希望順便導入如 DaisyUI 或是 Angular Material 來加速開發？

## Verification Plan
### Automated Tests
1. 在 `WFP.Web` 執行 `npm install tailwindcss postcss autoprefixer` 並完成初始化。
2. 執行 `npm run build` 確認專案編譯正常且無語法錯誤。

### Manual Verification
1. 執行 `npm start` 啟動前端開發伺服器。
2. 開啟瀏覽器確認畫面與功能，確保 UI 極具質感並達成防錯連動。
