// Fonctions utiles pour lire le contenu, partagées par toutes les pages.
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { keywordsInHtml } from './keywords.js';
import { CATEGORY_IDS, STRUCTURE, SUBCATEGORIES } from '../data/structure.js';

// Transforme un texte Markdown (écrit dans l'admin) en HTML.
// Les mots en gras deviennent des « mots-clés » aux lettres étirées (voir keywords.js).
export function md(text) {
  return text ? keywordsInHtml(marked.parse(text)) : '';
}

// Les réglages généraux du site (fichier settings/site.json).
export async function getSettings() {
  const [entry] = await getCollection('settings');
  return entry.data;
}

// Les 6 rubriques, triées par ordre. Une rubrique sans fichier est ignorée.
export async function getCategories() {
  const entries = await getCollection('categories');
  return entries
    .filter((c) => CATEGORY_IDS.includes(c.id))
    .map((c) => ({ id: c.id, ...c.data, subs: STRUCTURE[c.id] || [] }))
    .sort((a, b) => a.order - b.order);
}

// Ordre d'affichage des travaux : par sous-rubrique, puis par « ordre »,
// puis du plus récent au plus ancien.
function comparePosts(a, b) {
  const subs = STRUCTURE[a.data.category] || [];
  const sa = subs.indexOf(a.data.subcategory);
  const sb = subs.indexOf(b.data.subcategory);
  const posA = sa === -1 ? 99 : sa;
  const posB = sb === -1 ? 99 : sb;
  if (posA !== posB) return posA - posB;
  if (a.data.order !== b.data.order) return a.data.order - b.data.order;
  return b.data.date - a.data.date;
}

// Tous les travaux publiés (case « Publié » cochée), triés.
export async function getPublishedPosts() {
  const posts = await getCollection('posts', (p) => p.data.published);
  return posts.sort((a, b) => {
    const ca = CATEGORY_IDS.indexOf(a.data.category);
    const cb = CATEGORY_IDS.indexOf(b.data.category);
    return ca !== cb ? ca - cb : comparePosts(a, b);
  });
}

// Lien Instagram complet, même si on a juste écrit le nom du compte
// (« aziliz.dh », « @aziliz.dh » ou le lien entier fonctionnent tous).
export function instagramUrl(value) {
  if (!value) return '';
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (/instagram\.com\//i.test(v)) return 'https://' + v.replace(/^\/+/, '');
  return 'https://www.instagram.com/' + v.replace(/^@/, '').replace(/\/+$/, '') + '/';
}

// Adresse (URL) d'un travail.
export function postUrl(post) {
  return `/${post.data.category}/${post.id}/`;
}

// Sous-rubrique « valide » d'un travail (sinon null = « Divers »).
export function postSub(post) {
  const subs = STRUCTURE[post.data.category] || [];
  return subs.includes(post.data.subcategory) ? post.data.subcategory : null;
}

// Nom d'une sous-rubrique { fr, en }.
export function subLabel(id) {
  return SUBCATEGORIES[id] || { fr: id, en: id };
}

// Si le lien vidéo vient de YouTube ou Vimeo, on renvoie l'adresse
// à intégrer dans la page ; sinon null (on affichera un simple lien).
export function videoEmbed(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

// Retire la mise en forme Markdown pour obtenir du texte simple
// (utile pour la recherche et les descriptions SEO).
export function plainText(text = '', max = 400) {
  const clean = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}
