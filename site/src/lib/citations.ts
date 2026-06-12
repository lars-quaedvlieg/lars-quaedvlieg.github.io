/**
 * Build-time citation counts via the Semantic Scholar Graph API.
 *
 * Counts are resolved by title match and only accepted when the normalized
 * titles are identical, so a near-miss can never show someone else's count.
 * Fails soft: any network/API problem simply means no counter is rendered.
 */
const API = 'https://api.semanticscholar.org/graph/v1/paper/search/match';

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

async function fetchOne(title: string): Promise<number | undefined> {
  try {
    const res = await fetch(`${API}?query=${encodeURIComponent(title)}&fields=title,citationCount`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return undefined;
    const json = await res.json();
    const hit = json?.data?.[0];
    if (!hit || norm(hit.title) !== norm(title)) return undefined;
    return typeof hit.citationCount === 'number' ? hit.citationCount : undefined;
  } catch {
    return undefined;
  }
}

/** Map from paper title to citation count (entries missing on no/failed match). */
export async function fetchCitationCounts(titles: string[]): Promise<Record<string, number>> {
  const counts = await Promise.all(titles.map(fetchOne));
  const out: Record<string, number> = {};
  titles.forEach((t, i) => {
    if (counts[i] !== undefined) out[t] = counts[i]!;
  });
  return out;
}
