// Revela cada "ticket" (OS) com uma leve animação de entrada
// conforme o usuário rola a página.

document.addEventListener('DOMContentLoaded', () => {
  const tickets = document.querySelectorAll('.ticket');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Se o usuário preferir menos movimento, mostra tudo direto, sem animação.
  if (prefersReducedMotion) {
    tickets.forEach(ticket => ticket.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // pequeno atraso escalonado para as "OS" aparecerem em sequência
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, index * 90);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  tickets.forEach(ticket => observer.observe(ticket));

  // Marca visualmente o link de navegação da seção visível no momento.
  const sections = document.querySelectorAll('main section, footer');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    if (section.id) sectionObserver.observe(section);
  });
});
