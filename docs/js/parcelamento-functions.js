// Função global para mostrar opções de parcelamento
window.mostrarOpcoes = function (cursoId, cursoNome, opcoesData) {
    console.log('mostrarOpcoes chamado:', { cursoId, cursoNome, opcoesData });

    // Verificar se o modal já existe e remover
    let modalExistente = document.getElementById('opcoesParcelamentoModal');
    if (modalExistente) {
        modalExistente.remove();
    }

    // Buscar via AJAX
    fetch(`/System/GetOpcoesParcelamento?cursoId=${cursoId}&cursoNome=${encodeURIComponent(cursoNome)}`)
        .then(response => response.text())
        .then(html => {
            // Inserir o modal no DOM
            document.body.insertAdjacentHTML('beforeend', html);

            // Mostrar o modal
            const modalElement = document.getElementById('opcoesParcelamentoModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar opções:', error);
            alert('Erro ao carregar opções de parcelamento. Tente novamente.');
        });
};

// Garantir que o Bootstrap está disponível
document.addEventListener('DOMContentLoaded', function () {
    console.log('Parcelamento functions carregado');

    if (typeof bootstrap === 'undefined') {
        console.warn('Bootstrap não encontrado. Certifique-se de que o Bootstrap JS está carregado.');
    }
});