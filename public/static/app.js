// ================== SISTEMA DE TRADUÇÃO ==================
const translations = {
    'pt-BR': {
        // Tela inicial
        consultoras: 'Consultoras',
        representantes: 'Representantes',
        explicacoes: 'Explicações',
        fotos: 'Fotos',
        areaAdmin: 'Área Administrativa',
        
        // Login
        loginTitle: 'Área Administrativa',
        senhaPlaceholder: 'Digite a senha',
        entrar: 'Entrar',
        voltar: 'Voltar',
        
        // Admin Panel
        painelAdmin: 'Painel Administrativo',
        sair: 'Sair',
        configuracoes: 'Configurações',
        gerenciarConsultoras: 'Gerenciar Consultoras',
        gerenciarRepresentantes: 'Gerenciar Representantes',
        gerenciarFotos: 'Gerenciar Fotos',
        
        // Configurações
        configTitle: 'Configurações do Sistema',
        senhaAdmin: 'Senha do Administrador',
        nomeEmpresa: 'Nome da Empresa',
        whatsapp: 'WhatsApp (com DDD)',
        corPrimaria: 'Cor Primária (Fundo)',
        corSecundaria: 'Cor Secundária (Rodapé)',
        corTerciaria: 'Cor Terciária (Botões)',
        logoEmpresa: 'Logo da Empresa (200x200 pixels)',
        logoRodape: 'Logo Rodapé (60x40 pixels)',
        explicacoesText: 'Explicações',
        salvar: 'Salvar Todas as Configurações',
        
        // Consultoras
        consultorasTitle: 'Consultoras',
        nova: 'Nova',
        novo: 'Novo',
        nome: 'Nome',
        cpf: 'CPF',
        telefone: 'Telefone',
        acoes: 'Ações',
        editar: 'Editar',
        cadastro: 'Cadastro de',
        nomeCompleto: 'Nome Completo',
        endereco: 'Endereço',
        bairro: 'Bairro',
        cep: 'CEP',
        cidade: 'Cidade',
        nomePai: 'Nome do Pai',
        nomeMae: 'Nome da Mãe',
        telefoneRef: 'Telefone de Referência',
        nomeRepresentante: 'Nome do Representante',
        veiculo: 'Veículo',
        excluir: 'Excluir',
        gravar: 'Gravar',
        gravarEnviar: 'Gravar e Enviar',
        
        // Relatórios
        relatorios: 'Relatórios',
        relatorioCidade: 'Relatório por Cidade',
        relatorioNome: 'Relatório por Nome',
        
        // Mensagens
        senhaIncorreta: 'Senha incorreta!',
        erroLogin: 'Erro ao fazer login',
        configSalva: 'Configurações salvas com sucesso!',
        erroSalvar: 'Erro ao salvar configurações',
        preenchaNome: 'Por favor, preencha o nome completo',
        salvoSucesso: 'Salvo com sucesso!',
        cadastrado: 'Cadastrado! Redirecionando para WhatsApp...',
        desejaExcluir: 'Deseja realmente excluir',
        excluido: 'Excluído com sucesso!',
        selecioneArquivo: 'Por favor, selecione uma foto',
        adicionado: 'Adicionado com sucesso!',
        nenhumCadastro: 'Nenhum cadastro ainda.',
        
        // Termos
        aceitaMostruario: 'Você está de acordo que se for aprovada em nossa avaliação, irá pegar um MOSTRUÁRIO contendo de 50 PEÇAS ou MAIS, e assinará um CONTRATO explicando todas as cláusulas sobre as VENDAS, ACERTOS, PENDÊNCIAS E DEVOLUÇÃO?',
        aceitaContrato: 'Nós somos uma empresa PARCEIRA e por isto acreditamos na confiança de nossas CONSULTORAS. Mas a NÃO DEVOLUÇÃO do MOSTRUÁRIO ao TÉRMINO do CONTRATO, implicará em denúncia com boletim de ocorrência e AÇÃO JUDICIAL, por apropriação indébita artigo 168 do código penal, com previsão de até 1 ano de detenção. Você está ciente disto?',
        sim: 'Sim',
        nao: 'Não'
    },
    'es': {
        // Tela inicial
        consultoras: 'Consultoras',
        representantes: 'Representantes',
        explicacoes: 'Explicaciones',
        fotos: 'Fotos',
        areaAdmin: 'Área Administrativa',
        
        // Login
        loginTitle: 'Área Administrativa',
        senhaPlaceholder: 'Ingrese la contraseña',
        entrar: 'Entrar',
        voltar: 'Volver',
        
        // Admin Panel
        painelAdmin: 'Panel Administrativo',
        sair: 'Salir',
        configuracoes: 'Configuraciones',
        gerenciarConsultoras: 'Gestionar Consultoras',
        gerenciarRepresentantes: 'Gestionar Representantes',
        gerenciarFotos: 'Gestionar Fotos',
        
        // Configurações
        configTitle: 'Configuraciones del Sistema',
        senhaAdmin: 'Contraseña del Administrador',
        nomeEmpresa: 'Nombre de la Empresa',
        whatsapp: 'WhatsApp (con código de área)',
        corPrimaria: 'Color Primario (Fondo)',
        corSecundaria: 'Color Secundario (Pie de página)',
        corTerciaria: 'Color Terciario (Botones)',
        logoEmpresa: 'Logo de la Empresa (200x200 píxeles)',
        logoRodape: 'Logo Pie de página (60x40 píxeles)',
        explicacoesText: 'Explicaciones',
        salvar: 'Guardar Todas las Configuraciones',
        
        // Consultoras
        consultorasTitle: 'Consultoras',
        nova: 'Nueva',
        novo: 'Nuevo',
        nome: 'Nombre',
        cpf: 'CPF',
        telefone: 'Teléfono',
        acoes: 'Acciones',
        editar: 'Editar',
        cadastro: 'Registro de',
        nomeCompleto: 'Nombre Completo',
        endereco: 'Dirección',
        bairro: 'Barrio',
        cep: 'CEP',
        cidade: 'Ciudad',
        nomePai: 'Nombre del Padre',
        nomeMae: 'Nombre de la Madre',
        telefoneRef: 'Teléfono de Referencia',
        nomeRepresentante: 'Nombre del Representante',
        veiculo: 'Vehículo',
        excluir: 'Eliminar',
        gravar: 'Guardar',
        gravarEnviar: 'Guardar y Enviar',
        
        // Relatórios
        relatorios: 'Informes',
        relatorioCidade: 'Informe por Ciudad',
        relatorioNome: 'Informe por Nombre',
        
        // Mensagens
        senhaIncorreta: '¡Contraseña incorrecta!',
        erroLogin: 'Error al iniciar sesión',
        configSalva: '¡Configuraciones guardadas con éxito!',
        erroSalvar: 'Error al guardar configuraciones',
        preenchaNome: 'Por favor, complete el nombre completo',
        salvoSucesso: '¡Guardado con éxito!',
        cadastrado: '¡Registrado! Redirigiendo a WhatsApp...',
        desejaExcluir: '¿Realmente desea eliminar',
        excluido: '¡Eliminado con éxito!',
        selecioneArquivo: 'Por favor, seleccione una foto',
        adicionado: '¡Agregado con éxito!',
        nenhumCadastro: 'Ningún registro todavía.',
        
        // Termos
        aceitaMostruario: '¿Está de acuerdo en que si es aprobada en nuestra evaluación, tomará un MUESTRARIO que contiene 50 PIEZAS o MÁS, y firmará un CONTRATO explicando todas las cláusulas sobre VENTAS, AJUSTES, PENDIENTES Y DEVOLUCIÓN?',
        aceitaContrato: 'Somos una empresa ASOCIADA y por eso creemos en la confianza de nuestras CONSULTORAS. Pero la NO DEVOLUCIÓN del MUESTRARIO al TÉRMINO del CONTRATO, resultará en denuncia con informe policial y ACCIÓN JUDICIAL, por apropiación indebida artículo 168 del código penal, con previsión de hasta 1 año de detención. ¿Está consciente de esto?',
        sim: 'Sí',
        nao: 'No'
    }
};

