// Aseguramos que el código se ejecute cuando el HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    console.log("¡Sitio web de Sebastián Larovere listo y cargado! 🚀");

    // Tabs behavior
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(targetId, button) {
        tabButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        tabContents.forEach(c => { c.classList.remove('active'); c.setAttribute('hidden', ''); });

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        const target = document.querySelector(targetId);
        if (target) {
            target.classList.add('active');
            target.removeAttribute('hidden');
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tabTarget;
            activateTab(target, btn);
        });
    });

    // Seleccionamos las tarjetas dentro de la pestaña Products para la interactividad
    const tarjetasServicios = document.querySelectorAll('#products .tarjeta-servicio');

    tarjetasServicios.forEach((tarjeta) => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.addEventListener('click', () => {
            const nombreServicio = tarjeta.querySelector('h3').innerText;
            alert(`Thanks for your interest in ${nombreServicio}! More details about this service will be available soon.`);
        });
    });

    const bookInterviewButton = document.getElementById('book-interview');
    const contactTabButton = document.querySelector('.tab-button[data-tab-target="#contact"]');
    const contactForm = document.querySelector('.contact-form');

    if (bookInterviewButton && contactTabButton) {
        bookInterviewButton.addEventListener('click', () => {
            activateTab('#contact', contactTabButton);
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        // Cambiamos el texto del botón para mostrar que se está enviando
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("¡Message sent successfully! I will get back to you soon. 🚀");
                contactForm.reset();
            } else {
                alert("Oops! Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not connect to the server. Please check your internet connection.");
        } finally {
            // Restauramos el botón
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}
});