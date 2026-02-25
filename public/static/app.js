// Estado global
let currentConfig = {};
let isAdmin = false;
let currentConsultoraId = null;
let currentRepresentanteId = null;
let currentUsuarioId = null;
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
        entrar: 'Entrar',
        configuracoes: 'Configurações',
        gerenciarConsultoras: 'Gerenciar Consultoras',
        gerenciarRepresentantes: 'Gerenciar Representantes',
        gerenciarFotos: 'Gerenciar Fotos',
        gerenciarUsuarios: 'Gerenciar Usuários',
        
        // Configurações
        configuracoesDoSistema: 'Configurações do Sistema',
        senhaDoAdministrador: 'Senha do Administrador',
        whatsapp: 'WhatsApp (apenas números: DDD + telefone)',
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
        mes: 'Mês',
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
        relatorioPorMes: 'Relatório por Mês',
        digiteCidade: 'Digite a cidade:',
        digiteNome: 'Digite o nome:',
        digiteMes: 'Digite o mês:',
        gerarRelatorio: 'Gerar Relatório',
        cancelar: 'Cancelar',
        confirmar: 'Confirmar',
        
        // Usuários
        usuarios: 'Usuários',
        cadastroDeUsuario: 'Cadastro de Usuário',
        editarUsuario: 'Editar Usuário',
        novoUsuario: 'Novo Usuário',
        nomeDoUsuario: 'Nome do Usuário',
        senha: 'Senha',
        usuariosCadastrados: 'Usuários Cadastrados',
        nenhumUsuarioCadastrado: 'Nenhum usuário cadastrado ainda.',
        
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
        nenhumaInfo: 'Nenhuma informação cadastrada ainda.',
        
        // Usuários
        usuarios: 'Usuários',
        nomeUsuario: 'Nome do Usuário',
        senha: 'Senha',
        novoUsuario: 'Novo Usuário',
        editarUsuario: 'Editar Usuário',
        usuarioJaExiste: 'Usuário já existe!',
        usuarioExcluido: 'Usuário excluído com sucesso!',
        usuarioSalvo: 'Usuário salvo com sucesso!',
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
        entrar: 'Entrar',
        configuracoes: 'Configuraciones',
        gerenciarConsultoras: 'Administrar Consultoras',
        gerenciarRepresentantes: 'Administrar Representantes',
        gerenciarFotos: 'Administrar Fotos',
        gerenciarUsuarios: 'Administrar Usuarios',
        
        // Configuraciones
        configuracoesDoSistema: 'Configuraciones del Sistema',
        senhaDoAdministrador: 'Contraseña del Administrador',
        whatsapp: 'WhatsApp (solo números: código de área + teléfono)',
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
        mes: 'Mes',
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
        relatorioPorMes: 'Informe por Mes',
        digiteCidade: 'Ingrese la ciudad:',
        digiteNome: 'Ingrese el nombre:',
        digiteMes: 'Ingrese el mes:',
        gerarRelatorio: 'Generar Informe',
        cancelar: 'Cancelar',
        confirmar: 'Confirmar',
        
        // Usuarios
        usuarios: 'Usuarios',
        cadastroDeUsuario: 'Registro de Usuario',
        editarUsuario: 'Editar Usuario',
        novoUsuario: 'Nuevo Usuario',
        nomeDoUsuario: 'Nombre de Usuario',
        senha: 'Contraseña',
        usuariosCadastrados: 'Usuarios Registrados',
        nenhumUsuarioCadastrado: 'Aún no hay usuarios registrados.',
        
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
        usuarioExcluido: '¡Usuario eliminado con éxito!',
        usuarioSalvo: '¡Usuario guardado con éxito!',
        
        // Modal Salir
        desejaSair: '¿Desea Salir?',
        desejaSairTexto: '¿Está seguro de que desea salir del área administrativa?',
        
        // Explicaciones
        explicacoesTitle: 'Explicaciones',
        
        // Quiénes Somos
        quemSomosTitle: 'Quiénes Somos',
        nenhumaInfo: 'Ninguna información registrada todavía.',
        
        // Usuarios
        usuarios: 'Usuarios',
        nomeUsuario: 'Nombre de Usuario',
        senha: 'Contraseña',
        novoUsuario: 'Nuevo Usuario',
        editarUsuario: 'Editar Usuario',
        usuarioJaExiste: '¡Usuario ya existe!',
        usuarioExcluido: '¡Usuario eliminado con éxito!',
        usuarioSalvo: '¡Usuario guardado con éxito!',
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
                    'representante-form', 'usuarios-list', 'usuario-form',
                    'explicacoes-screen', 'fotos-screen', 'fotos-admin', 'quem-somos-screen'];
    
    const currentScreen = screens.find(id => !document.getElementById(id).classList.contains('hidden'));
    
    // Recarregar configurações e aplicar tema
    loadConfig().then(() => {
        // Re-renderizar a tela atual
        if (currentScreen === 'home-screen') showHome();
        else if (currentScreen === 'admin-panel') showScreen('admin-panel');
        else if (currentScreen === 'config-screen') showConfigScreen();
        else if (currentScreen === 'consultoras-list') showConsultorasList();
        else if (currentScreen === 'representantes-list') showRepresentantesList();
        else if (currentScreen === 'usuarios-list') showUsuariosList();
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
                    'representante-form', 'usuarios-list', 'usuario-form',
                    'explicacoes-screen', 'fotos-screen', 'fotos-admin', 'quem-somos-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function hideAllScreens() {
    const screens = ['home-screen', 'admin-login', 'admin-panel', 'config-screen', 
                    'consultoras-list', 'consultora-form', 'representantes-list', 
                    'representante-form', 'usuarios-list', 'usuario-form',
                    'explicacoes-screen', 'fotos-screen', 'fotos-admin', 'quem-somos-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
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

// Modal de input customizado
function showInputModal(title, message, onConfirm) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="background: white; border: 3px solid var(--color-tertiary); max-width: 500px;">
                <h3 class="text-xl font-bold mb-4" style="color: var(--color-primary);">${title}</h3>
                <p class="mb-4 font-semibold" style="color: var(--color-primary);">${message}</p>
                <input type="text" id="modal-input" class="form-input mb-6" 
                       style="border: 2px solid var(--color-tertiary);" 
                       placeholder="${message.replace(':', '')}">
                <div class="flex gap-4">
                    <button id="modal-cancel" 
                            class="flex-1 py-3 rounded-lg font-bold"
                            style="background: #dc2626; color: white;">
                        ${t('cancelar')}
                    </button>
                    <button id="modal-confirm" 
                            class="flex-1 py-3 rounded-lg font-bold"
                            style="background: var(--color-tertiary); color: var(--color-quaternary);">
                        ${t('confirmar')}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = modal.querySelector('#modal-input');
        const cancelBtn = modal.querySelector('#modal-cancel');
        const confirmBtn = modal.querySelector('#modal-confirm');
        
        // Focar no input
        setTimeout(() => input.focus(), 100);
        
        // Enter para confirmar
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const value = input.value.trim();
                if (value) {
                    modal.remove();
                    resolve(value);
                }
            }
        });
        
        // Botão cancelar
        cancelBtn.onclick = () => {
            modal.remove();
            resolve(null);
        };
        
        // Botão confirmar
        confirmBtn.onclick = () => {
            const value = input.value.trim();
            if (value) {
                modal.remove();
                resolve(value);
            } else {
                input.style.borderColor = '#dc2626';
                input.focus();
            }
        };
        
        // Clicar fora fecha o modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                resolve(null);
            }
        });
    });
}

