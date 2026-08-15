const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const initHeroCarousel = () => {
  const heroCarousel = document.querySelector('.hero-slider[data-carousel="hero"]');

  if (!heroCarousel) return;

  const track = heroCarousel.querySelector('.hero-slider__track');
  const slides = Array.from(track.children);
  const dotsContainer = heroCarousel.querySelector('.hero-dots');
  const prevButton = heroCarousel.querySelector('.carousel-btn--prev');
  const nextButton = heroCarousel.querySelector('.carousel-btn--next');
  let activeIndex = 0;
  let autoplayId;

  const updateHero = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  };

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Afficher la diapositive ${index + 1}`);
    dot.addEventListener('click', () => updateHero(index));
    dotsContainer.appendChild(dot);
  });

  const startAutoplay = () => {
    clearInterval(autoplayId);
    autoplayId = window.setInterval(() => {
      updateHero(activeIndex + 1);
    }, 6000);
  };

  prevButton?.addEventListener('click', () => {
    updateHero(activeIndex - 1);
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    updateHero(activeIndex + 1);
    startAutoplay();
  });

  heroCarousel.addEventListener('mouseenter', () => clearInterval(autoplayId));
  heroCarousel.addEventListener('mouseleave', startAutoplay);

  updateHero(0);
  startAutoplay();
};

const initTabs = () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      tabPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.panel === target);
      });
    });
  });
};

const initFormationCarousel = () => {
  const formationCarousel = document.querySelector('.cards-carousel[data-carousel="formations"]');

  if (!formationCarousel) return;

  const track = formationCarousel.querySelector('.cards-carousel__track');
  const cards = Array.from(track.children);
  const dotsContainer = formationCarousel.querySelector('.cards-dots');
  const prevButton = formationCarousel.querySelector('.carousel-btn--prev');
  const nextButton = formationCarousel.querySelector('.carousel-btn--next');
  let activeIndex = 0;

  const updateCarousel = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  };

  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Afficher la formation ${index + 1}`);
    dot.addEventListener('click', () => updateCarousel(index));
    dotsContainer.appendChild(dot);
  });

  prevButton?.addEventListener('click', () => updateCarousel(activeIndex - 1));
  nextButton?.addEventListener('click', () => updateCarousel(activeIndex + 1));

  updateCarousel(0);
};

const initAccordions = () => {
  document.querySelectorAll('[data-accordion]').forEach((banner) => {
    const trigger = banner.querySelector('.accordion-banner__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = banner.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });
};

const initTileImages = () => {
  document.querySelectorAll('.impact-tile[data-image]').forEach((tile) => {
    tile.style.setProperty('--tile-image', `url('${tile.dataset.image}')`);
  });
};

const initHotspots = () => {
  document.querySelectorAll('.hotspot').forEach((hotspot) => {
    hotspot.addEventListener('click', () => {
      hotspot.classList.toggle('is-active');
    });
  });
};

const initContactForm = () => {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const getValue = (name) => {
      const field = form.querySelector(`[name="${name}"]`);
      return field ? field.value.trim() : '';
    };

    const name = getValue('name');
    const email = getValue('email');
    const phone = getValue('phone');
    const formation = getValue('formation');
    const message = getValue('message');

    const lines = [
      'Bonjour, je vous contacte depuis le site web.',
      '',
      `Nom : ${name}`,
      `Email : ${email}`,
      phone ? `Téléphone : ${phone}` : null,
      formation ? `Formation visée : ${formation}` : null,
      '',
      `Message :`,
      message,
    ].filter((line) => line !== null);

    const whatsappUrl =
      'https://wa.me/22672368738?text=' + encodeURIComponent(lines.join('\n'));

    window.open(whatsappUrl, '_blank', 'noopener');
  });
};

initHeroCarousel();
initTabs();
initFormationCarousel();
initAccordions();
initTileImages();
initHotspots();
initContactForm();
