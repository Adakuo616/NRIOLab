import type { APIRoute } from 'astro';
import { LANGS, HTML_LANG, NAV_PAGES, href, isoDate } from '../lib/i18n';
import { hasDetail } from '../lib/members';
import { getNews } from '../lib/news';
import members from '../data/members.json';

// One <url> per language version, each listing all alternates (hreflang return tags).
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const pages: { path: string; lastmod?: string }[] = [{ path: '' }, ...NAV_PAGES.map((n) => ({ path: n.path }))];
  for (const m of members.items as any[]) if (hasDetail(m)) pages.push({ path: `members/${m.slug}/` });
  for (const n of await getNews()) pages.push({ path: `news/${n.id}/`, lastmod: isoDate(n.data.date) });

  const urls = pages.flatMap(({ path, lastmod }) => LANGS.map((lang) => [
    '  <url>',
    `    <loc>${abs(href(path, lang))}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    ...(LANGS.length > 1 ? [...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${abs(href(path, l))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(href(path, 'zh'))}"/>`] : []),
    '  </url>'
  ].join('\n')));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
