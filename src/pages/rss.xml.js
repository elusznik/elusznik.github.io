import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const models = await getCollection('models');
  const updates = await getCollection('updates');

  const allItems = [
    ...models.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date_updated,
      description: post.data.description,
      link: post.data.link,
      customData: `<free_tier>${post.data.free_tier_details}</free_tier>`,
    })),
    ...updates.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/updates/${post.slug}/`,
      content: sanitizeHtml(marked.parse(post.body)),
    })),
  ].sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

  return rss({
    title: 'Free AI Access Tracker',
    description: 'Curated list of free access to premium AI models.',
    site: context.site || 'https://example.com',
    items: allItems,
  });
}