// ================== RENDERIZAÇÃO DA HOME ==================
function renderHomePage() {
    const homeScreen = document.getElementById('home-screen');
    homeScreen.innerHTML = `
        <div class="language-switcher">
            <button onclick="toggleLanguage('pt')" class="${currentLang === 'pt' ? 'active' : ''}" title="Português">
                <svg width="32" height="24" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="30" fill="#009b3a"/>
                    <polygon points="20,5 35,15 20,25 5,15" fill="#fedf00"/>
                    <circle cx="20" cy="15" r="5" fill="#002776"/>
                    <path d="M 15,15 Q 20,12 25,15 Q 20,18 15,15" fill="white"/>
                </svg>
            </button>
            <button onclick="toggleLanguage('es')" class="${currentLang === 'es' ? 'active' : ''}" title="Español">
                <svg width="32" height="24" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="30" fill="#AA151B"/>
                    <rect y="7.5" width="40" height="15" fill="#F1BF00"/>
                    <rect y="11.25" width="40" height="7.5" fill="#AA151B"/>
                </svg>
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
            <button onclick="openWhatsAppLink()" class="btn-mobile-home" id="btn-whatsapp" style="display: none;">
                <i class="fab fa-whatsapp"></i>
                <i class="fas fa-comment-dots"></i>
                <div>Fale com Comercial</div>
            </button>
            <button onclick="openInstagramLink()" class="btn-mobile-home" id="btn-instagram" style="display: none;">
                <i class="fab fa-instagram"></i>
                <i class="fas fa-camera-retro"></i>
                <div>Instagram</div>
            </button>
            <button onclick="showPixModal()" class="btn-mobile-home" id="btn-pix" style="display: none;">
                <i class="fas fa-qrcode"></i>
                <i class="fas fa-money-bill"></i>
                <div>PIX</div>
            </button>
            <button onclick="showAdminLogin()" class="btn-mobile-home">
                <i class="fas fa-lock"></i>
                <i class="fas fa-user-shield"></i>
                <div>${t('areaAdministrativa')}</div>
            </button>
        </div>
    `;
    
    // Carregar e exibir botões sociais se configurados
    loadSocialButtons();
}

