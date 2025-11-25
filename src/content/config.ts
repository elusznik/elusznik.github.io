import { defineCollection, z } from 'astro:content';

const modelsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		free_tier_details: z.string(),
		link: z.string().url(),
		date_updated: z.date(),
		category: z.string().default('Other'),
		handle: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	'models': modelsCollection,
	'updates': defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			date: z.date(),
			description: z.string(),
		}),
	}),
};
