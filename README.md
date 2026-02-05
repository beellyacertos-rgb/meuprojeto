# 💎 App Mobile para Semi Jóias - ATUALIZADO

Aplicativo mobile completo e multilíngue (PT-BR/ES) para gestão de consultoras, representantes e galeria de produtos de semi jóias.

## 🌐 URLs

- **Desenvolvimento**: https://3000-i1y8jbap374a9vh2g8qf8-b9b802c4.sandbox.novita.ai
- **API Base**: https://3000-i1y8jbap374a9vh2g8qf8-b9b802c4.sandbox.novita.ai/api

## ✨ NOVAS Funcionalidades Implementadas

### 🌍 Sistema de Tradução
- **Português (Brasil)**: Idioma padrão com bandeira 🇧🇷
- **Espanhol**: Tradução completa com bandeira 🇪🇸
- **Troca instantânea**: Alterna entre idiomas sem recarregar a página
- **100% traduzido**: Todos os textos, botões, mensagens e formulários

### 🎨 Sistema de Cores Personalizado
1. **Cor Primária**: Fundo do aplicativo
2. **Cor Secundária**: Rodapé
3. **Cor Terciária**: Botões
4. **Cor Quaternária**: Texto dos botões
5. **Aplicação global**: Todas as cores são aplicadas em todo o app (front e admin)

### 📊 Relatórios em PDF
**Consultoras:**
- Relatório por Cidade
- Relatório por Nome

**Representantes:**
- Relatório por Cidade
- Relatório por Nome

### 🏢 Quem Somos
- Campo de texto no admin para história da empresa
- Botão "Quem Somos" na tela inicial
- Exibição formatada com quebras de linha

### 🎨 Interface Redesenhada
- **2 ícones por botão**: Layout mais bonito e organizado
- **Grid 2 colunas**: Desktop e mobile responsivo
- **Botão Voltar**: Substituído setas por botões estilizados
- **Modal personalizado**: Confirmação ao sair com cores do app
- **Bandeiras repositionadas**: Canto superior direito para fácil acesso

### ✅ Simplificações
- **Cadastro de Consultoras**: Apenas botão "Gravar e Enviar WhatsApp"
- **Cadastro de Representantes**: Apenas botão "Gravar e Enviar WhatsApp"
- **Área Admin**: Nome da empresa removido, logo centralizado

## 📱 Área Pública (Frontend)

1. **Tela Inicial** com 6 botões:
   - Consultoras (2 ícones: user-plus + gem)
   - Representante (2 ícones: id-card + briefcase)
   - Explicações (2 ícones: info-circle + book)
   - Fotos (2 ícones: images + camera)
   - Quem Somos (2 ícones: building + users)
   - Área Administrativa (2 ícones: lock + cog)

2. **Cadastro de Consultoras**:
   - Formulário completo
   - Aceite de mostruário (Sim/Não)
   - Aceite de contrato (Sim/Não)
   - **Botão único**: Gravar e Enviar WhatsApp

3. **Cadastro de Representantes**:
   - Formulário completo
   - **Botão único**: Gravar e Enviar WhatsApp

4. **Explicações**: Exibição de texto configurado

5. **Galeria de Fotos**: Grid responsivo 400x600 pixels

6. **Quem Somos**: História da empresa

7. **Rodapé Fixo**:
   - Logo customizável (60x40 pixels)
   - Texto: "Vsual Consultoria em Marketing"
   - Contato: "18 99667-6409"

## 🔐 Área Administrativa

**Senha padrão: 123**

1. **Configurações do Sistema**:
   - Alterar senha
   - WhatsApp
   - **4 cores**: Primária, Secundária, Terciária, Quaternária
   - Logo da empresa (200x200)
   - Logo do rodapé (60x40)
   - Explicações
   - **Quem Somos** (novo campo)

2. **Gerenciar Consultoras**:
   - Listagem em tabela
   - CRUD completo: Novo, Alterar, Gravar, Excluir
   - **Relatórios PDF**: Por cidade e por nome

3. **Gerenciar Representantes**:
   - Listagem em tabela
   - CRUD completo
   - **Relatórios PDF**: Por cidade e por nome

4. **Gerenciar Fotos**:
   - Upload de fotos 400x600 pixels
   - Grid de visualização
   - Botões: Novo, Gravar, Excluir

## 📊 Estrutura do Banco de Dados

### Tabela: config
- admin_password
- cor_primaria (fundo do app)
- cor_secundaria (rodapé)
- cor_terciaria (botões)
- **cor_quaternaria** (texto dos botões) - NOVO
- logo_empresa (200x200)
- logo_rodape (60x40)
- explicacoes
- **quem_somos** - NOVO
- whatsapp

### Tabela: consultoras
- Todos os campos pessoais
- aceita_mostruario (sim/nao)
- aceita_contrato (sim/nao)
- created_at, updated_at

### Tabela: representantes
- Todos os campos pessoais
- veiculo
- created_at, updated_at

### Tabela: fotos
- imagem_base64 (400x600)
- created_at

## 🎨 Personalização Avançada

