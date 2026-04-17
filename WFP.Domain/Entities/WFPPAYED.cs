using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WFP.Domain.Entities;

[Table("WFPPAYED", Schema = "dbo")]
public class WFPPAYED
{
    [MaxLength(10)]
    public string APLNO { get; set; } = string.Empty;

    [Column(TypeName = "decimal(3, 0)")]
    public decimal APLSEQ { get; set; }

    [MaxLength(4)]
    public string COMPID { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? COMPNAME { get; set; }

    [MaxLength(3)]
    public string DEPTNUM { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? DEPTNAME { get; set; }

    [Column(TypeName = "decimal(11, 0)")]
    public decimal? ITEMAMT { get; set; }
    
    // Navigation property
    public virtual WFPPAYEH? WFPPAYEH { get; set; }
}
