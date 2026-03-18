/* WEBFLOW DEVELOPERS — JS */
const WA = 'https://wa.me/918233818473';

// Nav scroll
(function(){
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), {passive:true});
})();

// Mobile hamburger
(function(){
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
  });
})();

// FAQ accordion
document.querySelectorAll('.faq-item__q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

// Lead form → WhatsApp
document.querySelectorAll('form.lead-form-el, form.city-form-el').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = {};
    new FormData(form).forEach((v,k) => d[k] = v);
    const name    = d.name || 'there';
    const city    = d.city || 'your city';
    const service = d.service || 'Webflow development';
    const budget  = d.budget ? ` Budget: ${d.budget}.` : '';
    const msg = encodeURIComponent(`Hi! I'm ${name} from ${city}. I need ${service} services.${budget} Can we discuss?`);
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = '✓ Redirecting to WhatsApp…';
    btn.disabled = true;
    setTimeout(() => {
      window.open(`${WA}?text=${msg}`, '_blank');
      btn.textContent = orig;
      btn.disabled = false;
      form.reset();
      showToast('Message sent! We\'ll reply within 30 min.');
    }, 1000);
  });
});

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', bottom:'96px', right:'24px', zIndex:'9997',
    background:'#111F36', color:'#fff', border:'1px solid rgba(20,110,245,.3)',
    padding:'13px 18px', borderRadius:'10px', fontSize:'.85rem', fontWeight:'600',
    boxShadow:'0 8px 24px rgba(0,0,0,.4)', animation:'fadeup .3s ease',
    maxWidth:'280px'
  });
  document.body.appendChild(t);
  const style = document.createElement('style');
  style.textContent = '@keyframes fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(() => t.remove(), 400); }, 3500);
}

// Smooth scroll anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
  });
});

// data-wa buttons
document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const msg = encodeURIComponent(el.dataset.wa);
    window.open(`${WA}?text=${msg}`, '_blank');
  });
});

// City auto-fill
(function(){
  const el = document.querySelector('[data-city]');
  if (!el) return;
  const city = el.dataset.city;
  document.querySelectorAll('.btn--wa:not([data-wa])').forEach(b => {
    b.dataset.wa = `Hi! I need a Webflow developer in ${city}. Can you help?`;
  });
})();
