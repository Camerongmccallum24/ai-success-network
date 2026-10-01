import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { Tool } from '@asn/schema';

// One JSON file per tool in data/tools/, validated at build by the shared schema.
// Using the workspace schema here (not a copy) is ADR 0008: one Zod instance everywhere.
export const collections = {
  tools: defineCollection({
    loader: glob({ pattern: '*.json', base: '../../data/tools' }),
    schema: Tool,
  }),
};
