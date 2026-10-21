// Boutons FR / EN / IT : changent la langue affichée et s'en souviennent.
// (Les trois langues sont déjà dans la page ; on cache simplement les autres.)

const LANGS = ['fr', 'en', 'it'];
const buttons = document.querySelectorAll('[data-lang-btn]');

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = 'fr';
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang;
  // Tous les boutons (menu + bas de page) indiquent la langue active.
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.langBtn === lang)));
  try {
    localStorage.setItem('lang', lang);
  } catch (e) {
    /* navigation privée : tant pis, la langue ne sera pas mémorisée */
  }
}

buttons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
setLang(document.documentElement.dataset.lang || 'fr');
