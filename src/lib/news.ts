import { getCollection, type CollectionEntry } from 'astro:content';

export type News = CollectionEntry<'news'>;

/** Pinned first, then newest first. */
export async function getNews(): Promise<News[]> {
  const all = await getCollection('news');
  return all.sort((a, b) =>
    Number(!!b.data.pinned) - Number(!!a.data.pinned) || b.data.date.getTime() - a.data.date.getTime());
}
