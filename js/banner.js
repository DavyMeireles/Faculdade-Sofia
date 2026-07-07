document.addEventListener('DOMContentLoaded', function () {
    // Suporte para múltiplos banners
    const bannerWrappers = document.querySelectorAll('[id^="bannerWrapper_"]');

    function closeBannerSession(wrapperId) {
        const bannerWrapper = document.getElementById(wrapperId);
        if (bannerWrapper) {
            bannerWrapper.classList.add('hidden');
            bannerWrapper.style.display = 'none';
            // Armazenar no localStorage por posição
            const posicao = wrapperId.replace('bannerWrapper_', '');
            localStorage.setItem(`banner_closed_${posicao}`, 'true');
            localStorage.setItem(`banner_closed_at_${posicao}`, new Date().toISOString());
        }
    }

    function addGlassEffect(wrapperElement) {
        if (!wrapperElement) return;

        wrapperElement.style.backdropFilter = 'blur(10px)';
        wrapperElement.style.WebkitBackdropFilter = 'blur(10px)';
        wrapperElement.style.background = 'rgba(255, 255, 255, 0.25)';
        wrapperElement.style.borderRadius = '20px';
        wrapperElement.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        wrapperElement.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        wrapperElement.style.transition = 'all 0.3s ease';

        wrapperElement.addEventListener('mouseenter', function () {
            this.style.backdropFilter = 'blur(12px)';
            this.style.background = 'rgba(255, 255, 255, 0.35)';
            this.style.transform = 'translateY(-2px)';
        });

        wrapperElement.addEventListener('mouseleave', function () {
            this.style.backdropFilter = 'blur(10px)';
            this.style.background = 'rgba(255, 255, 255, 0.25)';
            this.style.transform = 'translateY(0)';
        });
    }

    bannerWrappers.forEach(wrapper => {
        const posicao = wrapper.id.replace('bannerWrapper_', '');
        const closeBtn = wrapper.querySelector('.banner-close-btn');
        const storageKey = `banner_closed_${posicao}`;
        const storageTimeKey = `banner_closed_at_${posicao}`;

        // Verificar se foi fechado nas últimas 24h
        const isClosed = localStorage.getItem(storageKey);
        const closedAt = localStorage.getItem(storageTimeKey);

        if (isClosed === 'true' && closedAt) {
            const closedDate = new Date(closedAt);
            const now = new Date();
            const hoursDiff = (now - closedDate) / (1000 * 60 * 60);

            if (hoursDiff < 24) {
                wrapper.style.display = 'none';
            } else {
                localStorage.removeItem(storageKey);
                localStorage.removeItem(storageTimeKey);
                wrapper.style.display = '';
            }
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                closeBannerSession(wrapper.id);
            });
        }

        // Aplicar efeito vidro
        addGlassEffect(wrapper);
    });
});