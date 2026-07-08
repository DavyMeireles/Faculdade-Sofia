// wwwroot/js/Footer/newsletterEmail.js (melhorado)
document.addEventListener('DOMContentLoaded', function () {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const messageDiv = document.getElementById('newsletterMessage');

    if (!subscribeBtn || !newsletterEmail) return;

    // Remover mensagem ao digitar
    newsletterEmail.addEventListener('input', function () {
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    });

    subscribeBtn.addEventListener('click', async function () {
        const email = newsletterEmail.value.trim();

        // Validação básica
        if (!email) {
            showMessage('Por favor, digite seu e-mail.', 'danger');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Por favor, digite um e-mail válido.', 'danger');
            return;
        }

        // Desabilitar botão durante requisição
        subscribeBtn.disabled = true;
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();

            if (result.success) {
                showMessage(result.message, 'success');
                newsletterEmail.value = '';
            } else {
                showMessage(result.message, 'danger');
            }
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao conectar com o servidor. Tente novamente.', 'danger');
        } finally {
            subscribeBtn.disabled = false;
            subscribeBtn.innerHTML = 'Inscrever-se';
        }
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return re.test(email);
    }

    function showMessage(message, type) {
        if (!messageDiv) return;

        const icon = type === 'success' ? '✓' : '⚠️';
        const color = type === 'success' ? '#4CAF50' : type === 'danger' ? '#f44336' : '#ff9800';

        messageDiv.innerHTML = `<span style="color: ${color}">${icon} ${message}</span>`;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
});