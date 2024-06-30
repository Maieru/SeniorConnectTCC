CREATE TABLE [dbo].[tbAssinatura]
(
	[RemedioId]	    INT			    NOT NULL	PRIMARY KEY	IDENTITY (1, 1),
	[AssinaturaId]  INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbAssinatura(AssinaturaId) ON DELETE CASCADE,
	[Nome]          VARCHAR(200)	NOT NULL
)
