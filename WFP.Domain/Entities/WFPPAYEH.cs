using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WFP.Domain.Entities;

[Table("WFPPAYEH", Schema = "dbo")]
public class WFPPAYEH
{
    [MaxLength(10)]
    public string APLNO { get; set; } = string.Empty;

    [Column(TypeName = "decimal(3, 0)")]
    public decimal APLSEQ { get; set; }

    [MaxLength(10)]
    public string EXPID { get; set; } = string.Empty;

    [MaxLength(22)]
    public string ITEMDES { get; set; } = string.Empty;

    [MaxLength(4)]
    public string SHAREC { get; set; } = string.Empty;

    [Column(TypeName = "decimal(11, 0)")]
    public decimal APLAMT { get; set; }

    [MaxLength(4)]
    public string? CATGCD1 { get; set; }
    
    // Navigation property
    public virtual WFPPAYE? WFPPAYE { get; set; }
}
