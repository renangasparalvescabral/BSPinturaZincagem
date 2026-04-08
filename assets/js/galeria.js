/**
 * galeria.js — BS Pinturas
 * Filtro por categoria + Lightbox com navegação
 */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // FILTRO POR CATEGORIA
  // =============================================

  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Atualiza botão ativo
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // =============================================
  // LIGHTBOX
  // =============================================

  // Coleta todos os links da galeria
  const galleryLinks = document.querySelectorAll('.gallery-link[data-lightbox]');
  let currentIndex = 0;
  const items = Array.from(galleryLinks);

  // Cria o lightbox no DOM
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Visualizador de imagens');
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-container">
      <button class="lightbox-close" aria-label="Fechar">&times;</button>
      <button class="lightbox-prev" aria-label="Imagem anterior">&#8249;</button>
      <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="">
        <p class="lightbox-caption"></p>
      </div>
      <button class="lightbox-next" aria-label="Próxima imagem">&#8250;</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Estilos do lightbox injetados via JS
  const style = document.createElement('style');
  style.textContent = `
    #lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }
    #lightbox.active {
      display: flex;
    }
    .lightbox-overlay {
      position: absolute;
      inset: 0;
      background: rgba(10, 10, 10, 0.95);
    }
    .lightbox-container {
      position: relative;
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 90vw;
      max-height: 90vh;
      z-index: 1;
    }
    .lightbox-content {
      text-align: center;
    }
    .lightbox-img {
      max-width: 80vw;
      max-height: 80vh;
      object-fit: contain;
      border: 2px solid var(--color-accent, #D4860A);
      border-radius: 4px;
      display: block;
    }
    .lightbox-caption {
      color: var(--color-light, #F5F5F0);
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.9rem;
      margin-top: 0.75rem;
      opacity: 0.8;
    }
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: #fff;
      font-size: 2.5rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      transition: color 0.2s;
    }
    .lightbox-close:hover { color: var(--color-accent, #D4860A); }
    .lightbox-prev,
    .lightbox-next {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      font-size: 2.5rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s, color 0.2s;
      line-height: 1;
    }
    .lightbox-prev:hover,
    .lightbox-next:hover {
      background: var(--color-accent, #D4860A);
      color: #fff;
    }
    @media (max-width: 600px) {
      .lightbox-prev, .lightbox-next {
        width: 36px;
        height: 36px;
        font-size: 1.5rem;
      }
      .lightbox-img {
        max-width: 92vw;
      }
    }
  `;
  document.head.appendChild(style);

  // Referências internas do lightbox
  const lbImg     = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbClose   = lightbox.querySelector('.lightbox-close');
  const lbPrev    = lightbox.querySelector('.lightbox-prev');
  const lbNext    = lightbox.querySelector('.lightbox-next');
  const lbOverlay = lightbox.querySelector('.lightbox-overlay');

  // Abre o lightbox em um índice
  function openLightbox(index) {
    currentIndex = index;
    const link = items[currentIndex];
    lbImg.src = link.href;
    lbImg.alt = link.querySelector('img')?.alt || '';
    lbCaption.textContent = link.dataset.title || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  // Fecha o lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    items[currentIndex]?.focus();
  }

  // Navega para o próximo
  function nextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  // Navega para o anterior
  function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  // Abre lightbox ao clicar em link da galeria
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Botões do lightbox
  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', nextImage);
  lbPrev.addEventListener('click', prevImage);

  // Fecha ao clicar no overlay
  lbOverlay.addEventListener('click', closeLightbox);

  // Navegação por teclado
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft')  prevImage();
  });

});
