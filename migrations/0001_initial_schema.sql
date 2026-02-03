-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir configurações padrão
INSERT OR IGNORE INTO config (key, value) VALUES ('admin_password', '123');
INSERT OR IGNORE INTO config (key, value) VALUES ('cor_primaria', '#8B4513');
INSERT OR IGNORE INTO config (key, value) VALUES ('cor_secundaria', '#DAA520');
INSERT OR IGNORE INTO config (key, value) VALUES ('cor_terciaria', '#FFD700');
INSERT OR IGNORE INTO config (key, value) VALUES ('nome_empresa', 'Minha Semi Jóias');
INSERT OR IGNORE INTO config (key, value) VALUES ('logo_empresa', '');
INSERT OR IGNORE INTO config (key, value) VALUES ('explicacoes', '');
INSERT OR IGNORE INTO config (key, value) VALUES ('whatsapp', '');
INSERT OR IGNORE INTO config (key, value) VALUES ('logo_rodape', '');

-- Tabela de Consultoras
CREATE TABLE IF NOT EXISTS consultoras (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_completo TEXT NOT NULL,
  endereco TEXT,
  bairro TEXT,
  cep TEXT,
  cidade TEXT,
  cpf TEXT,
  telefone TEXT,
  nome_pai TEXT,
  nome_mae TEXT,
  telefone_referencia TEXT,
  nome_representante TEXT,
  aceita_mostruario TEXT DEFAULT 'nao',
  aceita_contrato TEXT DEFAULT 'nao',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Representantes
CREATE TABLE IF NOT EXISTS representantes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_completo TEXT NOT NULL,
  endereco TEXT,
  bairro TEXT,
  cep TEXT,
  cidade TEXT,
  cpf TEXT,
  telefone TEXT,
  veiculo TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fotos
CREATE TABLE IF NOT EXISTS fotos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  imagem_base64 TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_consultoras_cpf ON consultoras(cpf);
CREATE INDEX IF NOT EXISTS idx_representantes_cpf ON representantes(cpf);
CREATE INDEX IF NOT EXISTS idx_config_key ON config(key);
