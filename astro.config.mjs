import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// On Vercel this is the project's production domain: the .vercel.app address
// until www.nforceai.com is added, then the custom domain. Canonical URLs and
// the link preview image (og.jpg) use it, so previews work before launch too.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = productionHost ? `https://${productionHost}` : 'https://www.nforceai.com';

export default defineConfig({
  site,
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
