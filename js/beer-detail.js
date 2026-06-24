document.addEventListener('DOMContentLoaded', () => {

  const mainImg = document.getElementById('mainBeerImg');
  const thumbsWrap = document.getElementById('beerThumbs');
  if (!mainImg || !thumbsWrap) return;

  const thumbs = thumbsWrap.querySelectorAll('.beer-detail__thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('beer-detail__thumb--active'));
      thumb.classList.add('beer-detail__thumb--active');
      const src = thumb.getAttribute('data-src');
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
      }, 200);
    });
  });

  // Лайтбокс
  const lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox';
  lightboxEl.innerHTML = `
    <button class="lightbox__close" aria-label="Закрыть">&times;</button>
    <button class="lightbox__prev" aria-label="Назад">&#10094;</button>
    <button class="lightbox__next" aria-label="Вперёд">&#10095;</button>
    <img class="lightbox__img" src="" alt="Фото пива">
  `;
  document.body.appendChild(lightboxEl);

  const lbImg = lightboxEl.querySelector('.lightbox__img');
  const lbClose = lightboxEl.querySelector('.lightbox__close');
  const lbPrev = lightboxEl.querySelector('.lightbox__prev');
  const lbNext = lightboxEl.querySelector('.lightbox__next');
  let lbIndex = 0;

  function getSources() {
    return Array.from(thumbs).map(t => t.getAttribute('data-src'));
  }

  function openLightbox(index) {
    const sources = getSources();
    lbIndex = index;
    lbImg.src = sources[lbIndex];
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  function lbNav(dir) {
    const sources = getSources();
    lbIndex = (lbIndex + dir + sources.length) % sources.length;
    lbImg.src = sources[lbIndex];
  }

  mainImg.parentElement.addEventListener('click', () => {
    const activeThumb = thumbsWrap.querySelector('.beer-detail__thumb--active');
    const idx = activeThumb ? Array.from(thumbs).indexOf(activeThumb) : 0;
    openLightbox(idx);
  });

  lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  lightboxEl.addEventListener('click', (e) => { if (e.target === lightboxEl) closeLightbox(); });
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); lbNav(-1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); lbNav(1); });

  document.addEventListener('keydown', (e) => {
    if (!lightboxEl.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });

});
