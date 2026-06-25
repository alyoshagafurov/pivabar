document.addEventListener('DOMContentLoaded', () => {

  // ===== ПОДТВЕРЖДЕНИЕ ВОЗРАСТА 18+ =====
  (function ageGate() {
    if (localStorage.getItem('age_verified') === 'yes') return;

    const gate = document.createElement('div');
    gate.className = 'age-gate';
    gate.innerHTML = `
      <div class="age-gate__box">
        <img src="img/logo.webp" alt="СИБИРЬ" class="age-gate__logo">
        <h2 class="age-gate__title">Вам есть 18 лет?</h2>
        <p class="age-gate__text">Сайт содержит информацию о пиве. Доступ разрешён только совершеннолетним пользователям.</p>
        <div class="age-gate__actions">
          <button class="btn btn--primary age-gate__yes">Мне есть 18 лет</button>
          <button class="btn btn--outline age-gate__no">Мне нет 18 лет</button>
        </div>
        <p class="age-gate__warning">ЧРЕЗМЕРНОЕ УПОТРЕБЛЕНИЕ ПИВА ВРЕДИТ ВАШЕМУ ЗДОРОВЬЮ</p>
      </div>
    `;
    document.body.appendChild(gate);
    document.body.style.overflow = 'hidden';

    gate.querySelector('.age-gate__yes').addEventListener('click', () => {
      localStorage.setItem('age_verified', 'yes');
      gate.remove();
      document.body.style.overflow = '';
    });
    gate.querySelector('.age-gate__no').addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  })();

  // ===== БАННЕР-СЛАЙДЕР =====
  const slides = document.querySelectorAll('.banner__slide');
  const dotsWrap = document.getElementById('bannerDots');
  let currentSlide = 0;
  let bannerInterval;

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('banner__dot');
      if (i === 0) dot.classList.add('banner__dot--active');
      dot.setAttribute('aria-label', `Слайд ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.banner__dot');

    function goToSlide(n) {
      slides[currentSlide].classList.remove('banner__slide--active');
      dots[currentSlide].classList.remove('banner__dot--active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('banner__slide--active');
      dots[currentSlide].classList.add('banner__dot--active');
    }

    function startAutoSlide() {
      bannerInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    document.getElementById('bannerPrev')?.addEventListener('click', () => {
      clearInterval(bannerInterval);
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });

    document.getElementById('bannerNext')?.addEventListener('click', () => {
      clearInterval(bannerInterval);
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });

    startAutoSlide();
  }

  // ===== КАРУСЕЛЬ (универсальная) =====
  function initCarousel(trackId, prevId, nextId) {
    const track = document.getElementById(trackId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    if (!track) return;

    let pos = 0;

    function getCardWidth() {
      const card = track.children[0];
      if (!card) return 300;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 24;
      return card.offsetWidth + gap;
    }

    function getVisibleCards() {
      const w = window.innerWidth;
      if (w <= 480) return 1;
      if (w <= 768) return 2;
      if (w <= 1024) return 3;
      return 4;
    }

    function maxPos() {
      return Math.max(0, track.children.length - getVisibleCards());
    }

    function update() {
      const cardW = getCardWidth();
      track.style.transform = `translateX(-${pos * cardW}px)`;
    }

    prev?.addEventListener('click', () => {
      pos = Math.max(0, pos - 1);
      update();
    });

    next?.addEventListener('click', () => {
      pos = Math.min(maxPos(), pos + 1);
      update();
    });

    let touchStartX = 0;
    let touchDiff = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      touchDiff = touchStartX - e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (Math.abs(touchDiff) > 50) {
        if (touchDiff > 0) {
          pos = Math.min(maxPos(), pos + 1);
        } else {
          pos = Math.max(0, pos - 1);
        }
        update();
      }
      touchDiff = 0;
    });

    window.addEventListener('resize', () => {
      pos = Math.min(pos, maxPos());
      update();
    });
  }

  initCarousel('varietiesTrack', 'varietiesPrev', 'varietiesNext');
  initCarousel('packingTrack', 'packingPrev', 'packingNext');

  // ===== БУРГЕР-МЕНЮ =====
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger?.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (nav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  document.querySelectorAll('.header__menu-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const spans = burger?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  });

  // ===== КНОПКА НАВЕРХ =====
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTop?.classList.add('visible');
    } else {
      toTop?.classList.remove('visible');
    }
  });
  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== МОДАЛЬНОЕ ОКНО =====
  const modal = document.getElementById('callbackModal');
  const openBtns = document.querySelectorAll('[data-modal="callback"]');
  const closeBtn = modal?.querySelector('.modal__close');
  const overlay = modal?.querySelector('.modal__overlay');

  function openModal() {
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ===== МАСКА ТЕЛЕФОНА =====
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      let digits = input.value.replace(/\D/g, '');
      if (digits.startsWith('8')) digits = '7' + digits.slice(1);
      if (!digits.startsWith('7')) digits = '7' + digits;
      digits = digits.slice(0, 11);

      let out = '+7';
      if (digits.length > 1) out += ' (' + digits.slice(1, 4);
      if (digits.length >= 4) out += ') ' + digits.slice(4, 7);
      if (digits.length >= 7) out += '-' + digits.slice(7, 9);
      if (digits.length >= 9) out += '-' + digits.slice(9, 11);
      input.value = out;
    });
    input.addEventListener('focus', () => {
      if (!input.value) input.value = '+7 ';
    });
    input.addEventListener('blur', () => {
      if (input.value === '+7 ' || input.value === '+7') input.value = '';
    });
  });

  // ===== ФОРМЫ =====
  document.querySelectorAll('#contactForm, #callbackForm').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      alert(`Спасибо${name ? ', ' + name : ''}! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.`);
      form.reset();
      closeModal();
    });
  });

  // ===== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.ingredients__item, .brewing__step, .about__card, .contacts__info-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

});
