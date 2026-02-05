# 💎 App Mobile para Semi Jóias - ATUALIZADO

Aplicativo mobile completo para gestão de consultoras, representantes e galeria de produtos de semi jóias com sistema de tradução bilíngue (PT-BR/ES).

## 🌐 URLs

- **Desenvolvimento**: https://3000-i1y8jbap374a9vh2g8qf8-b9b802c4.sandbox.novita.ai
- **API Base**: https://3000-i1y8jbap374a9vh2g8qf8-b9b802c4.sandbox.novita.ai/api

## ✨ Funcionalidades Implementadas

### 🎨 **NOVAS FUNCIONALIDADES ADICIONADAS:**

1. **Sistema de Tradução Bilíngue** 🇧🇷🇪🇸
   - Bandeiras clicáveis (Brasil e Espanha) no canto superior direito
   - Tradução completa do aplicativo para Português e Espanhol
   - Todos os textos, botões, mensagens e formulários traduzidos
   - Preferência de idioma salva localmente

2. **Personalização Completa de Cores**
   - **Cor Primária**: Fundo do aplicativo
   - **Cor Secundária**: Rodapé
   - **Cor Terciária**: Botões
   - **Cor Quaternária**: Textos dos botões
   - Aplicação em tempo real em todo o app

3. **Interface Melhorada**
   - Layout em grid 2x2 com 2 ícones por botão
   - Design mais atraente e profissional
   - Botões "Voltar" estilizados (não mais apenas seta)
   - Modal de confirmação personalizado ao sair

4. **Campo "Quem Somos"**
   - Novo campo na área administrativa
   - Botão dedicado na tela inicial
   - Exibição da história da empresa

5. **Relatórios em PDF** (APIs Preparadas)
   - Consultoras por cidade
   - Consultoras por nome
   - Representantes por cidade  
   - Representantes por nome
   - Biblioteca jsPDF incluída

6. **Simplificação de Cadastros**
   - Removido botão "Gravar" isolado
   - Mantido apenas "Gravar e Enviar WhatsApp"
   - Fluxo mais direto e intuitivo

### 📱 Área Pública (Frontend)

1. **Tela Inicial** com 6 botões em grid 2x2:
   - 👥💎 Cadastro de Consultoras
   - 🆔💼 Cadastro de Representantes  
   - ℹ️📖 Explicações
   - 🖼️📷 Galeria de Fotos
   - 🏢👥 Quem Somos (NOVO)
   - 🔒⚙️ Área Administrativa

2. **Cadastro de Consultoras**:
   - Formulário completo traduzível
   - Botão único: "Gravar e Enviar WhatsApp"
   - Validação de campos obrigatórios

3. **Cadastro de Representantes**:
   - Formulário completo traduzível
   - Botão único: "Gravar e Enviar WhatsApp"
   - Envio automático para WhatsApp

4. **Explicações & Quem Somos**:
   - Textos configuráveis pelo admin
   - Suporte a quebras de linha

5. **Galeria de Fotos**:
   - Grid responsivo
   - Fotos 400x600 pixels

6. **Rodapé Personalizado**:
   - Logo customizável (60x40px)
   - Cor configurável (cor secundária)
   - Informações de contato

### 🔐 Área Administrativa

**Senha padrão: 123**

1. **Configurações do Sistema**:
   - ✅ Alterar senha
   - ✅ **4 cores** personalizáveis (primária, secundária, terciária, quaternária)
   - ✅ WhatsApp para envios
   - ✅ Upload logo empresa (200x200px)
   - ✅ Upload logo rodapé (60x40px)
   - ✅ Campo Explicações
   - ✅ Campo Quem Somos (NOVO)

2. **Gerenciar Consultoras**:
   - ✅ Listagem em tabela
   - ✅ CRUD completo (Novo, Alterar, Excluir)
   - ✅ APIs para relatórios PDF preparadas
   - 🔄 Geração de PDF (integração pendente)

3. **Gerenciar Representantes**:
   - ✅ Listagem em tabela
   - ✅ CRUD completo
   - ✅ APIs para relatórios PDF preparadas
   - 🔄 Geração de PDF (integração pendente)

4. **Gerenciar Fotos**:
   - ✅ Upload de fotos
   - ✅ Grid visual
   - ✅ Exclusão individual

