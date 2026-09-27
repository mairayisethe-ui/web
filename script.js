const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
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

const form = document.querySelector('.quote-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const project = document.querySelector('#project').value.trim();
  const subject = encodeURIComponent(`Solicitud de proyecto web — ${name}`);
  const body = encodeURIComponent(`Hola, quiero cotizar un proyecto web.\n\nNombre: ${name}\nCorreo: ${email}\n\nProyecto:\n${project}`);
  window.location.href = `mailto:tu-correo@ejemplo.com?subject=${subject}&body=${body}`;
});