// system.js - Versão Corrigida

// ================================================
// CONTROLE DE ESTADO
// ================================================
let systemInitialized = false;
let initCount = 0;
const MAX_INIT_ATTEMPTS = 3;

// ================================================
// INICIALIZAÇÃO DO SISTEMA
// ================================================
function initializeSystem() {
    initCount++;

    if (initCount > MAX_INIT_ATTEMPTS) {
        console.warn('Número máximo de tentativas de inicialização atingido. Parando...');
        return;
    }

    if (systemInitialized) {
       // console.log('System.js já inicializado');
        return;
    }

    //console.log('System.js inicializado (tentativa ' + initCount + ')');

    try {
        // Configurar navegação do menu
        setupSystemNavigation();

        // Configurar logout
        setupLogout();

        // Configurar refresh de analytics se estiver na página
        setupAnalyticsRefresh();

        systemInitialized = true;

    } catch (error) {
        //console.error('Erro ao inicializar System.js:', error);
    }
}

// ================================================
// NAVEGAÇÃO DO SISTEMA
// ================================================
function setupSystemNavigation() {
    // Remover listeners antigos para evitar duplicação
    var oldLinks = document.querySelectorAll('#admin-menu a[data-nav-initialized]');
    oldLinks.forEach(function (link) {
        link.removeAttribute('data-nav-initialized');
    });

    // Configurar novos links
    var navLinks = document.querySelectorAll('#admin-menu a');
    navLinks.forEach(function (link) {
        if (link.hasAttribute('data-nav-initialized')) return;

        var href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('http')) {
            link.setAttribute('data-nav-initialized', 'true');

            // Remover listener antigo se existir e adicionar novo
            var newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);

            newLink.addEventListener('click', function (e) {
                var url = this.getAttribute('href');
                if (url && url !== '#' && !this.hasAttribute('data-no-ajax')) {
                    e.preventDefault();

                    // Atualizar link ativo
                    var allLinks = document.querySelectorAll('#admin-menu .nav-link');
                    allLinks.forEach(function (l) {
                        l.classList.remove('active');
                    });
                    this.classList.add('active');

                    // Carregar conteúdo via AJAX
                    if (typeof loadContentAjax === 'function') {
                        loadContentAjax(url, this);
                    } else if (typeof loadContent === 'function') {
                        loadContent(url, this);
                    } else {
                        window.location.href = url;
                    }
                }
            });
        }
    });
}

// ================================================
// CONFIGURAR LOGOUT
// ================================================
function setupLogout() {
    var logoutBtn = document.querySelector('a[href*="logout"], #logout-btn, .logout-link');
    if (logoutBtn && !logoutBtn.hasAttribute('data-logout-initialized')) {
        logoutBtn.setAttribute('data-logout-initialized', 'true');

        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            var form = document.getElementById('logoutForm');
            if (form) {
                form.submit();
            } else {
                window.location.href = '/Account/Logout';
            }
        });
    }
}

// ================================================
// CONFIGURAR REFRESH DO ANALYTICS
// ================================================
function setupAnalyticsRefresh() {
    // Verificar se está na página de analytics
    var refreshBtn = document.getElementById('refreshAnalyticsBtn');
    if (refreshBtn && !refreshBtn.hasAttribute('data-refresh-initialized')) {
        refreshBtn.setAttribute('data-refresh-initialized', 'true');

        refreshBtn.addEventListener('click', function () {
            if (typeof refreshAnalyticsData === 'function') {
                refreshAnalyticsData();
            } else if (typeof refreshAllData === 'function') {
                refreshAllData();
            } else if (typeof refreshData === 'function') {
                refreshData();
            }
        });
    }
}

// ================================================
// FUNÇÃO DE FALLBACK PARA REINICIALIZAÇÃO
// ================================================
function reinitializeComponents() {
   // console.log('Reinicializando componentes (fallback)...');

    // Não chamar recursivamente
    if (window._reinitializing) return;
    window._reinitializing = true;

    try {
        setupSystemNavigation();
        setupLogout();
        setupAnalyticsRefresh();

        // Disparar evento de recarga
        var event = new CustomEvent('componentsReinitialized');
        document.dispatchEvent(event);

    } catch (error) {
       // console.error('Erro na reinicialização:', error);
    } finally {
        setTimeout(function () {
            window._reinitializing = false;
        }, 500);
    }
}

// ================================================
// EXPORTA FUNÇÕES GLOBAIS
// ================================================
window.initializeSystem = initializeSystem;
window.reinitializeComponents = reinitializeComponents;
window.setupSystemNavigation = setupSystemNavigation;

// ================================================
// INICIALIZAR
// ================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem);
} else {
    setTimeout(initializeSystem, 0);
}

// Escutar evento de conteúdo carregado via AJAX
document.addEventListener('contentLoaded', function () {
   // console.log('Conteúdo carregado, reinicializando navegação...');
    setTimeout(setupSystemNavigation, 100);
});

document.addEventListener('componentsReinitialized', function () {
    //console.log('Componentes reinicializados');
});