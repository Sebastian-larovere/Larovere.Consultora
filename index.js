document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    const themeLabels = {
        dark: 'Activar modo claro',
        light: 'Activar modo oscuro'
    };

    function updateThemeButton(theme) {
        if (!themeToggle) return;
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? themeLabels.dark : themeLabels.light);
        themeToggle.title = theme === 'dark' ? themeLabels.dark : themeLabels.light;
    }

    function applyTheme(theme) {
        document.body.classList.toggle('dark', theme === 'dark');
        updateThemeButton(theme);
    }

    function loadTheme() {
        const storedTheme = localStorage.getItem('site-theme');
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function saveTheme(theme) {
        localStorage.setItem('site-theme', theme);
    }

    if (themeToggle) {
        const currentTheme = loadTheme();
        applyTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    if (form && status) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;
            status.textContent = '';

            const formData = new FormData(form);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    status.textContent = 'Mensaje enviado correctamente. Gracias por contactarnos.';
                    form.reset();
                } else {
                    status.textContent = 'No pudimos enviar el mensaje. Intenta nuevamente en unos minutos.';
                }
            } catch (error) {
                console.error('Error al enviar formulario:', error);
                status.textContent = 'Hubo un problema de conexión. Intenta nuevamente.';
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});