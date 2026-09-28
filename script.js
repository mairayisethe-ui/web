// Maira visual layer — presentation only; page copy and links remain untouched.
(() => {
  const redesign = document.createElement('link');
  redesign.rel = 'stylesheet';
  redesign.href = 'redesign.css?v=20260928';
  document.head.appendChild(redesign);

  const mimiStyles = document.createElement('link');
  mimiStyles.rel = 'stylesheet';
  mimiStyles.href = 'mimi.css?v=20260928';
  document.head.appendChild(mimiStyles);

  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    document.body.style.setProperty('--scroll-progress', progress.toFixed(4));
    document.body.classList.toggle('maira-progress', window.scrollY > 12);
    document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();
})();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

// Subtle pointer response on desktop: visual only, never changes content or navigation.
if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.button,.nav-cta').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      button.style.transform = `translate(${x * 5}px, ${y * 4}px) rotate(${x * 1.5}deg)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

// Mimi: the mascot lives in the hero, reacts softly to the pointer and celebrates at the end.
const initMimi = () => {
  const mimi = document.querySelector('.hero-mascot');
  if (!mimi) return;

  mimi.setAttribute('role', 'img');
  mimi.setAttribute('aria-label', 'Mimi, mascota creativa de Maira');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches && window.matchMedia('(pointer:fine)').matches) {
    const heroArt = document.querySelector('.hero-art');
    heroArt?.addEventListener('pointermove', event => {
      const rect = heroArt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      mimi.style.setProperty('--mimi-x', `${x * 12}px`);
      mimi.style.setProperty('--mimi-y', `${y * 8}px`);
      mimi.classList.toggle('mimi-look-left', x < -.12);
      mimi.classList.toggle('mimi-look-right', x > .12);
    });

    heroArt?.addEventListener('pointerleave', () => {
      mimi.style.removeProperty('--mimi-x');
      mimi.style.removeProperty('--mimi-y');
      mimi.classList.remove('mimi-look-left', 'mimi-look-right');
    });
  }

  const contact = document.querySelector('.contact');
  if (contact && !reduceMotion.matches) {
    const celebrationObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        mimi.classList.add('mimi-celebrate');
        window.setTimeout(() => mimi.classList.remove('mimi-celebrate'), 1400);
      }
    }, { threshold: .35 });
    celebrationObserver.observe(contact);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMimi, { once: true });
} else {
  initMimi();
}

const whatsappButton = document.querySelector('#whatsappFormButton');
whatsappButton?.addEventListener('click', () => {
  const name = document.querySelector('#name')?.value.trim() || '';
  const email = document.querySelector('#email')?.value.trim() || '';
  const project = document.querySelector('#project')?.value.trim() || '';
  const message = `Hola, quiero cotizar un proyecto web.\n\nNombre: ${name || 'Por definir'}\nCorreo: ${email || 'Por definir'}\n\nProyecto:\n${project || 'Quiero conocer las opciones de servicio web.'}`;
  window.open(`https://wa.me/573136205519?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

// Trust/legal links: keep them visible without altering the visual layout of the main footer.
const footer = document.querySelector('footer');
if (footer && !footer.querySelector('.legal-links')) {
  const legal = document.createElement('span');
  legal.className = 'legal-links';
  legal.innerHTML = '<a href="nosotros.html">Nosotros</a> · <a href="contacto.html">Contacto</a> · <a href="aviso-legal.html">Aviso legal</a> · <a href="politica-privacidad.html">Privacidad</a> · <a href="terminos.html">Términos</a> · <a href="cookies.html">Cookies</a>';
  footer.appendChild(legal);
}