// ================== BOTÕES SOCIAIS NO FRONTEND ==================
let whatsappLink = '';
let instagramLink = '';
let pixData = { chave: '', qrcode: '' };

async function loadSocialButtons() {
    // Carregar WhatsApp
    try {
        const whatsappResponse = await axios.get('/api/whatsapp');
        if (whatsappResponse.data && whatsappResponse.data.valor) {
            whatsappLink = whatsappResponse.data.valor;
            document.getElementById('btn-whatsapp').style.display = 'flex';
        }
    } catch (error) {
        console.log('WhatsApp não configurado');
    }
    
    // Carregar Instagram
    try {
        const instagramResponse = await axios.get('/api/instagram');
        if (instagramResponse.data && instagramResponse.data.valor) {
            instagramLink = instagramResponse.data.valor;
            document.getElementById('btn-instagram').style.display = 'flex';
        }
    } catch (error) {
        console.log('Instagram não configurado');
    }
    
    // Carregar PIX
    try {
        const pixResponse = await axios.get('/api/pix');
        if (pixResponse.data && (pixResponse.data.chave || pixResponse.data.qrcode)) {
            pixData = pixResponse.data;
            document.getElementById('btn-pix').style.display = 'flex';
        }
    } catch (error) {
        console.log('PIX não configurado');
    }
}

function openWhatsAppLink() {
    if (whatsappLink) {
        window.open(whatsappLink, '_blank');
    } else {
        alert('Link do WhatsApp não configurado!');
    }
}

function openInstagramLink() {
    if (instagramLink) {
        window.open(instagramLink, '_blank');
    } else {
        alert('Link do Instagram não configurado!');
    }
}

