# 💎 Beelly Semi Joias - Sistema de Gestão

Sistema completo de gestão para empresa de semi joias com cadastro de consultoras, representantes, galeria de fotos e área administrativa.

## 🌐 URLs de Acesso

### 🔗 Produção (Cloudflare Pages)
- **URL Principal**: https://semijoias-app-di3.pages.dev
- **Área Administrativa**: https://semijoias-app-di3.pages.dev/admin
- **Consultoras**: https://semijoias-app-di3.pages.dev/consultoras
- **Representantes**: https://semijoias-app-di3.pages.dev/representantes
- **Galeria**: https://semijoias-app-di3.pages.dev/galeria
- **Explicações**: https://semijoias-app-di3.pages.dev/explicacoes

### 📦 Repositório
- **GitHub**: https://github.com/beellyacertos-rgb/meuprojeto

## ✨ Funcionalidades Implementadas

### 👥 Gestão de Consultoras
- ✅ Cadastro completo (nome, endereço, CPF, telefone, etc)
- ✅ Listagem com busca por nome
- ✅ Edição e exclusão de cadastros
- ✅ Relatórios por cidade
- ✅ Campo "mês" para controle mensal

### 🤝 Gestão de Representantes
- ✅ Cadastro com dados pessoais e veículo
- ✅ Listagem e busca
- ✅ Edição e exclusão
- ✅ Relatórios por cidade

### 🖼️ Galeria de Fotos
- ✅ Upload de imagens (400x600px)
- ✅ Preview automático
- ✅ Listagem de fotos
- ✅ Exclusão de fotos
- ✅ Salvamento com botão manual

### 🏢 Logos da Empresa
- ✅ Logo principal (200x200px)
- ✅ Logo rodapé (60x40px)
- ✅ Preview antes de salvar
- ✅ Botão "Salvar" para confirmar upload

### 📝 Explicações
- ✅ Campo de texto com múltiplas linhas
- ✅ Suporte a Enter para quebras de linha
- ✅ Botão "Salvar" para persistir no banco
- ✅ Exibição pública na página /explicacoes

### 🔐 Área Administrativa
- ✅ Acesso direto (sem senha)
- ✅ Interface organizada em 6 seções:
  1. Logos da Empresa
  2. Galeria de Fotos
  3. Explicações
  4. Relatórios PDF
  5. Lista de Consultoras
  6. Lista de Representantes

## 🛠️ Stack Tecnológica

### Backend
- **Framework**: Hono.js (lightweight web framework)
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite distribuído)
- **Deploy**: Cloudflare Pages

### Frontend
- **Framework**: Vanilla JavaScript (SPA)
- **Styling**: TailwindCSS v3
- **Icons**: Font Awesome v6.4
- **HTTP Client**: Axios v1.6

