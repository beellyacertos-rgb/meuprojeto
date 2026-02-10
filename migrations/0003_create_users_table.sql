-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário padrão admin/123
INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123');

-- Criar índice
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
