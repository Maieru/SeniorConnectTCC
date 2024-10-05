CREATE TABLE [dbo].[tbDispositivo]
(
	[DispositivoId]	        INT			    NOT NULL PRIMARY KEY	IDENTITY (1, 1),
	[AssinaturaId]			INT			    NOT NULL FOREIGN KEY REFERENCES dbo.tbAssinatura(AssinaturaId) ON DELETE CASCADE,
	[NomeDispositivo]	    VARCHAR(50) 	NOT NULL,
	[ChavePrimaria]			VARCHAR(50)		NOT NULL DEFAULT '',
	[DataAlteracao]         DATETIME	    NOT NULL
)