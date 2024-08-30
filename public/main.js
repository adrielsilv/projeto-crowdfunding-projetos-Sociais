document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.donate');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Obrigado por apoiar o projeto!');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#register');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Cadastro pendente');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.project-card, .step, .testimonial').forEach(el => {
        observer.observe(el);
    });
});
