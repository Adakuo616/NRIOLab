import { getCollection, type CollectionEntry } from 'astro:content';

export type News = CollectionEntry<'news'>;

/** Pinned first, then newest first. */
export async function getNews(): Promise<News[]> {
  const all = await getCollection('news');
  return all.sort((a, b) =>
    Number(!!b.data.pinned) - Number(!!a.data.pinned) || b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id));
}

/** 最新消息 shows current items; 過往成果 shows the ones marked archived. */
export async function getCurrentNews() { return (await getNews()).filter((n) => !n.data.archived); }
export async function getArchivedNews() { return (await getNews()).filter((n) => n.data.archived); }
