USE [FINDB]
GO

/****** Object:  Table [dbo].[WFPPAYE]    Script Date: 2026/4/15 下午 08:44:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[WFPPAYE](
	[APLNO] [varchar](10) NOT NULL,
	[EFORMSN] [decimal](10, 0) NULL,
	[APLDATE] [varchar](8) NOT NULL,
	[APLSTAT] [varchar](1) NOT NULL,
	[PERDATE] [varchar](8) NULL,
	[EXPTYPE] [varchar](2) NOT NULL,
	[APLAMT] [decimal](11, 0) NOT NULL,
	[APLEMPNO] [varchar](5) NOT NULL,
	[APLEMPNAME] [nvarchar](12) NOT NULL,
	[APLBRHCOD] [varchar](4) NOT NULL,
	[APLBRHNAME] [nvarchar](20) NOT NULL,
	[APLDEPTCD] [varchar](3) NOT NULL,
	[APLDEPTNAME] [nvarchar](20) NOT NULL,
	[APLTEAMCD] [varchar](2) NULL,
	[APLTEAMNAME] [nvarchar](20) NULL,
	[USEUSER] [varchar](5) NULL,
	[USEUNAME] [nvarchar](12) NULL,
	[USEUCOM] [varchar](4) NULL,
	[USEUDPT] [varchar](3) NULL,
	[FILLERA] [varchar](5) NULL,
	[CATGCD1] [varchar](4) NULL,
	[TOTPAYM] [decimal](2, 0) NOT NULL,
	[TOTSHEET] [decimal](3, 0) NULL,
	[TOTDESC] [decimal](3, 0) NOT NULL,
	[APLDESC] [ntext] NOT NULL,
	[PAYDATE] [varchar](8) NULL,
	[PREDATE] [varchar](8) NULL,
	[PAYACCT] [varchar](10) NULL,
	[PAYACCTNO] [varchar](16) NULL,
	[WRTKEY1] [varchar](15) NULL,
	[WRTCOMP] [varchar](4) NULL,
	[CBTHNO] [varchar](10) NULL,
	[PAYMHD] [char](1) NULL,
	[CHECMHD] [varchar](1) NULL,
	[UPDDATED] [varchar](8) NULL,
	[UPDDATET] [varchar](6) NULL,
	[UPDDATE] [datetime] NULL,
	[UPDUSER] [varchar](5) NULL,
	[MODDATE] [datetime] NULL,
	[MODUSER] [varchar](20) NULL,
	[ACDATED] [varchar](8) NULL,
	[ACDATET] [varchar](6) NULL,
	[ACCHGUSR] [varchar](20) NULL,
	[CADATED] [varchar](8) NULL,
	[CADATET] [varchar](6) NULL,
	[CACHGUSR] [varchar](5) NULL,
	[CHGRTN] [varchar](30) NULL,
	[NEXTSTEP] [nvarchar](20) NULL,
	[NEXTPERM] [nvarchar](255) NULL,
	[FLOWTYPE] [varchar](2) NULL,
	[PCURNY] [varchar](3) NULL,
	[EMRGNCY] [bit] NULL,
	[PAYTIME] [char](4) NULL,
	[PAYACCTBNK] [varchar](7) NULL,
	[PAYACCTFULLNAME] [varchar](80) NULL,
	[SENDTYPE] [varchar](4) NULL,
	[PAYACCTID] [varchar](20) NULL,
	[TOA10] [bit] NULL,
	[ANNOUNCE] [bit] NULL,
	[NEEDSIGNDEPT] [nvarchar](255) NULL,
	[TOA10REASON] [nvarchar](200) NULL,
	[TRIPMAINSDATE] [int] NULL,
	[TRIPMAINEDATE] [int] NULL,
	[PAYTOTYPE] [varchar](1) NULL,
	[ImportKey] [varchar](50) NULL,
	[ImportDateTime] [datetime] NULL,
	[VENDERSND] [char](1) NULL,
	[CreateCaseIdDateTime] [datetime] NULL,
 CONSTRAINT [PK_WFPPAYE] PRIMARY KEY CLUSTERED 
(
	[APLNO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 30) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[WFPPAYE] ADD  DEFAULT ('TWD') FOR [PCURNY]
GO

ALTER TABLE [dbo].[WFPPAYE] ADD  DEFAULT ((0)) FOR [EMRGNCY]
GO

ALTER TABLE [dbo].[WFPPAYE] ADD  CONSTRAINT [df_PAYTIME]  DEFAULT ('') FOR [PAYTIME]
GO

ALTER TABLE [dbo].[WFPPAYE] ADD  DEFAULT ('API') FOR [SENDTYPE]
GO

ALTER TABLE [dbo].[WFPPAYE] ADD  DEFAULT ((0)) FOR [TOA10]
GO

ALTER TABLE [dbo].[WFPPAYE] ADD  DEFAULT ((0)) FOR [ANNOUNCE]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'空白' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'WFPPAYE', @level2type=N'COLUMN',@level2name=N'FILLERA'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'股代代收款公司別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'WFPPAYE', @level2type=N'COLUMN',@level2name=N'CATGCD1'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'沖銷KEY公司別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'WFPPAYE', @level2type=N'COLUMN',@level2name=N'WRTCOMP'
GO

