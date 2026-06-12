# Website — running & maintaining

The site lives in [`site/`](site/), built with [Astro](https://astro.build) + Tailwind CSS —
no Ruby/Jekyll. It deploys automatically: **every push to `main` builds and publishes**
to https://lars-quaedvlieg.github.io via `.github/workflows/deploy-astro.yml`
(GitHub Pages, Source: GitHub Actions). A manual deploy is available under
**Actions → "Deploy Astro site to GitHub Pages" → Run workflow**.

## Run it locally

```bash
cd site
npm install     # first time only
npm run dev     # serves http://localhost:4321 with hot reload
```

Other useful commands (run inside `site/`):

```bash
npm run build     # production build into site/dist/
npm run preview   # serve the production build locally
```

> **WSL note:** the repo lives on the Windows drive (`/mnt/c/...`), so `npm install` and the dev
> server are noticeably slower than on the Linux filesystem. It all works — it's just I/O-bound.

## Content lives here

| Content       | Location                         | Notes                                                            |
| ------------- | -------------------------------- | ---------------------------------------------------------------- |
| Publications  | `site/src/data/papers.bib`       | BibTeX, parsed at build time; `selected={true}` → homepage       |
| Blog posts    | `site/src/content/posts/*.md`    | Markdown, `$...$` math; `series: "Name"` groups posts on /blog   |
| Projects      | `site/src/content/projects/*.md` | `redirect:` links out, `developedDate:` controls sort order      |
| Highlights    | `site/src/content/news/*.md`     | Homepage "Highlights" cards; `display: false` hides an item      |
| CV            | `site/src/data/cv.yml`           | Drives the whole /cv page                                        |
| Timeline      | `site/src/data/timeline.ts`      | Homepage "Journey" section                                       |
| Images / PDFs | `site/public/assets/`            | Served as-is                                                     |

The blog also ships an RSS feed at `/rss.xml`.

## Knobs

- **Analytics** — set `GOATCOUNTER` in `site/src/lib/site.ts` after creating a free site at
  goatcounter.com (privacy-friendly, no cookies). Empty string = disabled.
- **Theme** — first-time visitors get light mode; the header toggle persists their choice.
- **Evolution field** — all simulation tuning constants live at the top of
  `site/src/components/EvolutionField.astro`. Pages opt out with `<Base field={false}>`
  (blog posts and project pages do).
- **Share card** — `site/public/assets/img/og-card.png` is the default link-preview image;
  per-page overrides via the `ogImage` frontmatter/prop.
