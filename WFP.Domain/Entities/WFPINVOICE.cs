using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WFP.Domain.Entities;

[Table("WFPINVOICE", Schema = "dbo")]
public class WFPINVOICE
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int IDGNO { get; set; }

    [Required]
    [MaxLength(10)]
    public string APLNO { get; set; } = string.Empty;

    public int? EFORMSN { get; set; }

    [Required]
    [MaxLength(100)]
    public string FILEONAME { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string FILEO { get; set; } = string.Empty;

    [Required]
    [MaxLength(5)]
    public string EMPNO { get; set; } = string.Empty;

    public DateTime? MODIFIEDDATETIME { get; set; } = DateTime.Now;

    // Navigation property
    public virtual WFPPAYE? WFPPAYE { get; set; }
}
