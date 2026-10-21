// Structure fixe du site : les 6 rubriques et leurs sous-rubriques.
// (Les textes, sous-titres et images des rubriques se modifient dans /admin ;
//  seule la liste des rubriques est fixée ici.)

// Identifiants des rubriques, dans l'ordre par défaut.
export const CATEGORY_IDS = [
  'dessin',
  'sculpture',
  'minotaure',
  'marionnette',
  'autres-projets',
  'a-propos',
];

// Rubriques qui contiennent des travaux (toutes sauf « À propos de moi »).
export const WORK_CATEGORY_IDS = CATEGORY_IDS.filter((id) => id !== 'a-propos');

// Les sous-rubriques possibles, avec leur nom en français, anglais et italien.
export const SUBCATEGORIES = {
  inspiration: { fr: 'Inspiration', en: 'Inspiration', it: 'Ispirazione' },
  oeuvres: { fr: 'Œuvres', en: 'Works', it: 'Opere' },
  construction: { fr: 'Construction', en: 'Construction', it: 'Costruzione' },
  'projet-fini': { fr: 'Projet fini', en: 'Finished project', it: 'Progetto finito' },
};

// Sous-rubriques de chaque rubrique, dans l'ordre d'affichage.
export const STRUCTURE = {
  dessin: ['inspiration', 'oeuvres'],
  sculpture: ['inspiration', 'oeuvres'],
  minotaure: ['inspiration', 'construction', 'projet-fini'],
  marionnette: ['inspiration', 'construction', 'projet-fini'],
  'autres-projets': [],
  'a-propos': [],
};

// Adresse (URL) d'une rubrique.
export function categoryUrl(id) {
  return id === 'a-propos' ? '/a-propos/' : `/${id}/`;
}

// Textes de l'interface, en français (fr), anglais (en) et italien (it).
export const UI = {
  menu: { fr: 'Menu', en: 'Menu', it: 'Menu' },
  close: { fr: 'Fermer', en: 'Close', it: 'Chiudi' },
  search: { fr: 'Rechercher', en: 'Search', it: 'Cerca' },
  searchPlaceholder: { fr: 'Titre, matériau, année…', en: 'Title, material, year…', it: 'Titolo, materiale, anno…' },
  searchEmpty: { fr: 'Aucun résultat.', en: 'No results.', it: 'Nessun risultato.' },
  home: { fr: 'Accueil', en: 'Home', it: 'Home' },
  materials: { fr: 'Matériaux', en: 'Materials', it: 'Materiali' },
  dimensions: { fr: 'Dimensions', en: 'Dimensions', it: 'Dimensioni' },
  credit: { fr: 'Source', en: 'Source', it: 'Fonte' },
  video: { fr: 'Voir la vidéo', en: 'Watch the video', it: 'Guarda il video' },
  previous: { fr: 'Précédent', en: 'Previous', it: 'Precedente' },
  next: { fr: 'Suivant', en: 'Next', it: 'Successivo' },
  noPhoto: { fr: 'Photo à venir', en: 'Photo coming soon', it: 'Foto in arrivo' },
  nothingYet: { fr: 'Rien pour le moment.', en: 'Nothing yet.', it: 'Ancora niente.' },
  other: { fr: 'Divers', en: 'Miscellaneous', it: 'Varie' },
  school: { fr: 'École', en: 'School', it: 'Scuola' },
  apprenticeships: { fr: 'Apprentissages', en: 'Apprenticeships', it: 'Tirocini' },
  contact: { fr: 'Contact', en: 'Contact', it: 'Contatti' },
  approach: { fr: 'Démarche', en: 'Approach', it: 'Approccio' },
  notFound: { fr: 'Cette page n’existe pas (ou plus).', en: 'This page does not exist (anymore).', it: 'Questa pagina non esiste (più).' },
  backHome: { fr: 'Retour à l’accueil', en: 'Back to home', it: 'Torna alla home' },
  photo: { fr: 'Photo', en: 'Photo', it: 'Foto' },
};

// Langues proposées sur le site (boutons en bas de page et dans le menu).
export const LANGS = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'it', label: 'IT', name: 'Italiano' },
];
