import fs from 'node:fs';
import path from 'node:path';

export interface Publication {
  key: string;
  title: string;
  authors: { name: string; me: boolean; equal: boolean }[];
  abstract?: string;
  venue: string;
  year: number;
  month?: string;
  pdf?: string;
  html?: string;
  preview?: string;
  abbr?: string;
  selected: boolean;
  hasEqualContribution: boolean;
}

const MONTH_ORDER: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

/** Parse the body of a bibtex entry into a field map, handling nested braces. */
function parseFields(body: string): Record<string, string> {
  const fields: Record<string, string> = {};
  let i = 0;
  while (i < body.length) {
    const eq = body.indexOf('=', i);
    if (eq === -1) break;
    const name = body.slice(i, eq).replace(/[,\s]/g, '').toLowerCase();
    let j = eq + 1;
    while (j < body.length && /\s/.test(body[j])) j++;
    let value = '';
    if (body[j] === '{') {
      let depth = 0;
      const start = ++j;
      while (j < body.length) {
        if (body[j] === '{') depth++;
        else if (body[j] === '}') {
          if (depth === 0) break;
          depth--;
        }
        j++;
      }
      value = body.slice(start, j);
      j++;
    } else {
      const end = body.indexOf(',', j);
      value = body.slice(j, end === -1 ? body.length : end);
      j = end === -1 ? body.length : end;
    }
    if (name) fields[name] = value.replace(/\s+/g, ' ').trim();
    i = j + 1;
  }
  return fields;
}

function parseAuthors(raw: string): Publication['authors'] {
  return raw.split(/\s+and\s+/).map((part) => {
    const equal = part.includes('*');
    const me = /Quaedvlieg/i.test(part);
    const clean = stripTags(part).replace(/\*/g, '').trim();
    const [last, first] = clean.split(',').map((s) => s.trim());
    const name = first ? `${first} ${last}` : clean;
    return { name, me, equal };
  });
}

export function loadPublications(): Publication[] {
  const file = path.join(process.cwd(), 'src/data/papers.bib');
  const src = fs.readFileSync(file, 'utf-8');
  const pubs: Publication[] = [];

  const entryRe = /@\w+\s*\{\s*([^,]+),/g;
  let match: RegExpExecArray | null;
  while ((match = entryRe.exec(src))) {
    // Find the matching closing brace for this entry.
    let depth = 1;
    let j = match.index + match[0].length;
    const bodyStart = j;
    while (j < src.length && depth > 0) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') depth--;
      j++;
    }
    const fields = parseFields(src.slice(bodyStart, j - 1));
    const authors = parseAuthors(fields.author ?? '');
    pubs.push({
      key: match[1].trim(),
      title: stripTags(fields.title ?? ''),
      authors,
      abstract: fields.abstract,
      venue: stripTags((fields.journal ?? fields.booktitle ?? '').replace(/,\s*$/, '')),
      year: parseInt(fields.year ?? '0', 10),
      month: fields.month,
      pdf: fields.pdf,
      html: fields.html,
      preview: fields.preview,
      abbr: fields.abbr?.replace(/<br\s*\/?>/gi, ' '),
      selected: fields.selected === 'true',
      hasEqualContribution: authors.some((a) => a.equal),
    });
    entryRe.lastIndex = j;
  }

  return pubs.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const am = MONTH_ORDER[(a.month ?? '').slice(0, 3).toLowerCase()] ?? 0;
    const bm = MONTH_ORDER[(b.month ?? '').slice(0, 3).toLowerCase()] ?? 0;
    return bm - am;
  });
}

/** Resolve a pdf field: bare filenames live in /assets/pdf/, URLs pass through. */
export function pdfUrl(pdf: string): string {
  return /^https?:\/\//.test(pdf) ? pdf : `/assets/pdf/${pdf}`;
}

/** Resolve a preview field: bare filenames live in /assets/img/publication_preview/. */
export function previewUrl(preview: string): string {
  return /^https?:\/\//.test(preview) ? preview : `/assets/img/publication_preview/${preview}`;
}
