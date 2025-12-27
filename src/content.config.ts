import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/` directory.
  loader: glob({ base: './src/content', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }: { image: any }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      tags: z.array(z.string()).optional(),
      author: z.string().optional(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      series: z.string().optional(),   // “biopython-for-conservation”
      order: z.number().optional(),    // 1, 2, 3 — to sort inside series
      seriesTitle: z.string().optional(), // friendly series title (optional)
      draft: z.boolean().default(false),
    }),
});

const bookOne = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seriesTitle: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

// const bookone = defineCollection({
//   loader: glob({ base: './src/content/bookOne', pattern: '**/*.{md,mdx}', }),
//   schema: () =>
//     z.object({
//       title: z.string(),
//       order: z.number().optional(),    // 1, 2, 3 — to sort inside series
//       seriesTitle: z.string().optional(), // friendly series title (optional)
//       draft: z.boolean().default(false),
//     }),
// });

export const collections = { blog, bookOne };
