import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSeries(series: string): Promise<{
  chapters: CollectionEntry<'blog'>[];
  navMap: Record<string, { prev: string | null; next: string | null; prevTitle?: string; nextTitle?: string }>;
}> {
  const posts = await getCollection('blog', ({ data }) => data.series === series);

  const chapters = posts.filter(
    (post) =>
      !post.id.endsWith('/index') && post.data.slug !== 'index' && post.id !== series
  );

  chapters.sort((a, b) => {
    const orderA = a.data.order ?? Infinity;
    const orderB = b.data.order ?? Infinity;
    if (orderA !== orderB) return orderA - orderB;
    return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
  });

  const navMap: Record<string, { prev: string | null; next: string | null; prevTitle?: string; nextTitle?: string }> = {};
  chapters.forEach((ch, i) => {
    navMap[ch.id] = {
      prev: i > 0 ? chapters[i - 1].id : null,
      next: i < chapters.length - 1 ? chapters[i + 1].id : null,
      prevTitle: i > 0 ? chapters[i - 1].data.title : undefined,
      nextTitle: i < chapters.length - 1 ? chapters[i + 1].data.title : undefined,
    };
  });

  return { chapters, navMap };
}

export async function getRelatedPosts({ tags, slug, }: {
  tags?: string[];
  slug: string;
}) {
  const allPosts = await getCollection('blog');
  const related = allPosts
    .filter((p) => p.id !== slug)
    .map((p) => ({
      ...p,
      score: (p.data.tags ?? []).filter((t) => (tags ?? []).includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  return related;
}

export async function getAllSeries() {
  const all = await getCollection('blog');
  return [...new Set(all.map(p => p.data.series).filter(Boolean))];
}

export function readingTime(markdown: string, wpm = 225) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}
