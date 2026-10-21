// Configuration d'Astro.
// ⚠️ Remplacez "site" par l'adresse réelle du site une fois en ligne
// (elle sert au sitemap et aux images de partage sur les réseaux sociaux).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeKeywords } from './src/lib/keywords.js';

export default defineConfig({
  site: 'https://aziliz-dupont-huin.netlify.app',
  // Mots en gras des textes des travaux = mots-clés aux lettres étirées
  markdown: { rehypePlugins: [rehypeKeywords] },
  integrations: [
    // Le sitemap ignore les pages techniques (admin, recherche).
    sitemap({ filter: (page) => !page.includes('/admin') }),
  ],
});
