window.mostrarOpcoes = async function (cursoId, cursoNome, opcoes) {
    console.log('mostrarOpcoes chamado:', { cursoId, cursoNome, opcoes });

    try {
        // Verificar se opcoes já foi passado (do HTML)
        let opcoesData = opcoes;

        // Se não foi passado, buscar via API
        if (!opcoesData || (Array.isArray(opcoesData) && opcoesData.length === 0)) {
            const response = await fetch(`/PrecoCurso/GetOpcoesParcelamento?cursoId=${cursoId}&cursoNome=${encodeURIComponent(cursoNome)}`);
            const html = await response.text();

            // Criar container temporário para o modal
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            document.body.appendChild(tempDiv);

            // Mostrar modal
            const modalElement = document.getElementById('opcoesParcelamentoModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        } else {
            // Usar dados passados diretamente
            mostrarModalComDados(cursoId, cursoNome, opcoesData);
        }
    } catch (error) {
        console.error('Erro ao buscar opções:', error);
        mostrarToast('error', 'Erro', 'Não foi possível carregar as opções de parcelamento.');
    }
};

function mostrarModalComDados(cursoId, cursoNome, opcoes) {
    // Verificar se o modal já existe, se não, criar
    let modalElement = document.getElementById('opcoesParcelamentoModal');

    if (!modalElement) {
        // Criar modal dinamicamente
        const modalHtml = criarModalHtml(cursoId, cursoNome, opcoes);
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modalElement = document.getElementById('opcoesParcelamentoModal');
    } else {
        // Atualizar conteúdo do modal existente
        atualizarModalContent(modalElement, cursoId, cursoNome, opcoes);
    }

    // Mostrar modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

function criarModalHtml(cursoId, cursoNome, opcoes) {
    // Calcular valor total (primeira opção ou 890.00)
    const valorTotal = opcoes && opcoes.length > 0 && opcoes[0].valorTotal
        ? opcoes[0].valorTotal
        : 890.00;

    let tableRows = '';

    if (opcoes && opcoes.length > 0) {
        for (const opcao of opcoes) {
            const economiaValor = opcao.economia || 0;
            const temEconomia = economiaValor > 0;

            tableRows += `
                <tr>
                    <td>${opcao.parcelas === 1 ? '<span class="badge bg-primary">À Vista</span>' : '<span class="badge bg-secondary">Parcelado</span>'}</td>
                    <td class="text-center fw-bold">${opcao.parcelas}x</td>
                    <td class="text-end fw-bold">R$ ${formatarMoeda(opcao.valorParcela || (opcao.valorTotal / opcao.parcelas))}</td>
                    <td class="text-end">R$ ${formatarMoeda(opcao.valorTotal)}</td>
                    <td class="text-end ${temEconomia ? 'text-success' : 'text-muted'}">
                        ${temEconomia ? `R$ ${formatarMoeda(economiaValor)}` : '-'}
                    </td>
                    <td class="text-center">
                        <button type="button" class="btn btn-sm btn-success" onclick="selecionarParcelamento(${cursoId}, ${opcao.parcelas}, ${(opcao.valorParcela || (opcao.valorTotal / opcao.parcelas)).toString().replace(',', '.')}, '${escapeHtml(cursoNome)}')">
                            <i class="fas fa-check"></i> Selecionar
                        </button>
                    </td>
                </tr>
            `;
        }
    } else {
        // Opções padrão se nenhuma for fornecida
        const valorBase = 890.00;
        const opcoesPadrao = [
            { parcelas: 1, valorParcela: valorBase * 0.95, valorTotal: valorBase * 0.95, economia: valorBase * 0.05 },
            { parcelas: 3, valorParcela: valorBase / 3, valorTotal: valorBase, economia: 0 },
            { parcelas: 6, valorParcela: valorBase / 6, valorTotal: valorBase, economia: 0 },
            { parcelas: 9, valorParcela: (valorBase * 1.0675) / 9, valorTotal: valorBase * 1.0675, economia: -(valorBase * 0.0675) },
            { parcelas: 12, valorParcela: (valorBase * 1.144) / 12, valorTotal: valorBase * 1.144, economia: -(valorBase * 0.144) }
        ];

        for (const opcao of opcoesPadrao) {
            tableRows += `
                <tr>
                    <td>${opcao.parcelas === 1 ? '<span class="badge bg-primary">À Vista</span>' : '<span class="badge bg-secondary">Parcelado</span>'}</td>
                    <td class="text-center fw-bold">${opcao.parcelas}x</td>
                    <td class="text-end fw-bold">R$ ${opcao.valorParcela.toFixed(2)}</td>
                    <td class="text-end">R$ ${opcao.valorTotal.toFixed(2)}</td>
                    <td class="text-end ${opcao.economia > 0 ? 'text-success' : 'text-muted'}">
                        ${opcao.economia > 0 ? `R$ ${opcao.economia.toFixed(2)}` : (opcao.economia < 0 ? `+ R$ ${Math.abs(opcao.economia).toFixed(2)}` : '-')}
                    </td>
                    <td class="text-center">
                        <button type="button" class="btn btn-sm btn-success" onclick="selecionarParcelamento(${cursoId}, ${opcao.parcelas}, ${opcao.valorParcela}, '${escapeHtml(cursoNome)}')">
                            <i class="fas fa-check"></i> Selecionar
                        </button>
                    </td>
                </tr>
            `;
        }
    }

    return `
        <div class="modal fade" id="opcoesParcelamentoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-credit-card me-2"></i>
                            Opções de Parcelamento - ${escapeHtml(cursoNome)}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Valor total do curso: <strong>R$ ${valorTotal.toFixed(2)}</strong>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Opção</th>
                                        <th>Nº Parcelas</th>
                                        <th>Valor por Parcela</th>
                                        <th>Valor Total</th>
                                        <th>Economia</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-3">
                            <small class="text-muted">
                                <i class="fas fa-shield-alt me-1"></i>
                                * Os valores incluem todos os impostos e taxas. Consulte o edital para mais informações.
                            </small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i> Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function atualizarModalContent(modalElement, cursoId, cursoNome, opcoes) {
    const modalBody = modalElement.querySelector('.modal-body');
    const modalTitle = modalElement.querySelector('.modal-title');

    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-credit-card me-2"></i> Opções de Parcelamento - ${escapeHtml(cursoNome)}`;
    }

    if (modalBody) {
        // Reconstruir o conteúdo do body
        const valorBase = opcoes && opcoes.length > 0 && opcoes[0].valorTotal ? opcoes[0].valorTotal : 890.00;

        let tableRows = '';
        for (const opcao of opcoes) {
            const economiaValor = opcao.economia || 0;
            const temEconomia = economiaValor > 0;

            tableRows += `
                <tr>
                    <td>${opcao.parcelas === 1 ? '<span class="badge bg-primary">À Vista</span>' : '<span class="badge bg-secondary">Parcelado</span>'}</td>
                    <td class="text-center fw-bold">${opcao.parcelas}x</td>
                    <td class="text-end fw-bold">R$ ${formatarMoeda(opcao.valorParcela || (opcao.valorTotal / opcao.parcelas))}</td>
                    <td class="text-end">R$ ${formatarMoeda(opcao.valorTotal)}</td>
                    <td class="text-end ${temEconomia ? 'text-success' : 'text-muted'}">
                        ${temEconomia ? `R$ ${formatarMoeda(economiaValor)}` : '-'}
                    </td>
                    <td class="text-center">
                        <button type="button" class="btn btn-sm btn-success" onclick="selecionarParcelamento(${cursoId}, ${opcao.parcelas}, ${(opcao.valorParcela || (opcao.valorTotal / opcao.parcelas)).toString().replace(',', '.')}, '${escapeHtml(cursoNome)}')">
                            <i class="fas fa-check"></i> Selecionar
                        </button>
                    </td>
                </tr>
            `;
        }

        modalBody.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>
                Valor total do curso: <strong>R$ ${valorBase.toFixed(2)}</strong>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Opção</th>
                            <th>Nº Parcelas</th>
                            <th>Valor por Parcela</th>
                            <th>Valor Total</th>
                            <th>Economia</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
            <div class="mt-3">
                <small class="text-muted">
                    <i class="fas fa-shield-alt me-1"></i>
                    * Os valores incluem todos os impostos e taxas. Consulte o edital para mais informações.
                </small>
            </div>
        `;
    }
}

function selecionarParcelamento(cursoId, parcelas, valorParcela, cursoNome) {
    // Salvar no sessionStorage
    const opcaoSelecionada = {
        cursoId: cursoId,
        parcelas: parcelas,
        valorParcela: valorParcela,
        cursoNome: cursoNome,
        dataSelecao: new Date().toISOString()
    };

    sessionStorage.setItem('opcaoParcelamento', JSON.stringify(opcaoSelecionada));

    // Fechar modal
    const modalElement = document.getElementById('opcoesParcelamentoModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }

    // Mostrar toast de confirmação
    mostrarToast('success', 'Opção Selecionada',
        `Parcelamento em ${parcelas}x de R$ ${formatarMoeda(valorParcela)} selecionado para ${cursoNome}`);

    // Preencher campos do formulário se existirem
    const campoParcelas = document.getElementById('NumeroParcelas');
    const campoValor = document.getElementById('ValorMensalidade');
    const campoParcelasHidden = document.querySelector('input[name="NumeroParcelas"]');
    const campoValorHidden = document.querySelector('input[name="ValorMensalidade"]');

    if (campoParcelas) campoParcelas.value = parcelas;
    if (campoValor) campoValor.value = valorParcela;
    if (campoParcelasHidden) campoParcelasHidden.value = parcelas;
    if (campoValorHidden) campoValorHidden.value = valorParcela;

    // Disparar evento customizado
    window.dispatchEvent(new CustomEvent('parcelamentoSelecionado', {
        detail: { cursoId, parcelas, valorParcela, cursoNome }
    }));
}

function formatarMoeda(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function escapeHtml(texto) {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function mostrarToast(tipo, titulo, mensagem) {
    let toastContainer = document.querySelector('.toast-container-custom');

    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container-custom position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1100';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = tipo === 'success' ? 'bg-success' : (tipo === 'error' ? 'bg-danger' : 'bg-info');

    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="5000">
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${escapeHtml(titulo)}</strong><br>
                    <small>${escapeHtml(mensagem)}</small>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);

    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 5000 });
        toast.show();
    } else {
        // Fallback se Bootstrap JS não estiver disponível
        toastElement.classList.add('show');
        setTimeout(() => toastElement.remove(), 5000);
    }

    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

// Garantir que o Bootstrap está disponível
document.addEventListener('DOMContentLoaded', function () {
    if (typeof bootstrap === 'undefined') {
        console.warn('Bootstrap não encontrado. Carregando...');
        // Tentar carregar Bootstrap se não existir
        const bootstrapLink = document.createElement('link');
        bootstrapLink.rel = 'stylesheet';
        bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        document.head.appendChild(bootstrapLink);

        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.onload = () => console.log('Bootstrap carregado com sucesso');
        document.body.appendChild(bootstrapScript);
    }
});