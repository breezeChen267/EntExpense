using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WFP.Domain.Entities;

namespace WFP.Application.Common.Interfaces;

public interface IWfpDbContext
{
    DbSet<WFPPAYE> WFPPAYEs { get; }
    DbSet<WFPPAYEA> WFPPAYEAs { get; }
    DbSet<WFPPAYEH> WFPPAYEHs { get; }
    DbSet<WFPPAYED> WFPPAYEDs { get; }
    DbSet<WFPINVOICE> WFPINVOICEAs { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
