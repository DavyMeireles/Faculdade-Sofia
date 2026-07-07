document.addEventListener('DOMContentLoaded', function () {
    initHeaderScroll();
    initMobileMenu();
    initLogoMenu();
    initStatsAnimation();
    initHealthTopics();
    initSearch();
    initNewsletter();
    initSocialSidebar();
    initSmoothScroll();
    initDropdownPrevention();
});

function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    function isHomePage() {
        const videoHero = document.querySelector('.video-hero');
        return videoHero !== null;
    }

    function updateHeaderState() {
        const isHome = isHomePage();

        if (isHome) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.classList.remove('internal-page');
                document.querySelector('.header-content')?.classList.add('compact');
            } else {
                header.classList.remove('scrolled');
                header.classList.remove('internal-page');
                document.querySelector('.header-content')?.classList.remove('compact');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.add('internal-page');
            if (window.scrollY > 50) {
                document.querySelector('.header-content')?.classList.add('compact');
            } else {
                document.querySelector('.header-content')?.classList.remove('compact');
            }
        }
    }

    window.addEventListener('scroll', updateHeaderState);

    updateHeaderState();

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(updateHeaderState, 100);
        }
    }).observe(document, { subtree: true, childList: true });

    const bodyObserver = new MutationObserver(updateHeaderState);
    bodyObserver.observe(document.body, { childList: true, subtree: true });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavContainer = document.getElementById('mobileNavContainer');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');

    if (!mobileMenuBtn || !mobileNavContainer || !mobileNavOverlay || !mobileCloseBtn) {
        return;
    }

    // Abrir menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNavContainer.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fechar menu
    const closeMobileMenu = () => {
        // Fechar todos os dropdowns
        document.querySelectorAll('.mobile-combo-dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        document.querySelectorAll('.mobile-combo-arrow.active').forEach(arrow => {
            arrow.classList.remove('active');
        });
        document.querySelectorAll('.institutional-submenu-item.active').forEach(item => {
            item.classList.remove('active');
        });

        mobileNavContainer.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    mobileCloseBtn.addEventListener('click', closeMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);

    // Mobile combos toggle
    document.querySelectorAll('.mobile-combo-title').forEach(title => {
        title.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const combo = this.closest('.mobile-nav-combo');
            const dropdown = combo.querySelector('.mobile-combo-dropdown');
            const arrow = this.querySelector('.mobile-combo-arrow');

            if (!dropdown || !arrow) return;

            // Se for submenu, não fechar outros automaticamente
            if (!combo.classList.contains('submenu-mobile')) {
                // Fechar outros combos apenas no primeiro nível
                document.querySelectorAll('.mobile-nav-menu > .mobile-nav-combo > .mobile-combo-dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                        const otherArrow = otherDropdown.closest('.mobile-nav-combo')?.querySelector('.mobile-combo-arrow');
                        if (otherArrow) otherArrow.classList.remove('active');
                    }
                });
            }

            dropdown.classList.toggle('active');
            arrow.classList.toggle('active');
        });
    });
    
    document.querySelectorAll('.mobile-combo-dropdown a, .submenu-dropdown a, .mobile-dropdown-item').forEach(link => {
        link.addEventListener('click', function (e) {
            if (!this.closest('.submenu-mobile')) {
                closeMobileMenu();
            }
        });
    });
}
function initLogoMenu() {
    const logoContainer = document.getElementById('logoContainer');

    if (!logoContainer) {
        return;
    }

    if (window.innerWidth <= 768) {
        logoContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.institutional-submenu-title');

            if (target) {
                e.preventDefault();
                e.stopPropagation();

                const submenuItem = target.closest('.institutional-submenu-item');

                if (submenuItem) {
                    const parent = submenuItem.parentNode;
                    if (parent) {
                        parent.querySelectorAll(':scope > .institutional-submenu-item').forEach(item => {
                            if (item !== submenuItem && item.classList.contains('active')) {
                                item.classList.remove('active');
                            }
                        });
                    }

                    submenuItem.classList.toggle('active');
                }
            }
        });
    }
    const logo = document.getElementById('logoWithMenu');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }
}
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-count') || '0');
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                clearInterval(timer);
            } else {
                stat.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            }
        }, 16);
    });
}
function initHealthTopics() {
    const healthTopics = [
        "Nutricionista", "Endócrino", "Otorrino", "Psicologia", "Ginecologia",
        "Cirurgia Vascular", "Urologia", "Odontologia", "Psiquiatria",
        "Implantodotia Cirurgias", "Plásticas", "Estéticas", "Telemedicina",
        "Cirurgias Plásticas e Estética", "Telemedicina",
    ];

    const topicsContainer = document.getElementById('topicsContainer');
    if (!topicsContainer) return;

    topicsContainer.innerHTML = '';

    healthTopics.forEach(topic => {
        const topicElement = document.createElement('div');
        topicElement.className = 'topic-tag';
        topicElement.innerHTML = `<i class="fas fa-stethoscope"></i> ${topic}`;
        topicsContainer.appendChild(topicElement);
    });
}
function initSearch() {
    const searchButton = document.getElementById('searchButton');
    const heroSearch = document.getElementById('heroSearch');

    if (!searchButton || !heroSearch) return;

    searchButton.addEventListener('click', () => {
        if (heroSearch.value.trim() !== '') {
            alert(`Buscando por: "${heroSearch.value}"`);
        } else {
            alert('Por favor, digite um termo para buscar.');
        }
    });

    heroSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}