let currentLanguage = 'pt-BR';

function t(key) {
    return translations[currentLanguage][key] || key;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Atualizar bandeiras ativas
    document.querySelectorAll('.flag-btn').forEach(btn => {
        btn.classList.remove('active-flag');
    });
    document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active-flag');
    
    // Recarregar tela atual
    const currentScreen = document.querySelector('.app-container > div:not(.hidden)');
    if (currentScreen) {
        const screenId = currentScreen.id;
        if (screenId === 'home-screen') {
            loadHomeScreen();
        } else if (screenId === 'admin-panel') {
            showAdminPanel();
        }
        // Outras telas serão atualizadas quando abertas
    }
}

// Carregar idioma salvo
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'pt-BR';
    currentLanguage = savedLang;
    setTimeout(() => {
        document.querySelector(`[data-lang="${savedLang}"]`)?.classList.add('active-flag');
    }, 100);
});

// ================== ESTADO GLOBAL ==================
let currentConfig = {};
let isAdmin = false;
let currentConsultoraId = null;
let currentRepresentanteId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    applyTheme();
    loadHomeScreen();
});

// ================== CONFIGURAÇÃO E TEMA ==================
async function loadConfig() {
    try {
        const response = await axios.get('/api/config');
        currentConfig = response.data;
        applyTheme();
        
        // Atualizar elementos da home
        if (currentConfig.nome_empresa) {
            const title = document.getElementById('home-title');
            if (title) title.textContent = currentConfig.nome_empresa;
        }
        if (currentConfig.logo_empresa) {
            const logo = document.getElementById('home-logo');
            if (logo) logo.src = currentConfig.logo_empresa;
        }
        if (currentConfig.logo_rodape) {
            const footerLogo = document.getElementById('footer-logo');
            if (footerLogo) {
                footerLogo.src = currentConfig.logo_rodape;
                footerLogo.classList.remove('hidden');
            }
        }
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

function applyTheme() {
    const primary = currentConfig.cor_primaria || '#8B4513';
    const secondary = currentConfig.cor_secundaria || '#DAA520';
    const tertiary = currentConfig.cor_terciaria || '#FFD700';
    
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-secondary', secondary);
    document.documentElement.style.setProperty('--color-tertiary', tertiary);
    
    // Aplicar cor primária no fundo
    document.body.style.backgroundColor = primary;
    
    // Aplicar cor secundária no rodapé
    const footer = document.querySelector('footer');
    if (footer) footer.style.backgroundColor = secondary;
}

// ================== ALERTAS CUSTOMIZADOS ==================
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 90%;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    const colors = {
        success: { bg: currentConfig.cor_terciaria || '#FFD700', text: '#000' },
        error: { bg: '#ef4444', text: '#fff' },
        info: { bg: currentConfig.cor_secundaria || '#DAA520', text: '#000' }
    };
    
    const color = colors[type] || colors.info;
    alertDiv.style.backgroundColor = color.bg;
    alertDiv.style.color = color.text;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

function showConfirm(message, callback) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s;
    `;
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 90%;
        width: 400px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    `;
    
    dialog.innerHTML = `
        <p style="margin-bottom: 1.5rem; font-size: 1.1rem; color: #333;">${message}</p>
        <div style="display: flex; gap: 1rem;">
            <button id="confirm-yes" style="flex: 1; padding: 0.75rem; border: none; border-radius: 8px; background: ${currentConfig.cor_terciaria || '#FFD700'}; font-weight: 600; cursor: pointer;">${t('sim')}</button>
            <button id="confirm-no" style="flex: 1; padding: 0.75rem; border: none; border-radius: 8px; background: #ccc; font-weight: 600; cursor: pointer;">${t('nao')}</button>
        </div>
    `;
    
    modal.appendChild(dialog);
    document.body.appendChild(modal);
    
    document.getElementById('confirm-yes').onclick = () => {
        modal.remove();
        callback(true);
    };
    
    document.getElementById('confirm-no').onclick = () => {
        modal.remove();
        callback(false);
    };
}

// ================== NAVEGAÇÃO ==================
function showScreen(screenId) {
    const screens = ['home-screen', 'admin-login', 'admin-panel', 'config-screen', 
                    'consultoras-list', 'consultora-form', 'representantes-list', 
                    'representante-form', 'explicacoes-screen', 'fotos-screen', 'fotos-admin'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function loadHomeScreen() {
    const homeScreen = document.getElementById('home-screen');
    if (!homeScreen) return;
    
    homeScreen.innerHTML = `
        <div class="logo-container mb-6">
            <img id="home-logo" src="${currentConfig.logo_empresa || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%238B4513\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'60\' fill=\'%23FFD700\' text-anchor=\'middle\' dy=\'.3em\'%3E💎%3C/text%3E%3C/svg%3E'}" alt="Logo">
        </div>
        <h1 id="home-title" class="text-3xl font-bold text-center mb-8 text-white">${currentConfig.nome_empresa || 'Semi Jóias'}</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button onclick="showConsultoraForm()" class="btn-mobile-home">
                <i class="fas fa-user-plus text-2xl mb-2"></i>
                <i class="fas fa-gem text-2xl mb-2 ml-2"></i>
                <div>${t('consultoras')}</div>
            </button>
            <button onclick="showRepresentanteForm()" class="btn-mobile-home">
                <i class="fas fa-id-card text-2xl mb-2"></i>
                <i class="fas fa-handshake text-2xl mb-2 ml-2"></i>
                <div>${t('representantes')}</div>
            </button>
            <button onclick="showExplicacoes()" class="btn-mobile-home">
                <i class="fas fa-info-circle text-2xl mb-2"></i>
                <i class="fas fa-book text-2xl mb-2 ml-2"></i>
                <div>${t('explicacoes')}</div>
            </button>
            <button onclick="showFotos()" class="btn-mobile-home">
                <i class="fas fa-images text-2xl mb-2"></i>
                <i class="fas fa-camera text-2xl mb-2 ml-2"></i>
                <div>${t('fotos')}</div>
            </button>
        </div>
        
        <button onclick="showAdminLogin()" class="btn-mobile-admin">
            <i class="fas fa-lock text-2xl mb-2"></i>
            <i class="fas fa-user-shield text-2xl mb-2 ml-2"></i>
            <div>${t('areaAdmin')}</div>
        </button>
    `;
    
    showScreen('home-screen');
}

function showHome() {
    loadHomeScreen();
}

function showAdminLogin() {
    const screen = document.getElementById('admin-login');
    screen.innerHTML = `
        <button onclick="showHome()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6 text-white">${t('loginTitle')}</h2>
        <div class="space-y-4">
            <input type="password" id="admin-password" placeholder="${t('senhaPlaceholder')}" class="form-input">
            <button onclick="login()" class="btn-mobile" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-sign-in-alt mr-2"></i> ${t('entrar')}
            </button>
        </div>
    `;
    showScreen('admin-login');
}

function showAdminPanel() {
    const screen = document.getElementById('admin-panel');
    screen.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">${t('painelAdmin')}</h2>
            <button onclick="logout()" style="color: #ef4444">
                <i class="fas fa-sign-out-alt mr-2"></i> ${t('sair')}
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onclick="showConfigScreen()" class="btn-mobile" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-cog mr-2"></i> ${t('configuracoes')}
            </button>
            <button onclick="showConsultorasList()" class="btn-mobile" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-users mr-2"></i> ${t('gerenciarConsultoras')}
            </button>
            <button onclick="showRepresentantesList()" class="btn-mobile" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-id-badge mr-2"></i> ${t('gerenciarRepresentantes')}
            </button>
            <button onclick="showFotosAdmin()" class="btn-mobile" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-camera mr-2"></i> ${t('gerenciarFotos')}
            </button>
        </div>
    `;
    showScreen('admin-panel');
}

function logout() {
    isAdmin = false;
    showHome();
}

// ================== LOGIN ==================
async function login() {
    const password = document.getElementById('admin-password').value;
    try {
        const response = await axios.post('/api/login', { password });
        if (response.data.success) {
            isAdmin = true;
            showAdminPanel();
        } else {
            showAlert(t('senhaIncorreta'), 'error');
        }
    } catch (error) {
        showAlert(t('erroLogin'), 'error');
    }
}

// Continua no próximo arquivo...

// ================== CONFIGURAÇÕES ==================
async function showConfigScreen() {
    const screen = document.getElementById('config-screen');
    screen.innerHTML = `
        <button onclick="showAdminPanel()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6 text-white">${t('configTitle')}</h2>
        
        <div class="space-y-6">
            <div>
                <label class="block font-semibold mb-2 text-white">${t('senhaAdmin')}</label>
                <input type="password" id="config-password" value="${currentConfig.admin_password || ''}" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('nomeEmpresa')}</label>
                <input type="text" id="config-empresa" value="${currentConfig.nome_empresa || ''}" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('whatsapp')}</label>
                <input type="text" id="config-whatsapp" value="${currentConfig.whatsapp || ''}" class="form-input" placeholder="5518996676409">
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('corPrimaria')}</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor1" value="${currentConfig.cor_primaria || '#8B4513'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_primaria || '#8B4513'}"></div>
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('corSecundaria')}</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor2" value="${currentConfig.cor_secundaria || '#DAA520'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}"></div>
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('corTerciaria')}</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor3" value="${currentConfig.cor_terciaria || '#FFD700'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}"></div>
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('logoEmpresa')}</label>
                ${currentConfig.logo_empresa ? `<img src="${currentConfig.logo_empresa}" class="mb-2" style="max-width: 200px; max-height: 200px; background: white; padding: 10px; border-radius: 8px;">` : ''}
                <input type="file" id="config-logo" accept="image/*" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('logoRodape')}</label>
                ${currentConfig.logo_rodape ? `<img src="${currentConfig.logo_rodape}" class="mb-2" style="max-width: 60px; max-height: 40px; background: white; padding: 5px; border-radius: 4px;">` : ''}
                <input type="file" id="config-logo-rodape" accept="image/*" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">${t('explicacoesText')}</label>
                <textarea id="config-explicacoes" class="form-input" rows="8">${currentConfig.explicacoes || ''}</textarea>
            </div>
            
            <button onclick="saveConfig()" class="btn-mobile" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-save mr-2"></i> ${t('salvar')}
            </button>
        </div>
    `;
    
    ['config-cor1', 'config-cor2', 'config-cor3'].forEach(id => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', (e) => {
                    const preview = e.target.nextElementSibling;
                    if (preview) preview.style.backgroundColor = e.target.value;
                });
            }
        }, 100);
    });
    
    showScreen('config-screen');
}

async function saveConfig() {
    try {
        const updates = {
            admin_password: document.getElementById('config-password').value,
            nome_empresa: document.getElementById('config-empresa').value,
            whatsapp: document.getElementById('config-whatsapp').value,
            cor_primaria: document.getElementById('config-cor1').value,
            cor_secundaria: document.getElementById('config-cor2').value,
            cor_terciaria: document.getElementById('config-cor3').value,
            explicacoes: document.getElementById('config-explicacoes').value
        };
        
        const logoFile = document.getElementById('config-logo').files[0];
        if (logoFile) {
            updates.logo_empresa = await fileToBase64(logoFile);
        }
        
        const logoRodapeFile = document.getElementById('config-logo-rodape').files[0];
        if (logoRodapeFile) {
            updates.logo_rodape = await fileToBase64(logoRodapeFile);
        }
        
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null && value !== '') {
                await axios.put(`/api/config/${key}`, { value });
            }
        }
        
        showAlert(t('configSalva'), 'success');
        await loadConfig();
        showAdminPanel();
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        showAlert(t('erroSalvar'), 'error');
    }
}

// ================== CONSULTORAS ==================
async function showConsultorasList() {
    try {
        const response = await axios.get('/api/consultoras');
        const consultoras = response.data;
        
        let html = `
            <button onclick="showAdminPanel()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-white">${t('consultorasTitle')}</h2>
                <button onclick="showConsultoraForm(null)" class="px-4 py-2 rounded text-white" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                    <i class="fas fa-plus mr-2"></i> ${t('nova')}
                </button>
            </div>
            
            <div class="mb-4 space-y-2">
                <h3 class="text-lg font-semibold text-white">${t('relatorios')}</h3>
                <div class="flex gap-2 flex-wrap">
                    <button onclick="gerarRelatorioPDFConsultoras('cidade')" class="px-4 py-2 rounded text-white" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
                        <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioCidade')}
                    </button>
                    <button onclick="gerarRelatorioPDFConsultoras('nome')" class="px-4 py-2 rounded text-white" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
                        <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioNome')}
                    </button>
                </div>
            </div>
            
            <div class="table-container">
                <table class="w-full bg-white shadow rounded">
                    <thead style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
                        <tr>
                            <th class="p-2 text-left">${t('nome')}</th>
                            <th class="p-2 text-left">${t('cpf')}</th>
                            <th class="p-2 text-left">${t('telefone')}</th>
                            <th class="p-2 text-center">${t('acoes')}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        consultoras.forEach(c => {
            html += `
                <tr class="border-t">
                    <td class="p-2">${c.nome_completo}</td>
                    <td class="p-2">${c.cpf || ''}</td>
                    <td class="p-2">${c.telefone || ''}</td>
                    <td class="p-2 text-center">
                        <button onclick="showConsultoraForm(${c.id})" style="color: ${currentConfig.cor_terciaria || '#FFD700'}" class="mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteConsultora(${c.id})" class="text-red-600">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        document.getElementById('consultoras-list').innerHTML = html;
        showScreen('consultoras-list');
    } catch (error) {
        console.error('Erro ao carregar consultoras:', error);
    }
}

async function showConsultoraForm(id = null) {
    currentConsultoraId = id;
    let consultora = {
        nome_completo: '', endereco: '', bairro: '', cep: '', cidade: '',
        cpf: '', telefone: '', nome_pai: '', nome_mae: '', telefone_referencia: '',
        nome_representante: '', aceita_mostruario: 'nao', aceita_contrato: 'nao'
    };
    
    if (id && isAdmin) {
        const response = await axios.get(`/api/consultoras/${id}`);
        consultora = response.data;
    }
    
    const isEdit = id !== null;
    const backFunction = isAdmin ? "showConsultorasList()" : "showHome()";
    
    const html = `
        <button onclick="${backFunction}" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6 text-white">${isEdit ? t('editar') : t('cadastro')} ${t('consultorasTitle')}</h2>
        
        <div class="space-y-4">
            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomeCompleto')} *</label>
                <input type="text" id="consultora-nome" value="${consultora.nome_completo}" class="form-input" required>
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('endereco')}</label>
                <input type="text" id="consultora-endereco" value="${consultora.endereco || ''}" class="form-input">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('bairro')}</label>
                    <input type="text" id="consultora-bairro" value="${consultora.bairro || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('cep')}</label>
                    <input type="text" id="consultora-cep" value="${consultora.cep || ''}" class="form-input">
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('cidade')}</label>
                <input type="text" id="consultora-cidade" value="${consultora.cidade || ''}" class="form-input">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('cpf')}</label>
                    <input type="text" id="consultora-cpf" value="${consultora.cpf || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('telefone')}</label>
                    <input type="text" id="consultora-telefone" value="${consultora.telefone || ''}" class="form-input">
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomePai')}</label>
                <input type="text" id="consultora-pai" value="${consultora.nome_pai || ''}" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomeMae')}</label>
                <input type="text" id="consultora-mae" value="${consultora.nome_mae || ''}" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('telefoneRef')}</label>
                <input type="text" id="consultora-telefone-ref" value="${consultora.telefone_referencia || ''}" class="form-input">
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomeRepresentante')}</label>
                <input type="text" id="consultora-representante" value="${consultora.nome_representante || ''}" class="form-input">
            </div>
            
            <div class="border-2 border-white rounded-lg p-4 bg-white bg-opacity-10">
                <p class="mb-2 text-sm text-white">${t('aceitaMostruario')}</p>
                <div class="flex gap-4">
                    <label class="flex items-center text-white">
                        <input type="radio" name="mostruario" value="sim" ${consultora.aceita_mostruario === 'sim' ? 'checked' : ''} class="mr-2">
                        ${t('sim')}
                    </label>
                    <label class="flex items-center text-white">
                        <input type="radio" name="mostruario" value="nao" ${consultora.aceita_mostruario === 'nao' ? 'checked' : ''} class="mr-2">
                        ${t('nao')}
                    </label>
                </div>
            </div>
            
            <div class="border-2 border-white rounded-lg p-4 bg-white bg-opacity-10">
                <p class="mb-2 text-sm text-white">${t('aceitaContrato')}</p>
                <div class="flex gap-4">
                    <label class="flex items-center text-white">
                        <input type="radio" name="contrato" value="sim" ${consultora.aceita_contrato === 'sim' ? 'checked' : ''} class="mr-2">
                        ${t('sim')}
                    </label>
                    <label class="flex items-center text-white">
                        <input type="radio" name="contrato" value="nao" ${consultora.aceita_contrato === 'nao' ? 'checked' : ''} class="mr-2">
                        ${t('nao')}
                    </label>
                </div>
            </div>
            
            <div class="flex gap-2">
                ${isEdit && isAdmin ? `
                    <button onclick="deleteConsultora(${id})" class="flex-1 bg-red-600 text-white py-3 rounded-lg">
                        <i class="fas fa-trash mr-2"></i> ${t('excluir')}
                    </button>
                ` : ''}
                <button onclick="saveConsultora()" class="flex-1 text-white py-3 rounded-lg" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                    <i class="fas fa-save mr-2"></i> ${t('gravar')}
                </button>
                ${!isEdit ? `
                    <button onclick="saveAndSendConsultora()" class="flex-1 text-white py-3 rounded-lg" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
                        <i class="fab fa-whatsapp mr-2"></i> ${t('gravarEnviar')}
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('consultora-form').innerHTML = html;
    showScreen('consultora-form');
}

async function saveConsultora() {
    const data = {
        nome_completo: document.getElementById('consultora-nome').value,
        endereco: document.getElementById('consultora-endereco').value,
        bairro: document.getElementById('consultora-bairro').value,
        cep: document.getElementById('consultora-cep').value,
        cidade: document.getElementById('consultora-cidade').value,
        cpf: document.getElementById('consultora-cpf').value,
        telefone: document.getElementById('consultora-telefone').value,
        nome_pai: document.getElementById('consultora-pai').value,
        nome_mae: document.getElementById('consultora-mae').value,
        telefone_referencia: document.getElementById('consultora-telefone-ref').value,
        nome_representante: document.getElementById('consultora-representante').value,
        aceita_mostruario: document.querySelector('input[name="mostruario"]:checked')?.value || 'nao',
        aceita_contrato: document.querySelector('input[name="contrato"]:checked')?.value || 'nao'
    };
    
    if (!data.nome_completo) {
        showAlert(t('preenchaNome'), 'error');
        return;
    }
    
    try {
        if (currentConsultoraId) {
            await axios.put(`/api/consultoras/${currentConsultoraId}`, data);
        } else {
            await axios.post('/api/consultoras', data);
        }
        showAlert(t('salvoSucesso'), 'success');
        if (isAdmin) {
            showConsultorasList();
        } else {
            showHome();
        }
    } catch (error) {
        console.error('Erro ao salvar consultora:', error);
        showAlert(t('erroSalvar'), 'error');
    }
}

async function saveAndSendConsultora() {
    const data = {
        nome_completo: document.getElementById('consultora-nome').value,
        endereco: document.getElementById('consultora-endereco').value,
        bairro: document.getElementById('consultora-bairro').value,
        cep: document.getElementById('consultora-cep').value,
        cidade: document.getElementById('consultora-cidade').value,
        cpf: document.getElementById('consultora-cpf').value,
        telefone: document.getElementById('consultora-telefone').value,
        nome_pai: document.getElementById('consultora-pai').value,
        nome_mae: document.getElementById('consultora-mae').value,
        telefone_referencia: document.getElementById('consultora-telefone-ref').value,
        nome_representante: document.getElementById('consultora-representante').value,
        aceita_mostruario: document.querySelector('input[name="mostruario"]:checked')?.value || 'nao',
        aceita_contrato: document.querySelector('input[name="contrato"]:checked')?.value || 'nao'
    };
    
    if (!data.nome_completo) {
        showAlert(t('preenchaNome'), 'error');
        return;
    }
    
    try {
        await axios.post('/api/consultoras', data);
        
        const message = `
🌟 *NOVA CONSULTORA* 🌟

👤 *Nome:* ${data.nome_completo}
📍 *Endereço:* ${data.endereco}
🏘️ *Bairro:* ${data.bairro}
📮 *CEP:* ${data.cep}
🏙️ *Cidade:* ${data.cidade}
📝 *CPF:* ${data.cpf}
📱 *Telefone:* ${data.telefone}

👨 *Pai:* ${data.nome_pai}
👩 *Mãe:* ${data.nome_mae}
☎️ *Tel. Referência:* ${data.telefone_referencia}

🤝 *Representante:* ${data.nome_representante}

📦 *Aceita Mostruário:* ${data.aceita_mostruario.toUpperCase()}
📋 *Aceita Contrato:* ${data.aceita_contrato.toUpperCase()}
        `.trim();
        
        const whatsapp = currentConfig.whatsapp || '5518996676409';
        const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        
        showAlert(t('cadastrado'), 'success');
        showHome();
    } catch (error) {
        console.error('Erro:', error);
        showAlert(t('erroSalvar'), 'error');
    }
}

async function deleteConsultora(id) {
    showConfirm(`${t('desejaExcluir')} ${t('consultorasTitle').toLowerCase()}?`, async (confirmed) => {
        if (!confirmed) return;
        
        try {
            await axios.delete(`/api/consultoras/${id}`);
            showAlert(t('excluido'), 'success');
            showConsultorasList();
        } catch (error) {
            console.error('Erro ao excluir consultora:', error);
            showAlert(t('erroSalvar'), 'error');
        }
    });
}

// Continua...
