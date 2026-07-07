// site.js - Versão Corrigida

// ================================================
// CONTROLE DE INICIALIZAÇÃO (Evita loops)
// ================================================
let isInitialized = false;
let initializationInProgress = false;

// ================================================
// FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO
// ================================================
function initializeApp() {
    // Evita inicialização duplicada
    if (initializationInProgress) {
        return;
    }

    if (isInitialized) {
        return;
    }

    initializationInProgress = true;

    try {
        // Inicializar tooltips do Bootstrap
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        // Inicializar popovers
        if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl);
            });
        }

        // Configurar CSRF token para requisições AJAX
        setupCsrfToken();

        // Configurar navegação AJAX para links do menu
        setupAjaxNavigation();

        // Configurar formulários AJAX
        setupAjaxForms();

        // Configurar botões de delete
        setupDeleteButtons();

        // Configurar DataTables se existirem
        setupDataTables();

        // Configurar selects com busca
        setupSelectSearch();

        isInitialized = true;

    } catch (error) {
        console.error('Erro na inicialização:', error);
    } finally {
        initializationInProgress = false;
    }
}

// ================================================
// CONFIGURAR CSRF TOKEN
// ================================================
function setupCsrfToken() {
    var token = document.querySelector('input[name="__RequestVerificationToken"]')?.value;
    if (token) {
        $.ajaxSetup({
            headers: {
                'RequestVerificationToken': token
            }
        });
    }
}

// ================================================
// NAVEGAÇÃO AJAX - CORRIGIDA
// ================================================
function setupAjaxNavigation() {
    // Selecionar links de navegação AJAX
    var ajaxLinks = document.querySelectorAll('#admin-menu a.nav-link, a[data-ajax="true"], .ajax-nav');

    console.log('Configurando navegação AJAX para', ajaxLinks.length, 'links');

    ajaxLinks.forEach(function (link) {
        // Evitar adicionar múltiplos event listeners
        if (link.hasAttribute('data-ajax-initialized')) return;
        link.setAttribute('data-ajax-initialized', 'true');

        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Obter URL - priorizar data-url, depois href
            var url = this.getAttribute('data-url') || this.getAttribute('href');

            console.log('Link clicado:', { url: url, hasDataUrl: this.hasAttribute('data-url'), href: this.getAttribute('href') });

            if (url && url !== '#' && url !== 'javascript:void(0)') {
                loadContentAjax(url, this);
            } else {
                console.warn('Link sem URL válida:', this);
            }
        });
    });
}

// ================================================
// CARREGAR CONTEÚDO VIA AJAX - CORRIGIDA
// ================================================
async function loadContentAjax(url, linkElement) {
    console.log('loadContentAjax chamado para URL:', url);

    // Mostrar loading
    var loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }

    try {
        // Atualizar link ativo no menu
        var activeLinks = document.querySelectorAll('#admin-menu .nav-link.active');
        activeLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        if (linkElement) {
            linkElement.classList.add('active');
            // Atualizar título da página
            var titleText = linkElement.querySelector('span')?.innerText ||
                linkElement.innerText.replace(/[^\w\s]/g, '').trim() ||
                'Dashboard';
            var titleEl = document.getElementById('admin-page-title');
            if (titleEl) titleEl.innerText = titleText;
        }

        // Buscar conteúdo com timeout e melhor tratamento de erro
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        var response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'HX-Request': 'true'
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        var html = await response.text();
        var mainContent = document.getElementById('admin-main-content');

        if (mainContent) {
            // Verificar se a resposta é uma página completa ou partial
            if (html.includes('<!DOCTYPE html>') || html.includes('<html')) {
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                var contentDiv = tempDiv.querySelector('#admin-main-content') ||
                    tempDiv.querySelector('main .container-fluid') ||
                    tempDiv.querySelector('.container-fluid');
                if (contentDiv) {
                    mainContent.innerHTML = contentDiv.innerHTML;
                } else {
                    mainContent.innerHTML = html;
                }
            } else {
                mainContent.innerHTML = html;
            }

            // Re-inicializar componentes do novo conteúdo
            reinitializePageComponents();

            // Atualizar CSRF token se necessário
            setupCsrfToken();

            console.log('Conteúdo carregado com sucesso:', url);
        }

    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        var mainContent = document.getElementById('admin-main-content');
        if (mainContent) {
            var errorMessage = error.name === 'AbortError' ? 'Tempo limite excedido. Tente novamente.' : error.message;
            mainContent.innerHTML = `
                <div class="alert alert-danger m-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Erro ao carregar conteúdo: ${errorMessage}
                    <hr>
                    <small>URL: ${url}</small>
                    <br>
                    <button class="btn btn-sm btn-outline-danger mt-2" onclick="location.reload()">
                        <i class="fas fa-sync-alt me-1"></i> Recarregar Página
                    </button>
                </div>
            `;
        }
    } finally {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }
    }
}

