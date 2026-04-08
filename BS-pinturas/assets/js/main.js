/**
 * BS Pinturas - JavaScript Principal
 * Funcionalidades: Menu mobile, Intersection Observer, Header scroll, Smooth scroll
 */

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // Menu Hamburguer (Mobile)
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.setAttribute('aria-expanded', !isExpanded);
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================
  // Intersection Observer - Animações de Entrada
  // ========================================
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-up, .slide-left, .slide-right, .scale-in'
  );

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Opcional: parar de observar depois da primeira vez
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ========================================
  // Header - Mudança de estilo ao scrollar
  // ========================================
  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (header) {
      // Adicionar classe quando scrollar além de 50px
      if (scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }

      // Ocultar/mostrar header ao scrollar para baixo/cima (opcional)
      if (scrollY > lastScrollY && scrollY > 200) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // ========================================
  // Scroll Suave para Âncoras
  // ========================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Ignorar se for apenas "#"
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Focar no elemento para acessibilidade
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });

  // ========================================
  // Botão Scroll para Hero (seta animada)
  // ========================================
  const heroScroll = document.querySelector('.hero-scroll');

  if (heroScroll) {
    heroScroll.addEventListener('click', function() {
      const heroSection = document.querySelector('.hero');
      const nextSection = heroSection ? heroSection.nextElementSibling : null;

      if (nextSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

});

// ========================================
// CSS Dinâmico para Header (adicionado via JS)
// ========================================
const headerStyles = document.createElement('style');
headerStyles.textContent = `
  .site-header {
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .site-header.header-scrolled {
    background-color: rgba(13, 13, 13, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .site-header.header-hidden {
    transform: translateY(-100%);
  }
`;
document.head.appendChild(headerStyles);
