// ================== CONSULTORAS ==================
async function showConsultorasList() {
    try {
        const response = await axios.get('/api/consultoras');
        const consultoras = response.data;

        let html = `
            <button onclick="showAdminPanel()" class="btn-voltar">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold" style="color: white;">${t('consultoras')}</h2>
                <button onclick="showConsultoraForm(null)" style="background: var(--color-tertiary); color: var(--color-quaternary);" class="px-4 py-2 rounded font-bold">
                    <i class="fas fa-plus mr-2"></i> ${t('novo')}
                </button>
            </div>
            
            <div class="mb-4 flex gap-2 flex-wrap">
                <button onclick="generateConsultorasPDF('cidade')" class="btn-relatorio">
                    <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioPorCidade')}
                </button>
                <button onclick="generateConsultorasPDF('nome')" class="btn-relatorio">
                    <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioPorNome')}
                </button>
                <button onclick="generateConsultorasPDF('mes')" class="btn-relatorio">
                    <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioPorMes')}
                </button>
            </div>
            
            <div class="table-container">
                <table class="w-full bg-white shadow rounded">
                    <thead style="background: var(--color-tertiary); color: var(--color-quaternary);">
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
                        <button onclick="showConsultoraForm(${c.id})" style="color: var(--color-tertiary);" class="mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteConsultora(${c.id})" style="color: #dc2626;">
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
        nome_representante: '', aceita_mostruario: 'nao', aceita_contrato: 'nao', mes: ''
    };

    if (id && isAdmin) {
        const response = await axios.get(`/api/consultoras/${id}`);
        consultora = response.data;
    }

    const isEdit = id !== null;
    const backFunction = isAdmin ? "showConsultorasList()" : "showHome()";

    const html = `
        <button onclick="${backFunction}" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${isEdit ? t('editarConsultora') : t('cadastroDeConsultora')}</h2>
        
        <div class="space-y-4 form-container">
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
                <label class="block font-semibold mb-1 text-white">${t('nomeDoPai')}</label>
                <input type="text" id="consultora-pai" value="${consultora.nome_pai || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomeDaMae')}</label>
                <input type="text" id="consultora-mae" value="${consultora.nome_mae || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1 text-white">${t('telefoneReferencia')}</label>
                <input type="text" id="consultora-telefone-ref" value="${consultora.telefone_referencia || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1 text-white">${t('nomeDoRepresentante')}</label>
                <input type="text" id="consultora-representante" value="${consultora.nome_representante || ''}" class="form-input">
            </div>

            <div>
                <label class="block font-semibold mb-1 text-white">${t('mes')}</label>
                <input type="text" id="consultora-mes" value="${consultora.mes || ''}" class="form-input" placeholder="Ex: Janeiro, Fevereiro...">
            </div>

            <div class="border-2 rounded-lg p-4" style="border-color: var(--color-tertiary); background: rgba(255,255,255,0.1);">
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

            <div class="border-2 rounded-lg p-4" style="border-color: var(--color-tertiary); background: rgba(255,255,255,0.1);">
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
                    <button onclick="deleteConsultora(${id})" class="flex-1 py-3 rounded-lg font-bold" style="background: #dc2626; color: white;">
                        <i class="fas fa-trash mr-2"></i> ${t('excluir')}
                    </button>
                ` : ''}
                <button onclick="saveAndSendConsultora()" class="flex-1 py-3 rounded-lg font-bold" style="background: var(--color-tertiary); color: var(--color-quaternary);">
                    <i class="fab fa-whatsapp mr-2"></i> ${t('gravarEnviar')}
                </button>
            </div>
        </div>
    `;

    document.getElementById('consultora-form').innerHTML = html;
    showScreen('consultora-form');
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
        mes: document.getElementById('consultora-mes').value,
        aceita_mostruario: document.querySelector('input[name="mostruario"]:checked')?.value || 'nao',
        aceita_contrato: document.querySelector('input[name="contrato"]:checked')?.value || 'nao'
    };

    if (!data.nome_completo) {
        alert(t('preenchaNome'));
        return;
    }

    try {
        if (currentConsultoraId) {
            await axios.put(`/api/consultoras/${currentConsultoraId}`, data);
        } else {
            await axios.post('/api/consultoras', data);
        }
        
        // Enviar via WhatsApp
        const message = `
🌟 *${t('consultora').toUpperCase()}* 🌟

👤 *${t('nome')}:* ${data.nome_completo}
📍 *${t('endereco')}:* ${data.endereco}
🏘️ *${t('bairro')}:* ${data.bairro}
📮 *${t('cep')}:* ${data.cep}
🏙️ *${t('cidade')}:* ${data.cidade}
📝 *${t('cpf')}:* ${data.cpf}
📱 *${t('telefone')}:* ${data.telefone}

👨 *${t('nomeDoPai')}:* ${data.nome_pai}
👩 *${t('nomeDaMae')}:* ${data.nome_mae}
☎️ *${t('telefoneReferencia')}:* ${data.telefone_referencia}

🤝 *${t('nomeDoRepresentante')}:* ${data.nome_representante}

📦 *Mostruário:* ${data.aceita_mostruario.toUpperCase()}
📋 *Contrato:* ${data.aceita_contrato.toUpperCase()}
        `.trim();

        // WhatsApp já está salvo com prefixo completo (https://wa.me/55...)
        let whatsappFull = currentConfig.whatsapp || 'https://wa.me/5518996676409';
        
        // Se não tiver o prefixo https://wa.me/, adicionar
        if (!whatsappFull.startsWith('https://wa.me/')) {
            whatsappFull = `https://wa.me/${whatsappFull}`;
        }
        
        const url = `${whatsappFull}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        alert(t('consultora') + ' ' + t('cadastrado'));
        if (isAdmin) {
            showConsultorasList();
        } else {
            showHome();
        }
    } catch (error) {
        console.error('Erro:', error);
        alert(t('erroSalvar'));
    }
}

async function deleteConsultora(id) {
    showConfirmModal(
        t('excluir'),
        t('desejaExcluir') + ' ' + t('consultora') + '?',
        async () => {
            try {
                await axios.delete(`/api/consultoras/${id}`);
                alert(t('consultora') + ' ' + t('excluido'));
                showConsultorasList();
            } catch (error) {
                console.error('Erro ao excluir consultora:', error);
                alert(t('erroSalvar'));
            }
        }
    );
}

// Gerar PDF de Consultoras
async function generateConsultorasPDF(type) {
    try {
        let filtro = '';
        let titulo = '';
        
        if (type === 'cidade') {
            titulo = t('relatorioPorCidade');
            filtro = await showInputModal(titulo, t('digiteCidade'));
            if (!filtro) return; // Cancelou ou não digitou
        } else if (type === 'nome') {
            titulo = t('relatorioPorNome');
            filtro = await showInputModal(titulo, t('digiteNome'));
            if (!filtro) return; // Cancelou ou não digitou
        } else if (type === 'mes') {
            titulo = t('relatorioPorMes');
            filtro = await showInputModal(titulo, t('digiteMes'));
            if (!filtro) return; // Cancelou ou não digitou
        }
        
        const response = await axios.get('/api/consultoras');
        let consultoras = response.data;
        
        // Aplicar filtro
        if (type === 'cidade' && filtro) {
            consultoras = consultoras.filter(c => 
                (c.cidade || '').toLowerCase().includes(filtro.toLowerCase())
            );
            consultoras.sort((a, b) => (a.cidade || '').localeCompare(b.cidade || ''));
        } else if (type === 'nome' && filtro) {
            consultoras = consultoras.filter(c => 
                c.nome_completo.toLowerCase().includes(filtro.toLowerCase())
            );
            consultoras.sort((a, b) => a.nome_completo.localeCompare(b.nome_completo));
            
            // Para relatório por nome, criar ficha completa
            if (consultoras.length === 0) {
                alert('Nenhum resultado encontrado!');
                return;
            }
            
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write(`
                <html>
                <head>
                    <title>${t('relatorios')} - ${t('consultoras')}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: ${currentConfig.cor_primaria}; text-align: center; }
                        h2 { color: ${currentConfig.cor_terciaria}; margin-top: 30px; page-break-before: always; }
                        .ficha { border: 2px solid ${currentConfig.cor_terciaria}; padding: 20px; margin-bottom: 30px; border-radius: 8px; }
                        .campo { margin-bottom: 10px; display: flex; }
                        .campo strong { min-width: 200px; color: ${currentConfig.cor_primaria}; }
                        .campo span { flex: 1; }
                        .secao { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
                        @media print {
                            .ficha { page-break-inside: avoid; }
                        }
                    </style>
                </head>
                <body>
                    <h1>${t('relatorios')} - ${t('consultoras')}</h1>
                    <p style="text-align: center;"><strong>${t('relatorioPorNome')}</strong> - Filtro: ${filtro}</p>
                    
                    ${consultoras.map(c => `
                        <div class="ficha">
                            <h2>${c.nome_completo}</h2>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">📋 Dados Pessoais</h3>
                                <div class="campo"><strong>${t('nomeCompleto')}:</strong><span>${c.nome_completo || ''}</span></div>
                                <div class="campo"><strong>${t('cpf')}:</strong><span>${c.cpf || ''}</span></div>
                                <div class="campo"><strong>${t('telefone')}:</strong><span>${c.telefone || ''}</span></div>
                                ${c.mes ? `<div class="campo"><strong>${t('mes')}:</strong><span>${c.mes}</span></div>` : ''}
                            </div>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">📍 Endereço</h3>
                                <div class="campo"><strong>${t('endereco')}:</strong><span>${c.endereco || ''}</span></div>
                                <div class="campo"><strong>${t('bairro')}:</strong><span>${c.bairro || ''}</span></div>
                                <div class="campo"><strong>${t('cidade')}:</strong><span>${c.cidade || ''}</span></div>
                                <div class="campo"><strong>${t('cep')}:</strong><span>${c.cep || ''}</span></div>
                            </div>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">👨‍👩‍👧 Filiação</h3>
                                <div class="campo"><strong>${t('nomeDoPai')}:</strong><span>${c.nome_pai || ''}</span></div>
                                <div class="campo"><strong>${t('nomeDaMae')}:</strong><span>${c.nome_mae || ''}</span></div>
                            </div>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">📞 Contatos</h3>
                                <div class="campo"><strong>${t('telefoneReferencia')}:</strong><span>${c.telefone_referencia || ''}</span></div>
                                <div class="campo"><strong>${t('nomeDoRepresentante')}:</strong><span>${c.nome_representante || ''}</span></div>
                            </div>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">✅ Aceites</h3>
                                <div class="campo"><strong>Aceita Mostruário:</strong><span>${c.aceita_mostruario === 'sim' ? '✅ SIM' : '❌ NÃO'}</span></div>
                                <div class="campo"><strong>Aceita Contrato:</strong><span>${c.aceita_contrato === 'sim' ? '✅ SIM' : '❌ NÃO'}</span></div>
                            </div>
                        </div>
                    `).join('')}
                    
                    <script>
                        window.onload = function() { window.print(); }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
            return;
        } else if (type === 'mes' && filtro) {
            consultoras = consultoras.filter(c => 
                (c.mes || '').toLowerCase().includes(filtro.toLowerCase())
            );
            consultoras.sort((a, b) => (a.mes || '').localeCompare(b.mes || ''));
        }
        
        if (consultoras.length === 0) {
            alert('Nenhum resultado encontrado!');
            return;
        }
        
        // Determinar título do relatório
        let tituloRelatorio = '';
        if (type === 'cidade') {
            tituloRelatorio = t('relatorioPorCidade');
        } else if (type === 'nome') {
            tituloRelatorio = t('relatorioPorNome');
        } else if (type === 'mes') {
            tituloRelatorio = t('relatorioPorMes');
        }
        
        // Criar janela para impressão
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
            <html>
            <head>
                <title>${t('relatorios')} - ${t('consultoras')}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: ${currentConfig.cor_primaria}; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: ${currentConfig.cor_terciaria}; color: ${currentConfig.cor_quaternaria}; padding: 10px; text-align: left; }
                    td { border: 1px solid #ddd; padding: 8px; }
                    tr:nth-child(even) { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>${t('relatorios')} - ${t('consultoras')}</h1>
                <p><strong>${tituloRelatorio}</strong></p>
                <p><em>Filtro: ${filtro}</em></p>
                <table>
                    <thead>
                        <tr>
                            <th>${t('nome')}</th>
                            <th>${t('cidade')}</th>
                            <th>${t('telefone')}</th>
                            <th>${t('cpf')}</th>
                            ${type === 'mes' ? `<th>${t('mes')}</th>` : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${consultoras.map(c => `
                            <tr>
                                <td>${c.nome_completo}</td>
                                <td>${c.cidade || ''}</td>
                                <td>${c.telefone || ''}</td>
                                <td>${c.cpf || ''}</td>
                                ${type === 'mes' ? `<td>${c.mes || ''}</td>` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
    }
}

// ================== REPRESENTANTES ==================
async function showRepresentantesList() {
    try {
        const response = await axios.get('/api/representantes');
        const representantes = response.data;

        let html = `
            <button onclick="showAdminPanel()" class="btn-voltar">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold" style="color: white;">${t('representantes')}</h2>
                <button onclick="showRepresentanteForm(null)" style="background: var(--color-tertiary); color: var(--color-quaternary);" class="px-4 py-2 rounded font-bold">
                    <i class="fas fa-plus mr-2"></i> ${t('novo')}
                </button>
            </div>
            
            <div class="mb-4 flex gap-2">
                <button onclick="generateRepresentantesPDF('cidade')" class="btn-relatorio">
                    <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioPorCidade')}
                </button>
                <button onclick="generateRepresentantesPDF('nome')" class="btn-relatorio">
                    <i class="fas fa-file-pdf mr-2"></i> ${t('relatorioPorNome')}
                </button>
            </div>
            
            <div class="table-container">
                <table class="w-full bg-white shadow rounded">
                    <thead style="background: var(--color-tertiary); color: var(--color-quaternary);">
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
                        <button onclick="showRepresentanteForm(${r.id})" style="color: var(--color-tertiary);" class="mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteRepresentante(${r.id})" style="color: #dc2626;">
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
        <button onclick="${backFunction}" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${isEdit ? t('editarRepresentante') : t('cadastroDeRepresentante')}</h2>
        
        <div class="space-y-4 form-container">
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
                    <button onclick="deleteRepresentante(${id})" class="flex-1 py-3 rounded-lg font-bold" style="background: #dc2626; color: white;">
                        <i class="fas fa-trash mr-2"></i> ${t('excluir')}
                    </button>
                ` : ''}
                <button onclick="saveAndSendRepresentante()" class="flex-1 py-3 rounded-lg font-bold" style="background: var(--color-tertiary); color: var(--color-quaternary);">
                    <i class="fab fa-whatsapp mr-2"></i> ${t('gravarEnviar')}
                </button>
            </div>
        </div>
    `;

    document.getElementById('representante-form').innerHTML = html;
    showScreen('representante-form');
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
        alert(t('preenchaNome'));
        return;
    }

    try {
        if (currentRepresentanteId) {
            await axios.put(`/api/representantes/${currentRepresentanteId}`, data);
        } else {
            await axios.post('/api/representantes', data);
        }
        
        // Enviar via WhatsApp
        const message = `
🎯 *${t('representante').toUpperCase()}* 🎯

👤 *${t('nome')}:* ${data.nome_completo}
📍 *${t('endereco')}:* ${data.endereco}
🏘️ *${t('bairro')}:* ${data.bairro}
📮 *${t('cep')}:* ${data.cep}
🏙️ *${t('cidade')}:* ${data.cidade}
📝 *${t('cpf')}:* ${data.cpf}
📱 *${t('telefone')}:* ${data.telefone}
🚗 *${t('veiculo')}:* ${data.veiculo}
        `.trim();

        // WhatsApp já está salvo com prefixo completo (https://wa.me/55...)
        let whatsappFull = currentConfig.whatsapp || 'https://wa.me/5518996676409';
        
        // Se não tiver o prefixo https://wa.me/, adicionar
        if (!whatsappFull.startsWith('https://wa.me/')) {
            whatsappFull = `https://wa.me/${whatsappFull}`;
        }
        
        const url = `${whatsappFull}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        alert(t('representante') + ' ' + t('cadastrado'));
        if (isAdmin) {
            showRepresentantesList();
        } else {
            showHome();
        }
    } catch (error) {
        console.error('Erro:', error);
        alert(t('erroSalvar'));
    }
}

async function deleteRepresentante(id) {
    showConfirmModal(
        t('excluir'),
        t('desejaExcluir') + ' ' + t('representante') + '?',
        async () => {
            try {
                await axios.delete(`/api/representantes/${id}`);
                alert(t('representante') + ' ' + t('excluido'));
                showRepresentantesList();
            } catch (error) {
                console.error('Erro ao excluir representante:', error);
                alert(t('erroSalvar'));
            }
        }
    );
}

// Gerar PDF de Representantes
async function generateRepresentantesPDF(type) {
    try {
        let filtro = '';
        let titulo = '';
        
        if (type === 'cidade') {
            titulo = t('relatorioPorCidade');
            filtro = await showInputModal(titulo, t('digiteCidade'));
            if (!filtro) return; // Cancelou ou não digitou
        } else if (type === 'nome') {
            titulo = t('relatorioPorNome');
            filtro = await showInputModal(titulo, t('digiteNome'));
            if (!filtro) return; // Cancelou ou não digitou
        }
        
        const response = await axios.get('/api/representantes');
        let representantes = response.data;
        
        // Aplicar filtro
        if (type === 'cidade' && filtro) {
            representantes = representantes.filter(r => 
                (r.cidade || '').toLowerCase().includes(filtro.toLowerCase())
            );
            representantes.sort((a, b) => (a.cidade || '').localeCompare(b.cidade || ''));
        } else if (type === 'nome' && filtro) {
            representantes = representantes.filter(r => 
                r.nome_completo.toLowerCase().includes(filtro.toLowerCase())
            );
            representantes.sort((a, b) => a.nome_completo.localeCompare(b.nome_completo));
            
            // Para relatório por nome, criar ficha completa
            if (representantes.length === 0) {
                alert('Nenhum resultado encontrado!');
                return;
            }
            
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write(`
                <html>
                <head>
                    <title>${t('relatorios')} - ${t('representantes')}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: ${currentConfig.cor_primaria}; text-align: center; }
                        h2 { color: ${currentConfig.cor_terciaria}; margin-top: 30px; page-break-before: always; }
                        .ficha { border: 2px solid ${currentConfig.cor_terciaria}; padding: 20px; margin-bottom: 30px; border-radius: 8px; }
                        .campo { margin-bottom: 10px; display: flex; }
                        .campo strong { min-width: 200px; color: ${currentConfig.cor_primaria}; }
                        .campo span { flex: 1; }
                        .secao { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
                        @media print {
                            .ficha { page-break-inside: avoid; }
                        }
                    </style>
                </head>
                <body>
                    <h1>${t('relatorios')} - ${t('representantes')}</h1>
                    <p style="text-align: center;"><strong>${t('relatorioPorNome')}</strong> - Filtro: ${filtro}</p>
                    
                    ${representantes.map(r => `
                        <div class="ficha">
                            <h2>${r.nome_completo}</h2>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">📋 Dados Pessoais</h3>
                                <div class="campo"><strong>${t('nomeCompleto')}:</strong><span>${r.nome_completo || ''}</span></div>
                                <div class="campo"><strong>${t('cpf')}:</strong><span>${r.cpf || ''}</span></div>
                                <div class="campo"><strong>${t('telefone')}:</strong><span>${r.telefone || ''}</span></div>
                            </div>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">📍 Endereço</h3>
                                <div class="campo"><strong>${t('endereco')}:</strong><span>${r.endereco || ''}</span></div>
                                <div class="campo"><strong>${t('bairro')}:</strong><span>${r.bairro || ''}</span></div>
                                <div class="campo"><strong>${t('cidade')}:</strong><span>${r.cidade || ''}</span></div>
                                <div class="campo"><strong>${t('cep')}:</strong><span>${r.cep || ''}</span></div>
                            </div>
                            
                            <div class="secao">
                                <h3 style="color: ${currentConfig.cor_terciaria};">🚗 Veículo</h3>
                                <div class="campo"><strong>${t('veiculo')}:</strong><span>${r.veiculo || ''}</span></div>
                            </div>
                        </div>
                    `).join('')}
                    
                    <script>
                        window.onload = function() { window.print(); }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
            return;
        }
        
        if (representantes.length === 0) {
            alert('Nenhum resultado encontrado!');
            return;
        }
        
        // Criar janela para impressão
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
            <html>
            <head>
                <title>${t('relatorios')} - ${t('representantes')}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: ${currentConfig.cor_primaria}; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { background: ${currentConfig.cor_terciaria}; color: ${currentConfig.cor_quaternaria}; padding: 10px; text-align: left; }
                    td { border: 1px solid #ddd; padding: 8px; }
                    tr:nth-child(even) { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>${t('relatorios')} - ${t('representantes')}</h1>
                <p><strong>${type === 'cidade' ? t('relatorioPorCidade') : t('relatorioPorNome')}</strong></p>
                <p><em>Filtro: ${filtro}</em></p>
                <table>
                    <thead>
                        <tr>
                            <th>${t('nome')}</th>
                            <th>${t('cidade')}</th>
                            <th>${t('telefone')}</th>
                            <th>${t('veiculo')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${representantes.map(r => `
                            <tr>
                                <td>${r.nome_completo}</td>
                                <td>${r.cidade || ''}</td>
                                <td>${r.telefone || ''}</td>
                                <td>${r.veiculo || ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
    }
}

// ================== EXPLICAÇÕES ==================
async function showExplicacoes() {
    const html = `
        <button onclick="showHome()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('explicacoesTitle')}</h2>
        <div class="bg-white rounded-lg shadow p-6">
            <div style="white-space: pre-wrap; line-height: 1.6;">${currentConfig.explicacoes || t('nenhumaExplicacao')}</div>
        </div>
    `;
    document.getElementById('explicacoes-screen').innerHTML = html;
    showScreen('explicacoes-screen');
}

// ================== QUEM SOMOS ==================
async function showQuemSomos() {
    const html = `
        <button onclick="showHome()" class="btn-voltar">
            <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
        </button>
        <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('quemSomosTitle')}</h2>
        <div class="bg-white rounded-lg shadow p-6">
            <div style="white-space: pre-wrap; line-height: 1.6;">${currentConfig.quem_somos || t('nenhumaInfo')}</div>
        </div>
    `;
    document.getElementById('quem-somos-screen').innerHTML = html;
    showScreen('quem-somos-screen');
}

// ================== FOTOS ==================
async function showFotos() {
    try {
        const response = await axios.get('/api/fotos');
        const fotos = response.data;

        let html = `
            <button onclick="showHome()" class="btn-voltar">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('galeriaFotos')}</h2>
        `;

        if (fotos.length === 0) {
            html += `<p class="text-center text-white">${t('nenhumaFoto')}</p>`;
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
            <button onclick="showAdminPanel()" class="btn-voltar">
                <i class="fas fa-arrow-left mr-2"></i> ${t('voltar')}
            </button>
            <h2 class="text-2xl font-bold mb-6" style="color: white;">${t('gerenciarFotos')}</h2>
            
            <div class="mb-6 config-form">
                <label class="block font-semibold mb-2 text-white">${t('adicionarNovaFoto')}</label>
                <input type="file" id="nova-foto" accept="image/*" class="form-input mb-2">
                <button onclick="uploadFoto()" style="background: var(--color-tertiary); color: var(--color-quaternary);" class="px-6 py-2 rounded font-bold">
                    <i class="fas fa-upload mr-2"></i> ${t('salvarFoto')}
                </button>
            </div>

            <h3 class="text-xl font-bold mb-4 text-white">${t('fotosCadastradas')}</h3>
        `;

        if (fotos.length === 0) {
            html += `<p class="text-center text-white">${t('nenhumaFoto')}</p>`;
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
        alert(t('selecioneFoto'));
        return;
    }

    try {
        const base64 = await fileToBase64(file);
        await axios.post('/api/fotos', { imagem_base64: base64 });
        alert(t('fotoAdicionada'));
        showFotosAdmin();
    } catch (error) {
        console.error('Erro ao adicionar foto:', error);
        alert(t('erroSalvar'));
    }
}

async function deleteFoto(id) {
    showConfirmModal(
        t('excluir'),
        t('desejaExcluir') + ' foto?',
        async () => {
            try {
                await axios.delete(`/api/fotos/${id}`);
                alert('Foto ' + t('excluido'));
                showFotosAdmin();
            } catch (error) {
                console.error('Erro ao excluir foto:', error);
                alert(t('erroSalvar'));
            }
        }
    );
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

// ================== USUÁRIOS ==================
async function showUsuariosList() {
    try {
        const response = await axios.get('/api/usuarios');
        const usuarios = response.data;

        let html = `
            <div class="config-container">
                <div class="flex items-center mb-4">
                    <button onclick="showAdminPanel()" class="btn-voltar">
                        <i class="fas fa-arrow-left"></i> ${t('voltar')}
                    </button>
                </div>
                
                <h2 class="text-2xl font-bold mb-4" style="color: ${currentConfig.cor_primaria || '#876f5e'}">
                    <i class="fas fa-users mr-2"></i>${t('usuarios')}
                </h2>
                
                <div class="mb-4">
                    <button onclick="showUsuarioForm(null)" class="btn-novo">
                        <i class="fas fa-plus"></i> ${t('novo')}
                    </button>
                </div>
                
                <div class="overflow-x-auto">
                    <h3 class="text-xl font-semibold mb-3">${t('usuariosCadastrados')}</h3>
        `;

        if (usuarios.length === 0) {
            html += `<p class="text-gray-600">${t('nenhumUsuarioCadastrado')}</p>`;
        } else {
            html += `
                <table class="min-w-full bg-white">
                    <thead>
                        <tr style="background-color: ${currentConfig.cor_terciaria || '#da8720'}; color: ${currentConfig.cor_quaternaria || '#fafafa'};">
                            <th class="py-2 px-4 text-left">${t('nomeDoUsuario')}</th>
                            <th class="py-2 px-4 text-left">${t('senha')}</th>
                            <th class="py-2 px-4 text-center">${t('acoes')}</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            usuarios.forEach(usuario => {
                html += `
                    <tr class="border-b hover:bg-gray-50">
                        <td class="py-2 px-4">${usuario.username}</td>
                        <td class="py-2 px-4">${usuario.password}</td>
                        <td class="py-2 px-4 text-center">
                            <button onclick="showUsuarioForm(${usuario.id})" class="btn-alterar">
                                <i class="fas fa-edit"></i> ${t('alterar')}
                            </button>
                            <button onclick="deleteUsuario(${usuario.id})" class="btn-excluir">
                                <i class="fas fa-trash"></i> ${t('excluir')}
                            </button>
                        </td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;
        }

        html += `
                </div>
            </div>
        `;

        document.getElementById('usuarios-list').innerHTML = html;
        hideAllScreens();
        document.getElementById('usuarios-list').classList.remove('hidden');
    } catch (error) {
        console.error('Erro:', error);
        alert(t('erroLogin'));
    }
}

async function showUsuarioForm(id = null) {
    currentUsuarioId = id;
    
    let usuario = {
        username: '',
        password: ''
    };

    if (id) {
        try {
            const response = await axios.get(`/api/usuarios/${id}`);
            usuario = response.data;
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
        }
    }

    const isEdit = id !== null;
    const title = isEdit ? t('editarUsuario') : t('cadastroDeUsuario');

    const html = `
        <div class="config-container">
            <div class="flex items-center mb-4">
                <button onclick="showUsuariosList()" class="btn-voltar">
                    <i class="fas fa-arrow-left"></i> ${t('voltar')}
                </button>
            </div>
            
            <h2 class="text-2xl font-bold mb-4" style="color: ${currentConfig.cor_primaria || '#876f5e'}">
                <i class="fas fa-user mr-2"></i>${title}
            </h2>
            
            <form id="usuario-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">${t('nomeDoUsuario')}</label>
                    <input type="text" id="username" value="${usuario.username}" 
                           class="w-full p-2 border rounded" required>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-1">${t('senha')}</label>
                    <input type="text" id="password" value="${usuario.password}" 
                           class="w-full p-2 border rounded" required>
                </div>
                
                <div class="flex gap-2 flex-wrap">
                    ${isEdit ? `
                        <button type="button" onclick="deleteUsuario(${id})" class="btn-excluir">
                            <i class="fas fa-trash"></i> ${t('excluir')}
                        </button>
                    ` : ''}
                    <button type="submit" class="btn-gravar">
                        <i class="fas fa-save"></i> ${t('gravar')}
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('usuario-form').innerHTML = html;
    hideAllScreens();
    document.getElementById('usuario-form').classList.remove('hidden');

    // Form submit handler
    setTimeout(() => {
        document.getElementById('usuario-form').addEventListener('submit', saveUsuario);
    }, 100);
}

async function saveUsuario(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert(t('preenchaNome'));
        return;
    }

    const data = { username, password };

    try {
        if (currentUsuarioId) {
            await axios.put(`/api/usuarios/${currentUsuarioId}`, data);
        } else {
            await axios.post('/api/usuarios', data);
        }

        alert(t('usuarioSalvo'));
        showUsuariosList();
    } catch (error) {
        console.error('Erro:', error);
        alert(t('erroSalvar'));
    }
}

async function deleteUsuario(id) {
    showConfirmModal(
        t('excluir') + ' ' + t('usuarios'),
        t('desejaExcluir') + '?',
        async () => {
            try {
                await axios.delete(`/api/usuarios/${id}`);
                alert(t('usuarioExcluido'));
                showUsuariosList();
            } catch (error) {
                console.error('Erro:', error);
                alert(t('erroSalvar'));
            }
        }
    );
}
