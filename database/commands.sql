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

CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY,
    valor NUMERIC(10, 2) NOT NULL,
    tipo_transferencia VARCHAR(20) NOT NULL,  -- 'para_poupanca' ou 'para_corrente'
    data_transferencia TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES public.users(id)  -- Referência à tabela 'users'
);
