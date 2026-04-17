using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WFP.Domain.Entities;

[Table("WFPPAYEA", Schema = "dbo")]
public class WFPPAYEA
{
    [MaxLength(10)]
    public string APLNO { get; set; } = string.Empty;

    [MaxLength(10)]
    public string ACPTER { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? ACPTERNAME { get; set; }

    [Column(TypeName = "decimal(14, 2)")]
    public decimal? APLAMT { get; set; }

    [MaxLength(10)]
    public string? PAYTOBNK { get; set; }

    [MaxLength(16)]
    public string? PAYTOACT { get; set; }

    [MaxLength(80)]
    public string? ACPTERFULLNAME { get; set; }
    
    // Navigation property
    public virtual WFPPAYE? WFPPAYE { get; set; }
}
