document.addEventListener('DOMContentLoaded', () => {
    
    
    // MENU MOBILE (HAMBÚRGUER)
    const menuToggle = document.querySelector('.botao-menu');
    const navbar = document.querySelector('.barra-navegacao');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('ativa');
            
            // Efeito visual simples de rotação nas barras do botão
            const bars = menuToggle.querySelectorAll('.barra');
            bars.forEach(bar => bar.classList.toggle('open'));
        });
    }

    // Fechar menu mobile ao clicar em um link
    const navLinksList = document.querySelectorAll('.links-navegacao a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('ativa')) {
                navbar.classList.remove('ativa');
            }
        });
    });

    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Ajuste de offset para o topo fixo do header
            const sectionTop = current.offsetTop - 120; 
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.links-navegacao a[href*=' + sectionId + ']')?.classList.add('ativo');
            } else {
                document.querySelector('.links-navegacao a[href*=' + sectionId + ']')?.classList.remove('ativo');
            }
        });
    });

    const contactForm = document.getElementById('mobcar-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            
            // Capturando dados inseridos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validação simples local (opcional)
            if (name && email && message) {
                // Aqui entraria a integração com sua API/Back-end
                console.log('Formulário enviado com sucesso!', { name, email, message });
                
                // Feedback visual temporário de sucesso
                alert(`Obrigado pelo contato, ${name}! Sua mensagem foi enviada.`);
                
                // Limpa o formulário
                contactForm.reset();
            }
        });
    }
});