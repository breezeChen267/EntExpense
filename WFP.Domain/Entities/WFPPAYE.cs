using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WFP.Domain.Enums;

namespace WFP.Domain.Entities;

[Table("WFPPAYE", Schema = "dbo")]
public class WFPPAYE
{
    [Key]
    [Required]
    [MaxLength(10)]
    public string APLNO { get; set; } = string.Empty;

    public decimal? EFORMSN { get; set; }

    [Required]
    [MaxLength(8)]
    public string APLDATE { get; set; } = string.Empty;

    [Required]
    [MaxLength(1)]
    public string APLSTAT { get; set; } = string.Empty;

    [MaxLength(8)]
    public string? PERDATE { get; set; }

    [Required]
    [MaxLength(2)]
    public string EXPTYPE { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(11, 0)")]
    public decimal APLAMT { get; set; }

    [Required]
    [MaxLength(5)]
    public string APLEMPNO { get; set; } = string.Empty;

    [Required]
    [MaxLength(12)]
    public string APLEMPNAME { get; set; } = string.Empty;

    [Required]
    [MaxLength(4)]
    public string APLBRHCOD { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string APLBRHNAME { get; set; } = string.Empty;

    [Required]
    [MaxLength(3)]
    public string APLDEPTCD { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string APLDEPTNAME { get; set; } = string.Empty;

    [MaxLength(2)]
    public string? APLTEAMCD { get; set; }

    [MaxLength(20)]
    public string? APLTEAMNAME { get; set; }

    [MaxLength(5)]
    public string? USEUSER { get; set; }

    [MaxLength(12)]
    public string? USEUNAME { get; set; }

    [MaxLength(4)]
    public string? USEUCOM { get; set; }

    [MaxLength(3)]
    public string? USEUDPT { get; set; }

    [MaxLength(5)]
    public string? FILLERA { get; set; }

    [MaxLength(4)]
    public string? CATGCD1 { get; set; }

    [Required]
    public decimal TOTPAYM { get; set; }

    public decimal? TOTSHEET { get; set; }

    [Required]
    public decimal TOTDESC { get; set; }

    [Required]
    public string APLDESC { get; set; } = string.Empty;

    [MaxLength(8)]
    public string? PAYDATE { get; set; }

    [MaxLength(8)]
    public string? PREDATE { get; set; }

    [MaxLength(10)]
    public string? PAYACCT { get; set; }

    [MaxLength(16)]
    public string? PAYACCTNO { get; set; }

    [MaxLength(15)]
    public string? WRTKEY1 { get; set; }

    [MaxLength(4)]
    public string? WRTCOMP { get; set; }

    [MaxLength(10)]
    public string? CBTHNO { get; set; }

    [MaxLength(1)]
    public string? PAYMHD { get; set; }

    [MaxLength(1)]
    public string? CHECMHD { get; set; }

    [MaxLength(8)]
    public string? UPDDATED { get; set; }

    [MaxLength(6)]
    public string? UPDDATET { get; set; }

    public DateTime? UPDDATE { get; set; }

    [MaxLength(5)]
    public string? UPDUSER { get; set; }

    public DateTime? MODDATE { get; set; }

    [MaxLength(20)]
    public string? MODUSER { get; set; }

    [MaxLength(8)]
    public string? ACDATED { get; set; }

    [MaxLength(6)]
    public string? ACDATET { get; set; }

    [MaxLength(20)]
    public string? ACCHGUSR { get; set; }

    [MaxLength(8)]
    public string? CADATED { get; set; }

    [MaxLength(6)]
    public string? CADATET { get; set; }

    [MaxLength(5)]
    public string? CACHGUSR { get; set; }

    [MaxLength(30)]
    public string? CHGRTN { get; set; }

    [MaxLength(20)]
    public string? NEXTSTEP { get; set; }

    [MaxLength(255)]
    public string? NEXTPERM { get; set; }

    [MaxLength(2)]
    public string? FLOWTYPE { get; set; }

    [MaxLength(3)]
    public string? PCURNY { get; set; }

    public bool? EMRGNCY { get; set; }

    [MaxLength(4)]
    public string? PAYTIME { get; set; }

    [MaxLength(7)]
    public string? PAYACCTBNK { get; set; }

    [MaxLength(80)]
    public string? PAYACCTFULLNAME { get; set; }

    [MaxLength(4)]
    public string? SENDTYPE { get; set; }

    [MaxLength(20)]
    public string? PAYACCTID { get; set; }

    public bool? TOA10 { get; set; }

    public bool? ANNOUNCE { get; set; }

    [MaxLength(255)]
    public string? NEEDSIGNDEPT { get; set; }

    [MaxLength(200)]
    public string? TOA10REASON { get; set; }

    public int? TRIPMAINSDATE { get; set; }

    public int? TRIPMAINEDATE { get; set; }

    [MaxLength(1)]
    public string? PAYTOTYPE { get; set; }

    [MaxLength(50)]
    public string? ImportKey { get; set; }

    public DateTime? ImportDateTime { get; set; }

    [MaxLength(1)]
    public string? VENDERSND { get; set; }

    public DateTime? CreateCaseIdDateTime { get; set; }

    // Navigation Properties
    public virtual ICollection<WFPPAYEA> Payees { get; set; } = new List<WFPPAYEA>();
    public virtual ICollection<WFPPAYEH> Details { get; set; } = new List<WFPPAYEH>();
}
