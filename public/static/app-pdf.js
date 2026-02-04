// ================== GERAÇÃO DE RELATÓRIOS PDF ==================

async function gerarRelatorioPDFConsultoras(tipo) {
    try {
        const response = await axios.get('/api/consultoras');
        let consultoras = response.data;
        
        if (consultoras.length === 0) {
            showAlert(t('nenhumCadastro'), 'info');
            return;
        }
        
        // Ordenar por cidade ou nome
        if (tipo === 'cidade') {
            consultoras.sort((a, b) => (a.cidade || '').localeCompare(b.cidade || ''));
        } else {
            consultoras.sort((a, b) => a.nome_completo.localeCompare(b.nome_completo));
        }
        
        // Criar PDF usando jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurar título
        doc.setFontSize(18);
        doc.setTextColor(139, 69, 19); // Cor primária
        doc.text(currentConfig.nome_empresa || 'Semi Jóias', 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text(`Relatório de Consultoras - ${tipo === 'cidade' ? 'Por Cidade' : 'Por Nome'}`, 105, 30, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, 105, 38, { align: 'center' });
        
        let y = 50;
        let currentCity = '';
        
        consultoras.forEach((c, index) => {
            // Nova página se necessário
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            // Cabeçalho de cidade se ordenado por cidade
            if (tipo === 'cidade' && c.cidade !== currentCity) {
                currentCity = c.cidade || 'Sem cidade';
                doc.setFontSize(12);
                doc.setTextColor(218, 165, 32); // Cor secundária
                doc.text(`Cidade: ${currentCity}`, 10, y);
                y += 8;
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
            }
            
            // Dados da consultora
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${c.nome_completo}`, 10, y);
            y += 6;
            
            doc.setFont(undefined, 'normal');
            doc.text(`   CPF: ${c.cpf || 'Não informado'}`, 10, y);
            y += 5;
            doc.text(`   Telefone: ${c.telefone || 'Não informado'}`, 10, y);
            y += 5;
            doc.text(`   Endereço: ${c.endereco || 'Não informado'}, ${c.bairro || ''} - ${c.cidade || ''}`, 10, y);
            y += 5;
            doc.text(`   CEP: ${c.cep || 'Não informado'}`, 10, y);
            y += 5;
            doc.text(`   Representante: ${c.nome_representante || 'Não informado'}`, 10, y);
            y += 8;
        });
        
        // Rodapé
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Página ${i} de ${totalPages}`, 105, 290, { align: 'center' });
            doc.text('Vsual Consultoria em Marketing - 18 99667-6409', 105, 295, { align: 'center' });
        }
        
        // Salvar PDF
        doc.save(`consultoras_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`);
        showAlert('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showAlert('Erro ao gerar PDF', 'error');
    }
}

async function gerarRelatorioPDFRepresentantes(tipo) {
    try {
        const response = await axios.get('/api/representantes');
        let representantes = response.data;
        
        if (representantes.length === 0) {
            showAlert(t('nenhumCadastro'), 'info');
            return;
        }
        
        // Ordenar por cidade ou nome
        if (tipo === 'cidade') {
            representantes.sort((a, b) => (a.cidade || '').localeCompare(b.cidade || ''));
        } else {
            representantes.sort((a, b) => a.nome_completo.localeCompare(b.nome_completo));
        }
        
        // Criar PDF usando jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurar título
        doc.setFontSize(18);
        doc.setTextColor(139, 69, 19); // Cor primária
        doc.text(currentConfig.nome_empresa || 'Semi Jóias', 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text(`Relatório de Representantes - ${tipo === 'cidade' ? 'Por Cidade' : 'Por Nome'}`, 105, 30, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Data: ${new Date().toLocaleString('pt-BR')}`, 105, 38, { align: 'center' });
        
        let y = 50;
        let currentCity = '';
        
        representantes.forEach((r, index) => {
            // Nova página se necessário
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            // Cabeçalho de cidade se ordenado por cidade
            if (tipo === 'cidade' && r.cidade !== currentCity) {
                currentCity = r.cidade || 'Sem cidade';
                doc.setFontSize(12);
                doc.setTextColor(218, 165, 32); // Cor secundária
                doc.text(`Cidade: ${currentCity}`, 10, y);
                y += 8;
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
            }
            
            // Dados do representante
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${r.nome_completo}`, 10, y);
            y += 6;
            
            doc.setFont(undefined, 'normal');
            doc.text(`   CPF: ${r.cpf || 'Não informado'}`, 10, y);
            y += 5;
            doc.text(`   Telefone: ${r.telefone || 'Não informado'}`, 10, y);
            y += 5;
            doc.text(`   Endereço: ${r.endereco || 'Não informado'}, ${r.bairro || ''} - ${r.cidade || ''}`, 10, y);
            y += 5;
            doc.text(`   CEP: ${r.cep || 'Não informado'}`, 10, y);
            y += 5;
            doc.text(`   Veículo: ${r.veiculo || 'Não informado'}`, 10, y);
            y += 8;
        });
        
        // Rodapé
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Página ${i} de ${totalPages}`, 105, 290, { align: 'center' });
            doc.text('Vsual Consultoria em Marketing - 18 99667-6409', 105, 295, { align: 'center' });
        }
        
        // Salvar PDF
        doc.save(`representantes_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`);
        showAlert('PDF gerado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showAlert('Erro ao gerar PDF', 'error');
    }
}
