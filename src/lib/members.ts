/** A member gets an individual page only when there is something to show beyond name and email. */
export function hasDetail(m: any): boolean {
  return m.role !== 'pi' && !!m.slug && !!(m.research_zh || m.research_en || m.journal || m.conference || m.thesis || m.awards);
}
