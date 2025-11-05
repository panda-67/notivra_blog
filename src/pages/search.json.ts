import { getCollection } from 'astro:content';

export const GET = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return new Response(
    JSON.stringify(
      posts.map(({ data }) => ({
        title: data.title,
        slug: data.slug,
        description: data.description,
        tags: data.tags || [],
        series: data.series || null
      }))
    ),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
