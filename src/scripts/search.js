// Recherche dans les travaux avec Fuse.js.
// L'index (/search.json) est téléchargé seulement à la première ouverture.
import Fuse from 'fuse.js';

const dialog = document.querySelector('[data-search]');
const input = document.querySelector('[data-search-input]');
const list = document.querySelector('[data-search-results]');
const status = document.querySelector('[data-search-status]');
let fuse = null;

// Texte dans la langue choisie (fr, en ou it)
const t = (fr, en, it) => ({ fr, en, it })[document.documentElement.lang] || fr;

async function loadIndex() {
  if (fuse) return;
  const items = await fetch('/search.json').then((r) => r.json());
  fuse = new Fuse(items, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'materials', weight: 2 },
      { name: 'year', weight: 2 },
      { name: 'category', weight: 1 },
      { name: 'text', weight: 1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });
}

// Crée une petite carte de résultat (sans innerHTML, pour la sécurité).
function card(item) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = item.url;
  a.className = 'result';
  if (item.thumb) {
    const img = document.createElement('img');
    img.src = item.thumb;
    img.alt = '';
    img.width = 64;
    img.height = 64;
    a.append(img);
  } else {
    const box = document.createElement('span');
    box.className = 'kraft result__kraft';
    a.append(box);
  }
  const txt = document.createElement('span');
  const title = document.createElement('span');
  title.className = 'result__title';
  title.textContent = item.title;
  const meta = document.createElement('span');
  meta.className = 'result__meta';
  meta.textContent = [item.category, item.year, item.materials].filter(Boolean).join(' · ');
  txt.append(title, meta);
  a.append(txt);
  li.append(a);
  return li;
}

function render() {
  const q = input.value.trim();
  list.replaceChildren();
  if (!q || !fuse) {
    status.textContent = '';
    return;
  }
  const results = fuse.search(q).slice(0, 12);
  status.textContent = results.length ? `${results.length} ${t('résultat(s)', 'result(s)', 'risultato/i')}` : t('Aucun résultat.', 'No results.', 'Nessun risultato.');
  results.forEach((r) => list.append(card(r.item)));
}

document.querySelectorAll('[data-search-open]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    input.placeholder = t('Titre, matériau, année…', 'Title, material, year…', 'Titolo, materiale, anno…');
    dialog.showModal(); // Échap ferme automatiquement la fenêtre
    input.focus();
    await loadIndex();
    render();
  })
);

document.querySelector('[data-search-close]').addEventListener('click', () => dialog.close());
// Clic sur le fond sombre : fermer.
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});
input.addEventListener('input', render);
