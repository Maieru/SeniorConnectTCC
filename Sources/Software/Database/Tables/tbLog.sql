CREATE TABLE [dbo].[tbLog]
(
	[Id]				INT			    NOT NULL PRIMARY KEY	IDENTITY (1, 1),
	[Mensagem]			VARCHAR(max)	NOT NULL,
	[Categoria]			INT 			NOT NULL,
	[Data]				DATETIME	    NOT NULL,
	[DadosSerializados] VARCHAR(max),
	[Callstack]			VARCHAR(max),	
)