CREATE TABLE [dbo].[tbAdministracoes]
(
	[Id]				INT				PRIMARY KEY IDENTITY (1,1),
	[Data]				DATETIME	    NOT NULL,
	[AssinaturaId]		INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbAssinatura(AssinaturaId),
	[MedicamentoId]		INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbRemedio(RemedioId) ON DELETE CASCADE,
	[AgendamentoId]		INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbAgendamento(AgendamentoId),
	[DispositivoId]		INT				NULL	 FOREIGN KEY REFERENCES dbo.tbDispositivo(DispositivoId),
	[Motivo]			INT				NOT NULL,
)