// ================================================
// REINICIALIZAR COMPONENTES DA PÁGINA
// ================================================
function reinitializePageComponents() {
    // Reconfigurar tooltips
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Reconfigurar popovers
    if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    // Reconfigurar DataTables
    setupDataTables();

    // Reconfigurar selects com busca
    setupSelectSearch();

    // Reconfigurar botões de delete
    setupDeleteButtons();

    // Reconfigurar formulários AJAX
    setupAjaxForms();

    // Chamar funções específicas do Analytics se existirem
    if (typeof initAnalyticsCharts === 'function') {
        initAnalyticsCharts();
    }

    if (typeof updateRealTimeMetrics === 'function') {
        updateRealTimeMetrics();
    }

    if (typeof updateTopLandingPages === 'function') {
        updateTopLandingPages();
    }

    if (typeof refreshAnalyticsData === 'function') {
        refreshAnalyticsData();
    }

    // Disparar evento para que outros scripts possam reagir
    var event = new CustomEvent('contentLoaded', { detail: { timestamp: Date.now() } });
    document.dispatchEvent(event);
}

// ================================================
// CONFIGURAR FORMULÁRIOS AJAX
// ================================================
function setupAjaxForms() {
    var ajaxForms = document.querySelectorAll('form[data-ajax="true"]');
    ajaxForms.forEach(function (form) {
        if (form.hasAttribute('data-ajax-initialized')) return;
        form.setAttribute('data-ajax-initialized', 'true');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            var formData = new FormData(this);
            var url = this.getAttribute('action') || window.location.href;
            var method = this.getAttribute('method') || 'POST';

            try {
                var response = await fetch(url, {
                    method: method,
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                var result = await response.text();

                // Atualizar a área de conteúdo
                var targetId = this.getAttribute('data-target') || '#admin-main-content';
                var target = document.querySelector(targetId);
                if (target) {
                    target.innerHTML = result;
                    reinitializePageComponents();
                }

                // Mostrar mensagem de sucesso
                if (response.ok) {
                    showToast('Sucesso!', 'Operação realizada com sucesso.', 'success');
                }

            } catch (error) {
                console.error('Erro no submit do formulário:', error);
                showToast('Erro!', 'Erro ao processar a requisição.', 'danger');
            }
        });
    });
}

// ================================================
// CONFIGURAR BOTÕES DE DELETE
// ================================================
function setupDeleteButtons() {
    var deleteButtons = document.querySelectorAll('.btn-delete, [data-action="delete"]');
    deleteButtons.forEach(function (btn) {
        if (btn.hasAttribute('data-delete-initialized')) return;
        btn.setAttribute('data-delete-initialized', 'true');

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            var message = this.getAttribute('data-confirm') || 'Tem certeza que deseja excluir este item?';

            if (confirm(message)) {
                var formId = this.getAttribute('data-form-id');
                if (formId) {
                    document.getElementById(formId)?.submit();
                } else {
                    var url = this.getAttribute('href') || this.getAttribute('data-url');
                    if (url) {
                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: '__RequestVerificationToken=' + encodeURIComponent(document.querySelector('input[name="__RequestVerificationToken"]')?.value || '')
                        }).then(function () {
                            window.location.reload();
                        });
                    }
                }
            }
        });
    });
}

// ================================================
// CONFIGURAR DATATABLES
// ================================================
function setupDataTables() {
    if (typeof $ !== 'undefined' && $.fn && $.fn.DataTable) {
        $('.datatable').each(function () {
            if (!$.fn.DataTable.isDataTable(this)) {
                $(this).DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json'
                    },
                    responsive: true,
                    autoWidth: false
                });
            }
        });
    }
}

// ================================================
// CONFIGURAR SELECTS COM BUSCA
// ================================================
function setupSelectSearch() {
    if (typeof $.fn !== 'undefined' && $.fn.select2) {
        $('.select2').select2({
            theme: 'bootstrap-5',
            width: '100%',
            placeholder: 'Selecione uma opção...',
            allowClear: true
        });
    }
}

// ================================================
// MOSTRAR TOAST NOTIFICATION
// ================================================
function showToast(title, message, type = 'success') {
    var toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1100';
        document.body.appendChild(toastContainer);
    }

    var toastId = 'toast-' + Date.now();
    var bgClass = type === 'success' ? 'bg-success' : (type === 'danger' ? 'bg-danger' : 'bg-info');

    var toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="5000">
            <div class="toast-header ${bgClass} text-white">
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);

    var toastElement = document.getElementById(toastId);
    if (toastElement && typeof bootstrap !== 'undefined') {
        var toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', function () {
            toastElement.remove();
        });
    }
}

// ================================================
// EXPORTA FUNÇÕES GLOBAIS
// ================================================
window.initializeApp = initializeApp;
window.loadContentAjax = loadContentAjax;
window.reinitializePageComponents = reinitializePageComponents;
window.showToast = showToast;

// ================================================
// INICIALIZAR QUANDO O DOM ESTIVER PRONTO
// ================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    setTimeout(initializeApp, 0);
}

window.validateImageFile = function (file, maxSizeMB = 40) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            message: `Formato não permitido. Use: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}`
        };
    }

    if (file.size > maxSizeBytes) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        return {
            valid: false,
            message: `Arquivo muito grande! ${fileSizeMB}MB. Limite: ${maxSizeMB}MB`
        };
    }

    return { valid: true, message: 'Arquivo válido' };
};