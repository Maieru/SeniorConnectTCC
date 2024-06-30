CREATE TABLE [dbo].[tbAssinatura]
(
	[TelemetriaId]	    INT			    NOT NULL	PRIMARY KEY	IDENTITY (1, 1),
	[DispositivoId]		INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbDispositivo(DispositivoId) ON DELETE CASCADE,
	[DataHora]          DATETIME	    NOT NULL,
	[Status]            BIT             NOT NULL
)
