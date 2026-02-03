# 💎 App Mobile para Semi Jóias

Aplicativo mobile completo para gestão de consultoras, representantes e galeria de produtos de semi jóias.

## 🌐 URLs

- **Desenvolvimento**: https://3000-i1y8jbap374a9vh2g8qf8-b9b802c4.sandbox.novita.ai
- **API Base**: https://3000-i1y8jbap374a9vh2g8qf8-b9b802c4.sandbox.novita.ai/api

## ✨ Funcionalidades Implementadas

### 📱 Área Pública (Frontend)
1. **Tela Inicial** com 5 botões principais:
   - Cadastro de Consultoras
   - Cadastro de Representantes
   - Explicações
   - Galeria de Fotos
   - Área Administrativa

2. **Cadastro de Consultoras**:
   - Formulário completo com todos os campos solicitados
   - Aceite de mostruário (Sim/Não)
   - Aceite de contrato com termo de responsabilidade (Sim/Não)
   - Botões: Gravar e Enviar via WhatsApp

3. **Cadastro de Representantes**:
   - Formulário com dados pessoais e veículo
   - Botões: Gravar e Enviar via WhatsApp

4. **Explicações**:
   - Exibição do texto cadastrado pelo administrador

5. **Galeria de Fotos**:
   - Grid responsivo de fotos 400x600 pixels

6. **Rodapé Fixo**:
   - Logo customizável (60x40 pixels)
   - Texto: "Vsual Consultoria em Marketing"
   - Contato: "18 99667-6409"

### 🔐 Área Administrativa

**Senha padrão: 123**

1. **Configurações do Sistema**:
   - Alterar senha do administrador
   - Nome da empresa
   - WhatsApp para envio de cadastros
   - 3 cores customizáveis (primária, secundária, terciária)
   - Upload de logo da empresa (200x200 pixels)
   - Upload de logo do rodapé (60x40 pixels)
   - Campo de explicações com suporte a enter/quebras de linha

2. **Gerenciar Consultoras**:
   - Listagem em tabela
   - Botões: Novo, Alterar, Gravar, Excluir
   - Visualização de todos os dados cadastrados

3. **Gerenciar Representantes**:
   - Listagem em tabela
   - Botões: Novo, Alterar, Gravar, Excluir
   - Visualização de todos os dados cadastrados

4. **Gerenciar Fotos**:
   - Upload de fotos 400x600 pixels
   - Grid de visualização
   - Botões: Novo, Gravar, Excluir

## 📊 Estrutura do Banco de Dados

### Tabela: config
Armazena configurações do sistema:
- admin_password (senha de acesso)
- cor_primaria, cor_secundaria, cor_terciaria (cores do tema)
- nome_empresa (nome exibido no app)
- logo_empresa (imagem 200x200 em base64)
- logo_rodape (imagem 60x40 em base64)
- explicacoes (texto explicativo)
- whatsapp (número para envio de cadastros)

### Tabela: consultoras
- id, nome_completo, endereco, bairro, cep, cidade, cpf, telefone
- nome_pai, nome_mae, telefone_referencia, nome_representante
- aceita_mostruario (sim/nao)
- aceita_contrato (sim/nao)
- created_at, updated_at

### Tabela: representantes
- id, nome_completo, endereco, bairro, cep, cidade, cpf, telefone, veiculo
- created_at, updated_at

### Tabela: fotos
- id, imagem_base64 (imagem 400x600 em base64)
- created_at

## 🎨 Tema e Personalização

- **Cores Customizáveis**: 3 cores definidas pelo administrador
- **Logo Empresa**: 200x200 pixels, exibida na tela inicial
- **Logo Rodapé**: 60x40 pixels, exibida no rodapé de todas as páginas
- **Design Responsivo**: 100% otimizado para dispositivos móveis

## 📱 Integração WhatsApp

Ao cadastrar uma consultora ou representante, o botão "Gravar e Enviar" envia automaticamente um resumo formatado para o WhatsApp configurado no painel administrativo.

**Formato da mensagem (Consultora)**:
```
🌟 NOVA CONSULTORA 🌟
👤 Nome: [nome]
📍 Endereço: [endereço completo]
📝 CPF: [cpf]
📱 Telefone: [telefone]
👨 Pai: [nome_pai]
👩 Mãe: [nome_mae]
☎️ Tel. Referência: [telefone_referencia]
🤝 Representante: [nome_representante]
📦 Aceita Mostruário: SIM/NÃO
📋 Aceita Contrato: SIM/NÃO
```

## 🚀 Como Usar

### Para Consultoras/Representantes:
1. Acesse o app pelo navegador do celular
2. Clique em "Consultoras" ou "Representante"
3. Preencha o formulário
4. Clique em "Gravar e Enviar" para enviar via WhatsApp

### Para o Administrador:
1. Acesse o app
2. Clique em "Área Administrativa"
3. Digite a senha (padrão: 123)
4. Personalize as configurações
5. Gerencie cadastros e fotos

## 🛠️ Tecnologias Utilizadas

- **Backend**: Hono + TypeScript
- **Banco de Dados**: Cloudflare D1 (SQLite)
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Estilização**: TailwindCSS + Font Awesome
- **Deploy**: Cloudflare Pages/Workers
- **Desenvolvimento**: PM2 + Wrangler

## 📝 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev:sandbox

# Build do projeto
npm run build

# Aplicar migrations
npm run db:migrate:local

# Limpar porta
npm run clean-port

# Ver logs
pm2 logs semijoias-app --nostream

# Reiniciar serviço
fuser -k 3000/tcp 2>/dev/null || true && pm2 start ecosystem.config.cjs
```

## 📂 Estrutura de Arquivos

```
webapp/
├── src/
│   └── index.tsx           # Backend Hono com todas as rotas API
├── public/
│   └── static/
│       └── app.js          # Frontend JavaScript completo
├── migrations/
│   └── 0001_initial_schema.sql  # Schema do banco de dados
├── ecosystem.config.cjs    # Configuração PM2
├── wrangler.jsonc          # Configuração Cloudflare
├── package.json
└── README.md
```

## ✅ Status do Projeto

**Status**: ✅ ATIVO

**Última Atualização**: 03 de Fevereiro de 2026

**Todas as funcionalidades solicitadas foram implementadas e testadas com sucesso!**

---

Desenvolvido com ❤️ por Vsual Consultoria em Marketing
