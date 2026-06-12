#!/usr/bin/env node
/**
 * One-shot migration of al-folio (Jekyll) content into Astro content collections.
 *
 *   node scripts/migrate.mjs news                  # migrate all news items
 *   node scripts/migrate.mjs projects [name ...]   # migrate projects (all, or only the named files)
 *   node scripts/migrate.mjs posts [name ...]      # migrate blog posts
 *   node scripts/migrate.mjs books                 # migrate books
 *
 * Old-site root is assumed to be the parent of site/.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE = process.cwd();
const OLD = path.resolve(SITE, '..');
const args = process.argv.slice(2);
const what = args[0] ?? 'all';
const only = args.slice(1);

function readFm(file) {
  const src = fs.readFileSync(file, 'utf-8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { fm: {}, body: src.trim(), rawFm: '' };
  return { rawFm: m[1], body: src.slice(m[0].length).trim() };
}

function fmValue(rawFm, key) {
  const m = rawFm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

function yamlStr(s) {
  return JSON.stringify(s ?? '');
}

/** Convert {% include figure.liquid path="..." caption="..." %} to plain HTML. */
function convertLiquid(body) {
  body = body.replace(/\{%\s*include\s+figure\.liquid\s+([^%]*)%\}/g, (_, attrs) => {
    const get = (name) => {
      const m = attrs.match(new RegExp(`${name}=["']([^"']+)["']`));
      return m ? m[1] : undefined;
    };
    const src = get('path') ?? '';
    const caption = get('caption');
    const cap = caption ? `\n  <figcaption class="caption">${caption}</figcaption>` : '';
    return `<figure>\n  <img src="/${src.replace(/^\//, '')}" alt="${caption ?? 'Figure'}" loading="lazy" />${cap}\n</figure>`;
  });
  // {% pdf "/assets/pdf/x.pdf" height=1030px no_link %} -> inline PDF embed
  body = body.replace(/\{%\s*pdf\s+["']([^"']+)["'][^%]*%\}/g, (_, src) => {
    return `<object data="${src}" type="application/pdf" class="w-full rounded-lg border" style="height: 80vh">\n  <p>View the PDF <a href="${src}">here</a>.</p>\n</object>`;
  });
  // Any other liquid tags: strip but warn.
  const leftovers = body.match(/\{%[^%]*%\}|\{\{[^}]*\}\}/g);
  if (leftovers) {
    console.warn('  ! stripped liquid:', leftovers.slice(0, 5));
    body = body.replace(/\{%[^%]*%\}|\{\{[^}]*\}\}/g, '');
  }
  return body;
}

/* ---------------- bibliography (for post citations) ---------------- */

function parseBibEntries(bibSrc) {
  const entries = {};
  const re = /@\w+\s*\{\s*([^,]+),/g;
  let m;
  while ((m = re.exec(bibSrc))) {
    let depth = 1;
    let j = m.index + m[0].length;
    const start = j;
    while (j < bibSrc.length && depth > 0) {
      if (bibSrc[j] === '{') depth++;
      else if (bibSrc[j] === '}') depth--;
      j++;
    }
    const body = bibSrc.slice(start, j - 1);
    const field = (name) => {
      const fm = body.match(new RegExp(`${name}\\s*=\\s*[{"]([\\s\\S]*?)[}"]\\s*,?\\s*\\n`, 'i'));
      return fm ? fm[1].replace(/[{}]/g, '').replace(/\s+/g, ' ').trim() : undefined;
    };
    entries[m[1].trim()] = {
      title: field('title'),
      author: field('author'),
      year: field('year'),
      journal: field('journal') ?? field('booktitle') ?? field('publisher'),
      url: field('url') ?? field('html'),
    };
    re.lastIndex = j;
  }
  return entries;
}

function formatRef(e) {
  if (!e) return 'Unknown reference.';
  const authors = (e.author ?? '')
    .split(/\s+and\s+/)
    .map((a) => {
      const [last, first] = a.split(',').map((s) => s.trim());
      return first ? `${first} ${last}` : a.trim();
    })
    .join(', ');
  const parts = [authors, e.title, e.journal, e.year].filter(Boolean);
  let ref = parts.join('. ') + '.';
  if (e.url) ref += ` [Link](${e.url})`;
  return ref;
}

/** Replace <d-cite key="..."> with numbered citation links + build a references section. */
function convertCitations(body, bibFile) {
  const keys = [];
  let bib = {};
  if (bibFile && fs.existsSync(bibFile)) {
    bib = parseBibEntries(fs.readFileSync(bibFile, 'utf-8'));
  }
  body = body.replace(/<d-cite\s+key=["']([^"']+)["']\s*><\/d-cite>/g, (_, keyList) => {
    return keyList
      .split(',')
      .map((k) => {
        const key = k.trim();
        let idx = keys.indexOf(key);
        if (idx === -1) {
          keys.push(key);
          idx = keys.length - 1;
        }
        return `<a href="#ref-${idx + 1}" class="citation">[${idx + 1}]</a>`;
      })
      .join('');
  });
  // d-footnote -> inline parenthetical
  body = body.replace(/<d-footnote>([\s\S]*?)<\/d-footnote>/g, ' *($1)*');

  if (keys.length > 0) {
    const refs = keys
      .map((k, i) => `<li id="ref-${i + 1}">${formatRef(bib[k])}</li>`)
      .join('\n');
    body += `\n\n## References\n\n<ol class="references-list">\n${refs}\n</ol>\n`;
  }
  return body;
}

/* ---------------- migrations ---------------- */

function migrateNews() {
  const outDir = path.join(SITE, 'src/content/news');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(OLD, '_news'))) {
    if (!f.endsWith('.md')) continue;
    const { rawFm, body } = readFm(path.join(OLD, '_news', f));
    const date = fmValue(rawFm, 'date') ?? '2024-01-01';
    const display = fmValue(rawFm, 'display') !== 'false';
    const out = `---\ndate: ${yamlStr(date)}\ndisplay: ${display}\n---\n\n${convertLiquid(body)}\n`;
    fs.writeFileSync(path.join(outDir, f), out);
    console.log('news:', f);
  }
}

