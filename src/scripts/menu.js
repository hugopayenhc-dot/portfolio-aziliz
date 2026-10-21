// Menu plein écran : ouverture / fermeture, aperçu au survol,
// accordéon sur mobile, et piège du focus clavier pendant qu'il est ouvert.

const menu = document.querySelector('[data-menu]');
const toggle = document.querySelector('[data-menu-toggle]');
const topbar = document.querySelector('[data-topbar]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (menu && toggle) {
  const nav = menu.querySelector('.menu__nav');
  const items = [...menu.querySelectorAll('.menu__item')];
  const previews = [...menu.querySelectorAll('[data-preview]')];
  let closeTimer;

  // --- Ouvrir / fermer -------------------------------------------------
  function open() {
    clearTimeout(closeTimer);
    menu.hidden = false;
    menu.classList.remove('is-closing');
    void menu.offsetWidth; // force le navigateur à repartir de l'état « fermé »
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    const closeLabel = { fr: 'Fermer le menu', en: 'Close menu', it: 'Chiudi il menu' };
    toggle.setAttribute('aria-label', closeLabel[document.documentElement.lang] || closeLabel.fr);
    topbar.classList.add('is-menu-open');
    document.documentElement.classList.add('no-scroll');
    setActive(items[0]?.dataset.cat, false);
    items[0]?.querySelector('.menu__title')?.focus({ preventScroll: true });
  }

  function close(returnFocus = true) {
    if (menu.hidden) return;
    menu.classList.remove('is-open');
    menu.classList.add('is-closing');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.removeAttribute('aria-label');
    topbar.classList.remove('is-menu-open');
    document.documentElement.classList.remove('no-scroll');
    closeTimer = setTimeout(() => {
      menu.hidden = true;
      menu.classList.remove('is-closing');
    }, reduceMotion.matches ? 0 : 250);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => (menu.hidden ? open() : close()));

  // Touche Échap : fermer.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) close();
  });

  // Clic « à côté » (sur le fond, pas sur un lien ou une image) : fermer.
  menu.addEventListener('click', (e) => {
    if (!e.target.closest('a, button, .menu__preview-item')) close();
  });

  // Clic sur un lien du menu : on ferme (utile pour les ancres de la même page).
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close(false)));

  // --- Aperçu de la rubrique survolée (ordinateur) --------------------
  function setActive(id, dim = true) {
    items.forEach((it) => it.classList.toggle('is-active', it.dataset.cat === id));
    previews.forEach((p) => (p.hidden = p.dataset.preview !== id));
    nav.classList.toggle('is-dimmed', dim);
  }

  items.forEach((item) => {
    const title = item.querySelector('.menu__title');
    item.addEventListener('mouseenter', () => setActive(item.dataset.cat));
    title.addEventListener('focus', () => setActive(item.dataset.cat));
  });
  nav.addEventListener('mouseleave', () => nav.classList.remove('is-dimmed'));

  // --- Accordéon des sous-rubriques (mobile) --------------------------
  menu.querySelectorAll('.menu__acc').forEach((btn) => {
    btn.addEventListener('click', () => {
      const list = document.getElementById(btn.getAttribute('aria-controls'));
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      list.hidden = isOpen;
    });
  });

  // --- Piège du focus : Tab reste dans le menu ------------------------
  menu.addEventListener('keydown', trapFocus);
  toggle.addEventListener('keydown', trapFocus);

  function trapFocus(e) {
    if (e.key !== 'Tab' || menu.hidden) return;
    const focusables = [
      toggle,
      ...menu.querySelectorAll('a[href], button:not([disabled])'),
    ].filter((el) => el.offsetParent !== null); // seulement les éléments visibles
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
