import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.nforceai.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: {
    '/blog/understand-how-to-maximize': '/resources/our-favorite-ai-tools',
    '/blog/the-science-behind-scaling': '/resources/our-favorite-ai-tools',
    '/blog/the-role-of-ai-in-universities': '/resources/our-favorite-ai-tools',
  },
});