function migrateProjects() {
  const outDir = path.join(SITE, 'src/content/projects');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(OLD, '_projects'))) {
    if (!f.endsWith('.md')) continue;
    if (only.length && !only.includes(f.replace('.md', ''))) continue;
    const { rawFm, body } = readFm(path.join(OLD, '_projects', f));
    const img = fmValue(rawFm, 'img');
    const fm = [
      `title: ${yamlStr(fmValue(rawFm, 'title'))}`,
      fmValue(rawFm, 'description') && `description: ${yamlStr(fmValue(rawFm, 'description'))}`,
      fmValue(rawFm, 'authors') && `authors: ${yamlStr(fmValue(rawFm, 'authors'))}`,
      img && `img: ${yamlStr('/' + img.replace(/^\//, ''))}`,
      `importance: ${fmValue(rawFm, 'importance') ?? 0}`,
      `category: ${yamlStr(fmValue(rawFm, 'category') ?? 'Other')}`,
      fmValue(rawFm, 'redirect') && `redirect: ${yamlStr(fmValue(rawFm, 'redirect'))}`,
      fmValue(rawFm, 'developed_date') && `developedDate: ${yamlStr(fmValue(rawFm, 'developed_date'))}`,
      `visible: ${fmValue(rawFm, 'visible') !== 'false'}`,
    ]
      .filter(Boolean)
      .join('\n');
    fs.writeFileSync(path.join(outDir, f), `---\n${fm}\n---\n\n${convertLiquid(body)}\n`);
    console.log('project:', f);
  }
}

function migratePosts() {
  const outDir = path.join(SITE, 'src/content/posts');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(OLD, '_posts'))) {
    if (!f.endsWith('.md')) continue;
    if (only.length && !only.includes(f.replace('.md', ''))) continue;
    const { rawFm, body } = readFm(path.join(OLD, '_posts', f));
    const bibRel = fmValue(rawFm, 'bibliography');
    const bibFile = bibRel ? path.join(OLD, 'assets/bibliography', bibRel) : undefined;
    let converted = convertLiquid(body);
    converted = convertCitations(converted, bibFile);
    const date = f.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? fmValue(rawFm, 'date') ?? '2024-01-01';
    const ogImage = fmValue(rawFm, 'og_image');
    const fm = [
      `title: ${yamlStr(fmValue(rawFm, 'title'))}`,
      fmValue(rawFm, 'description') && `description: ${yamlStr(fmValue(rawFm, 'description'))}`,
      `date: ${yamlStr(fmValue(rawFm, 'date') ?? date)}`,
      fmValue(rawFm, 'categories') && `categories: ${yamlStr(fmValue(rawFm, 'categories'))}`,
      fmValue(rawFm, 'tags') && `tags: ${yamlStr(fmValue(rawFm, 'tags'))}`,
      ogImage && `ogImage: ${yamlStr(ogImage)}`,
    ]
      .filter(Boolean)
      .join('\n');
    // Drop the date prefix from the slug, like Jekyll does.
    const slug = f.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    fs.writeFileSync(path.join(outDir, slug), `---\n${fm}\n---\n\n${converted}\n`);
    console.log('post:', slug);
  }
}

function migrateBooks() {
  const outDir = path.join(SITE, 'src/content/books');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(OLD, '_books'))) {
    if (!f.endsWith('.md')) continue;
    const { rawFm, body } = readFm(path.join(OLD, '_books', f));
    const img = fmValue(rawFm, 'img');
    const fm = [
      `title: ${yamlStr(fmValue(rawFm, 'title'))}`,
      fmValue(rawFm, 'author') && `author: ${yamlStr(fmValue(rawFm, 'author'))}`,
      img && `img: ${yamlStr('/' + img.replace(/^\//, ''))}`,
      fmValue(rawFm, 'categories') && `categories: ${yamlStr(fmValue(rawFm, 'categories'))}`,
    ]
      .filter(Boolean)
      .join('\n');
    fs.writeFileSync(path.join(outDir, f), `---\n${fm}\n---\n\n${convertLiquid(body)}\n`);
    console.log('book:', f);
  }
}

if (what === 'news' || what === 'all') migrateNews();
if (what === 'projects' || what === 'all') migrateProjects();
if (what === 'posts' || what === 'all') migratePosts();
if (what === 'books' || what === 'all') migrateBooks();