function showPixModal() {
    if (!pixData.chave && !pixData.qrcode) {
        alert('PIX não configurado!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'pix-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 100%; position: relative;">
            <button onclick="closePixModal()" style="position: absolute; top: 15px; right: 15px; background: #f44336; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;">
                ×
            </button>
            
            <h2 style="text-align: center; color: #333; margin-bottom: 20px; font-size: 24px;">
                <i class="fas fa-qrcode" style="color: #00a8ff;"></i> PIX
            </h2>
            
            ${pixData.qrcode ? `
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${pixData.qrcode}" alt="QR Code PIX" style="max-width: 300px; width: 100%; border: 2px solid #ddd; border-radius: 10px;">
                </div>
            ` : ''}
            
            ${pixData.chave ? `
                <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <p style="color: #666; margin-bottom: 5px; font-size: 14px;">Chave PIX:</p>
                    <p style="color: #333; font-weight: bold; word-break: break-all; font-size: 16px;">${pixData.chave}</p>
                    <button onclick="copyPixKey()" style="margin-top: 10px; background: #00a8ff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%;">
                        <i class="fas fa-copy"></i> Copiar Chave
                    </button>
                </div>
            ` : ''}
            
            <p style="text-align: center; color: #999; font-size: 14px; margin-top: 15px;">
                <i class="fas fa-info-circle"></i> Escaneie o QR Code ou copie a chave para fazer o pagamento
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closePixModal() {
    const modal = document.getElementById('pix-modal');
    if (modal) {
        modal.remove();
    }
}

function copyPixKey() {
    if (!pixData.chave) return;
    
    // Criar elemento temporário para copiar
    const temp = document.createElement('textarea');
    temp.value = pixData.chave;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    
    alert('✅ Chave PIX copiada para a área de transferência!');
}

// ================== LOGIN ==================
function renderAdminLogin() {
    const loginScreen = document.getElementById('admin-login');
    loginScreen.innerHTML = `
        <button onclick="showHome()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('areaAdministrativa')}</h2>
        <form id="login-form" class="space-y-4" onsubmit="event.preventDefault(); login();">
            <input type="text" id="admin-username" placeholder="${t('nomeDoUsuario')}" class="form-input" required>
            <input type="password" id="admin-password" placeholder="${t('senha')}" class="form-input" required>
            <button type="submit" class="btn-mobile" style="background: var(--color-tertiary); color: var(--color-quaternary);">
                <i class="fas fa-sign-in-alt mr-2"></i> ${t('entrar')}
            </button>
        </form>
    `;
}

async function login() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    if (!username || !password) {
        alert(t('preenchaNome'));
        return;
    }
    
    try {
        const response = await axios.post('/api/login', { username, password });
        if (response.data.success) {
            isAdmin = true;
            showAdminPanel();
        } else {
            alert(t('senhaIncorreta'));
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert(t('erroLogin'));
    }
}

// ================== PAINEL ADMIN ==================
function renderAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.innerHTML = `
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
            <button onclick="showUsuariosList()" class="btn-mobile-admin">
                <i class="fas fa-user-shield"></i>
                <i class="fas fa-key"></i>
                <div>${t('gerenciarUsuarios')}</div>
            </button>
            <button onclick="showWhatsAppConfig()" class="btn-mobile-admin">
                <i class="fab fa-whatsapp"></i>
                <i class="fas fa-comment-dots"></i>
                <div>Fale com Comercial</div>
            </button>
            <button onclick="showInstagramConfig()" class="btn-mobile-admin">
                <i class="fab fa-instagram"></i>
                <i class="fas fa-camera-retro"></i>
                <div>Instagram</div>
            </button>
            <button onclick="showPixConfig()" class="btn-mobile-admin">
                <i class="fas fa-qrcode"></i>
                <i class="fas fa-money-bill"></i>
                <div>PIX</div>
            </button>
        </div>
    `;
}

// ================== WHATSAPP CONFIG ==================
async function showWhatsAppConfig() {
    // Carregar configuração atual
    let currentLink = '';
    try {
        const response = await axios.get('/api/whatsapp');
        if (response.data && response.data.valor) {
            currentLink = response.data.valor;
        }
    } catch (error) {
        console.log('Nenhum link WhatsApp configurado ainda');
    }
    
    const screen = document.getElementById('config-screen');
    screen.innerHTML = `
        <button onclick="showAdminPanel()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">
            <i class="fab fa-whatsapp mr-2"></i> Configurar Fale com Comercial
        </h2>
        
        <div class="space-y-6 config-form">
            <div>
                <label class="block font-semibold mb-2 text-white">Link do WhatsApp</label>
                <input type="text" 
                       id="whatsapp-link" 
                       value="${currentLink}" 
                       class="form-input" 
                       placeholder="https://wa.me/5518996676409">
                <p class="text-sm text-gray-300 mt-2">
                    <i class="fas fa-info-circle mr-1"></i> 
                    Exemplo: https://wa.me/5518996676409
                </p>
            </div>
            
            <button onclick="salvarWhatsApp()" class="btn-primary w-full">
                <i class="fas fa-save mr-2"></i> Salvar
            </button>
        </div>
        
        ${currentLink ? `
        <div class="mt-6 p-4 bg-green-800 rounded-lg">
            <p class="text-white font-semibold mb-2">✅ Preview do botão:</p>
            <a href="${currentLink}" 
               target="_blank" 
               class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <i class="fab fa-whatsapp text-xl"></i>
                <span>Fale com Comercial</span>
            </a>
        </div>
        ` : ''}
    `;
    showScreen('config-screen');
}

async function salvarWhatsApp() {
    const link = document.getElementById('whatsapp-link').value.trim();
    
    if (!link) {
        alert('Por favor, insira o link do WhatsApp!');
        return;
    }
    
    if (!link.startsWith('https://wa.me/') && !link.startsWith('http')) {
        alert('Link inválido! Use o formato: https://wa.me/5518996676409');
        return;
    }
    
    try {
        await axios.post('/api/whatsapp', { link });
        alert('✅ Link do WhatsApp salvo com sucesso!');
        showWhatsAppConfig(); // Recarregar para mostrar preview
    } catch (error) {
        console.error('Erro ao salvar WhatsApp:', error);
        alert('❌ Erro ao salvar. Tente novamente.');
    }
}

// ================== INSTAGRAM CONFIG ==================
async function showInstagramConfig() {
    // Carregar configuração atual
    let currentLink = '';
    try {
        const response = await axios.get('/api/instagram');
        if (response.data && response.data.valor) {
            currentLink = response.data.valor;
        }
    } catch (error) {
        console.log('Nenhum link Instagram configurado ainda');
    }
    
    const screen = document.getElementById('config-screen');
    screen.innerHTML = `
        <button onclick="showAdminPanel()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">
            <i class="fab fa-instagram mr-2"></i> Configurar Instagram
        </h2>
        
        <div class="space-y-6 config-form">
            <div>
                <label class="block font-semibold mb-2 text-white">Link do Instagram</label>
                <input type="text" 
                       id="instagram-link" 
                       value="${currentLink}" 
                       class="form-input" 
                       placeholder="https://instagram.com/sua_empresa">
                <p class="text-sm text-gray-300 mt-2">
                    <i class="fas fa-info-circle mr-1"></i> 
                    Exemplo: https://instagram.com/beellysemijoias
                </p>
            </div>
            
            <button onclick="salvarInstagram()" class="btn-primary w-full">
                <i class="fas fa-save mr-2"></i> Salvar
            </button>
        </div>
        
        ${currentLink ? `
        <div class="mt-6 p-4 bg-pink-800 rounded-lg">
            <p class="text-white font-semibold mb-2">✅ Preview do botão:</p>
            <a href="${currentLink}" 
               target="_blank" 
               class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700">
                <i class="fab fa-instagram text-xl"></i>
                <span>Instagram</span>
            </a>
        </div>
        ` : ''}
    `;
    showScreen('config-screen');
}

async function salvarInstagram() {
    const link = document.getElementById('instagram-link').value.trim();
    
    if (!link) {
        alert('Por favor, insira o link do Instagram!');
        return;
    }
    
    if (!link.startsWith('https://instagram.com/') && !link.startsWith('https://www.instagram.com/') && !link.startsWith('http')) {
        alert('Link inválido! Use o formato: https://instagram.com/sua_empresa');
        return;
    }
    
    try {
        await axios.post('/api/instagram', { link });
        alert('✅ Link do Instagram salvo com sucesso!');
        showInstagramConfig(); // Recarregar para mostrar preview
    } catch (error) {
        console.error('Erro ao salvar Instagram:', error);
        alert('❌ Erro ao salvar. Tente novamente.');
    }
}

// ================== PIX CONFIG ==================
let pixQRCodeBase64 = null;

async function showPixConfig() {
    // Carregar configuração atual
    let currentPix = { chave: '', qrcode: '' };
    try {
        const response = await axios.get('/api/pix');
        if (response.data) {
            currentPix = response.data;
            pixQRCodeBase64 = currentPix.qrcode;
        }
    } catch (error) {
        console.log('Nenhuma configuração PIX ainda');
    }
    
    const screen = document.getElementById('config-screen');
    screen.innerHTML = `
        <button onclick="showAdminPanel()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">
            <i class="fas fa-qrcode mr-2"></i> Configurar PIX
        </h2>
        
        <div class="space-y-6 config-form">
            <div>
                <label class="block font-semibold mb-2 text-white">Chave PIX</label>
                <input type="text" 
                       id="pix-chave" 
                       value="${currentPix.chave || ''}" 
                       class="form-input" 
                       placeholder="Digite a chave PIX (CPF, CNPJ, email, telefone ou chave aleatória)">
                <p class="text-sm text-gray-300 mt-2">
                    <i class="fas fa-info-circle mr-1"></i> 
                    Pode ser CPF, CNPJ, email, telefone ou chave aleatória
                </p>
            </div>
            
            <div>
                <label class="block font-semibold mb-2 text-white">QR Code PIX</label>
                <div class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800 transition"
                     onclick="document.getElementById('pix-qrcode-input').click()">
                    ${pixQRCodeBase64 ? `
                        <img src="${pixQRCodeBase64}" 
                             alt="QR Code PIX" 
                             id="pix-qrcode-preview"
                             class="mx-auto mb-4"
                             style="max-width: 300px; max-height: 300px;">
                        <p class="text-white">Clique para alterar a imagem</p>
                    ` : `
                        <i class="fas fa-qrcode text-6xl text-gray-400 mb-4"></i>
                        <p class="text-white">Clique para fazer upload do QR Code</p>
                        <p class="text-sm text-gray-400 mt-2">PNG, JPG ou JPEG</p>
                    `}
                </div>
                <input type="file" 
                       id="pix-qrcode-input" 
                       accept="image/*" 
                       style="display: none;" 
                       onchange="handlePixQRCodeUpload(event)">
            </div>
            
            <button onclick="salvarPix()" class="btn-primary w-full">
                <i class="fas fa-save mr-2"></i> Salvar
            </button>
        </div>
        
        ${currentPix.chave || currentPix.qrcode ? `
        <div class="mt-6 p-4 bg-blue-800 rounded-lg">
            <p class="text-white font-semibold mb-3">✅ Preview do botão PIX:</p>
            <button onclick="alert('Modal PIX será aberto no site')" 
                    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i class="fas fa-qrcode text-xl"></i>
                <span>PIX</span>
            </button>
            ${currentPix.chave ? `
                <p class="text-white mt-3"><strong>Chave:</strong> ${currentPix.chave}</p>
            ` : ''}
        </div>
        ` : ''}
    `;
    showScreen('config-screen');
}

function handlePixQRCodeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        pixQRCodeBase64 = e.target.result;
        
        // Atualizar preview
        const preview = document.getElementById('pix-qrcode-preview');
        if (preview) {
            preview.src = pixQRCodeBase64;
        } else {
            // Recarregar a tela para mostrar o preview
            showPixConfig();
        }
    };
    reader.readAsDataURL(file);
}

