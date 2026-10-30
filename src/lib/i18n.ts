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

type NavLink = { id: string; path: string; zh: string; en: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const NAV: NavItem[] = [
  { id: 'news', path: 'news/', zh: '最新消息', en: 'News' },
  { id: 'introduction', path: 'introduction/', zh: '實驗室介紹', en: 'Introduction' },
  {
    id: 'professor', path: 'professor/', zh: '指導教授', en: 'Professor',
    children: [
      { id: 'professor', path: 'professor/', zh: '指導教授', en: 'Professor' },
      { id: 'academic-writings', path: 'professor/academic-writings/', zh: '著作目錄', en: 'Academic Writings' },
      { id: 'nstc-projects', path: 'professor/nstc-projects/', zh: '國科會計畫', en: 'NSTC Projects' },
      { id: 'industry-projects', path: 'professor/industry-projects/', zh: '產學計畫', en: 'Industry Academia Projects' }
    ]
  },
  {
    id: 'members', path: 'members/', zh: '研究團隊', en: 'Members',
    children: [
      { id: 'phd', path: 'members/phd/', zh: '博士生', en: 'PhD Students' },
      { id: 'master', path: 'members/master/', zh: '碩士生', en: 'Master Students' },
      { id: 'undergrad', path: 'members/undergraduate/', zh: '專題生', en: 'Undergraduate Students' },
      { id: 'alumni', path: 'members/alumni/', zh: '畢業生', en: 'NRIO Graduates' }
    ]
  },
  { id: 'life', path: 'life/', zh: '生活點滴', en: 'Life' },
  { id: 'achievements', path: 'achievements/', zh: '過往成果', en: 'Achievements' }
];

/** Every page in the menu, including dropdown children (first match wins). */
export const NAV_PAGES: NavLink[] = NAV.flatMap((n) => [n, ...(n.children || [])])
  .filter((n, i, all) => all.findIndex((x) => x.path === n.path) === i);

export function navItem(id: string): NavLink {
  return NAV_PAGES.find((n) => n.id === id)!;
}

/** Which top-level menu item a page belongs to (for highlighting). */
export function navParent(id: string): string {
  return NAV.find((n) => n.id === id || n.children?.some((c) => c.id === id))?.id || id;
}

/** Footer quick links, same as the original site. */
export const FOOTER_LINKS = ['news', 'introduction', 'professor', 'life', 'achievements'];

/** News category -> colour class (matches the original site's orange / red labels). */
export const CATEGORY_CLASS: Record<string, string> = { '研討會': 'cat-conf', '賀！': 'cat-congrats' };

export const UI = {
  zh: {
    latest: '最新消息', more: '查看全部', back: '返回消息列表', all: '全部', link: '相關連結',
    empty: '目前沒有資料。', pinned: '置頂', address: '地址', email: 'Email', phone: '電話',
    search: '搜尋成果…', contact: '聯絡我們', seeMore: '看更多消息', research: '研究方向', home: '首頁', menu: '選單', switchLang: 'English', notFound: '找不到這個頁面',
    pubTypes: { award: '獲獎', journal: '期刊論文', conference: '研討會論文', project: '研究計畫', patent: '專利', book: '專書／章節', other: '其他' },
    roles: { pi: '指導教授', postdoc: '博士後研究員', phd: '博士生', master: '碩士生', undergrad: '專題生', assistant: '研究助理', alumni: '畢業生' }
  },
  en: {
    latest: 'Latest News', more: 'View all', back: 'Back to news', all: 'All', link: 'Link',
    empty: 'Nothing here yet.', pinned: 'Pinned', address: 'Address', email: 'Email', phone: 'Phone',
    search: 'Search achievements…', contact: 'Contact', seeMore: 'See more news', research: 'Research', home: 'Home', menu: 'Menu', switchLang: '中文', notFound: 'Page not found',
    pubTypes: { award: 'Awards', journal: 'Journal Papers', conference: 'Conference Papers', project: 'Research Projects', patent: 'Patents', book: 'Books / Chapters', other: 'Others' },
    roles: { pi: 'Advisor', postdoc: 'Postdoctoral Researchers', phd: 'PhD Students', master: 'Master Students', undergrad: 'Undergraduate Students', assistant: 'Research Assistants', alumni: 'NRIO Graduates' }
  }
} as const;

export { site };
