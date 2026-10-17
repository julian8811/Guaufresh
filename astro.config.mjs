import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';

/** @param {string | undefined} path */
function normalizeBase(path) {
  if (!path || path === '/') return '/';
  const p = path.startsWith('/') ? path : `/${path}`;
  return p.endsWith('/') ? p : `${p}/`;
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');

function resolveSite(raw) {
  const fallback = 'https://guaufresh.vercel.app';
  const value = (raw || fallback).trim();
  try {
    return new URL(value).origin;
  } catch {
    return fallback;
  }
}

export default defineConfig({
  site: resolveSite(env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL),
  base: normalizeBase(env.PUBLIC_BASE_PATH || process.env.PUBLIC_BASE_PATH || '/'),
  integrations: [react(), tailwind()],
  output: 'static',
  build: {
    // directory: /admin/ → admin/index.html (works with baseHref('/admin') on GitHub Pages)
    format: 'directory',
  },
});
