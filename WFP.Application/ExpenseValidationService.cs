using System.Collections.Generic;
using WFP.Domain.Entities;

namespace WFP.Application.Validators;

public class ExpenseValidationService
{
    /// <summary>
    /// 檢核各項明細加總是否平衡 (Triple Check) 及特定連動條件
    /// </summary>
    public Dictionary<string, string> ValidateExpense(WFPPAYE expense, decimal totalPayeeAmt, decimal totalDetailAmt, decimal totalAllocationAmt)
    {
        var errors = new Dictionary<string, string>();

        // 5.1 金額平衡檢核（Triple Check）
        if (totalPayeeAmt != expense.APLAMT)
            errors.Add("PayeeBalance", "受款明細加總必須等於主檔申請總金額");

        if (totalDetailAmt != expense.APLAMT)
            errors.Add("DetailBalance", "請款明細加總必須等於主檔申請總金額");

        if (totalAllocationAmt != totalDetailAmt)
            errors.Add("AllocationBalance", "費用分攤明細加總必須等於明細金額");

        // 5.5 條件連動
        if (expense.PAYMHD == "1" && string.IsNullOrWhiteSpace(expense.CHECMHD))
            errors.Add(nameof(expense.CHECMHD), "付款方式為支票時，必填支票相關說明/方式 (CHECMHD)");

        if (expense.TOA10 == true && string.IsNullOrWhiteSpace(expense.TOA10REASON))
            errors.Add(nameof(expense.TOA10REASON), "勾選 TOA10 時，必填 TOA10REASON");

        return errors;
    }
}
