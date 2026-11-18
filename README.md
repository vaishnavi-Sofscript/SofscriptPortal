# Sofscript Portal

A single page that hospital staff open to reach every system: the application
launcher, the phone directory and the demo/training videos.

React 19 + Vite + TypeScript. Plain CSS (not Tailwind utilities) does the
styling — Tailwind is loaded but only its reset is relied on.

## Running it

```bash
pnpm install       # or: npm install
pnpm dev           # http://localhost:8443
pnpm build         # production build into dist/
pnpm build:single  # one self-contained file: export/sofscript-portal.html
pnpm typecheck     # tsc --noEmit — run this before committing
pnpm format        # oxfmt
```

### The single-file build

`pnpm build:single` produces **`export/sofscript-portal.html`** — the whole
portal as one file, with the JavaScript, CSS, logo and favicon inlined. It needs
no sibling files and no CDN, so it can be dropped on any web server, opened from
a USB stick, or emailed as an attachment.

It is generated output: **never hand-edit it.** Change the code in `src/` and
run the command again. The script
([scripts/build-single-file.mjs](scripts/build-single-file.mjs)) refuses to write
the file if anything would still point at a separate file, or if a development
build of React sneaks in.

The phone directory and the demo videos are still fetched from the hospital
portal at runtime — those are live data and cannot be inlined.

## Where things live

The project follows the standard Vite layout: you edit `src/`, everything else
is either configuration or generated output.

```
index.html           the HTML shell Vite builds from
package.json         dependencies and the commands above
vite.config.ts       build configuration (Figma Make owns this file)
tsconfig.json        TypeScript settings, including the @/ → src/ alias
public/favicon.svg   browser tab icon (copied to the build as-is)
scripts/             build tooling — the single-file export
src/                 ALL the application code (below)
dist/                generated — output of `pnpm build`
export/              generated — the one-file portal, `pnpm build:single`
```

```
src/
├── main.tsx                      entry point — mounts <App /> and loads the CSS
├── App.tsx                       the page: which tab is open, which video is playing
├── types.ts                      the four data shapes the whole app uses
├── config.ts                     every external URL (change server addresses here)
│
├── assets/                       images imported by components, so the build
│   ├── logo.svg                    owns them (hashed normally, inlined single-file)
│   └── mark.svg
│
├── data/                         CONTENT — edit these to change what is listed
│   ├── applications.tsx            the five launcher tiles
│   ├── trainingVideos.ts           the demo videos
│   └── tabs.ts                     the three tab labels
│
├── hooks/                        BEHAVIOUR — reusable logic, no markup
│   ├── usePhoneDirectory.ts        loads the directory from the legacy portal
│   ├── useCopyToClipboard.ts       copy an extension, show a tick for 1.5s
│   └── useEscapeKey.ts             close something on the Escape key
│
├── components/                   MARKUP
│   ├── Icon.tsx                    sizes and strokes one SVG icon
│   ├── icons.tsx                   the icon set (shapes only)
│   ├── VideoDialog.tsx             full-screen video player
│   ├── layout/                     page furniture
│   │   ├── SiteHeader.tsx
│   │   ├── AppTicker.tsx             scrolling strip of app names
│   │   ├── Hero.tsx
│   │   ├── TabBar.tsx
│   │   └── SiteFooter.tsx
│   └── sections/                   one file per tab
│       ├── ApplicationsSection.tsx
│       ├── DirectorySection.tsx      search box + states
│       ├── DirectoryTable.tsx        the results table
│       └── TrainingSection.tsx
│
├── index.css                     stylesheet entry — documents the import order
└── styles/                       the stylesheet, split in cascade order
```

Imports use the `@/` alias for `src/`, e.g. `import { Icon } from "@/components/Icon"`.

## How to make common changes

| I want to… | Edit |
|---|---|
| Add/remove an application, or change where a tile points | `src/data/applications.tsx` (then add a hover colour in `src/styles/refresh.css` if there are now more than five) |
| Add a training video | `src/data/trainingVideos.ts` |
| Rename a tab | `src/data/tabs.ts` |
| Point at a different portal server | `src/config.ts` |
| Change a colour, radius or shadow | `src/styles/tokens.css` |
| Change how something looks | See the note on cascade order below |
| Add a new icon | `src/components/icons.tsx` |

## The stylesheet

`src/index.css` is only a list of imports, and **their order is load-bearing**.
The design was refined in four passes, and each pass deliberately overrides the
one before it:

| # | File | What it is |
|---|---|---|
| 1 | `tokens.css` | colours, radii, shadows — the values everything else uses |
| 2 | `base.css` | element defaults and the fixed-header page shell |
| 3 | `components.css` | the starting look of each component |
| 4 | `theme-luxury.css` | pass 1 — flat, ruled, ivory and navy |
| 5 | `tabs.css` | pass 2 — the section tab bar |
| 6 | `motion.css` | pass 3 — entrances and hover transitions |
| 7 | `fixes.css` | a Tailwind name clash and small-screen corrections |
| 8 | `refresh.css` | pass 4 — the current look: depth, colour, per-tile accents |

So the same selector can appear in several files. **To change how something
looks, start at the bottom of that list and work up** — the last file that
mentions a selector is the one that wins. `refresh.css` is usually the answer.

Two structural rules the CSS depends on, so don't move these elements in the JSX:

- `.bar` (header) and `.foot` (footer) must stay **direct children of `#root`** —
  they are the fixed chrome, and everything between them scrolls in `.scroll-area`.
- The tab sections must stay **direct children of `<main>`**.

## The phone directory

The directory is not part of this app. It is fetched at runtime by injecting a
`<script>` tag pointing at `phoneDatabase.js` on the legacy portal
(`https://cw.sofscript.com:8654/SPortal/`), which assigns a global rather than
returning JSON — hence the script tag instead of `fetch`. The demo videos are
streamed from the same server.

Both are only reachable from the hospital network. Off the network the directory
tab shows "The directory is available on the hospital network." rather than an
error, which is why `usePhoneDirectory` treats a failed load as an empty list.

## Images

`src/assets/` holds the images the app renders; components import them so the
bundler resolves and inlines them. `public/favicon.svg` is separate on purpose —
it is the browser tab icon, referenced from the HTML rather than from code, and
`src/assets/mark.svg` is the same artwork for use inside the page.

## Generated folders

`dist/` and `export/` are build output, not source. Don't edit either — change
`src/` and rebuild:

| Folder | Contains | Rebuild with |
|---|---|---|
| `dist/` | the normal multi-file build (HTML + hashed JS/CSS/images) | `pnpm build` |
| `export/` | `sofscript-portal.html`, the whole portal in one file | `pnpm build:single` |

Both are regenerated from scratch each time, so anything you add there by hand
will be wiped.
