import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    categories: z.string().optional(),
    tags: z.string().nullable().optional(),
    ogImage: z.string().optional(),
    /** Posts sharing a series name are grouped into one collection card on the blog index. */
    series: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    authors: z.string().optional(),
    img: z.string().optional(),
    importance: z.number().default(0),
    category: z.string().default('Other'),
    redirect: z.string().optional(),
    developedDate: z.coerce.date().optional(),
    visible: z.boolean().default(true),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    display: z.boolean().default(true),
  }),
});

export const collections = { posts, projects, news };