### Cores Aplicadas Globalmente
- **Cor Primária**: `background-color` do body
- **Cor Secundária**: `background-color` do footer
- **Cor Terciária**: `background-color` de todos os botões
- **Cor Quaternária**: `color` do texto dos botões

### Modal de Confirmação
- Bordas com cor terciária
- Botões com cores do tema
- Animação suave de entrada

## 📱 Integração WhatsApp

**Formato de mensagem multilíngue:**
- Cabeçalho em maiúsculas
- Emojis temáticos
- Todos os dados formatados
- Traduzido automaticamente para o idioma selecionado

## 🌍 Sistema de Idiomas

**Português (Brasil) 🇧🇷:**
- Idioma padrão do sistema
- Salvo em localStorage

**Espanhol 🇪🇸:**
- Tradução completa e profissional
- Todos os textos, botões e mensagens
- Mantém estado entre sessões

**Funcionalidades:**
- Bandeiras clicáveis no canto superior direito
- Troca instantânea sem reload
- Persistência com localStorage
- Aplicado em todas as telas

## 📊 Relatórios PDF

**Funcionalidades:**
- Ordenação automática (por cidade ou nome)
- Impressão direta do navegador
- Cabeçalho com cores personalizadas
- Tabela formatada com dados completos
- Disponível para Consultoras e Representantes

## 🚀 Como Usar

### Para Consultoras/Representantes:
1. Escolha o idioma (🇧🇷 ou 🇪🇸)
2. Clique em "Consultoras" ou "Representante"
3. Preencha o formulário
4. Clique em "Gravar e Enviar WhatsApp"

### Para o Administrador:
1. Escolha o idioma
2. Acesse "Área Administrativa"
3. Digite a senha (padrão: **123**)
4. Configure:
   - **4 cores personalizadas**
   - Logo e logo do rodapé
   - Explicações
   - **Quem Somos** (novo)
   - WhatsApp
5. Gerencie cadastros
6. Gere relatórios PDF

## 🛠️ Tecnologias Utilizadas

- **Backend**: Hono + TypeScript
- **Banco de Dados**: Cloudflare D1 (SQLite)
- **Frontend**: HTML5 + CSS3 + JavaScript ES6+
- **Estilização**: TailwindCSS + Font Awesome
- **Internacionalização**: Sistema de tradução customizado
- **Relatórios**: window.print() com formatação HTML
- **Deploy**: Cloudflare Pages/Workers
- **Desenvolvimento**: PM2 + Wrangler

## 📝 Comandos Úteis

```bash
# Desenvolvimento local
npm run build && pm2 restart semijoias-app

# Adicionar nova config ao banco
npx wrangler d1 execute semijoias-production --local --command="INSERT OR IGNORE INTO config (key, value) VALUES ('nova_config', 'valor');"

# Ver logs
pm2 logs semijoias-app --nostream

# Limpar porta e reiniciar
fuser -k 3000/tcp && pm2 restart semijoias-app
```

## 📂 Estrutura de Arquivos

```
webapp/
├── src/
│   └── index.tsx              # Backend Hono com todas as rotas API
├── public/
│   └── static/
│       ├── app.js             # Frontend JavaScript parte 1 (traduções, config, admin)
│       ├── app-part2.js       # Frontend JavaScript parte 2 (CRUD, fotos, relatórios)
│       └── style.css          # CSS customizado responsivo
├── migrations/
│   ├── 0001_initial_schema.sql       # Schema inicial do banco
│   └── 0002_add_new_configs.sql      # Novas configurações (quaternária, quem somos)
├── ecosystem.config.cjs       # Configuração PM2
├── wrangler.jsonc             # Configuração Cloudflare
├── package.json
└── README.md
```

## ✅ Checklist de Funcionalidades

### Interface ✅
- [x] 2 ícones em cada botão (frontal e admin)
- [x] Bandeiras 🇧🇷 e 🇪🇸 com ícones corretos
- [x] Tradução completa PT-BR/ES
- [x] Botão "Voltar" estilizado
- [x] Modal de confirmação ao sair
- [x] Remover botão "Gravar" (apenas WhatsApp)

### Cores ✅
- [x] Cor Primária (fundo do app)
- [x] Cor Secundária (rodapé)
- [x] Cor Terciária (botões)
- [x] Cor Quaternária (texto dos botões)
- [x] Aplicação global em todo o app

### Admin ✅
- [x] Remover nome da empresa
- [x] Reposicionar bandeiras
- [x] Campo "Quem Somos"
- [x] Botão "Quem Somos" na frente

### Relatórios ✅
- [x] PDF Consultoras por cidade
- [x] PDF Consultoras por nome
- [x] PDF Representantes por cidade
- [x] PDF Representantes por nome

## 📊 Status do Projeto

**Status**: ✅ ATIVO E ATUALIZADO

**Última Atualização**: 05 de Fevereiro de 2026

**Todas as 13 alterações solicitadas foram implementadas e testadas com sucesso!**

---

Desenvolvido com ❤️ por Vsual Consultoria em Marketing
