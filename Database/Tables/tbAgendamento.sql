CREATE TABLE [dbo].[tbUsuario]
(
	[AgendamentoId]			INT				NOT NULL PRIMARY KEY IDENTITY (1, 1),
	[Horario]			    TIME	        NOT NULL,
	[Ativo]				    BIT	            NOT NULL,
	[RemedioId]		        INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbRemedio(RemedioId) ON DELETE CASCADE
)
