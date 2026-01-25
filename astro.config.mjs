// @ts-check

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';


// https://astro.build/config
export default defineConfig({
  site: 'https://notivra.com',
  integrations: [mdx(), sitemap(), solidJs()],
  outDir: '../notivra-php/public_html/blog',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});
