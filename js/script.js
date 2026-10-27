document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".cabecalho-principal");
    const menuToggle = document.querySelector(".botao-menu");
    const navbar = document.querySelector(".barra-navegacao");
    const progress = document.querySelector(".scroll-progress");
    const navLinks = document.querySelectorAll(".links-navegacao a");
    const sections = [...document.querySelectorAll("main section[id]")];

    // Header + barra de progresso
    const updateScrollUI = () => {
        const y = window.scrollY;
        header?.classList.toggle("scrolled", y > 20);
        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
        }
    };
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    // Menu mobile
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            const active = navbar.classList.toggle("ativa");
            menuToggle.classList.toggle("open", active);
            menuToggle.setAttribute("aria-expanded", String(active));
            menuToggle.setAttribute("aria-label", active ? "Fechar menu" : "Abrir menu");
        });

        navLinks.forEach(link => link.addEventListener("click", () => {
            navbar.classList.remove("ativa");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }));
    }

    // Seção ativa no menu
    const setActiveSection = () => {
        const y = window.scrollY + 150;
        let current = sections[0]?.id;
        sections.forEach(section => {
            if (y >= section.offsetTop) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle("ativo", link.getAttribute("href") === `#${current}` || link.getAttribute("href") === `index.html#${current}`);
        });
    };
    window.addEventListener("scroll", setActiveSection, { passive: true });
    setActiveSection();

    // Entrada suave dos elementos
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(el => observer.observe(el));
    } else {
        revealItems.forEach(el => el.classList.add("visible"));
    }

    // Contadores da primeira dobra
    const counters = document.querySelectorAll("[data-counter]");
    const counterObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = Number(el.dataset.counter);
            const suffix = el.dataset.suffix || "";
            const duration = 1200;
            const start = performance.now();

            const tick = now => {
                const progressValue = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progressValue, 3);
                el.textContent = `${Math.round(target * eased)}${suffix}`;
                if (progressValue < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.7 }) : null;

    counters.forEach(el => counterObserver?.observe(el));

    // Formulário: evita o alerta antigo e mostra feedback no próprio botão.
    const form = document.getElementById("mobcar-form");
    if (form) {
        form.addEventListener("submit", () => {
            const button = form.querySelector(".botao-enviar");
            if (!button) return;
            button.disabled = true;
            button.innerHTML = "Enviando... <span>⌁</span>";
            setTimeout(() => {
                button.innerHTML = "Mensagem enviada <span>✓</span>";
            }, 900);
        });
    }
});