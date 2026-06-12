// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';

// Site/base are injected by the GitHub Pages workflow (see .github/workflows/deploy-astro.yml).
// Locally they default to the production URL with no base path.
const site = process.env.ASTRO_SITE || 'https://lars-quaedvlieg.github.io';
const base = process.env.ASTRO_BASE || '/';

/**
 * Rewrites root-absolute URLs (src/href starting with "/") inside rendered
 * markdown so they respect the configured base path. Without this, blog-post
 * images break when the site is served from a project page like
 * https://<user>.github.io/<repo>/.
 */
function rehypeBaseUrl() {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  return (tree) => {
    if (!prefix) return;
    visit(tree, 'element', (node) => {
      for (const attr of ['src', 'href']) {
        const val = node.properties?.[attr];
        if (typeof val === 'string' && val.startsWith('/') && !val.startsWith('//') && !val.startsWith(prefix + '/')) {
          node.properties[attr] = prefix + val;
        }
      }
    });
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: false, trust: true }], rehypeBaseUrl],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
