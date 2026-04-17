using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WFP.Application.Common.Interfaces;
using WFP.Application.DTOs;
using WFP.Application.Validators;
using WFP.Domain.Entities;

namespace WFP.Application.Services;

public class ExpenseService : IExpenseService
{
    private readonly IWfpDbContext _context;
    private readonly ExpenseValidationService _validationService;
    private readonly IFileStorageService _fileStorageService;

    public ExpenseService(
        IWfpDbContext context, 
        ExpenseValidationService validationService,
        IFileStorageService fileStorageService)
    {
        _context = context;
        _validationService = validationService;
        _fileStorageService = fileStorageService;
    }

    public async Task<string> CreateExpenseAsync(CreateExpenseRequest request, List<AttachmentUploadModel>? attachments = null)
    {
        // 1. Generate APLNO (Taiwan Year + Month + Sequence)
        string aplNo = await GenerateAplNoAsync();

        // 2. Validate using Triple Check Logic
        // We'll create a dummy entity for validation purposes first or just pass the required values
        var dummyEntity = new WFPPAYE 
        { 
            APLAMT = request.TotalAmount,
            PAYMHD = request.PaymentMethod,
            CHECMHD = request.CheckMethod,
            TOA10 = request.Toa10,
            TOA10REASON = request.Toa10Reason
        };
        
        var errors = _validationService.ValidateExpense(
            dummyEntity, 
            request.Payees.Sum(p => p.Amount), 
            request.Details.Sum(d => d.Amount), 
            request.Allocations.Sum(a => a.Amount)
        );

        if (errors.Any())
        {
            throw new Exception($"Validation failed: {string.Join(", ", errors.Values)}");
        }

        // 3. Map to Entities
        var dateNow = DateTime.Now;
        var taiwanYearMonth = $"{(dateNow.Year - 1911):D3}{dateNow.Month:D2}";
        var aplDateStr = $"{taiwanYearMonth}{dateNow.Day:D2}";

        var expense = new WFPPAYE
        {
            APLNO = aplNo,
            APLDATE = aplDateStr,
            APLSTAT = "1", // 簽核中
            EXPTYPE = request.ExpType,
            APLAMT = request.TotalAmount,
            APLDESC = request.Description,
            PAYMHD = request.PaymentMethod,
            CHECMHD = request.CheckMethod,
            TOA10 = request.Toa10,
            TOA10REASON = request.Toa10Reason,
            
            // Mock Personnel Data
            APLEMPNO = "99999",
            APLEMPNAME = "測試員",
            APLBRHCOD = "5850",
            APLBRHNAME = "總公司",
            APLDEPTCD = "999",
            APLDEPTNAME = "資訊部",
            
            TOTPAYM = request.Payees.Count,
            TOTDESC = request.Details.Count,
            TOTSHEET = attachments?.Count ?? 0,
            UPDDATE = dateNow,
            UPDUSER = "SYS"
        };

        // Map Payees (WFPPAYEA)
        foreach (var p in request.Payees)
        {
            expense.Payees.Add(new WFPPAYEA
            {
                APLNO = aplNo,
                ACPTER = p.Id,
                ACPTERNAME = p.Name,
                APLAMT = p.Amount,
                PAYTOBNK = p.BankCode,
                PAYTOACT = p.AccountNo
            });
        }

        // Map Details (WFPPAYEH) & Allocations (WFPPAYED)
        int seq = 1;
        foreach (var d in request.Details)
        {
            var detail = new WFPPAYEH
            {
                APLNO = aplNo,
                APLSEQ = seq,
                EXPID = d.Type,
                ITEMDES = d.Description,
                APLAMT = d.Amount,
                SHAREC = "0001" // Mock share code
            };
            
            // For now, let's assume all allocations belong to the first detail for simplicity 
            // or distribute them. Based on spec: sum(WFPPAYED.ITEMAMT) = Detail Amount.
            // Here we just attach all allocations to the first detail if applicable.
            if (seq == 1) {
                foreach (var a in request.Allocations)
                {
                    // In a real scenario, we'd link allocations to specific details
                    _context.WFPPAYEDs.Add(new WFPPAYED
                    {
                        APLNO = aplNo,
                        APLSEQ = seq,
                        COMPID = "5850",
                        COMPNAME = "SMC",
                        DEPTNUM = a.DepartmentId.PadLeft(3, '0'),
                        DEPTNAME = a.DepartmentName,
                        ITEMAMT = a.Amount
                    });
                }
            }

            expense.Details.Add(detail);
            seq++;
        }

        // 4. Handle Attachments
        if (attachments != null && attachments.Any())
        {
            foreach (var attachment in attachments)
            {
                var storedFileName = _fileStorageService.GenerateStoredFileName(expense.APLEMPNO, attachment.FileName);
                var storedPath = await _fileStorageService.SaveFileAsync(attachment.Stream, storedFileName);

                _context.WFPINVOICEAs.Add(new WFPINVOICE
                {
                    APLNO = aplNo,
                    EMPNO = expense.APLEMPNO,
                    FILEONAME = attachment.FileName,
                    FILEO = storedFileName, // Store the name for relative access or full path
                    MODIFIEDDATETIME = dateNow
                });
            }
        }

        // 5. Persistence
        _context.WFPPAYEs.Add(expense);
        await _context.SaveChangesAsync();

        return aplNo;
    }

    private async Task<string> GenerateAplNoAsync()
    {
        var now = DateTime.Now;
        var taiwanYear = now.Year - 1911;
        var prefix = $"{taiwanYear:D3}{now.Month:D2}";
        
        // Find the last sequence for this month
        var lastNo = await _context.WFPPAYEs
            .Where(e => e.APLNO.StartsWith(prefix))
            .OrderByDescending(e => e.APLNO)
            .Select(e => e.APLNO)
            .FirstOrDefaultAsync();

        int nextSeq = 1;
        if (lastNo != null && lastNo.Length >= 10)
        {
            if (int.TryParse(lastNo.Substring(5), out int currentSeq))
            {
                nextSeq = currentSeq + 1;
            }
        }

        return $"{prefix}{nextSeq:D5}"; // Result: 1150400001 (10 chars)
    }
}
