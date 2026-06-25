# MDTool — Free Markdown & Document Conversion Tools

MDTool is a fast, privacy-first suite of online developer tools for converting between Markdown, HTML, PDF, and Word documents. Every conversion runs **entirely in the browser** — no files are uploaded to a server, no account is required, and nothing is logged. The project also ships a content-marketing blog and a full SEO/structured-data layer.

Live site: **[www.mdtool.dev](https://www.mdtool.dev)**

---

## Table of Contents

- [What It Does](#what-it-does)
- [The Tools](#the-tools)
- [Why Client-Side](#why-client-side)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How Conversions Work](#how-conversions-work)
- [The Blog Engine](#the-blog-engine)
- [SEO & Discoverability](#seo--discoverability)
- [Analytics & Ads](#analytics--ads)
- [Security](#security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## What It Does

MDTool provides five core document converters plus a blog. The defining design constraint is that **all conversion logic executes on the client** using WebAssembly/JavaScript libraries — your documents never leave your machine. This makes it safe for confidential content (resumes, internal docs, proprietary code) and instant (no upload/download round-trip).

## The Tools

| Tool | Route | What it does |
|------|-------|--------------|
| **Markdown → PDF** | `/markdown-to-pdf` | Render Markdown to a styled, paginated PDF with selectable themes, syntax-highlighted code, tables, and Mermaid diagrams |
| **Markdown → HTML** | `/markdown-to-html` | Convert Markdown to clean, semantic HTML with GFM support and highlighted code blocks |
| **Markdown → Word** | `/markdown-to-word` | Generate a genuine OOXML `.docx` file (opens correctly in Word, Google Docs, LibreOffice, Pages) |
| **HTML → Markdown** | `/html-to-markdown` | Convert HTML (including messy Word/Google-Docs paste) into clean GitHub-Flavored Markdown |
| **Word → Markdown** | `/word-to-markdown` | Upload a `.docx` and extract clean Markdown from it |

### Key conversion features

- **Markdown → PDF**
  - Four built-in themes: `github`, `academic`, `minimal`, `dark` (scoped CSS, no page bleed)
  - Page size selection (A4 / Letter)
  - Syntax highlighting via `highlight.js` (12+ languages registered to keep the bundle small)
  - **Mermaid diagram rendering** — fenced ` ```mermaid ` blocks are rendered to SVG
  - Live preview before export

- **Markdown → Word**
  - Builds real OOXML through the `docx` library from marked's token AST — **not** an HTML-in-a-shim hack. Many converters wrap rendered HTML in an `altChunk`/MHTML wrapper, which produces files that look blank in anything other than Microsoft Word. MDTool builds the document tree directly so it renders everywhere.
  - Preserves headings, bold/italic/strike/inline-code, ordered & unordered lists, tables, blockquotes, links, and code blocks.

- **HTML → Markdown / Word → Markdown**
  - Powered by `turndown` + `turndown-plugin-gfm` with custom rules:
    - Unwraps `<p>` tags inside table cells (fixes invalid GFM tables from Word/Google-Docs HTML)
    - Preserves code-block language hints (`<code class="language-js">` → ` ```js `)
  - Word import uses `mammoth` to convert `.docx` → HTML, then pipes through the same HTML → Markdown engine.

## Why Client-Side

- **Privacy** — documents are processed in-browser and never transmitted.
- **Speed** — no upload latency; conversions are instant.
- **No login** — nothing to sign up for.
- **Offline-capable logic** — the heavy converters (`html2pdf.js`, `mammoth`, `docx`, `mermaid`) are dynamically imported so they only load when needed and never run during SSR.

## Tech Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **MDX** for blog content (`next-mdx-remote`, `gray-matter`)
- Conversion libraries: `marked`, `turndown` (+ gfm plugin), `docx`, `mammoth`, `html2pdf.js`, `mermaid`, `highlight.js`
- Deployed on **Vercel**

## Project Structure

```
app/                     # Next.js App Router
├── layout.tsx           # Root layout: fonts, metadata, GA/AdSense, structured data
├── page.tsx             # Homepage
├── markdown-to-pdf/     # Each tool = a server page.tsx (SEO/metadata) + ToolClient.tsx (interactive)
├── markdown-to-html/
├── markdown-to-word/
├── html-to-markdown/
├── word-to-markdown/
├── blog/                # Blog index + [slug] dynamic post pages
├── about/ contact/ privacy/
├── sitemap.ts           # Dynamic sitemap (tools + all blog posts)
└── robots.ts            # robots.txt

components/
├── tools/               # Editors, output panels, preview, download buttons, embedded tools
├── blog/                # BlogCard, BlogLayout
├── layout/              # Header (nav), Footer
├── seo/                 # StructuredData (JSON-LD), FaqSection
├── ads/                 # AdSlot (AdSense)
└── ui/                  # Button, Spinner, ConversionDiagram

lib/                     # Pure conversion logic (framework-agnostic)
├── markdown.ts          # Markdown → HTML (marked + highlight.js)
├── pdf.ts               # Markdown → PDF (themes, html2pdf)
├── docx.ts              # Markdown → .docx (OOXML via docx lib)
├── htmlToMarkdown.ts    # HTML → Markdown (turndown + custom rules)
├── wordToMarkdown.ts    # .docx → Markdown (mammoth → htmlToMarkdown)
├── mermaid.ts           # Lazy Mermaid diagram rendering
├── blog.ts              # MDX blog loader, frontmatter, FAQ extraction
└── download.ts          # Blob download + clipboard helpers

content/blog/            # MDX blog posts (one file per article)
scripts/                 # submit-indexnow.js (post-deploy search-engine ping)
public/                  # OG image, icons, IndexNow key, static assets
proxy.ts                 # noindex guard for *.vercel.app preview hosts
vercel.json              # Security headers (CSP, HSTS, etc.) + caching
```

### Page architecture pattern

Each tool follows a consistent split:
- **`page.tsx`** (Server Component) — owns SEO metadata, structured data, FAQ content, and renders the client tool.
- **`ToolClient.tsx`** (`'use client'`) — the interactive editor/preview/download UI.

This keeps interactivity isolated to the client while metadata, OG tags, and JSON-LD stay server-rendered for crawlers.

## How Conversions Work

All conversion logic lives in `lib/` as pure functions, decoupled from React:

- `lib/markdown.ts` registers a curated set of `highlight.js` languages (JS/TS, Python, Bash, CSS, HTML/XML, JSON, YAML, SQL, Rust, Go, Dart) and a custom `marked` renderer for highlighted code blocks.
- `lib/pdf.ts` holds the four PDF theme stylesheets (scoped to `.pdf-container`) and drives `html2pdf.js`.
- `lib/docx.ts` walks marked's token AST to build a real Word document; it also exports `DOCX_STYLES`, a CSS approximation used only for the live preview iframe.
- `lib/htmlToMarkdown.ts` configures `turndown` with ATX headings, fenced code, and the custom table/code-fence rules described above.
- `lib/mermaid.ts` **never** imports Mermaid at the top level (it touches browser-only APIs) — it dynamically imports on demand and renders ` ```mermaid ` code fences into SVG.

Browser-only libraries (`html2pdf.js`, `mammoth`, `mermaid`) are always dynamically imported inside their functions so the server build never crashes.

## The Blog Engine

A lightweight MDX-based blog lives under `content/blog/`. Each `.mdx` file is an article with YAML frontmatter consumed by `lib/blog.ts`:

```yaml
title, description, datePublished, dateModified, tags,
readingTime, image, imageAlt, author, ctaTool
```

Notable behavior:
- **Automatic FAQ → schema** — `lib/blog.ts` parses the post's "Frequently Asked Questions" section (`**Q: ...?**` pairs) and exposes them as `FAQPage` JSON-LD, with no duplication in frontmatter.
- Posts can declare a `ctaTool` to link readers to the relevant converter.
- The blog index and each `/blog/[slug]` page are statically generated; all posts are automatically added to the sitemap.

The repo currently ships ~17 SEO-focused articles (e.g. "Best Markdown to PDF Converter", "Markdown to DOCX", "Clean HTML to Markdown", "Markdown Cheatsheet").

## SEO & Discoverability

SEO is a first-class concern in this project:

- **Per-page metadata** via the Next.js Metadata API (titles, descriptions, keywords, canonical, OpenGraph, Twitter cards).
- **Structured data (JSON-LD)** through `components/seo/StructuredData.tsx` — Organization schema site-wide, plus FAQ schema generated from blog content.
- **Dynamic `sitemap.xml`** (`app/sitemap.ts`) covering tool pages and every blog post. Tool-page `lastModified` is a manually bumped constant (`TOOL_PAGES_LAST_UPDATED`) to avoid stamping false "just changed" signals on every build.
- **`robots.txt`** (`app/robots.ts`) pointing at the sitemap.
- **IndexNow** integration (`scripts/submit-indexnow.js`) pings Bing/Yandex/Naver with sitemap URLs after deploy.
- **Preview-host protection** — `proxy.ts` sets `X-Robots-Tag: noindex, nofollow` on any `*.vercel.app` host so only the canonical `www.mdtool.dev` gets indexed.

Supporting analysis docs live in the repo root: `GEO-ANALYSIS.md`, `SCHEMA-REPORT.md`, and `generated-schema.json`.

## Analytics & Ads

Both are **opt-in and disabled by default** — neither script renders unless its environment variable is set:

- **Google Analytics 4** via `@next/third-parties` — enabled only when `NEXT_PUBLIC_GA_ID` is present.
- **Google AdSense** — enabled only when `NEXT_PUBLIC_ADSENSE_ID` is present; ad slots render through `components/ads/AdSlot.tsx`.

## Security

`vercel.json` applies hardened response headers to every route:

- **Content-Security-Policy** — restricts scripts/styles/frames to self + Google Analytics/AdSense origins
- **Strict-Transport-Security** — HSTS with preload (2 years)
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, and a restrictive `Permissions-Policy`
- Long-lived caching for static assets (`svg/png/jpg/webp/ico/woff2`)

Because conversions are client-side, there is no file-upload attack surface on the server.

## Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`. All variables are **optional** — the site runs fully without them.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Unset = no analytics. |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense publisher ID (e.g. `ca-pub-...`). Unset = no ads. |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run indexnow` | Submit every sitemap URL to IndexNow (run after deploy) |

## Deployment

The project is configured for **Vercel** (`vercel.json` defines the build/install commands and security headers). Any platform that supports Next.js 16 will work.

Post-deploy checklist:
1. Set the canonical domain to `www.mdtool.dev` (preview hosts are auto-`noindex`ed via `proxy.ts`).
2. Optionally run `npm run indexnow` to notify non-Google search engines of new content.

---

*MDTool is built to be fast, private, and free. No tracking by default, no uploads, no login.*
