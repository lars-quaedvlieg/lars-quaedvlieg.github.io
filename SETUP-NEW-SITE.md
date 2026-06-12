# New website (Astro) — running & deploying

The redesigned site lives in [`site/`](site/) on the `modern-redesign` branch. It is built with
[Astro](https://astro.build) + Tailwind CSS — no Ruby/Jekyll required.

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

| Content       | Location                                   | Notes                                              |
| ------------- | ------------------------------------------ | -------------------------------------------------- |
| Publications  | `site/src/data/papers.bib`                 | Same BibTeX format as before, parsed at build time |
| Blog posts    | `site/src/content/posts/*.md`              | Plain markdown, `$...$` / `$$...$$` math           |
| Projects      | `site/src/content/projects/*.md`           | Frontmatter: title, img, category, redirect, …     |
| News          | `site/src/content/news/*.md`               | Shown on the home page                             |
| CV            | `site/src/data/cv.yml`                     | Same structure as the old `_data/cv.yml`           |
| Timeline      | `site/src/data/timeline.ts`                | Home-page "Journey" section                        |
| Images / PDFs | `site/public/assets/`                      | Served as-is                                       |

Old Jekyll content can be re-migrated anytime with `node scripts/migrate.mjs <news|projects|posts|books>`
(run inside `site/`).

## Serve this branch on GitHub Pages (step by step)

The branch ships with a workflow (`.github/workflows/deploy-astro.yml`) that builds `site/` and
publishes it to GitHub Pages on every push to `modern-redesign`. To switch your Pages over to it:

1. **Push the branch:**

   ```bash
   git push -u origin modern-redesign
   ```

2. **Switch Pages to "GitHub Actions" deployment.** On GitHub, open the repo →
   **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**
   (instead of "Deploy from a branch"). This makes the Astro workflow the thing that
   serves your Pages site — the old `gh-pages` branch is simply no longer used (you can
   delete it later, but you don't have to).

3. **Trigger a deploy.** The push in step 1 already triggered one; you can also run it manually
   from **Actions → "Deploy Astro site to GitHub Pages" → Run workflow**. Watch it go green.

4. **Open the site.** The workflow auto-detects the URL:
   - On this repo (`new-website-tmp`) it serves at
     `https://lars-quaedvlieg.github.io/new-website-tmp/` — all paths are base-path aware,
     so this preview works out of the box.
   - When you later move this to your `lars-quaedvlieg.github.io` repo (or merge to its main
     branch and change the workflow trigger accordingly), the exact same workflow serves it at
     `https://lars-quaedvlieg.github.io/` with no config changes.

5. **(When you're happy)** merge `modern-redesign` into `main`, and update the `branches:` trigger
   in `.github/workflows/deploy-astro.yml` to `main`. You can then delete the old Jekyll workflows
   (`deploy.yml`, `broken-links.yml`, `prettier*.yml`, …) and, eventually, the Jekyll files
   themselves.

## Heads-up: old workflows on this branch

The legacy Jekyll deploy workflow only triggers on `main`/`master`, so it won't fight with this
one while you're previewing from `modern-redesign`.