function initNewsletter() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');

    if (!subscribeBtn || !newsletterEmail) return;

    subscribeBtn.addEventListener('click', () => {
        const email = newsletterEmail.value.trim();
        if (email && email.includes('@') && email.includes('.')) {
            alert(`Obrigado por se inscrever!`);
            newsletterEmail.value = '';
        } else {
            alert('Por favor, insira um endereço de email válido.');
        }
    });
}
function initSocialSidebar() {
    const socialSidebar = document.querySelector('.social-sidebar');
    if (!socialSidebar) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop > lastScrollTop && scrollTop > 200 && scrollTop < documentHeight - windowHeight - 100) {
            if (window.innerWidth <= 768) {
                socialSidebar.style.transform = 'translateX(-50%) translateY(100px)';
            } else {
                socialSidebar.style.transform = 'translateY(calc(-50% + 100px))';
            }
            socialSidebar.style.opacity = '0';
            socialSidebar.style.visibility = 'hidden';
        } else {
            if (window.innerWidth <= 768) {
                socialSidebar.style.transform = 'translateX(-50%) translateY(0)';
            } else {
                socialSidebar.style.transform = 'translateY(-50%)';
            }
            socialSidebar.style.opacity = '1';
            socialSidebar.style.visibility = 'visible';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    if (window.innerWidth <= 768) {
        socialSidebar.style.transform = 'translateX(-50%)';
    }
}
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '' || href === '#home') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 75; // Alterado de 80 para 75
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}
function initDropdownPrevention() {
    document.querySelectorAll('.combo-dropdown, .institutional-dropdown, .submenu-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    document.querySelectorAll('.nav-combo, .logo-container').forEach(container => {
        container.addEventListener('mouseleave', (e) => {
            setTimeout(() => {
                if (!container.matches(':hover')) {
                }
            }, 100);
        });
    });

}

document.addEventListener('click', function (e) {
    if (e.target.closest('#logoContainer') || e.target.closest('#logoWithMenu')) {
        e.stopPropagation();
    }
});

window.addEventListener('load', function () {
    const dropdowns = document.querySelectorAll('.combo-dropdown, .institutional-dropdown');
    dropdowns.forEach(dropdown => {
        const parent = dropdown.closest('.nav-combo, .logo-container');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            });

            parent.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (!parent.matches(':hover')) {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateY(10px)';
                    }
                }, 100);
            });
        }
    });
});

function toggleAccordion(header) {
    var content = header.nextElementSibling;
    var icon = header.querySelector('.fa-chevron-down');

    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            animation: true,
            delay: { show: 200, hide: 100 },
            trigger: 'hover'
        });
    });
});

function initResponsiveMenu() {
    const menuTextMap = {
        'CLÍNICA ESCOLA SANTA SOFIA': 'CLÍNICA',
        'Técnico em Enfermagem': 'Enfermagem',
        'Técnico em Farmácia': 'Farmácia',
        'Técnico em Desenvolvimento de Sistemas': 'Dev. Sistemas',
        'Técnico em Administração': 'Administração',
        'Graduação em Psicologia': 'Psicologia',
        'Graduação em Enfermagem': 'Enfermagem',
        'Graduação em Administração': 'Administração'
    };

    document.querySelectorAll('.combo-title .menu-text').forEach(el => {
        const fullText = el.textContent.trim();
        if (menuTextMap[fullText]) {
            const shortSpan = document.createElement('span');
            shortSpan.className = 'menu-text short-text';
            shortSpan.textContent = menuTextMap[fullText];
            shortSpan.style.display = 'none';
            el.parentNode.insertBefore(shortSpan, el.nextSibling);
            el.classList.add('full-text');
        }
    });
    function updateMenuText() {
        const width = window.innerWidth;
        document.querySelectorAll('.combo-title').forEach(title => {
            const fullText = title.querySelector('.full-text');
            const shortText = title.querySelector('.short-text');

            if (fullText && shortText) {
                if (width <= 1100 && width > 992) {
                    fullText.style.display = 'none';
                    shortText.style.display = 'inline';
                } else {
                    fullText.style.display = 'inline';
                    shortText.style.display = 'none';
                }
            }
        });
    }

    window.addEventListener('resize', updateMenuText);
    updateMenuText();
}
document.addEventListener('DOMContentLoaded', function () {
    initResponsiveMenu();
});
function checkWindowSize() {
    const width = window.innerWidth;
    const navWrapper = document.querySelector('.nav-wrapper');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const headerActions = document.querySelector('.header-actions');

    if (width <= 1050) {
        if (navWrapper) navWrapper.style.display = 'none';
        if (headerActions) headerActions.style.display = 'none';
        if (mobileBtn) mobileBtn.style.display = 'block';

        const mobileNav = document.getElementById('mobileNavContainer');
        const mobileOverlay = document.getElementById('mobileNavOverlay');
        if (mobileNav && mobileOverlay) {
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    } else {
        if (navWrapper) navWrapper.style.display = 'flex';
        if (headerActions) headerActions.style.display = 'flex';
        if (mobileBtn) mobileBtn.style.display = 'none';
    }
}

window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', function () {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(checkWindowSize, 100);
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNavContainer');
        const mobileOverlay = document.getElementById('mobileNavOverlay');

        if (mobileNav && mobileNav.classList.contains('active')) {
            document.querySelectorAll('.mobile-combo-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.mobile-combo-arrow.active').forEach(arrow => {
                arrow.classList.remove('active');
            });

            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});