async function salvarPix() {
    const chave = document.getElementById('pix-chave').value.trim();
    
    if (!chave && !pixQRCodeBase64) {
        alert('Por favor, preencha a chave PIX ou faça upload do QR Code!');
        return;
    }
    
    try {
        await axios.post('/api/pix', { 
            chave: chave || '', 
            qrcode: pixQRCodeBase64 || '' 
        });
        alert('✅ Configuração PIX salva com sucesso!');
        showPixConfig(); // Recarregar para mostrar preview
    } catch (error) {
        console.error('Erro ao salvar PIX:', error);
        alert('❌ Erro ao salvar. Tente novamente.');
    }
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
                <div class="flex items-center gap-2">
                    <span class="text-white font-mono bg-gray-700 px-3 py-2 rounded border-2 border-gray-600">https://wa.me/55</span>
                    <input type="text" id="config-whatsapp" value="${(currentConfig.whatsapp || '').replace('https://wa.me/55', '')}" class="form-input flex-1" placeholder="18996676409" maxlength="11">
                </div>
                <p class="text-sm text-gray-300 mt-1">Digite apenas os números do telefone (DDD + número)</p>
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
        const whatsappNumero = document.getElementById('config-whatsapp').value;
        const whatsappCompleto = whatsappNumero ? `https://wa.me/55${whatsappNumero}` : '';
        
        const updates = {
            admin_password: document.getElementById('config-password').value,
            whatsapp: whatsappCompleto,
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
