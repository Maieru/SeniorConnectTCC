CREATE TABLE [dbo].[tbTelemetria]
(
	[TelemetriaId]	    INT		    	NOT NULL	PRIMARY KEY	IDENTITY (1, 1),
	[DispositivoId]	    INT		    	NOT NULL 	FOREIGN KEY REFERENCES dbo.tbDispositivo(DispositivoId) ON DELETE CASCADE,
	[Ano]				INT				NOT NULL,
	[Mes]				INT 			NOT NULL,
	[Dia]				INT				NOT NULL,
	[Hora]				INT 			NOT NULL,
	[Minuto]			INT 			NOT NULL,
	[Segundo]			INT				NOT NULL,
	[Milis]				INT				NOT NULL,
	[Status]            NVARCHAR(MAX)   NOT NULL
)