### Ferramentas
- **Build**: Vite v6.4
- **Process Manager**: PM2
- **Package Manager**: npm
- **Version Control**: Git

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### `consultoras`
```sql
- id (INTEGER PRIMARY KEY)
- nome_completo (TEXT)
- endereco (TEXT)
- bairro (TEXT)
- cep (TEXT)
- cidade (TEXT)
- cpf (TEXT)
- telefone (TEXT)
- nome_pai (TEXT)
- nome_mae (TEXT)
- telefone_referencia (TEXT)
- nome_representante (TEXT)
- aceita_mostruario (TEXT)
- aceita_contrato (TEXT)
- mes (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### `representantes`
```sql
- id (INTEGER PRIMARY KEY)
- nome_completo (TEXT)
- endereco (TEXT)
- bairro (TEXT)
- cep (TEXT)
- cidade (TEXT)
- cpf (TEXT)
- telefone (TEXT)
- veiculo (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### `fotos`
```sql
- id (INTEGER PRIMARY KEY)
- imagem_base64 (TEXT)
- created_at (DATETIME)
```

#### `explicacoes`
```sql
- id (INTEGER PRIMARY KEY)
- texto (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### `configuracoes`
```sql
- id (INTEGER PRIMARY KEY)
- chave (TEXT UNIQUE)
- valor (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### `users`
```sql
- id (INTEGER PRIMARY KEY)
- username (TEXT UNIQUE)
- password (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

## 🚀 APIs Disponíveis

### Consultoras
```
GET    /api/clientes                      - Listar todas
POST   /api/clientes                      - Criar nova
GET    /api/consultoras/:id               - Buscar por ID
PUT    /api/consultoras/:id               - Atualizar
DELETE /api/consultoras/:id               - Excluir
GET    /api/consultoras/buscar/:nome      - Buscar por nome
GET    /api/consultoras/relatorio/cidade  - Relatório por cidade
```

### Representantes
```
GET    /api/representantes                      - Listar todos
POST   /api/representantes                      - Criar novo
GET    /api/representantes/:id                  - Buscar por ID
PUT    /api/representantes/:id                  - Atualizar
DELETE /api/representantes/:id                  - Excluir
GET    /api/representantes/buscar/:nome         - Buscar por nome
GET    /api/representantes/relatorio/cidade     - Relatório por cidade
```

### Galeria
```
GET    /api/galeria     - Listar fotos
POST   /api/galeria     - Upload foto
DELETE /api/galeria/:id - Excluir foto
```

### Logos
```
GET  /api/logo?chave=logo_empresa  - Buscar logo
POST /api/logo                     - Salvar logo
     Body: { chave: "logo_empresa", valor: "base64..." }
```

### Explicações
```
GET  /api/explicacoes  - Buscar última explicação
POST /api/explicacoes  - Salvar nova explicação
     Body: { texto: "..." }
```

### Usuários
```
GET    /api/users     - Listar usuários
POST   /api/users     - Criar usuário
GET    /api/users/:id - Buscar por ID
PUT    /api/users/:id - Atualizar
DELETE /api/users/:id - Excluir
```

### Login
```
POST /api/login
Body: { username: "admin", password: "123" }
```

## 📱 Como Usar

### Área Administrativa

1. **Acessar Admin**: https://semijoias-app-di3.pages.dev/admin

2. **Upload de Logo da Empresa (200x200px)**:
   - Clique no quadrado do logo
   - Selecione a imagem
   - Veja o preview
   - Clique em "SALVAR"
   - Aguarde o alerta de confirmação

3. **Upload de Logo Rodapé (60x40px)**:
   - Clique no quadrado do logo rodapé
   - Selecione a imagem
   - Veja o preview
   - Clique em "SALVAR"
   - Aguarde o alerta de confirmação

4. **Upload de Foto na Galeria (400x600px)**:
   - Clique no quadrado de upload
   - Selecione a imagem
   - Veja o preview
   - Clique em "SALVAR NA GALERIA"
   - A foto aparecerá na lista abaixo
   - Use o botão "Excluir" para remover

5. **Salvar Explicações**:
   - Digite o texto no campo (use Enter para quebras de linha)
   - Clique em "SALVAR"
   - Aguarde o alerta de confirmação

6. **Gerenciar Consultoras**:
   - Use o campo de busca para filtrar
   - Clique nos botões de ação para editar/excluir

7. **Gerenciar Representantes**:
   - Use o campo de busca para filtrar
   - Clique nos botões de ação para editar/excluir

### Páginas Públicas

- **Home**: Página inicial com menu de navegação
- **Consultoras**: Lista pública de consultoras
- **Representantes**: Lista pública de representantes
- **Galeria**: Exibição das fotos cadastradas
- **Explicações**: Texto informativo sobre a empresa

## 🔧 Desenvolvimento Local

### Pré-requisitos
```bash
Node.js 18+
npm ou pnpm
Cloudflare account
```

### Instalação
```bash
# Clone o repositório
git clone https://github.com/beellyacertos-rgb/meuprojeto.git
cd meuprojeto

# Instale dependências
npm install

# Configure wrangler.jsonc com seu database_id
```

### Executar Localmente
```bash
# Aplicar migrations no banco local
npx wrangler d1 migrations apply semijoias-production --local

# Build do projeto
npm run build

# Iniciar servidor de desenvolvimento
npm run dev

# Ou usar PM2
pm2 start ecosystem.config.cjs
```

### Acessar Local
```
http://localhost:3000
```

## 📦 Deploy

### Deploy Automático
```bash
# Build e deploy
npm run deploy

# Ou manualmente
npm run build
npx wrangler pages deploy dist --project-name semijoias-app
```

### Aplicar Migrations em Produção
```bash
npx wrangler d1 migrations apply semijoias-production --remote
```

## 🧪 Testes

### Testar APIs Localmente
```bash
# Criar consultora
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome_completo":"Maria Silva","cidade":"Sorocaba",...}'

# Listar consultoras
curl http://localhost:3000/api/clientes

# Upload logo
curl -X POST http://localhost:3000/api/logo \
  -H "Content-Type: application/json" \
  -d '{"chave":"logo_empresa","valor":"data:image/png;base64,..."}'
```

### Testar APIs em Produção
```bash
# Substituir localhost:3000 por semijoias-app-di3.pages.dev
curl https://semijoias-app-di3.pages.dev/api/clientes
```

## ✅ Status do Projeto

### Versão Atual: v9.0
**Data**: 2026-02-23

### Funcionalidades 100% Completas:
- ✅ Sistema de uploads com preview e salvamento manual
- ✅ Cadastro de consultoras com todos os campos
- ✅ Cadastro de representantes
- ✅ Galeria de fotos funcionando
- ✅ Área administrativa acessível
- ✅ APIs RESTful completas
- ✅ Banco de dados D1 configurado
- ✅ Deploy em produção funcionando
- ✅ Rotas SPA para todas as páginas
- ✅ Mobile responsivo

### Testes Realizados:
- ✅ Home page carrega corretamente
- ✅ Admin page acessível
- ✅ Criar consultora via API
- ✅ Listar consultoras
- ✅ Salvar explicação
- ✅ Ler explicação
- ✅ Upload logo empresa
- ✅ Upload logo rodapé
- ✅ Upload foto galeria
- ✅ Listar galeria

### Próximos Passos Recomendados:
1. Adicionar sistema de autenticação real (JWT)
2. Implementar paginação nas listagens
3. Adicionar filtros avançados
4. Criar dashboard com estatísticas
5. Adicionar validação de CPF
6. Implementar compressão de imagens no backend
7. Adicionar cache de dados
8. Criar testes automatizados

## 📞 Contato

**Empresa**: Beelly Semi Joias  
**Consultoria**: Vsual Consultoria em Marketing  
**Telefone**: 18 99667-6409  
**WhatsApp**: +55 18 98118-6446

## 📝 Licença

Projeto desenvolvido para uso interno da Beelly Semi Joias.

---

**Última atualização**: 2026-02-23  
**Versão**: v9.0  
**Status**: ✅ Em Produção
