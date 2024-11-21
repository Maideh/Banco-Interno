-- Criação da tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP
);

-- Adicionando as colunas reset_token e reset_token_expiry
ALTER TABLE users ADD COLUMN reset_token VARCHAR(255);
ALTER TABLE users ADD COLUMN reset_token_expiry TIMESTAMP;

-- Exemplo de atualização do token de recuperação
UPDATE users SET reset_token = :token WHERE email = :email;

-- Exemplo de consulta para verificar o e-mail
SELECT * FROM users WHERE email = :email;

-- Atualizando o token e a data de expiração
UPDATE users SET reset_token = :token, reset_token_expiry = :expiry WHERE email = :email;