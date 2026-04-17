USE [FINDB]
GO

/****** Object:  Table [dbo].[WFPPAYED]    Script Date: 2026/4/15 下午 08:46:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[WFPPAYED](
	[APLNO] [char](10) NOT NULL,
	[APLSEQ] [decimal](3, 0) NOT NULL,
	[COMPID] [char](4) NOT NULL,
	[COMPNAME] [varchar](255) NULL,
	[DEPTNUM] [char](3) NOT NULL,
	[DEPTNAME] [varchar](255) NULL,
	[ITEMAMT] [decimal](11, 0) NULL
) ON [PRIMARY]
GO

