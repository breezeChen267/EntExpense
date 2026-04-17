USE [FINDB]
GO

/****** Object:  Table [dbo].[WFPPAYES]    Script Date: 2026/4/15 下午 08:47:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[WFPPAYES](
	[APLNO] [char](10) NOT NULL,
	[APLSEQ] [decimal](3, 0) NOT NULL,
	[SHTID] [char](2) NOT NULL,
	[SHTNAME] [nvarchar](20) NOT NULL,
	[SHTNO] [char](20) NOT NULL,
	[CASEID] [int] NULL,
	[PURCHASEAMT] [decimal](11, 0) NULL,
	[PURCHASEURL] [nvarchar](3600) NULL
) ON [PRIMARY]
GO

