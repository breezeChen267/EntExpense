namespace WFP.Domain.Enums;

public enum AplStat
{
    Draft = 0,               // T 草稿 -- 表單填寫中 (Mapped to 0 for default usually, but we can use explicit or char)
    Approving = 1,           // 1 申請簽核 -- 起單成功且表單簽核中
    Withdrawn = 2,           // 2 撤回申請 -- 簽核中表單撤回
    Rejected = 3,            // 3 簽核退件 -- 簽核中表單被退件
    DraftT = 'T',            // T 草稿 -- 表單填寫中
    Processing = 'P',        // P 起單處理中 -- 起單處理中
    Failed = '#'             // # 起單失敗 -- 起單失敗
}
