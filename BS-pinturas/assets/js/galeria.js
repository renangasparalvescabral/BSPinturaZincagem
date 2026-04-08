/**
 * BS Pinturas - Galeria JavaScript
 * Funcionalidades: Filtro por categoria, Lightbox com navegação
 */

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // Filtro por Categoria
  // ========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Atualizar botões ativos
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');

      // Filtrar itens
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';

          // Animação de entrada
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';

          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Adicionar transição CSS via JS
  galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  // ========================================
  // Lightbox
  // ========================================
  const galleryLinks = document.querySelectorAll('.gallery-link[data-lightbox="galeria"]');
  let currentImageIndex = 0;
  let filteredImages = [];

  // Criar estrutura do lightbox dinamicamente
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Visualização ampliada da imagem');
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar galeria">&times;</button>
    <div class="lightbox-content">
      <img class="lightbox-img" src="" alt="">
      <p class="lightbox-caption"></p>
    </div>
    <button class="lightbox-nav lightbox-prev" aria-label="Imagem anterior">&#10094;</button>
    <button class="lightbox-nav lightbox-next" aria-label="Próxima imagem">&#10095;</button>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  // Atualizar array de imagens filtradas
  function updateFilteredImages() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

    filteredImages = Array.from(galleryLinks).filter(link => {
      const item = link.closest('.gallery-item');
      const category = item.getAttribute('data-category');
      const isVisible = item.style.display !== 'none';
      return isVisible && (filterValue === 'all' || category === filterValue);
    });
  }

  // Abrir lightbox
  function openLightbox(index) {
    updateFilteredImages();
    currentImageIndex = index;

    const link = filteredImages[index];
    if (!link) return;

    const imgSrc = link.getAttribute('href');
    const imgTitle = link.getAttribute('data-title') || '';
    const imgAlt = link.querySelector('img')?.getAttribute('alt') || '';

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightboxCaption.textContent = imgTitle;
    lightbox.classList.add('active');

    document.body.style.overflow = 'hidden';
    closeBtn.focus();

    // Anunciar para leitores de tela
    lightbox.setAttribute('aria-live', 'polite');
    lightbox.setAttribute('aria-atomic', 'true');
  }

  // Fechar lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // Navegar para imagem anterior
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    const link = filteredImages[currentImageIndex];
    const imgSrc = link.getAttribute('href');
    const imgTitle = link.getAttribute('data-title') || '';
    const imgAlt = link.querySelector('img')?.getAttribute('alt') || '';

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightboxCaption.textContent = imgTitle;
  }

  // Navegar para próxima imagem
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    const link = filteredImages[currentImageIndex];
    const imgSrc = link.getAttribute('href');
    const imgTitle = link.getAttribute('data-title') || '';
    const imgAlt = link.querySelector('img')?.getAttribute('alt') || '';

    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightboxCaption.textContent = imgTitle;
  }

  // Event Listeners
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Encontrar índice na lista filtrada
      updateFilteredImages();
      const filteredIndex = filteredImages.indexOf(this);
      openLightbox(filteredIndex !== -1 ? filteredIndex : index);
    });
  });

  // Fechar com botão
  closeBtn.addEventListener('click', closeLightbox);

  // Fechar clicando fora da imagem
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Botões de navegação
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    prevImage();
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nextImage();
  });

  // Teclado - ESC para fechar, setas para navegar
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  });

  // Swipe em dispositivos touch
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextImage(); // Swipe para esquerda = próxima
      } else {
        prevImage(); // Swipe para direita = anterior
      }
    }
  }

});
