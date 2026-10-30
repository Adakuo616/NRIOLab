import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title_zh: z.string(),
    title_en: z.string().optional().nullable(),
    heading_zh: z.string().optional().nullable(),
    heading_en: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    date: z.coerce.date(),
    archived: z.boolean().optional().nullable(),
    images: z.array(z.string()).optional().nullable(),
    category: z.string().optional().nullable(),
    pinned: z.boolean().optional().nullable(),
    image: z.string().optional().nullable(),
    link: z.string().optional().nullable(),
    body_en: z.string().optional().nullable()
  })
});

export const collections = { news };
