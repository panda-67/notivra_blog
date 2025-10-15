# 🪶 Notivra Insight

_Where knowledge meets craft. Where data learns to speak._

Built with **Astro** — fast, modular, and minimal — Notivra Insight is the narrative engine behind Notivra’s publications: essays, tutorials, and serialized explorations of research, science, and digital craft.

```bash
pnpm create astro@latest -- --template blog
```

> 🌒 **Note:** This project began from Astro’s Blog Starter Kit, but evolved into a fully structured content system for series-based publishing.

---

## ✨ Features

- 🧱 **Content Collections** for posts, insights, and multi-chapter series
- 🪶 **Markdown & MDX** support — write with clarity, code with precision
- ⚡ **Fast by design** — 100/100 Lighthouse performance
- 🔎 **SEO-ready** — canonical URLs, OpenGraph, and sitemap included
- 🧭 **Series navigation** — table of contents, next/previous chapter links
- 🗞️ **RSS Feed** and structured metadata
- 🎨 **Customizable layouts** with Tailwind and TypeScript

---

## 🧩 Project Structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── blog/
│   │   └── bookone/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

**Core idea:**
Each Markdown or MDX file inside `src/content/blog` or `src/content/series` becomes a page.
Series entries (`src/content/bookone/`) act as chapters in larger thematic arcs — indexed and cross-linked through a dynamic table of contents.

---

## 🧞 Commands

Run all commands from your project root:

| Command                   | Description                                         |
| :--------------------------| :-------------------------------------------------- |
| `pnpm install`             | Install dependencies                                |
| `pnpm dev`                 | Start the local dev server at `localhost:4321`     |
| `pnpm build`               | Build the production site to `./dist/`             |
| `pnpm preview`             | Preview your build before deployment               |
| `pnpm astro ...`           | Run Astro CLI commands                             |
| `pnpm astro -- --help`     | Display help for all Astro commands                |

---

## 🧠 Concept

> “Notivra Insight is not a blog. It’s a living index of intellect
> where each series forms a book, and each post a page in a larger thought.”

- **Blog posts** → Standalone insights, essays, and updates.
- **Series** → Thematic deep dives with chapter-based navigation and continuity.
- **Index pages** → Unified feeds blending both, in chronological or thematic order.

---

## 🌍 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Notivra Website](https://notivra.com)
- [Join the Notivra Collective](mailto:info@notivra.com)

---

## 🪞 Credit

Originally based on [Bear Blog](https://github.com/HermanMartinus/bearblog/) via Astro Starter Kit — rebuilt for clarity, purpose, and scientific storytelling by **Lord** and the **Notivra** team.
