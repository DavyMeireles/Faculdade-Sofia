// qrcode.js - VERSÃO CORRIGIDA COM SCROLL FUNCIONANDO

(function initDynamicQRCode() {
    const QR_CODE_LINK = "https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/Mjg1NzE=";

    // Detect mobile device
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)
            || window.innerWidth <= 768;
    }

    // Detect touch device
    function isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    }

    // Aguardar DOM completamente carregado
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    // Também tentar imediatamente se o DOM já estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const qrContainer = document.getElementById('qrCodeContainer');
        const qrCard = document.getElementById('qrCodeCard');
        const closeBtn = document.getElementById('qrCloseBtn');
        const copyBtn = document.getElementById('copyLinkBtn');
        const destText = document.getElementById('qrDestinationText');
        const qrCanvasContainer = document.getElementById('qrCodeCanvas');

        let expanded = false;
        let animationFrameId = null;
        let isHiddenByScroll = false;
        let isManuallyHidden = false;
        let qrcodeInstance = null;

        const bannerWrapper = document.getElementById('bannerWrapper');
        const isMobile = isMobileDevice();
        const isTouch = isTouchDevice();

        // Scroll threshold - mais sensível
        const SCROLL_THRESHOLD = isMobile ? 60 : 100;

        // Verificar se os elementos existem
        if (!qrContainer) {
            console.error('QR Code container não encontrado');
            return;
        }

        // Estado inicial correto
        function setInitialState() {
            // Remove todas as classes de estado
            qrContainer.classList.remove('hidden', 'scroll-hidden', 'expanded');
            isManuallyHidden = false;
            isHiddenByScroll = false;

            // Força o container visível
            qrContainer.style.opacity = '';
            qrContainer.style.visibility = '';

            // Verificar posição inicial do scroll
            setTimeout(function () {
                handleScrollImmediately();
            }, 100);
        }

        // Gerar QR Code
        function generateQRCode(width, height) {
            if (!qrCanvasContainer) return;

            // Limpar container
            while (qrCanvasContainer.firstChild) {
                qrCanvasContainer.removeChild(qrCanvasContainer.firstChild);
            }

            if (typeof QRCode === 'undefined') {
                console.error('QRCode library não carregada');
                showToast("⚠️ Erro ao carregar QR Code", "#dc3545");
                return;
            }

            try {
                let finalWidth = width;
                let finalHeight = height;

                if (isMobile && !expanded) {
                    finalWidth = Math.min(width, 160);
                    finalHeight = Math.min(height, 160);
                }

                qrcodeInstance = new QRCode(qrCanvasContainer, {
                    text: QR_CODE_LINK,
                    width: finalWidth,
                    height: finalHeight,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });

                const canvas = qrCanvasContainer.querySelector('canvas');
                if (canvas) {
                    canvas.style.width = '100%';
                    canvas.style.height = 'auto';
                    if (isMobile) {
                        canvas.style.imageRendering = 'crisp-edges';
                    }
                }

                if (destText) {
                    destText.textContent = "Certificado pelo e-MAC";
                    destText.title = QR_CODE_LINK;
                }
            } catch (error) {
                console.error('Erro ao gerar QR Code:', error);
            }
        }

        // Copiar link
        async function copyLinkToClipboard() {
            try {
                await navigator.clipboard.writeText(QR_CODE_LINK);
                if (copyBtn) {
                    const originalIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.style.background = '#28a745';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalIcon;
                        copyBtn.style.background = '';
                    }, 2000);
                }
                showToast("✅ Link copiado com sucesso!", "#28a745");
            } catch (err) {
                console.error('Erro ao copiar: ', err);
                const textarea = document.createElement('textarea');
                textarea.value = QR_CODE_LINK;
                textarea.style.position = 'fixed';
                textarea.style.top = '-9999px';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();

                let success = false;
                try {
                    success = document.execCommand('copy');
                } catch (e) {
                    console.error('Fallback copy failed:', e);
                }

                document.body.removeChild(textarea);

                if (success) {
                    showToast("✅ Link copiado", "#28a745");
                } else {
                    showToast("❌ Copie o link manualmente", "#dc3545");
                }
            }
        }

        // Toast notification
        function showToast(message, bgColor) {
            const existingToast = document.querySelector('.qr-toast');
            if (existingToast) existingToast.remove();

            const toast = document.createElement('div');
            toast.className = 'qr-toast';
            toast.textContent = message;
            toast.style.cssText = 'position: fixed; bottom: 100px; left: 30px; background: ' + bgColor + '; color: white; padding: 12px 20px; border-radius: 8px; font-size: ' + (isMobile ? '13px' : '14px') + '; font-weight: 500; z-index: 10001; animation: fadeInOut 2.5s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.2); pointer-events: none; max-width: 90vw; text-align: center;';

            if (isMobile) {
                toast.style.top = '20px';
                toast.style.bottom = 'auto';
                toast.style.left = '20px';
                toast.style.right = '20px';
            }

            document.body.appendChild(toast);
            setTimeout(function () { toast.remove(); }, 2500);
        }

        // FUNÇÃO PRINCIPAL DE SCROLL - CORAÇÃO DA SOLUÇÃO
        function handleScrollImmediately() {
            // Se foi fechado manualmente, não interferir
            if (isManuallyHidden || qrContainer.classList.contains('hidden')) {
                return;
            }

            // Se estiver expandido, NUNCA esconder - garantir visibilidade
            if (expanded) {
                if (isHiddenByScroll) {
                    qrContainer.classList.remove('scroll-hidden');
                    isHiddenByScroll = false;
                }
                return;
            }

            // Verificar posição do scroll
            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

            // Determinar se deve esconder
            const shouldHide = scrollY > SCROLL_THRESHOLD;

            // Aplicar ou remover a classe scroll-hidden
            if (shouldHide && !isHiddenByScroll) {
                qrContainer.classList.add('scroll-hidden');
                isHiddenByScroll = true;
            } else if (!shouldHide && isHiddenByScroll) {
                qrContainer.classList.remove('scroll-hidden');
                isHiddenByScroll = false;
            }
        }

        // Handler com requestAnimationFrame para melhor performance
        function handleScrollWithRAF() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(function () {
                handleScrollImmediately();
                animationFrameId = null;
            });
        }

        // Toggle expandir/recolher
        function toggleExpand(event) {
            if (event) {
                event.stopPropagation();
                if (isTouch) {
                    event.preventDefault();
                }
            }

            expanded = !expanded;

            if (expanded) {
                qrContainer.classList.add('expanded');
                // Expandido NUNCA pode ficar escondido por scroll
                if (isHiddenByScroll) {
                    qrContainer.classList.remove('scroll-hidden');
                    isHiddenByScroll = false;
                }
                setTimeout(function () {
                    generateQRCode(250, 250);
                }, 50);
            } else {
                qrContainer.classList.remove('expanded');
                setTimeout(function () {
                    generateQRCode(isMobile ? 160 : 200, isMobile ? 160 : 200);
                    // Reavaliar scroll imediatamente
                    handleScrollImmediately();
                }, 50);
            }
        }

        // Fechar manualmente
        function closeSession() {
            qrContainer.classList.add('hidden');
            qrContainer.classList.remove('scroll-hidden', 'expanded');
            isManuallyHidden = true;
            isHiddenByScroll = false;
            expanded = false;
        }

        // Touch event handlers
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;

        function handleTouchStart(e) {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }

        function handleTouchEnd(e) {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchDistance = Math.abs(touchEndX - touchStartX);
            const touchDistanceY = Math.abs(touchEndY - touchStartY);

            // Detect tap (not swipe)
            if (touchDuration < 300 && touchDistance < 10 && touchDistanceY < 10) {
                const target = e.target;
                if (closeBtn && (target === closeBtn || closeBtn.contains(target))) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeSession();
                } else if (copyBtn && (target === copyBtn || copyBtn.contains(target))) {
                    e.preventDefault();
                    e.stopPropagation();
                    copyLinkToClipboard();
                } else if (qrCard && (target === qrCard || qrCard.contains(target))) {
                    e.preventDefault();
                    toggleExpand(e);
                }
            }
        }

        // Event Listeners
        if (qrCard) {
            if (isTouch) {
                qrCard.addEventListener('touchstart', handleTouchStart, { passive: false });
                qrCard.addEventListener('touchend', handleTouchEnd, { passive: false });
            } else {
                qrCard.addEventListener('click', function (e) {
                    if (closeBtn && (e.target === closeBtn || closeBtn.contains(e.target))) {
                        e.stopPropagation();
                        closeSession();
                        return;
                    }
                    if (copyBtn && (e.target === copyBtn || copyBtn.contains(e.target))) {
                        e.stopPropagation();
                        return;
                    }
                    toggleExpand(e);
                });
            }
        }

        if (closeBtn) {
            if (isTouch) {
                closeBtn.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                closeBtn.addEventListener('touchend', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    closeSession();
                });
            } else {
                closeBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    closeSession();
                });
            }
        }

        if (copyBtn) {
            if (isTouch) {
                copyBtn.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                copyBtn.addEventListener('touchend', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    copyLinkToClipboard();
                });
            } else {
                copyBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    copyLinkToClipboard();
                });
            }
        }

        // Impedir propagação em elementos internos
        var footer = document.querySelector('.qr-code-footer');
        var overlay = document.querySelector('.qr-code-overlay');

        if (footer) {
            footer.addEventListener('click', function (e) { e.stopPropagation(); });
            if (isTouch) {
                footer.addEventListener('touchstart', function (e) { e.stopPropagation(); });
                footer.addEventListener('touchend', function (e) { e.stopPropagation(); });
            }
        }
        if (overlay) {
            overlay.addEventListener('click', function (e) { e.stopPropagation(); });
            if (isTouch) {
                overlay.addEventListener('touchstart', function (e) { e.stopPropagation(); });
                overlay.addEventListener('touchend', function (e) { e.stopPropagation(); });
            }
        }

        // Fechar expandido ao clicar/tocar fora
        if (isTouch) {
            document.addEventListener('touchstart', function (e) {
                if (expanded && qrContainer && !qrContainer.contains(e.target)) {
                    toggleExpand(e);
                }
            });
        } else {
            document.addEventListener('click', function (e) {
                if (expanded && qrContainer && !qrContainer.contains(e.target)) {
                    toggleExpand(e);
                }
            });
        }

        // Scroll listener com performance otimizada
        window.addEventListener('scroll', handleScrollWithRAF);

        // Reavaliar no resize e orientation change - recriar QR code
        window.addEventListener('resize', function () {
            setTimeout(function () {
                handleScrollImmediately();
                if (!expanded) {
                    generateQRCode(isMobile ? 160 : 200, isMobile ? 160 : 200);
                } else {
                    generateQRCode(250, 250);
                }
            }, 100);
        });

        window.addEventListener('orientationchange', function () {
            setTimeout(function () {
                handleScrollImmediately();
                if (!expanded) {
                    generateQRCode(isMobile ? 160 : 200, isMobile ? 160 : 200);
                } else {
                    generateQRCode(250, 250);
                }
            }, 100);
        });

        // Inicialização
        setInitialState();
        generateQRCode(isMobile ? 160 : 200, isMobile ? 160 : 200);

        // Chamar handleScroll imediatamente e após pequeno delay
        handleScrollImmediately();
        setTimeout(handleScrollImmediately, 200);
        setTimeout(handleScrollImmediately, 500);

        console.log('QR Code inicializado - Scroll hide funcionando');
    }

})();