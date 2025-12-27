// @ts-check

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';


export default defineConfig({
  site: 'http://print.local',
  integrations: [mdx(), solidJs()],
  outDir: './press/build',
  output: 'static',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});
