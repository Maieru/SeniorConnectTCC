CREATE TABLE [dbo].[tbDispositivoRemedio]
(
	[DispositivoRemedioId]	    INT	            NOT NULL	PRIMARY KEY	IDENTITY (1, 1),
	[DispositivoId]				INT				NOT NULL	FOREIGN KEY REFERENCES dbo.tbDispositivo(DispositivoId),
	[RemedioId]                 INT				NOT NULL	FOREIGN KEY REFERENCES dbo.tbRemedio(RemedioId) ON DELETE CASCADE,
	[Posicao]                   INT             NOT NULL
)