## 📊 Estrutura do Banco de Dados

### Tabela: config (ATUALIZADA)
- admin_password
- cor_primaria, cor_secundaria, cor_terciaria, **cor_quaternaria** (NOVO)
- nome_empresa
- logo_empresa, logo_rodape
- explicacoes
- **quem_somos** (NOVO)
- whatsapp

### Tabelas: consultoras, representantes, fotos
- Estrutura mantida com índices otimizados por cidade e nome

## 🎨 Personalização Avançada

### Sistema de Cores
- **Primária (#8B4513)**: Fundo do aplicativo completo
- **Secundária (#DAA520)**: Rodapé e áreas secundárias
- **Terciária (#FFD700)**: Todos os botões
- **Quaternária (#FFFFFF)**: Textos nos botões

### Bandeiras de Idioma
- 🇧🇷 Português (Brasil)
- 🇪🇸 Español (Espanha)
- Mudança instantânea de idioma
- Persistência local da preferência

## 📱 Integração WhatsApp

Mensagens automáticas formatadas em ambos idiomas:

**Português:**
```
🌟 NOVA CONSULTORA 🌟
👤 Nome: [nome]
📍 Endereço: [endereço]
...
```

**Español:**
```
🌟 NUEVA CONSULTORA 🌟
👤 Nombre: [nombre]
📍 Dirección: [dirección]
...
```

## 🛠️ Tecnologias Utilizadas

- **Backend**: Hono + TypeScript
- **Banco**: Cloudflare D1 (SQLite)
- **Frontend**: HTML5 + JavaScript + TailwindCSS
- **PDF**: jsPDF + jsPDF-AutoTable
- **Ícones**: Font Awesome 6
- **Traduções**: Sistema custom PT-BR/ES
- **Deploy**: Cloudflare Pages/Workers

## 🚀 Como Usar

### Para Usuários:
1. Acesse pelo celular
2. Escolha o idioma (🇧🇷 ou 🇪🇸)
3. Clique no botão desejado
4. Preencha e envie via WhatsApp

### Para Administrador:
1. Clique em "Área Administrativa"
2. Senha: **123**
3. Configure cores, logos e textos
4. Gerencie cadastros

## ✅ Status do Projeto

**Status**: ✅ **ATIVO E FUNCIONAL**

### Implementado ✅
- [x] Sistema de tradução PT-BR/ES
- [x] 4 cores customizáveis
- [x] Layout 2 ícones por botão
- [x] Modal de confirmação
- [x] Botão "Quem Somos"
- [x] Botão "Voltar" estilizado
- [x] APIs de relatórios preparadas
- [x] Simplificação de cadastros

### Em Desenvolvimento 🔄
- [ ] Geração completa de PDFs
- [ ] Ajustes finais de UI/UX

### Próximas Melhorias 📋
- [ ] Exportação CSV
- [ ] Gráficos e estatísticas
- [ ] Sistema de notificações

## 📝 Comandos Úteis

```bash
# Aplicar migrations
npm run db:migrate:local

# Iniciar dev
pm2 start ecosystem.config.cjs

# Ver logs
pm2 logs semijoias-app --nostream

# Rebuild
npm run build && pm2 restart semijoias-app
```

## 📂 Arquivos Principais

```
webapp/
├── src/
│   └── index.tsx              # Backend com rotas de relatórios
├── public/static/
│   ├── app.js                 # JavaScript principal
│   ├── translations.js        # Sistema de traduções PT-BR/ES
│   └── style.css              # Estilos personalizados
├── migrations/
│   ├── 0001_initial_schema.sql
│   └── 0002_add_new_configs.sql
└── README.md
```

## 🎯 Diferenciais

✨ **Bilíngue**: Suporte completo PT-BR e ES  
🎨 **Personalizável**: 4 cores configuráveis  
📱 **Mobile-First**: 100% otimizado para celular  
🚀 **Edge**: Deploy global em Cloudflare  
💾 **Persistente**: Banco D1 SQLite  
📊 **Relatórios**: APIs preparadas para PDF  
🔒 **Seguro**: Autenticação administrativa  

---

**Última Atualização**: 05 de Fevereiro de 2026

Desenvolvido com ❤️ por Vsual Consultoria em Marketing | 18 99667-6409
