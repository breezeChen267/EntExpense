using Microsoft.EntityFrameworkCore;
using WFP.Domain.Entities;
using WFP.Application.Common.Interfaces;

namespace WFP.Infrastructure.Data;

public class WfpDbContext : DbContext, IWfpDbContext
{
    public WfpDbContext(DbContextOptions<WfpDbContext> options) : base(options)
    {
    }

    public DbSet<WFPPAYE> WFPPAYEs => Set<WFPPAYE>();
    public DbSet<WFPPAYEA> WFPPAYEAs => Set<WFPPAYEA>();
    public DbSet<WFPPAYEH> WFPPAYEHs => Set<WFPPAYEH>();
    public DbSet<WFPPAYED> WFPPAYEDs => Set<WFPPAYED>();
    public DbSet<WFPINVOICE> WFPINVOICEAs => Set<WFPINVOICE>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<WFPPAYE>(entity =>
        {
            entity.ToTable("WFPPAYE", "dbo");
            entity.HasKey(e => e.APLNO);

            entity.Property(e => e.APLNO).HasMaxLength(10).IsUnicode(false);
            entity.Property(e => e.APLDATE).HasMaxLength(8).IsUnicode(false);
            entity.Property(e => e.APLSTAT).HasMaxLength(1).IsUnicode(false);
            entity.Property(e => e.EXPTYPE).HasMaxLength(2).IsUnicode(false);
            entity.Property(e => e.APLAMT).HasColumnType("decimal(11, 0)");
            entity.Property(e => e.APLDESC).HasColumnType("ntext");

            entity.Property(e => e.PCURNY).HasDefaultValue("TWD");
            entity.Property(e => e.EMRGNCY).HasDefaultValue(false);
            entity.Property(e => e.PAYTIME).HasDefaultValue("");
            entity.Property(e => e.SENDTYPE).HasDefaultValue("API");
            entity.Property(e => e.TOA10).HasDefaultValue(false);
            entity.Property(e => e.ANNOUNCE).HasDefaultValue(false);
            
            entity.HasMany(e => e.Payees)
                  .WithOne(e => e.WFPPAYE)
                  .HasForeignKey(e => e.APLNO);
                  
            entity.HasMany(e => e.Details)
                  .WithOne(e => e.WFPPAYE)
                  .HasForeignKey(e => e.APLNO);
        });

        modelBuilder.Entity<WFPPAYEA>(entity =>
        {
            entity.ToTable("WFPPAYEA", "dbo");
            entity.HasKey(e => new { e.APLNO, e.ACPTER });

            entity.Property(e => e.APLNO).HasMaxLength(10).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.ACPTER).HasMaxLength(10).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.APLAMT).HasColumnType("decimal(14, 2)");
        });

        modelBuilder.Entity<WFPPAYEH>(entity =>
        {
            entity.ToTable("WFPPAYEH", "dbo");
            entity.HasKey(e => new { e.APLNO, e.APLSEQ });

            entity.Property(e => e.APLNO).HasMaxLength(10).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.APLSEQ).HasColumnType("decimal(3, 0)");
            entity.Property(e => e.EXPID).HasMaxLength(10).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.ITEMDES).HasMaxLength(22);
            entity.Property(e => e.SHAREC).HasMaxLength(4).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.APLAMT).HasColumnType("decimal(11, 0)");
        });

        modelBuilder.Entity<WFPPAYED>(entity =>
        {
            entity.ToTable("WFPPAYED", "dbo");
            // WFPPAYED doesn't have a PK in the DDL, but for EF we often need one 
            // or we map it as a dependent entity without key if supported, 
            // but let's assume (APLNO, APLSEQ, COMPID, DEPTNUM) as composite key.
            entity.HasKey(e => new { e.APLNO, e.APLSEQ, e.COMPID, e.DEPTNUM });

            entity.Property(e => e.APLNO).HasMaxLength(10).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.APLSEQ).HasColumnType("decimal(3, 0)");
            entity.Property(e => e.COMPID).HasMaxLength(4).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.DEPTNUM).HasMaxLength(3).IsFixedLength().IsUnicode(false);
            entity.Property(e => e.ITEMAMT).HasColumnType("decimal(11, 0)");
        });

        modelBuilder.Entity<WFPINVOICE>(entity =>
        {
            entity.ToTable("WFPINVOICE", "dbo");
            entity.HasKey(e => e.IDGNO);

            entity.Property(e => e.APLNO).HasMaxLength(10).IsUnicode(false);
            entity.Property(e => e.FILEONAME).HasMaxLength(100);
            entity.Property(e => e.FILEO).HasMaxLength(100);
            entity.Property(e => e.EMPNO).HasMaxLength(5).IsFixedLength().IsUnicode(false);
        });
    }
}
