import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SITE_URL: z.string().url().default('{{{domain}}}'),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  SITE_URL: process.env.SITE_URL || '{{{domain}}}',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

// Log des variables d'environnement en développement
if (env.NODE_ENV === 'development') {
  console.log('📋 Environment variables:');
  console.log('  NODE_ENV=', env.NODE_ENV);
  console.log('  SITE_URL=', env.SITE_URL);
}
