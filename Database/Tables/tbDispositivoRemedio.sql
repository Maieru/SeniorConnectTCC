CREATE TABLE [dbo].[tbAssinatura]
(
	[DispositivoRemedioId]	    INT			    NOT NULL	PRIMARY KEY	IDENTITY (1, 1),
	[DispositivoId]		        INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbDispositivo(DispositivoId) ON DELETE CASCADE,
	[RemedioId]                 INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbRemedio(RemedioId) ON DELETE CASCADE,
	[Posicao]                   INT             NOT NULL
)
