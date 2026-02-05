// Estado global
let currentConfig = {};
let isAdmin = false;
let currentConsultoraId = null;
let currentRepresentanteId = null;
let currentLang = 'pt'; // pt ou es

// Traduções
const translations = {
    pt: {
        // Tela Inicial
        consultoras: 'Consultoras',
        representante: 'Representante',
        explicacoes: 'Explicações',
        fotos: 'Fotos',
        quemSomos: 'Quem Somos',
        areaAdministrativa: 'Área Administrativa',
        
        // Admin
        painelAdministrativo: 'Painel Administrativo',
        sair: 'Sair',
        configuracoes: 'Configurações',
        gerenciarConsultoras: 'Gerenciar Consultoras',
        gerenciarRepresentantes: 'Gerenciar Representantes',
        gerenciarFotos: 'Gerenciar Fotos',
        
        // Configurações
        configuracoesDoSistema: 'Configurações do Sistema',
        senhaDoAdministrador: 'Senha do Administrador',
        whatsapp: 'WhatsApp (com DDD, ex: 5518996676409)',
        corPrimaria: 'Cor Primária (Fundo do App)',
        corSecundaria: 'Cor Secundária (Rodapé)',
        corTerciaria: 'Cor Terciária (Botões)',
        corQuaternaria: 'Cor Quaternária (Texto dos Botões)',
        logoEmpresa: 'Logo da Empresa (200x200 pixels)',
        logoRodape: 'Logo Rodapé (60x40 pixels)',
        explicacoesTexto: 'Explicações',
        quemSomosTexto: 'Quem Somos',
        salvarTodasConfiguracoes: 'Salvar Todas as Configurações',
        
        // Consultoras
        consultora: 'Consultora',
        cadastroDeConsultora: 'Cadastro de Consultora',
        editarConsultora: 'Editar Consultora',
        novaConsultora: 'Nova',
        nomeCompleto: 'Nome Completo',
        endereco: 'Endereço',
        bairro: 'Bairro',
        cep: 'CEP',
        cidade: 'Cidade',
        cpf: 'CPF',
        telefone: 'Telefone',
        nomeDoPai: 'Nome do Pai',
        nomeDaMae: 'Nome da Mãe',
        telefoneReferencia: 'Telefone de Referência',
        nomeDoRepresentante: 'Nome do Representante',
        aceitaMostruario: 'Você está de acordo que se for aprovada em nossa avaliação, irá pegar um MOSTRUÁRIO contendo de 50 PEÇAS ou MAIS, e assinará um CONTRATO explicando todas as cláusulas sobre as VENDAS, ACERTOS, PENDÊNCIAS E DEVOLUÇÃO?',
        aceitaContrato: 'Nós somos uma empresa PARCEIRA e por isto acreditamos na confiança de nossas CONSULTORAS. Mas a NÃO DEVOLUÇÃO do MOSTRUÁRIO ao TÉRMINO do CONTRATO, implicará em denúncia com boletim de ocorrência e AÇÃO JUDICIAL, por apropriação indébita artigo 168 do código penal, com previsão de até 1 ano de detenção. Você está ciente disto?',
        sim: 'Sim',
        nao: 'Não',
        
        // Representantes
        representantes: 'Representantes',
        cadastroDeRepresentante: 'Cadastro de Representante',
        editarRepresentante: 'Editar Representante',
        novoRepresentante: 'Novo',
        veiculo: 'Veículo',
        
        // Fotos
        galeriaFotos: 'Galeria de Fotos',
        adicionarNovaFoto: 'Adicionar Nova Foto (400x600 pixels)',
        salvarFoto: 'Salvar Foto',
        fotosCadastradas: 'Fotos Cadastradas',
        nenhumaFoto: 'Nenhuma foto cadastrada ainda.',
        
        // Botões
        voltar: 'Voltar',
        excluir: 'Excluir',
        gravar: 'Gravar',
        gravarEnviar: 'Gravar e Enviar WhatsApp',
        novo: 'Novo',
        alterar: 'Alterar',
        
        // Relatórios
        relatorios: 'Relatórios',
        relatorioPorCidade: 'Relatório por Cidade',
        relatorioPorNome: 'Relatório por Nome',
        
        // Tabelas
        nome: 'Nome',
        acoes: 'Ações',
        
        // Mensagens
        senhaIncorreta: 'Senha incorreta!',
        erroLogin: 'Erro ao fazer login',
        configSalvas: 'Configurações salvas com sucesso!',
        erroSalvar: 'Erro ao salvar configurações',
        preenchaNome: 'Por favor, preencha o nome completo',
        salvoSucesso: 'Salvo com sucesso!',
        cadastrado: 'cadastrado! Redirecionando para WhatsApp...',
        desejaExcluir: 'Deseja realmente excluir',
        excluido: 'excluído com sucesso!',
        fotoAdicionada: 'Foto adicionada com sucesso!',
        selecioneFoto: 'Por favor, selecione uma foto',
        nenhumaExplicacao: 'Nenhuma explicação cadastrada ainda.',
        
        // Modal Sair
        desejaSair: 'Deseja Sair?',
        desejaSairTexto: 'Tem certeza que deseja sair da área administrativa?',
        
        // Explicações
        explicacoesTitle: 'Explicações',
        
        // Quem Somos
        quemSomosTitle: 'Quem Somos',
        nenhumaInfo: 'Nenhuma informação cadastrada ainda.'
    },
    es: {
        // Pantalla Inicial
        consultoras: 'Consultoras',
        representante: 'Representante',
        explicacoes: 'Explicaciones',
        fotos: 'Fotos',
        quemSomos: 'Quiénes Somos',
        areaAdministrativa: 'Área Administrativa',
        
        // Admin
        painelAdministrativo: 'Panel Administrativo',
        sair: 'Salir',
        configuracoes: 'Configuraciones',
        gerenciarConsultoras: 'Administrar Consultoras',
        gerenciarRepresentantes: 'Administrar Representantes',
        gerenciarFotos: 'Administrar Fotos',
        
        // Configuraciones
        configuracoesDoSistema: 'Configuraciones del Sistema',
        senhaDoAdministrador: 'Contraseña del Administrador',
        whatsapp: 'WhatsApp (con código de área, ej: 5518996676409)',
        corPrimaria: 'Color Primario (Fondo de la App)',
        corSecundaria: 'Color Secundario (Pie de página)',
        corTerciaria: 'Color Terciario (Botones)',
        corQuaternaria: 'Color Cuaternario (Texto de los Botones)',
        logoEmpresa: 'Logo de la Empresa (200x200 píxeles)',
        logoRodape: 'Logo Pie de Página (60x40 píxeles)',
        explicacoesTexto: 'Explicaciones',
        quemSomosTexto: 'Quiénes Somos',
        salvarTodasConfiguracoes: 'Guardar Todas las Configuraciones',
        
        // Consultoras
        consultora: 'Consultora',
        cadastroDeConsultora: 'Registro de Consultora',
        editarConsultora: 'Editar Consultora',
        novaConsultora: 'Nueva',
        nomeCompleto: 'Nombre Completo',
        endereco: 'Dirección',
        bairro: 'Barrio',
        cep: 'Código Postal',
        cidade: 'Ciudad',
        cpf: 'CPF/DNI',
        telefone: 'Teléfono',
        nomeDoPai: 'Nombre del Padre',
        nomeDaMae: 'Nombre de la Madre',
        telefoneReferencia: 'Teléfono de Referencia',
        nomeDoRepresentante: 'Nombre del Representante',
        aceitaMostruario: '¿Está de acuerdo en que si es aprobada en nuestra evaluación, tomará un MUESTRARIO que contenga 50 PIEZAS o MÁS, y firmará un CONTRATO explicando todas las cláusulas sobre VENTAS, AJUSTES, PENDIENTES Y DEVOLUCIÓN?',
        aceitaContrato: 'Somos una empresa SOCIA y por eso creemos en la confianza de nuestras CONSULTORAS. Pero la NO DEVOLUCIÓN del MUESTRARIO al FINAL del CONTRATO, implicará denuncia con acta policial y ACCIÓN JUDICIAL, por apropiación indebida artículo 168 del código penal, con previsión de hasta 1 año de detención. ¿Está consciente de esto?',
        sim: 'Sí',
        nao: 'No',
        
        // Representantes
        representantes: 'Representantes',
        cadastroDeRepresentante: 'Registro de Representante',
        editarRepresentante: 'Editar Representante',
        novoRepresentante: 'Nuevo',
        veiculo: 'Vehículo',
        
        // Fotos
        galeriaFotos: 'Galería de Fotos',
        adicionarNovaFoto: 'Agregar Nueva Foto (400x600 píxeles)',
        salvarFoto: 'Guardar Foto',
        fotosCadastradas: 'Fotos Registradas',
        nenhumaFoto: 'Ninguna foto registrada todavía.',
        
        // Botones
        voltar: 'Volver',
        excluir: 'Eliminar',
        gravar: 'Guardar',
        gravarEnviar: 'Guardar y Enviar WhatsApp',
        novo: 'Nuevo',
        alterar: 'Modificar',
        
        // Informes
        relatorios: 'Informes',
        relatorioPorCidade: 'Informe por Ciudad',
        relatorioPorNome: 'Informe por Nombre',
        
        // Tablas
        nome: 'Nombre',
        acoes: 'Acciones',
        
        // Mensajes
        senhaIncorreta: '¡Contraseña incorrecta!',
        erroLogin: 'Error al iniciar sesión',
        configSalvas: '¡Configuraciones guardadas con éxito!',
        erroSalvar: 'Error al guardar configuraciones',
        preenchaNome: 'Por favor, complete el nombre completo',
        salvoSucesso: '¡Guardado con éxito!',
        cadastrado: 'registrado! Redirigiendo a WhatsApp...',
        desejaExcluir: '¿Realmente desea eliminar',
        excluido: 'eliminado con éxito!',
        fotoAdicionada: '¡Foto agregada con éxito!',
        selecioneFoto: 'Por favor, seleccione una foto',
        nenhumaExplicacao: 'Ninguna explicación registrada todavía.',
        
        // Modal Salir
        desejaSair: '¿Desea Salir?',
        desejaSairTexto: '¿Está seguro de que desea salir del área administrativa?',
        
        // Explicaciones
        explicacoesTitle: 'Explicaciones',
        
        // Quiénes Somos
        quemSomosTitle: 'Quiénes Somos',
        nenhumaInfo: 'Ninguna información registrada todavía.'
    }
};

