# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `README.md` - **Read this first.** Documents the application's own structure: where content, hooks, components and styles live, and the load-bearing CSS import order
- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Page composition only (which tab is open, which video is playing); the markup lives in `src/components/`
- `src/types.ts`, `src/config.ts` - Shared data shapes, and every external URL
- `src/assets/` - Images imported by components (logo, footer mark), so the bundler can hash or inline them; `public/favicon.svg` stays separate as the HTML tab icon
- `src/data/` - The editable content: launcher applications, training videos, tab labels
- `src/hooks/` - Reusable behaviour: directory loading, clipboard copy, Escape key
- `src/components/` - UI, split into `layout/` (header, ticker, hero, tabs, footer) and `sections/` (one file per tab)
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import; imports `src/styles/*` in a deliberate cascade order (see README)
- `src/styles/` - The stylesheet in eight ordered files, each refining the one before it
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `scripts/build-single-file.mjs` - Builds `export/sofscript-portal.html`, the whole portal inlined into one self-contained file (`pnpm build:single`). That HTML is generated — never hand-edit it
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

Tailwind emits utility classes in `@layer utilities`, and CSS outside any cascade layer overrides every layer regardless of specificity. Put global element styles, such as resets and defaults for `body`, headings, `button`, or `input`, inside `@layer base { ... }` so utility classes on those elements still apply. Tailwind's Preflight already applies `box-sizing: border-box`, removes default margins, and sets `font: inherit` on form controls, so do not repeat those rules.
