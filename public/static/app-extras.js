// ================== REPRESENTANTES ==================
async function showRepresentantesList() {
    try {
        const response = await axios.get('/api/representantes');
        const representantes = response.data;
        
        let html = `
            <button onclick="showAdminPanel()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-white">${t('representantes')}</h2>
                <button onclick="showRepresentanteForm(null)" class="px-4 py-2 rounded text-white" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                    <i class="fas fa-plus mr-2"></i> ${t('novo')}
                </button>
            </div>
            
            <div class="mb-4 space-y-2">
                <h3 class="text-lg font-semibold text-white">${t('relatorios')}</h3>
                <div class="flex gap-2 flex-wrap">
                    <button onclick="gerarRelatorioPDFRepresentantes('cidade')" class="px-4 py-2 rounded text-white" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
                        <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioCidade')}
                    </button>
                    <button onclick="gerarRelatorioPDFRepresentantes('nome')" class="px-4 py-2 rounded text-white" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
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
        
        representantes.forEach(r => {
            html += `
                <tr class="border-t">
                    <td class="p-2">${r.nome_completo}</td>
                    <td class="p-2">${r.cpf || ''}</td>
                    <td class="p-2">${r.telefone || ''}</td>
                    <td class="p-2 text-center">
                        <button onclick="showRepresentanteForm(${r.id})" style="color: ${currentConfig.cor_terciaria || '#FFD700'}" class="mr-2">
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
        <button onclick="${backFunction}" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6 text-white">${isEdit ? t('editar') : t('cadastro')} ${t('representantes')}</h2>
        
        <div class="space-y-4">
            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomeCompleto')} *</label>
                <input type="text" id="representante-nome" value="${representante.nome_completo}" class="form-input" required>
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('endereco')}</label>
                <input type="text" id="representante-endereco" value="${representante.endereco || ''}" class="form-input">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('bairro')}</label>
                    <input type="text" id="representante-bairro" value="${representante.bairro || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('cep')}</label>
                    <input type="text" id="representante-cep" value="${representante.cep || ''}" class="form-input">
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('cidade')}</label>
                <input type="text" id="representante-cidade" value="${representante.cidade || ''}" class="form-input">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('cpf')}</label>
                    <input type="text" id="representante-cpf" value="${representante.cpf || ''}" class="form-input">
                </div>
                <div>
                    <label class="block font-semibold mb-1 text-white">${t('telefone')}</label>
                    <input type="text" id="representante-telefone" value="${representante.telefone || ''}" class="form-input">
                </div>
            </div>
            
            <div>
                <label class="block font-semibold mb-1 text-white">${t('veiculo')}</label>
                <input type="text" id="representante-veiculo" value="${representante.veiculo || ''}" class="form-input">
            </div>
            
            <div class="flex gap-2">
                ${isEdit && isAdmin ? `
                    <button onclick="deleteRepresentante(${id})" class="flex-1 bg-red-600 text-white py-3 rounded-lg">
                        <i class="fas fa-trash mr-2"></i> ${t('excluir')}
                    </button>
                ` : ''}
                <button onclick="saveRepresentante()" class="flex-1 text-white py-3 rounded-lg" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                    <i class="fas fa-save mr-2"></i> ${t('gravar')}
                </button>
                ${!isEdit ? `
                    <button onclick="saveAndSendRepresentante()" class="flex-1 text-white py-3 rounded-lg" style="background-color: ${currentConfig.cor_secundaria || '#DAA520'}">
                        <i class="fab fa-whatsapp mr-2"></i> ${t('gravarEnviar')}
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
        showAlert(t('preenchaNome'), 'error');
        return;
    }
    
    try {
        if (currentRepresentanteId) {
            await axios.put(`/api/representantes/${currentRepresentanteId}`, data);
        } else {
            await axios.post('/api/representantes', data);
        }
        showAlert(t('salvoSucesso'), 'success');
        if (isAdmin) {
            showRepresentantesList();
        } else {
            showHome();
        }
    } catch (error) {
        console.error('Erro ao salvar representante:', error);
        showAlert(t('erroSalvar'), 'error');
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
        showAlert(t('preenchaNome'), 'error');
        return;
    }
    
    try {
        await axios.post('/api/representantes', data);
        
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
        
        showAlert(t('cadastrado'), 'success');
        showHome();
    } catch (error) {
        console.error('Erro:', error);
        showAlert(t('erroSalvar'), 'error');
    }
}

async function deleteRepresentante(id) {
    showConfirm(`${t('desejaExcluir')} ${t('representantes').toLowerCase()}?`, async (confirmed) => {
        if (!confirmed) return;
        
        try {
            await axios.delete(`/api/representantes/${id}`);
            showAlert(t('excluido'), 'success');
            showRepresentantesList();
        } catch (error) {
            console.error('Erro ao excluir representante:', error);
            showAlert(t('erroSalvar'), 'error');
        }
    });
}

// ================== EXPLICAÇÕES ==================
async function showExplicacoes() {
    const html = `
        <button onclick="showHome()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6 text-white">${t('explicacoes')}</h2>
        <div class="bg-white rounded-lg shadow p-6">
            <div style="white-space: pre-wrap; line-height: 1.6;">${currentConfig.explicacoes || t('nenhumCadastro')}</div>
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
            <button onclick="showHome()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <h2 class="text-2xl font-bold mb-6 text-white">${t('fotos')}</h2>
        `;
        
        if (fotos.length === 0) {
            html += `<p class="text-center text-white">${t('nenhumCadastro')}</p>`;
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
            <button onclick="showAdminPanel()" class="mb-4" style="color: ${currentConfig.cor_terciaria || '#FFD700'}">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <h2 class="text-2xl font-bold mb-6 text-white">${t('gerenciarFotos')}</h2>
            
            <div class="mb-6">
                <label class="block font-semibold mb-2 text-white">${t('logoEmpresa')}</label>
                <input type="file" id="nova-foto" accept="image/*" class="form-input mb-2">
                <button onclick="uploadFoto()" class="px-6 py-2 rounded text-white" style="background-color: ${currentConfig.cor_terciaria || '#FFD700'}">
                    <i class="fas fa-upload mr-2"></i> ${t('salvar')}
                </button>
            </div>
            
            <h3 class="text-xl font-bold mb-4 text-white">${t('fotos')}</h3>
        `;
        
        if (fotos.length === 0) {
            html += `<p class="text-center text-white">${t('nenhumCadastro')}</p>`;
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
        showAlert(t('selecioneArquivo'), 'error');
        return;
    }
    
    try {
        const base64 = await fileToBase64(file);
        await axios.post('/api/fotos', { imagem_base64: base64 });
        showAlert(t('adicionado'), 'success');
        showFotosAdmin();
    } catch (error) {
        console.error('Erro ao adicionar foto:', error);
        showAlert(t('erroSalvar'), 'error');
    }
}

async function deleteFoto(id) {
    showConfirm(`${t('desejaExcluir')} ${t('fotos').toLowerCase()}?`, async (confirmed) => {
        if (!confirmed) return;
        
        try {
            await axios.delete(`/api/fotos/${id}`);
            showAlert(t('excluido'), 'success');
            showFotosAdmin();
        } catch (error) {
            console.error('Erro ao excluir foto:', error);
            showAlert(t('erroSalvar'), 'error');
        }
    });
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
