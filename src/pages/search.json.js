// Génère /search.json : la liste des travaux utilisée par la recherche.
import { getImage } from 'astro:assets';
import { getPublishedPosts, getCategories, postUrl, plainText } from '../lib/content.js';

export async function GET() {
  const posts = await getPublishedPosts();
  const categories = await getCategories();
  const names = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const items = await Promise.all(
    posts.map(async (p) => {
      let thumb = null;
      if (p.data.photos[0]) {
        const img = await getImage({ src: p.data.photos[0].image, width: 128, format: 'webp' });
        thumb = img.src;
      }
      return {
        title: p.data.title,
        url: postUrl(p),
        year: String(p.data.date.getFullYear()),
        materials: p.data.materials,
        category: names[p.data.category] || p.data.category,
        text: plainText(`${p.body || ''} ${p.data.credit}`, 1500),
        thumb,
      };
    })
  );

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
