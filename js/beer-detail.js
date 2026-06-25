document.addEventListener('DOMContentLoaded', () => {

  const BEERS = [
    {
      id: 1, name: 'Баварское', img: 'img/beers/bavarskoe.webp', type: 'light', typeLabel: 'Светлое',
      abv: '4%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 3,8 г', energy: '34 ккал', wort: '9%',
      composition: 'вода, солод ячменный светлый, хмель, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 2, name: 'Жигулевское карамельное', img: 'img/beers/zhigulevskoe-karamelnoe.webp', type: 'amber', typeLabel: 'Янтарное',
      abv: '4%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,2 г', energy: '38 ккал', wort: '10%',
      composition: 'вода, солод ячменный светлый, солод карамельный, хмель, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 3, name: 'Жигулёвское', img: 'img/beers/zhigulevskoe.webp', type: 'light', typeLabel: 'Светлое',
      abv: '4%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 3,8 г', energy: '34 ккал', wort: '9%',
      composition: 'вода, солод ячменный светлый, хмель, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 4, name: 'Бархатное тёмное', img: 'img/beers/barhatnoe-temnoe.webp', type: 'dark', typeLabel: 'Тёмное',
      abv: '4%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,5 г', energy: '40 ккал', wort: '11%',
      composition: 'вода, солод ячменный тёмный, солод карамельный, хмель, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 5, name: 'Эль тёмное', img: 'img/beers/el-temnoe.webp', type: 'dark', typeLabel: 'Тёмное',
      abv: '4%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,3 г', energy: '38 ккал', wort: '10%',
      composition: 'вода, солод ячменный тёмный, хмель, дрожжи элевые',
      packing: ['1 л', '50 л']
    },
    {
      id: 6, name: 'Немецкое', img: 'img/beers/nemetskoe.webp', type: 'light', typeLabel: 'Светлое',
      abv: '4.6%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,0 г', energy: '39 ккал', wort: '11%',
      composition: 'вода, солод ячменный светлый, хмель, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 7, name: 'Немецкое тёмное', img: 'img/beers/nemetskoe-temnoe.webp', type: 'dark', typeLabel: 'Тёмное',
      abv: '4.6%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,5 г', energy: '42 ккал', wort: '11%',
      composition: 'вода, солод ячменный тёмный, солод карамельный, хмель, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 8, name: 'Чешское', img: 'img/beers/cheshskoe.webp', type: 'light', typeLabel: 'Светлое',
      abv: '5%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,2 г', energy: '42 ккал', wort: '12%',
      composition: 'вода, солод ячменный светлый, хмель жатецкий, дрожжи',
      packing: ['1 л', '50 л']
    },
    {
      id: 9, name: 'Алтайское', img: 'img/beers/altayskoe.webp', type: 'light', typeLabel: 'Светлое',
      abv: '5%', filtration: 'фильтрованное и нефильтрованное', shelf: '90 суток',
      nutrition: 'Углеводы не более 4,2 г', energy: '42 ккал', wort: '12%',
      composition: 'вода, солод ячменный светлый, хмель, дрожжи',
      packing: ['1 л', '50 л']
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const beerId = parseInt(params.get('id')) || 1;
  const beer = BEERS.find(b => b.id === beerId) || BEERS[0];

  document.title = beer.name + ' — Пивоваренный завод «СИБИРЬ»';

  var mainImg = document.getElementById('mainBeerImg');
  if (mainImg) mainImg.src = beer.img;

  var breadcrumb = document.getElementById('breadcrumbName');
  if (breadcrumb) breadcrumb.textContent = beer.name;

  var title = document.getElementById('beerTitle');
  if (title) {
    var words = beer.name.split(' ');
    if (words.length > 1) {
      title.innerHTML = words[0] + ' <span>' + words.slice(1).join(' ') + '</span>';
    } else {
      title.innerHTML = '<span>' + beer.name + '</span>';
    }
  }

  var propsEl = document.getElementById('beerProps');
  if (propsEl) {
    var badgeClass = 'type-badge--' + beer.type;
    var packHtml = beer.packing.map(function(p) {
      return '<span class="beer-detail__pack-item">' + p + '</span>';
    }).join('');

    propsEl.innerHTML =
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Алкоголь</span><span class="beer-detail__prop-value">' + beer.abv + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Степень фильтрации</span><span class="beer-detail__prop-value">' + beer.filtration + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Срок хранения</span><span class="beer-detail__prop-value">' + beer.shelf + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Пищевая ценность в 100 г</span><span class="beer-detail__prop-value">' + beer.nutrition + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Энергетическая ценность</span><span class="beer-detail__prop-value">' + beer.energy + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Экстрактивность начального сусла</span><span class="beer-detail__prop-value">' + beer.wort + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Состав</span><span class="beer-detail__prop-value">' + beer.composition + '</span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Вид пива</span><span class="beer-detail__prop-value"><span class="type-badge ' + badgeClass + '">' + beer.typeLabel + '</span></span></div>' +
      '<div class="beer-detail__prop"><span class="beer-detail__prop-label">Вид упаковки</span><span class="beer-detail__prop-value beer-detail__pack-list">' + packHtml + '</span></div>';
  }

  var otherGrid = document.getElementById('otherBeers');
  if (otherGrid) {
    var others = BEERS.filter(function(b) { return b.id !== beer.id; }).slice(0, 4);
    otherGrid.innerHTML = others.map(function(b) {
      return '<a href="beer-detail.html?id=' + b.id + '" class="catalog-card">' +
        '<div class="catalog-card__img-wrap">' +
        '<img src="' + b.img + '" alt="' + b.name + '" class="catalog-card__img" loading="lazy">' +
        '</div><div class="catalog-card__info">' +
        '<h3 class="catalog-card__name">' + b.name + '</h3>' +
        '<span class="type-badge type-badge--' + b.type + '">' + b.typeLabel + '</span>' +
        '</div></a>';
    }).join('');
  }

  // Лайтбокс
  if (!mainImg) return;

  var lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox';
  lightboxEl.innerHTML =
    '<button class="lightbox__close" aria-label="Закрыть">&times;</button>' +
    '<img class="lightbox__img" src="" alt="Фото пива">';
  document.body.appendChild(lightboxEl);

  var lbImg = lightboxEl.querySelector('.lightbox__img');
  var lbClose = lightboxEl.querySelector('.lightbox__close');

  mainImg.parentElement.addEventListener('click', function() {
    lbImg.src = mainImg.src;
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeLightbox() {
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', function(e) { e.stopPropagation(); closeLightbox(); });
  lightboxEl.addEventListener('click', function(e) { if (e.target === lightboxEl) closeLightbox(); });
  document.addEventListener('keydown', function(e) {
    if (lightboxEl.classList.contains('active') && e.key === 'Escape') closeLightbox();
  });

});
