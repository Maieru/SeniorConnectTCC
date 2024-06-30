CREATE TABLE [dbo].[tbUsuario]
(
	[Cpf]				INT				NOT NULL PRIMARY KEY IDENTITY (1, 1),
	[Nome]			    VARCHAR(200)	NOT NULL,
	[Email]				VARCHAR(MAX)	NOT NULL,
	[Usuario]			VARCHAR(200)	NOT NULL,
	[Senha]			    VARCHAR(200)	NOT NULL,
	[AssinaturaId]		INT				NOT NULL FOREIGN KEY REFERENCES dbo.tbAssinatura(AssinaturaId) ON DELETE CASCADE
)
