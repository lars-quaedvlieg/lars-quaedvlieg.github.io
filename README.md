# lars-quaedvlieg.github.io

Personal website of Lars Quaedvlieg — built with [Astro](https://astro.build) and Tailwind CSS,
with a full-page generative layer: an island-model evolutionary search running over every page
as a fitness landscape (the thing I research).

The site lives in [`site/`](site/):

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in site/dist
```

Content is plain markdown/data files:

| What | Where |
| --- | --- |
| Blog posts | `site/src/content/posts/` |
| Projects | `site/src/content/projects/` |
| News items | `site/src/content/news/` |
| Publications | `site/src/data/papers.bib` |
| CV | `site/src/data/cv.yml` |
| Images / PDFs | `site/public/assets/` |

Deployment is automatic: every push to `main` builds and publishes via GitHub Actions
(`.github/workflows/deploy-astro.yml`). See [SETUP-NEW-SITE.md](SETUP-NEW-SITE.md) for details.
