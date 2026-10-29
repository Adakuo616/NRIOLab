import type { APIRoute } from 'astro';

// Note: on a GitHub project page (user.github.io/Repo/) search engines only read
// robots.txt at the domain root, so this file takes effect once a custom domain is used.
export const GET: APIRoute = ({ site }) => new Response(
  `User-agent: *
Allow: /
Disallow: ${import.meta.env.BASE_URL}admin/

Sitemap: ${new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site).href}
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
