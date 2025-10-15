import { getCollection, type CollectionEntry } from 'astro:content';

export async function getSeries(series: string): Promise<{
  chapters: CollectionEntry<'blog'>[];
  navMap: Record<string, { prev: string | null; next: string | null }>;
}> {
  // Load all posts in this series
  const posts = await getCollection('blog', ({ data }) => data.series === series);

  // Exclude the series "index" file, regardless of its actual id or slug
  const chapters = posts.filter(
    (post) =>
      !post.id.endsWith('/index') && post.data.slug !== 'index' && post.id !== series
  );

  // Sort chapters by pubDate
  chapters.sort((a, b) => {
    const orderA = a.data.order ?? Infinity;
    const orderB = b.data.order ?? Infinity;
    if (orderA !== orderB) return orderA - orderB;
    return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
  });

  // Build navigation map
  const navMap: Record<string, { prev: string | null; next: string | null }> = {};
  chapters.forEach((ch, i) => {
    navMap[ch.id] = {
      prev: i > 0 ? chapters[i - 1].id : null,
      next: i < chapters.length - 1 ? chapters[i + 1].id : null,
    };
  });

  return { chapters, navMap };
}

export async function getAllSeries() {
  const all = await getCollection('blog');
  return [...new Set(all.map(p => p.data.series).filter(Boolean))];
}
