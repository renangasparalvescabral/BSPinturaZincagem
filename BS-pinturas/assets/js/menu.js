/**
 * Menu Mobile - BS Pinturas
 * Funcionalidades: toggle, fechar ao clicar em link, fechar ao clicar fora,
 * atualizar aria-expanded, bloquear scroll do body
 */

(function() {
  'use strict';

  // Elementos do menu
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  // Verifica se os elementos existem
  if (!menuToggle || !mainNav) return;

  /**
   * Abre o menu mobile
   */
  function openMenu() {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
    mainNav.classList.add('menu-open');
    body.classList.add('menu-open');
  }

  /**
   * Fecha o menu mobile
   */
  function closeMenu() {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    mainNav.classList.remove('menu-open');
    body.classList.remove('menu-open');
  }

  /**
   * Alterna o estado do menu (abrir/fechar)
   */
  function toggleMenu() {
    const isOpen = menuToggle.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Evento de clique no botão hamburger
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Fechar menu ao clicar em qualquer link de navegação
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (mainNav.classList.contains('menu-open')) {
        closeMenu();
      }
    });
  });

  // Fechar menu ao clicar fora (delegação de evento)
  document.addEventListener('click', function(e) {
    if (!mainNav.classList.contains('menu-open')) return;

    const isClickInsideNav = mainNav.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);

    if (!isClickInsideNav && !isClickOnToggle) {
      closeMenu();
    }
  });

  // Fechar menu ao pressionar ESC (acessibilidade)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('menu-open')) {
      closeMenu();
      menuToggle.focus(); // Retorna o foco ao botão
    }
  });

  // Fechar menu ao redimensionar para desktop (opcional)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mainNav.classList.contains('menu-open')) {
      closeMenu();
    }
  });

})();
