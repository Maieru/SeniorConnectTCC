CREATE TABLE [dbo].[tbAgendamento]
(
	[AgendamentoId]			INT	        NOT NULL PRIMARY KEY IDENTITY (1, 1),
	[RemedioId]		        INT	        NOT NULL FOREIGN KEY REFERENCES dbo.tbRemedio(RemedioId) ON DELETE CASCADE,
	[Hora]					INT			NOT NULL,
	[Minuto]				INT			NOT NULL,
	[DiasDaSemana]			VARCHAR(20)	NOT NULL,
	[Ativo]			        BIT	        NOT NULL,
	[DataCriacao]			DATETIME	NOT NULL DEFAULT GETDATE(),
	[DataUltimaEdicao]		DATETIME	NOT NULL DEFAUaLT GETDATE(),
	[UltimaAdministracao]	DATETIME	NULL,
)