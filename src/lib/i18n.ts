import { marked } from 'marked';
import site from '../data/site.json';

export type Lang = 'zh' | 'en';
export const LANGS: Lang[] = ['zh', 'en'];
export const HTML_LANG: Record<Lang, string> = { zh: 'zh-Hant', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { zh: 'zh_TW', en: 'en_US' };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Bilingual field lookup: obj.title_zh / obj.title_en, falling back to Chinese. */
export function t(obj: any, key: string, lang: Lang): string {
  if (!obj) return '';
  return (lang === 'en' && obj[key + '_en']) || obj[key + '_zh'] || obj[key + '_en'] || '';
}

/** Path inside the site for a page, e.g. href('news/', 'en') -> /NRIOLab/en/news/ */
export function href(path: string, lang: Lang): string {
  return `${BASE}/${lang === 'en' ? 'en/' : ''}${path}`;
}

/** Uploaded media is stored as "/images/uploads/x.jpg"; prefix the base path. */
export function asset(p?: string | null): string {
  if (!p) return '';
  return /^(https?:)?\/\//.test(p) ? p : `${BASE}/${p.replace(/^\//, '')}`;
}

export function md(s?: string | null): string {
  if (!s) return '';
  return (marked.parse(s, { async: false }) as string).replace(/(src|href)="\/(?!\/)/g, `$1="${BASE}/`);
}

export function plain(s?: string | null, max = 155): string {
  const text = (s || '').replace(/[#*_>`\[\]()!-]/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

export const fmtDate = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '.');
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const NAV = [
  { id: 'home', path: '', zh: '首頁', en: 'Home' },
  { id: 'news', path: 'news/', zh: '最新消息', en: 'News' },
  { id: 'research', path: 'research/', zh: '研究方向', en: 'Research' },
  { id: 'members', path: 'members/', zh: '成員', en: 'Members' },
  { id: 'publications', path: 'publications/', zh: '研究成果', en: 'Publications' },
  { id: 'contact', path: 'contact/', zh: '聯絡我們', en: 'Contact' }
] as const;

export const UI = {
  zh: {
    latest: '最新消息', more: '查看全部', back: '返回消息列表', all: '全部', link: '相關連結',
    empty: '目前沒有資料。', pinned: '置頂', address: '地址', email: 'Email', phone: '電話',
    search: '搜尋論文…', home: '首頁', menu: '選單', switchLang: 'English', notFound: '找不到這個頁面',
    pubTypes: { journal: '期刊論文', conference: '研討會論文', patent: '專利', book: '專書／章節', other: '其他' },
    roles: { pi: '主持人', postdoc: '博士後研究員', phd: '博士生', master: '碩士生', undergrad: '大學部專題生', assistant: '研究助理', alumni: '畢業校友' }
  },
  en: {
    latest: 'Latest News', more: 'View all', back: 'Back to news', all: 'All', link: 'Link',
    empty: 'Nothing here yet.', pinned: 'Pinned', address: 'Address', email: 'Email', phone: 'Phone',
    search: 'Search publications…', home: 'Home', menu: 'Menu', switchLang: '中文', notFound: 'Page not found',
    pubTypes: { journal: 'Journal Papers', conference: 'Conference Papers', patent: 'Patents', book: 'Books / Chapters', other: 'Others' },
    roles: { pi: 'Principal Investigator', postdoc: 'Postdoctoral Researchers', phd: 'Ph.D. Students', master: 'Master Students', undergrad: 'Undergraduate Students', assistant: 'Research Assistants', alumni: 'Alumni' }
  }
} as const;

export { site };