// Função de tradução
function t(key) {
    return translations[currentLang][key] || key;
}

// Alternar idioma
function toggleLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Recarregar a tela atual
    const screens = ['home-screen', 'admin-login', 'admin-panel', 'config-screen', 
                    'consultoras-list', 'consultora-form', 'representantes-list', 
                    'representante-form', 'explicacoes-screen', 'fotos-screen', 'fotos-admin', 'quem-somos-screen'];
    
    const currentScreen = screens.find(id => !document.getElementById(id).classList.contains('hidden'));
    
    // Recarregar configurações e aplicar tema
    loadConfig().then(() => {
        // Re-renderizar a tela atual
        if (currentScreen === 'home-screen') showHome();
        else if (currentScreen === 'admin-panel') showScreen('admin-panel');
        else if (currentScreen === 'config-screen') showConfigScreen();
        else if (currentScreen === 'consultoras-list') showConsultorasList();
        else if (currentScreen === 'representantes-list') showRepresentantesList();
        else if (currentScreen === 'fotos-admin') showFotosAdmin();
        else if (currentScreen === 'explicacoes-screen') showExplicacoes();
        else if (currentScreen === 'fotos-screen') showFotos();
        else if (currentScreen === 'quem-somos-screen') showQuemSomos();
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    // Recuperar idioma salvo
    const savedLang = localStorage.getItem('lang');
    if (savedLang) currentLang = savedLang;
    
    await loadConfig();
    applyTheme();
    renderHomePage();
});

