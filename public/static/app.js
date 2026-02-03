// Estado global
let currentConfig = {};
let isAdmin = false;
let currentConsultoraId = null;
let currentRepresentanteId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    applyTheme();
});

// ================== CONFIGURAÇÃO E TEMA ==================
async function loadConfig() {
    try {
        const response = await axios.get('/api/config');
        currentConfig = response.data;
        applyTheme();
        
        // Atualizar elementos da home
        if (currentConfig.nome_empresa) {
            document.getElementById('home-title').textContent = currentConfig.nome_empresa;
        }
        if (currentConfig.logo_empresa) {
            document.getElementById('home-logo').src = currentConfig.logo_empresa;
        }
        if (currentConfig.logo_rodape) {
            const footerLogo = document.getElementById('footer-logo');
            footerLogo.src = currentConfig.logo_rodape;
            footerLogo.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

function applyTheme() {
    document.documentElement.style.setProperty('--color-primary', currentConfig.cor_primaria || '#8B4513');
    document.documentElement.style.setProperty('--color-secondary', currentConfig.cor_secundaria || '#DAA520');
    document.documentElement.style.setProperty('--color-tertiary', currentConfig.cor_terciaria || '#FFD700');
}

// ================== NAVEGAÇÃO ==================
function showScreen(screenId) {
    const screens = ['home-screen', 'admin-login', 'admin-panel', 'config-screen', 
                    'consultoras-list', 'consultora-form', 'representantes-list', 
                    'representante-form', 'explicacoes-screen', 'fotos-screen', 'fotos-admin'];
    screens.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showHome() {
    showScreen('home-screen');
}

function showAdminLogin() {
    showScreen('admin-login');
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
            showScreen('admin-panel');
        } else {
            alert('Senha incorreta!');
        }
    } catch (error) {
        alert('Erro ao fazer login');
    }
}

// ================== CONFIGURAÇÕES ==================
async function showConfigScreen() {
    const screen = document.getElementById('config-screen');
    screen.innerHTML = `
        <button onclick="showScreen('admin-panel')" class="mb-4 text-blue-600">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6">Configurações do Sistema</h2>
        
        <div class="space-y-6">
            <!-- Senha -->
            <div>
                <label class="block font-semibold mb-2">Senha do Administrador</label>
                <input type="password" id="config-password" value="${currentConfig.admin_password || ''}" class="form-input">
            </div>

            <!-- Nome da Empresa -->
            <div>
                <label class="block font-semibold mb-2">Nome da Empresa</label>
                <input type="text" id="config-empresa" value="${currentConfig.nome_empresa || ''}" class="form-input">
            </div>

            <!-- WhatsApp -->
            <div>
                <label class="block font-semibold mb-2">WhatsApp (com DDD, ex: 5518996676409)</label>
                <input type="text" id="config-whatsapp" value="${currentConfig.whatsapp || ''}" class="form-input" placeholder="5518996676409">
            </div>

            <!-- Cores -->
            <div>
                <label class="block font-semibold mb-2">Cor Primária</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor1" value="${currentConfig.cor_primaria || '#8B4513'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_primaria || '#8B4513'}"></div>
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-2">Cor Secundária</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor2" value="${currentConfig.cor_secundaria || '#DAA520'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}"></div>
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-2">Cor Terciária</label>
                <div class="color-picker-container">
                    <input type="color" id="config-cor3" value="${currentConfig.cor_terciaria || '#FFD700'}" class="form-input" style="width: 100px;">
                    <div class="color-preview" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}"></div>
                </div>
            </div>

            <!-- Logo Empresa -->
            <div>
                <label class="block font-semibold mb-2">Logo da Empresa (200x200 pixels)</label>
                ${currentConfig.logo_empresa ? `<img src="${currentConfig.logo_empresa}" class="mb-2" style="max-width: 200px; max-height: 200px;">` : ''}
                <input type="file" id="config-logo" accept="image/*" class="form-input" onchange="previewImage('config-logo')">
            </div>

            <!-- Logo Rodapé -->
            <div>
                <label class="block font-semibold mb-2">Logo Rodapé (60x40 pixels)</label>
                ${currentConfig.logo_rodape ? `<img src="${currentConfig.logo_rodape}" class="mb-2" style="max-width: 60px; max-height: 40px;">` : ''}
                <input type="file" id="config-logo-rodape" accept="image/*" class="form-input" onchange="previewImage('config-logo-rodape')">
            </div>

            <!-- Explicações -->
            <div>
                <label class="block font-semibold mb-2">Explicações</label>
                <textarea id="config-explicacoes" class="form-input" rows="8">${currentConfig.explicacoes || ''}</textarea>
            </div>

            <button onclick="saveConfig()" class="btn-mobile bg-green-600 text-white">
                <i class="fas fa-save mr-2"></i> Salvar Todas as Configurações
            </button>
        </div>
    `;
    
    // Atualizar preview de cores ao mudar
    ['config-cor1', 'config-cor2', 'config-cor3'].forEach(id => {
        document.getElementById(id).addEventListener('input', (e) => {
            e.target.nextElementSibling.style.backgroundColor = e.target.value;
        });
    });
    
    showScreen('config-screen');
}

function previewImage(inputId) {
    const input = document.getElementById(inputId);
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
            nome_empresa: document.getElementById('config-empresa').value,
            whatsapp: document.getElementById('config-whatsapp').value,
            cor_primaria: document.getElementById('config-cor1').value,
            cor_secundaria: document.getElementById('config-cor2').value,
            cor_terciaria: document.getElementById('config-cor3').value,
            explicacoes: document.getElementById('config-explicacoes').value
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

        alert('Configurações salvas com sucesso!');
        await loadConfig();
        showScreen('admin-panel');
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
        alert('Erro ao salvar configurações');
    }
}

// ================== CONSULTORAS ==================
async function showConsultorasList() {
    try {
        const response = await axios.get('/api/consultoras');
        const consultoras = response.data;

        let html = `
            <button onclick="showScreen('admin-panel')" class="mb-4 text-blue-600">
                <i class="fas fa-arrow-left mr-2"></i> Voltar
            </button>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Consultoras</h2>
                <button onclick="showConsultoraForm(null)" class="bg-green-600 text-white px-4 py-2 rounded">
                    <i class="fas fa-plus mr-2"></i> Nova
                </button>
            </div>
            
            <div class="table-container">
                <table class="w-full bg-white shadow rounded">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 text-left">Nome</th>
                            <th class="p-2 text-left">CPF</th>
                            <th class="p-2 text-left">Telefone</th>
                            <th class="p-2 text-center">Ações</th>
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
                        <button onclick="showConsultoraForm(${c.id})" class="text-blue-600 mr-2">
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
        <button onclick="${backFunction}" class="mb-4 text-blue-600">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6">${isEdit ? 'Editar' : 'Cadastro de'} Consultora</h2>
        
        <div class="space-y-4">
            <div>
                <label class="block font-semibold mb-1">Nome Completo *</label>
                <input type="text" id="consultora-nome" value="${consultora.nome_completo}" class="form-input" required>
            </div>

            <div>
                <label class="block font-semibold mb-1">Endereço</label>
                <input type="text" id="consultora-endereco" value="${consultora.endereco || ''}" class="form-input">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1">Bairro</label>
                    <input type="text" id="consultora-bairro" value="${consultora.bairro || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1">CEP</label>
                    <input type="text" id="consultora-cep" value="${consultora.cep || ''}" class="form-input">
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-1">Cidade</label>
                <input type="text" id="consultora-cidade" value="${consultora.cidade || ''}" class="form-input">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1">CPF</label>
                    <input type="text" id="consultora-cpf" value="${consultora.cpf || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1">Telefone</label>
                    <input type="text" id="consultora-telefone" value="${consultora.telefone || ''}" class="form-input">
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-1">Nome do Pai</label>
                <input type="text" id="consultora-pai" value="${consultora.nome_pai || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1">Nome da Mãe</label>
                <input type="text" id="consultora-mae" value="${consultora.nome_mae || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1">Telefone de Referência</label>
                <input type="text" id="consultora-telefone-ref" value="${consultora.telefone_referencia || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1">Nome do Representante</label>
                <input type="text" id="consultora-representante" value="${consultora.nome_representante || ''}" class="form-input">
            </div>

            <div class="border-2 border-gray-300 rounded-lg p-4">
                <p class="mb-2 text-sm">Você está de acordo que se for aprovada em nossa avaliação, irá pegar um MOSTRUÁRIO contendo de 50 PEÇAS ou MAIS, e assinará um CONTRATO explicando todas as cláusulas sobre as VENDAS, ACERTOS, PENDÊNCIAS E DEVOLUÇÃO?</p>
                <div class="flex gap-4">
                    <label class="flex items-center">
                        <input type="radio" name="mostruario" value="sim" ${consultora.aceita_mostruario === 'sim' ? 'checked' : ''} class="mr-2">
                        Sim
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="mostruario" value="nao" ${consultora.aceita_mostruario === 'nao' ? 'checked' : ''} class="mr-2">
                        Não
                    </label>
                </div>
            </div>

            <div class="border-2 border-gray-300 rounded-lg p-4">
                <p class="mb-2 text-sm">Nós somos uma empresa PARCEIRA e por isto acreditamos na confiança de nossas CONSULTORAS. Mas a NÃO DEVOLUÇÃO do MOSTRUÁRIO ao TÉRMINO do CONTRATO, implicará em denúncia com boletim de ocorrência e AÇÃO JUDICIAL, por apropriação indébita artigo 168 do código penal, com previsão de até 1 ano de detenção. Você está ciente disto?</p>
                <div class="flex gap-4">
                    <label class="flex items-center">
                        <input type="radio" name="contrato" value="sim" ${consultora.aceita_contrato === 'sim' ? 'checked' : ''} class="mr-2">
                        Sim
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="contrato" value="nao" ${consultora.aceita_contrato === 'nao' ? 'checked' : ''} class="mr-2">
                        Não
                    </label>
                </div>
            </div>

            <div class="flex gap-2">
                ${isEdit && isAdmin ? `
                    <button onclick="deleteConsultora(${id})" class="flex-1 bg-red-600 text-white py-3 rounded-lg">
                        <i class="fas fa-trash mr-2"></i> Excluir
                    </button>
                ` : ''}
                <button onclick="saveConsultora()" class="flex-1 bg-green-600 text-white py-3 rounded-lg">
                    <i class="fas fa-save mr-2"></i> Gravar
                </button>
                ${!isEdit ? `
                    <button onclick="saveAndSendConsultora()" class="flex-1 bg-blue-600 text-white py-3 rounded-lg">
                        <i class="fab fa-whatsapp mr-2"></i> Gravar e Enviar
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
        alert('Por favor, preencha o nome completo');
        return;
    }

    try {
        if (currentConsultoraId) {
            await axios.put(`/api/consultoras/${currentConsultoraId}`, data);
        } else {
            await axios.post('/api/consultoras', data);
        }
        alert('Consultora salva com sucesso!');
        if (isAdmin) {
            showConsultorasList();
        } else {
            showHome();
        }
    } catch (error) {
        console.error('Erro ao salvar consultora:', error);
        alert('Erro ao salvar consultora');
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
        alert('Por favor, preencha o nome completo');
        return;
    }

    try {
        await axios.post('/api/consultoras', data);
        
        // Enviar via WhatsApp
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

        alert('Consultora cadastrada! Redirecionando para WhatsApp...');
        showHome();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar consultora');
    }
}

async function deleteConsultora(id) {
    if (!confirm('Deseja realmente excluir esta consultora?')) return;

    try {
        await axios.delete(`/api/consultoras/${id}`);
        alert('Consultora excluída com sucesso!');
        showConsultorasList();
    } catch (error) {
        console.error('Erro ao excluir consultora:', error);
        alert('Erro ao excluir consultora');
    }
}

// ================== REPRESENTANTES ==================
async function showRepresentantesList() {
    try {
        const response = await axios.get('/api/representantes');
        const representantes = response.data;

        let html = `
            <button onclick="showScreen('admin-panel')" class="mb-4 text-blue-600">
                <i class="fas fa-arrow-left mr-2"></i> Voltar
            </button>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Representantes</h2>
                <button onclick="showRepresentanteForm(null)" class="bg-green-600 text-white px-4 py-2 rounded">
                    <i class="fas fa-plus mr-2"></i> Novo
                </button>
            </div>
            
            <div class="table-container">
                <table class="w-full bg-white shadow rounded">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 text-left">Nome</th>
                            <th class="p-2 text-left">CPF</th>
                            <th class="p-2 text-left">Telefone</th>
                            <th class="p-2 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        representantes.forEach(r => {
            html += `
                <tr class="border-t">
                    <td class="p-2">${r.nome_completo}</td>
                    <td class="p-2">${r.cpf || ''}</td>
                    <td class="p-2">${r.telefone || ''}</td>
                    <td class="p-2 text-center">
                        <button onclick="showRepresentanteForm(${r.id})" class="text-blue-600 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteRepresentante(${r.id})" class="text-red-600">
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

        document.getElementById('representantes-list').innerHTML = html;
        showScreen('representantes-list');
    } catch (error) {
        console.error('Erro ao carregar representantes:', error);
    }
}

async function showRepresentanteForm(id = null) {
    currentRepresentanteId = id;
    let representante = {
        nome_completo: '', endereco: '', bairro: '', cep: '', cidade: '',
        cpf: '', telefone: '', veiculo: ''
    };

    if (id && isAdmin) {
        const response = await axios.get(`/api/representantes/${id}`);
        representante = response.data;
    }

    const isEdit = id !== null;
    const backFunction = isAdmin ? "showRepresentantesList()" : "showHome()";

    const html = `
        <button onclick="${backFunction}" class="mb-4 text-blue-600">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6">${isEdit ? 'Editar' : 'Cadastro de'} Representante</h2>
        
        <div class="space-y-4">
            <div>
                <label class="block font-semibold mb-1">Nome Completo *</label>
                <input type="text" id="representante-nome" value="${representante.nome_completo}" class="form-input" required>
            </div>

            <div>
                <label class="block font-semibold mb-1">Endereço</label>
                <input type="text" id="representante-endereco" value="${representante.endereco || ''}" class="form-input">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1">Bairro</label>
                    <input type="text" id="representante-bairro" value="${representante.bairro || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1">CEP</label>
                    <input type="text" id="representante-cep" value="${representante.cep || ''}" class="form-input">
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-1">Cidade</label>
                <input type="text" id="representante-cidade" value="${representante.cidade || ''}" class="form-input">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1">CPF</label>
                    <input type="text" id="representante-cpf" value="${representante.cpf || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1">Telefone</label>
                    <input type="text" id="representante-telefone" value="${representante.telefone || ''}" class="form-input">
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-1">Veículo</label>
                <input type="text" id="representante-veiculo" value="${representante.veiculo || ''}" class="form-input">
            </div>

            <div class="flex gap-2">
                ${isEdit && isAdmin ? `
                    <button onclick="deleteRepresentante(${id})" class="flex-1 bg-red-600 text-white py-3 rounded-lg">
                        <i class="fas fa-trash mr-2"></i> Excluir
                    </button>
                ` : ''}
                <button onclick="saveRepresentante()" class="flex-1 bg-green-600 text-white py-3 rounded-lg">
                    <i class="fas fa-save mr-2"></i> Gravar
                </button>
                ${!isEdit ? `
                    <button onclick="saveAndSendRepresentante()" class="flex-1 bg-blue-600 text-white py-3 rounded-lg">
                        <i class="fab fa-whatsapp mr-2"></i> Gravar e Enviar
                    </button>
                ` : ''}
            </div>
        </div>
    `;

    document.getElementById('representante-form').innerHTML = html;
    showScreen('representante-form');
}

async function saveRepresentante() {
    const data = {
        nome_completo: document.getElementById('representante-nome').value,
        endereco: document.getElementById('representante-endereco').value,
        bairro: document.getElementById('representante-bairro').value,
        cep: document.getElementById('representante-cep').value,
        cidade: document.getElementById('representante-cidade').value,
        cpf: document.getElementById('representante-cpf').value,
        telefone: document.getElementById('representante-telefone').value,
        veiculo: document.getElementById('representante-veiculo').value
    };

    if (!data.nome_completo) {
        alert('Por favor, preencha o nome completo');
        return;
    }

    try {
        if (currentRepresentanteId) {
            await axios.put(`/api/representantes/${currentRepresentanteId}`, data);
        } else {
            await axios.post('/api/representantes', data);
        }
        alert('Representante salvo com sucesso!');
        if (isAdmin) {
            showRepresentantesList();
        } else {
            showHome();
        }
    } catch (error) {
        console.error('Erro ao salvar representante:', error);
        alert('Erro ao salvar representante');
    }
}

async function saveAndSendRepresentante() {
    const data = {
        nome_completo: document.getElementById('representante-nome').value,
        endereco: document.getElementById('representante-endereco').value,
        bairro: document.getElementById('representante-bairro').value,
        cep: document.getElementById('representante-cep').value,
        cidade: document.getElementById('representante-cidade').value,
        cpf: document.getElementById('representante-cpf').value,
        telefone: document.getElementById('representante-telefone').value,
        veiculo: document.getElementById('representante-veiculo').value
    };

    if (!data.nome_completo) {
        alert('Por favor, preencha o nome completo');
        return;
    }

    try {
        await axios.post('/api/representantes', data);
        
        // Enviar via WhatsApp
        const message = `
🎯 *NOVO REPRESENTANTE* 🎯

👤 *Nome:* ${data.nome_completo}
📍 *Endereço:* ${data.endereco}
🏘️ *Bairro:* ${data.bairro}
📮 *CEP:* ${data.cep}
🏙️ *Cidade:* ${data.cidade}
📝 *CPF:* ${data.cpf}
📱 *Telefone:* ${data.telefone}
🚗 *Veículo:* ${data.veiculo}
        `.trim();

        const whatsapp = currentConfig.whatsapp || '5518996676409';
        const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        alert('Representante cadastrado! Redirecionando para WhatsApp...');
        showHome();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar representante');
    }
}

async function deleteRepresentante(id) {
    if (!confirm('Deseja realmente excluir este representante?')) return;

    try {
        await axios.delete(`/api/representantes/${id}`);
        alert('Representante excluído com sucesso!');
        showRepresentantesList();
    } catch (error) {
        console.error('Erro ao excluir representante:', error);
        alert('Erro ao excluir representante');
    }
}

// ================== EXPLICAÇÕES ==================
async function showExplicacoes() {
    const html = `
        <button onclick="showHome()" class="mb-4 text-blue-600">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
        <h2 class="text-2xl font-bold mb-6">Explicações</h2>
        <div class="bg-white rounded-lg shadow p-6">
            <div style="white-space: pre-wrap; line-height: 1.6;">${currentConfig.explicacoes || 'Nenhuma explicação cadastrada ainda.'}</div>
        </div>
    `;
    document.getElementById('explicacoes-screen').innerHTML = html;
    showScreen('explicacoes-screen');
}

// ================== FOTOS ==================
async function showFotos() {
    try {
        const response = await axios.get('/api/fotos');
        const fotos = response.data;

        let html = `
            <button onclick="showHome()" class="mb-4 text-blue-600">
                <i class="fas fa-arrow-left mr-2"></i> Voltar
            </button>
            <h2 class="text-2xl font-bold mb-6">Galeria de Fotos</h2>
        `;

        if (fotos.length === 0) {
            html += '<p class="text-center text-gray-500">Nenhuma foto cadastrada ainda.</p>';
        } else {
            html += '<div class="foto-grid">';
            fotos.forEach(foto => {
                html += `
                    <div class="foto-item">
                        <img src="${foto.imagem_base64}" alt="Foto ${foto.id}">
                    </div>
                `;
            });
            html += '</div>';
        }

        document.getElementById('fotos-screen').innerHTML = html;
        showScreen('fotos-screen');
    } catch (error) {
        console.error('Erro ao carregar fotos:', error);
    }
}

async function showFotosAdmin() {
    try {
        const response = await axios.get('/api/fotos');
        const fotos = response.data;

        let html = `
            <button onclick="showScreen('admin-panel')" class="mb-4 text-blue-600">
                <i class="fas fa-arrow-left mr-2"></i> Voltar
            </button>
            <h2 class="text-2xl font-bold mb-6">Gerenciar Fotos</h2>
            
            <div class="mb-6">
                <label class="block font-semibold mb-2">Adicionar Nova Foto (400x600 pixels)</label>
                <input type="file" id="nova-foto" accept="image/*" class="form-input mb-2">
                <button onclick="uploadFoto()" class="bg-green-600 text-white px-6 py-2 rounded">
                    <i class="fas fa-upload mr-2"></i> Salvar Foto
                </button>
            </div>

            <h3 class="text-xl font-bold mb-4">Fotos Cadastradas</h3>
        `;

        if (fotos.length === 0) {
            html += '<p class="text-center text-gray-500">Nenhuma foto cadastrada ainda.</p>';
        } else {
            html += '<div class="foto-grid">';
            fotos.forEach(foto => {
                html += `
                    <div class="foto-item">
                        <img src="${foto.imagem_base64}" alt="Foto ${foto.id}">
                        <button onclick="deleteFoto(${foto.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            });
            html += '</div>';
        }

        document.getElementById('fotos-admin').innerHTML = html;
        showScreen('fotos-admin');
    } catch (error) {
        console.error('Erro ao carregar fotos:', error);
    }
}

async function uploadFoto() {
    const fileInput = document.getElementById('nova-foto');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione uma foto');
        return;
    }

    try {
        const base64 = await fileToBase64(file);
        await axios.post('/api/fotos', { imagem_base64: base64 });
        alert('Foto adicionada com sucesso!');
        showFotosAdmin();
    } catch (error) {
        console.error('Erro ao adicionar foto:', error);
        alert('Erro ao adicionar foto');
    }
}

async function deleteFoto(id) {
    if (!confirm('Deseja realmente excluir esta foto?')) return;

    try {
        await axios.delete(`/api/fotos/${id}`);
        alert('Foto excluída com sucesso!');
        showFotosAdmin();
    } catch (error) {
        console.error('Erro ao excluir foto:', error);
        alert('Erro ao excluir foto');
    }
}

// ================== UTILITÁRIOS ==================
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
