// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://insights.notivra.com',
  integrations: [mdx(), sitemap()],
  outDir: '../notivra-php/public_html/blog',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});