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