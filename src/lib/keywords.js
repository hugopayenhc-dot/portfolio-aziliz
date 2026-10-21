// « Mots-clés » : les mots mis en gras dans l'admin.
// Sur le site, chaque mot-clé occupe sa propre ligne, et ses lettres sont
// étirées sur toute la largeur du texte (comme dans le portfolio PDF) :
//   s     t     r     u     c     t     u     r     e     .
// Pour cela, chaque lettre est placée dans un petit <span>, et chaque mot
// sur sa propre ligne (.kw__line). Le mot entier reste lisible pour les
// lecteurs d'écran grâce à une copie cachée (.visually-hidden).

// Ponctuation collée juste après le mot-clé (ex. « structure. ») : on la
// garde sur la même ligne que le mot.
const PUNCT = /^[.,;:!?…]+/;

// --- 1. Pour les textes transformés par « marked » (introductions, bio…) ---

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function lettersHtml(text) {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => `<span class="kw__line">${[...word].map((c) => `<span>${escape(c)}</span>`).join('')}</span>`)
    .join('');
}

// Remplace <strong>mot</strong> par la version « lettres étirées ».
export function keywordsInHtml(html) {
  return html.replace(/<strong>([^<]*)<\/strong>([.,;:!?…]*)/g, (_, inner, punct) => {
    const text = inner
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    const full = text + punct;
    return `<strong class="kw"><span class="visually-hidden">${escape(full)}</span><span aria-hidden="true">${lettersHtml(full)}</span></strong>`;
  });
}

// --- 2. Plugin pour les textes des travaux (Markdown rendu par Astro) ---

const textOf = (node) => (node.type === 'text' ? node.value : (node.children || []).map(textOf).join(''));
const span = (className, children) => ({
  type: 'element',
  tagName: 'span',
  properties: className ? { className: [className] } : {},
  children,
});

export function rehypeKeywords() {
  return (tree) => {
    const visit = (node) => {
      const kids = node.children || [];
      for (let i = 0; i < kids.length; i++) {
        const child = kids[i];
        if (child.type === 'element' && child.tagName === 'strong') {
          let text = textOf(child).trim();
          // ponctuation juste après : on la ramène dans le mot-clé
          const next = kids[i + 1];
          if (next && next.type === 'text') {
            const m = next.value.match(PUNCT);
            if (m) {
              text += m[0];
              next.value = next.value.slice(m[0].length);
            }
          }
          const lines = text.split(/\s+/).map((word) =>
            span('kw__line', [...word].map((c) => span(null, [{ type: 'text', value: c }])))
          );
          const visual = span(null, lines);
          visual.properties['aria-hidden'] = 'true';
          child.properties = { className: ['kw'] };
          child.children = [span('visually-hidden', [{ type: 'text', value: text }]), visual];
        } else {
          visit(child);
        }
      }
    };
    visit(tree);
  };
}
