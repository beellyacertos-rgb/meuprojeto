// ============ ESTADO GLOBAL ============
let currentConfig = {}, isAdmin = false, currentConsultoraId = null, currentRepresentanteId = null, pendingLogout = false;

document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    applyTheme();
    updateTexts();
});

async function loadConfig() {
    try {
        const {data} = await axios.get('/api/config');
        currentConfig = data;
        applyTheme();
        if (data.logo_empresa) document.getElementById('home-logo').src = data.logo_empresa;
        if (data.logo_rodape) {
            const logo = document.getElementById('footer-logo');
            logo.src = data.logo_rodape;
            logo.classList.remove('hidden');
        }
    } catch (e) { console.error(e); }
}

function applyTheme() {
    const r = document.documentElement, c = currentConfig;
    r.style.setProperty('--color-primary', c.cor_primaria || '#8B4513');
    r.style.setProperty('--color-secondary', c.cor_secundaria || '#DAA520');
    r.style.setProperty('--color-tertiary', c.cor_terciaria || '#FFD700');
    r.style.setProperty('--color-quaternary', c.cor_quaternaria || '#FFFFFF');
    document.getElementById('app-body').style.backgroundColor = c.cor_primaria || '#8B4513';
    document.getElementById('app-footer').style.backgroundColor = c.cor_secundaria || '#DAA520';
}

// ============ NAVEGAÇÃO ============
function showScreen(id) {
    ['home-screen','admin-login','admin-panel','config-screen','consultoras-list','consultora-form',
     'representantes-list','representante-form','explicacoes-screen','fotos-screen','fotos-admin','quem-somos-screen']
    .forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    window.scrollTo(0,0);
    updateTexts();
}

function showHome() { isAdmin ? showConfirmModal() : showScreen('home-screen'); }

// ============ MODALS ============
function customAlert(msg) {
    const m = document.createElement('div');
    m.className = 'modal-overlay';
    m.innerHTML = `<div class="modal-content"><p class="text-lg mb-4">${msg}</p>
        <button onclick="this.closest('.modal-overlay').remove()" class="btn-action btn-primary w-full">OK</button></div>`;
    document.body.appendChild(m);
}

function customConfirm(msg, cb) {
    const m = document.createElement('div');
    m.className = 'modal-overlay';
    m.innerHTML = `<div class="modal-content"><p class="text-lg mb-4">${msg}</p>
        <div class="flex gap-4">
            <button onclick="handleConfirm(true)" class="flex-1 btn-action btn-success"><span data-i18n="sim"></span></button>
            <button onclick="handleConfirm(false)" class="flex-1 btn-action btn-danger"><span data-i18n="nao"></span></button>
        </div></div>`;
    document.body.appendChild(m);
    updateTexts();
    window.handleConfirm = (r) => { m.remove(); cb(r); delete window.handleConfirm; };
}

function showConfirmModal() {
    document.getElementById('confirm-modal').classList.remove('hidden');
    updateTexts();
}

function confirmExit(confirm) {
    document.getElementById('confirm-modal').classList.add('hidden');
    if (confirm) {
        if (pendingLogout) { isAdmin = false; pendingLogout = false; }
        showScreen('home-screen');
    }
}

// ============ LOGIN ============
function showAdminLogin() {
    document.getElementById('admin-login').innerHTML = `
        <button onclick="showHome()" class="btn-back"><i class="fas fa-arrow-left"></i> <span data-i18n="voltar"></span></button>
        <h2 class="text-2xl font-bold mb-6" data-i18n="areaAdmin"></h2>
        <div class="space-y-4">
            <input type="password" id="admin-password" placeholder="${t('digiteSenha')}" class="form-input">
            <button onclick="login()" class="btn-action btn-success w-full">
                <i class="fas fa-sign-in-alt mr-2"></i><span data-i18n="entrar"></span></button>
        </div>`;
    showScreen('admin-login');
}

async function login() {
    try {
        const {data} = await axios.post('/api/login', {password: document.getElementById('admin-password').value});
        data.success ? (isAdmin = true, showAdminPanel()) : customAlert(t('senhaIncorreta'));
    } catch(e) { customAlert(t('senhaIncorreta')); }
}

function logout() { pendingLogout = true; showConfirmModal(); }

function showAdminPanel() {
    document.getElementById('admin-panel').innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold" data-i18n="painelAdmin"></h2>
            <button onclick="logout()" class="text-red-600 font-bold">
                <i class="fas fa-sign-out-alt mr-2"></i><span data-i18n="sair"></span></button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <button onclick="showConfigScreen()" class="btn-grid">
                <i class="fas fa-cog text-4xl mb-2"></i><i class="fas fa-palette text-2xl mb-2"></i><span data-i18n="configuracoes"></span></button>
            <button onclick="showConsultorasList()" class="btn-grid">
                <i class="fas fa-users text-4xl mb-2"></i><i class="fas fa-gem text-2xl mb-2"></i><span data-i18n="gerenciarConsultoras"></span></button>
            <button onclick="showRepresentantesList()" class="btn-grid">
                <i class="fas fa-id-badge text-4xl mb-2"></i><i class="fas fa-briefcase text-2xl mb-2"></i><span data-i18n="gerenciarRepresentantes"></span></button>
            <button onclick="showFotosAdmin()" class="btn-grid">
                <i class="fas fa-camera text-4xl mb-2"></i><i class="fas fa-images text-2xl mb-2"></i><span data-i18n="gerenciarFotos"></span></button>
        </div>`;
    showScreen('admin-panel');
}

// ============ CONFIGURAÇÕES (continuação no próximo bloco) ============
