// Description du contenu du site (les « collections »).
// Chaque collection correspond à un dossier dans src/content/
// et à une section de l'admin (/admin).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_IDS } from './data/structure.js';

// Petit outil : un texte facultatif (l'admin écrit parfois "" ou null).
const text = () => z.string().nullish().transform((v) => v || '');

// Petit outil : une image facultative (vide = pas d'image).
const optionalImage = (image) => z.preprocess((v) => (v ? v : undefined), image().optional());

// 1. Les travaux (un fichier .md par œuvre / inspiration)
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      title_en: text(),
      title_it: text(),
      date: z.coerce.date(),
      category: z.enum(CATEGORY_IDS),
      subcategory: text(),
      photos: z
        .array(z.object({ image: image(), alt: text() }))
        .nullish()
        .transform((v) => v || []),
      video: text(),
      credit: text(),
      materials: text(),
      dimensions: text(),
      text_en: text(),
      text_it: text(),
      order: z.number().nullish().transform((v) => v ?? 0),
      published: z.boolean().default(true),
    }),
});

// 2. Les rubriques (un fichier .json par rubrique)
const categories = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categories' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      name_en: text(),
      name_it: text(),
      subtitle: text(),
      subtitle_en: text(),
      subtitle_it: text(),
      intro: text(),
      intro_en: text(),
      intro_it: text(),
      cover: optionalImage(image),
      cover_alt: text(),
      order: z.number().default(0),
    }),
});

// 3. Le CV (un fichier .json par ligne du CV)
const cv = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/cv' }),
  schema: z.object({
    type: z.enum(['ecole', 'apprentissage']),
    dates: z.string(),
    place: z.string(),
    description: text(),
    description_en: text(),
    description_it: text(),
    order: z.number().default(0),
  }),
});

// 4. Les réglages généraux (un seul fichier : site.json)
const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: text(),
      email: text(),
      instagram: text(),
      hero_image: optionalImage(image),
      portrait: optionalImage(image),
      portrait_alt: text(),
      bio: text(),
      bio_en: text(),
      bio_it: text(),
      approach: text(),
      approach_en: text(),
      approach_it: text(),
    }),
});

export const collections = { posts, categories, cv, settings };
