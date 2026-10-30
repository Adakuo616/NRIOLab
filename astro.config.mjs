import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH are filled in by the GitHub Actions workflow
// (from actions/configure-pages), so a custom domain later needs no code change.
export default defineConfig({
  site: process.env.SITE_URL || 'https://adakuo616.github.io',
  base: process.env.BASE_PATH || '/NRIOLab',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