// ================== CONFIGURAÇÃO E TEMA ==================
async function loadConfig() {
    try {
        const response = await axios.get('/api/config');
        currentConfig = response.data;
        applyTheme();
        
        // Atualizar elementos da home
        if (currentConfig.logo_empresa) {
            const homeLogo = document.getElementById('home-logo');
            if (homeLogo) homeLogo.src = currentConfig.logo_empresa;
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
    document.documentElement.style.setProperty('--color-primary', currentConfig.cor_primaria || '#8B4513');
    document.documentElement.style.setProperty('--color-secondary', currentConfig.cor_secundaria || '#DAA520');
    document.documentElement.style.setProperty('--color-tertiary', currentConfig.cor_terciaria || '#FFD700');
    document.documentElement.style.setProperty('--color-quaternary', currentConfig.cor_quaternaria || '#FFFFFF');
    
    // Aplicar cor de fundo
    document.body.style.backgroundColor = currentConfig.cor_primaria || '#8B4513';
    
    // Aplicar cor do rodapé
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.backgroundColor = currentConfig.cor_secundaria || '#DAA520';
    }
}

// ================== NAVEGAÇÃO ==================
function showScreen(screenId) {
    const screens = ['home-screen', 'admin-login', 'admin-panel', 'config-screen', 
                    'consultoras-list', 'consultora-form', 'representantes-list', 
                    'representante-form', 'explicacoes-screen', 'fotos-screen', 'fotos-admin', 'quem-somos-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showHome() {
    renderHomePage();
    showScreen('home-screen');
}

function showAdminLogin() {
    renderAdminLogin();
    showScreen('admin-login');
}

function showAdminPanel() {
    renderAdminPanel();
    showScreen('admin-panel');
}

function logout() {
    showConfirmModal(
        t('desejaSair'),
        t('desejaSairTexto'),
        () => {
            isAdmin = false;
            showHome();
        }
    );
}

// ================== MODAL DE CONFIRMAÇÃO ==================
function showConfirmModal(title, message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="background: white; border: 3px solid var(--color-tertiary);">
            <h3 class="text-xl font-bold mb-4" style="color: var(--color-primary);">${title}</h3>
            <p class="mb-6" style="color: var(--color-primary);">${message}</p>
            <div class="flex gap-4">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        class="flex-1 py-3 rounded-lg font-bold"
                        style="background: var(--color-tertiary); color: var(--color-quaternary);">
                    ${t('nao')}
                </button>
                <button onclick="this.closest('.modal-overlay').remove(); arguments[0]()" 
                        class="flex-1 py-3 rounded-lg font-bold"
                        style="background: var(--color-tertiary); color: var(--color-quaternary);">
                    ${t('sim')}
                </button>
            </div>
        </div>
    `;
    
    const buttons = modal.querySelectorAll('button');
    buttons[1].onclick = () => {
        modal.remove();
        onConfirm();
    };
    
    document.body.appendChild(modal);
}

// ================== RENDERIZAÇÃO DA HOME ==================
function renderHomePage() {
    const homeScreen = document.getElementById('home-screen');
    homeScreen.innerHTML = `
        <div class="language-switcher">
            <button onclick="toggleLanguage('pt')" class="${currentLang === 'pt' ? 'active' : ''}">
                <span style="font-size: 2rem;">🇧🇷</span>
            </button>
            <button onclick="toggleLanguage('es')" class="${currentLang === 'es' ? 'active' : ''}">
                <span style="font-size: 2rem;">🇪🇸</span>
            </button>
        </div>
        
        <div class="logo-container mb-6">
            <img id="home-logo" src="${currentConfig.logo_empresa || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Crect fill=\'%238B4513\' width=\'200\' height=\'200\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'60\' fill=\'%23FFD700\' text-anchor=\'middle\' dy=\'.3em\'%3E💎%3C/text%3E%3C/svg%3E'}" alt="Logo">
        </div>
        
        <div class="button-grid">
            <button onclick="showConsultoraForm()" class="btn-mobile-home">
                <i class="fas fa-user-plus"></i>
                <i class="fas fa-id-card"></i>
                <div>${t('consultoras')}</div>
            </button>
            <button onclick="showRepresentanteForm()" class="btn-mobile-home">
                <i class="fas fa-id-badge"></i>
                <i class="fas fa-car"></i>
                <div>${t('representante')}</div>
            </button>
            <button onclick="showExplicacoes()" class="btn-mobile-home">
                <i class="fas fa-info-circle"></i>
                <i class="fas fa-book"></i>
                <div>${t('explicacoes')}</div>
            </button>
            <button onclick="showFotos()" class="btn-mobile-home">
                <i class="fas fa-images"></i>
                <i class="fas fa-camera"></i>
                <div>${t('fotos')}</div>
            </button>
            <button onclick="showQuemSomos()" class="btn-mobile-home">
                <i class="fas fa-users"></i>
                <i class="fas fa-building"></i>
                <div>${t('quemSomos')}</div>
            </button>
            <button onclick="showAdminLogin()" class="btn-mobile-home">
                <i class="fas fa-lock"></i>
                <i class="fas fa-user-shield"></i>
                <div>${t('areaAdministrativa')}</div>
            </button>
        </div>
    `;
}

// ================== LOGIN ==================
function renderAdminLogin() {
    const loginScreen = document.getElementById('admin-login');
    loginScreen.innerHTML = `
        <button onclick="showHome()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('areaAdministrativa')}</h2>
        <div class="space-y-4">
            <input type="password" id="admin-password" placeholder="${t('senhaDoAdministrador')}" class="form-input">
            <button onclick="login()" class="btn-mobile" style="background: var(--color-tertiary); color: var(--color-quaternary);">
                <i class="fas fa-sign-in-alt mr-2"></i> ${t('sair')}
            </button>
        </div>
    `;
}

async function login() {
    const password = document.getElementById('admin-password').value;
    try {
        const response = await axios.post('/api/login', { password });
        if (response.data.success) {
            isAdmin = true;
            showAdminPanel();
        } else {
            alert(t('senhaIncorreta'));
        }
    } catch (error) {
        alert(t('erroLogin'));
    }
}

// ================== PAINEL ADMIN ==================
function renderAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.innerHTML = `
        <div class="language-switcher">
            <button onclick="toggleLanguage('pt')" class="${currentLang === 'pt' ? 'active' : ''}">
                <span style="font-size: 2rem;">🇧🇷</span>
            </button>
            <button onclick="toggleLanguage('es')" class="${currentLang === 'es' ? 'active' : ''}">
                <span style="font-size: 2rem;">🇪🇸</span>
            </button>
        </div>
        
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold" style="color: white;">${t('painelAdministrativo')}</h2>
            <button onclick="logout()" style="color: white;">
                <i class="fas fa-sign-out-alt mr-2"></i> ${t('sair')}
            </button>
        </div>
        
        <div class="button-grid">
            <button onclick="showConfigScreen()" class="btn-mobile-admin">
                <i class="fas fa-cog"></i>
                <i class="fas fa-palette"></i>
                <div>${t('configuracoes')}</div>
            </button>
            <button onclick="showConsultorasList()" class="btn-mobile-admin">
                <i class="fas fa-users"></i>
                <i class="fas fa-clipboard-list"></i>
                <div>${t('gerenciarConsultoras')}</div>
            </button>
            <button onclick="showRepresentantesList()" class="btn-mobile-admin">
                <i class="fas fa-id-badge"></i>
                <i class="fas fa-tasks"></i>
                <div>${t('gerenciarRepresentantes')}</div>
            </button>
            <button onclick="showFotosAdmin()" class="btn-mobile-admin">
                <i class="fas fa-camera"></i>
                <i class="fas fa-image"></i>
                <div>${t('gerenciarFotos')}</div>
            </button>
        </div>
    `;
}

// ================== CONFIGURAÇÕES ==================
async function showConfigScreen() {
    const screen = document.getElementById('config-screen');
    screen.innerHTML = `
        <button onclick="showAdminPanel()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('configuracoesDoSistema')}</h2>
        
        <div class="space-y-6 config-form">
            <!-- Senha -->
            <div>
                <label class="block font-semibold mb-2 text-white">${t('senhaDoAdministrador')}</label>
                <input type="password" id="config-password" value="${currentConfig.admin_password || ''}" class="form-input">
            </div>

            <!-- WhatsApp -->
            <div>
                <label class="block font-semibold mb-2 text-white">${t('whatsapp')}</label>
                <input type="text" id="config-whatsapp" value="${currentConfig.whatsapp || ''}" class="form-input" placeholder="5518996676409">
            </div>

            <!-- Cores -->
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
                <label class="block font-semibold mb-2 text-white">${t('corQuaternaria')}</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor4" value="${currentConfig.cor_quaternaria || '#FFFFFF'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_quaternaria || '#FFFFFF'}"></div>
                </div>
            </div>

            <!-- Logo Empresa -->
            <div>
                <label class="block font-semibold mb-2 text-white">${t('logoEmpresa')}</label>
                ${currentConfig.logo_empresa ? `<img src="${currentConfig.logo_empresa}" class="mb-2" style="max-width: 200px; max-height: 200px;">` : ''}
                <input type="file" id="config-logo" accept="image/*" class="form-input" onchange="previewImage('config-logo')">
            </div>

            <!-- Logo Rodapé -->
            <div>
                <label class="block font-semibold mb-2 text-white">${t('logoRodape')}</label>
                ${currentConfig.logo_rodape ? `<img src="${currentConfig.logo_rodape}" class="mb-2" style="max-width: 60px; max-height: 40px;">` : ''}
                <input type="file" id="config-logo-rodape" accept="image/*" class="form-input" onchange="previewImage('config-logo-rodape')">
            </div>

            <!-- Explicações -->
            <div>
                <label class="block font-semibold mb-2 text-white">${t('explicacoesTexto')}</label>
                <textarea id="config-explicacoes" class="form-input" rows="8">${currentConfig.explicacoes || ''}</textarea>
            </div>

            <!-- Quem Somos -->
            <div>
                <label class="block font-semibold mb-2 text-white">${t('quemSomosTexto')}</label>
                <textarea id="config-quem-somos" class="form-input" rows="8">${currentConfig.quem_somos || ''}</textarea>
            </div>

            <button onclick="saveConfig()" class="btn-mobile" style="background: var(--color-tertiary); color: var(--color-quaternary);">
                <i class="fas fa-save mr-2"></i> ${t('salvarTodasConfiguracoes')}
            </button>
        </div>
    `;
    
    // Atualizar preview de cores ao mudar
    ['config-cor1', 'config-cor2', 'config-cor3', 'config-cor4'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.nextElementSibling.style.backgroundColor = e.target.value;
            });
        }
    });
    
    showScreen('config-screen');
}

function previewImage(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'mt-2';
            img.style.maxWidth = inputId.includes('rodape') ? '60px' : '200px';
            img.style.maxHeight = inputId.includes('rodape') ? '40px' : '200px';
            
            const existingImg = input.previousElementSibling;
            if (existingImg && existingImg.tagName === 'IMG') {
                existingImg.src = e.target.result;
            } else {
                input.parentNode.insertBefore(img, input);
            }
        };
        reader.readAsDataURL(file);
    }
}

async function saveConfig() {
    try {
        const updates = {
            admin_password: document.getElementById('config-password').value,
            whatsapp: document.getElementById('config-whatsapp').value,
            cor_primaria: document.getElementById('config-cor1').value,
            cor_secundaria: document.getElementById('config-cor2').value,
            cor_terciaria: document.getElementById('config-cor3').value,
            cor_quaternaria: document.getElementById('config-cor4').value,
            explicacoes: document.getElementById('config-explicacoes').value,
            quem_somos: document.getElementById('config-quem-somos').value
        };

        // Upload logo empresa
        const logoFile = document.getElementById('config-logo').files[0];
        if (logoFile) {
            updates.logo_empresa = await fileToBase64(logoFile);
        }

        // Upload logo rodapé
        const logoRodapeFile = document.getElementById('config-logo-rodape').files[0];
        if (logoRodapeFile) {
            updates.logo_rodape = await fileToBase64(logoRodapeFile);
        }

        // Salvar cada configuração
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null && value !== '') {
                await axios.put(`/api/config/${key}`, { value });
            }
        }

        alert(t('configSalvas'));
        await loadConfig();
        showAdminPanel();
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        alert(t('erroSalvar'));
    }
}

// Continua no próximo arquivo...
