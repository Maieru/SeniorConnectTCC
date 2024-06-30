CREATE TABLE [dbo].[tbAssinatura]
(
	[DispositivoId]	    INT			    NOT NULL	PRIMARY KEY	IDENTITY (1, 1),
	[AssinaturaId]		INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbAssinatura(AssinaturaId) ON DELETE CASCADE,
	[Qtde Gavetas]      INT	            NOT NULL,
)
